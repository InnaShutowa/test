using System;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;
using ServerApi.Models;

namespace ServerApi.Managers {
    public static class UserManager {
        public static ResultModel RegistrateUser(RegistrationModel model) {
            try {
                using (var db = new TestDbEntities()) {
                    var newUser = new UserProfile() {
                        CreateDate = DateTime.Now,
                        Budget = 1000
                    };

                    if (!CheckEmail(model.Email)) return new ResultModel("Email is incorrect");
                    if (db.UserProfile.Any(a=>a.Email == model.Email)) return new ResultModel("Email is busy");

                    if (string.IsNullOrEmpty(model.FirstName) 
                        || string.IsNullOrEmpty(model.SecondName)
                        || string.IsNullOrEmpty(model.Password)
                        || model.Password.Length < 8)
                        return new ResultModel("Data is wrong");

                    newUser.Email = model.Email;
                    newUser.FirstName = model.FirstName;
                    newUser.SecondName = model.SecondName;
                    
                    var accountNumber = Membership.GeneratePassword(15, 0);
                    while (db.UserProfile.Any(a => a.AccountNumber.Equals(accountNumber))) {
                        accountNumber = Membership.GeneratePassword(15, 0);
                    }

                    newUser.AccountNumber = accountNumber;
                    
                    db.UserProfile.Add(newUser);
                    db.SaveChanges();

                    newUser.AuthInfo = new AuthInfo() {
                        UserId = newUser.UserId,
                        PasswordMd5 = GetHash(model.Password)
                    };

                    db.SaveChanges();
                    return new ResultModel(true);
                }
            }
            catch (Exception ex) {
                return new ResultModel(ex.Message);
            }
        }

        public static ResultModel AuthorizeUser(string email, string password) {
            try {
                using (var db = new TestDbEntities()) {
                    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)) return new ResultModel("Data is wrong");
                    var user = db.UserProfile.FirstOrDefault(a => a.Email.ToLower() == email.ToLower());
                    if (user == null) return new ResultModel("User wasn't found");
                    var hash = GetHash(password);
                    if (user.AuthInfo.PasswordMd5 != hash) return new ResultModel("Password is wrong");
                    return new ResultModel(true);
                }
            }
            catch (Exception ex) {
                return new ResultModel(ex.Message);
            }
        }

        /// <summary>
        /// проверяем корректность email
        /// </summary>
        private static bool CheckEmail(string email) {
            try {
                if (string.IsNullOrEmpty(email) || email.IndexOf('@') == -1 || email.Length < 6) return false;
                
                var cutEmail = email.Remove(0, email.IndexOf('@'));

                if (cutEmail.Length == 0 || cutEmail.Length <= 3 || cutEmail.IndexOf('.') == -1) return false;

                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }

        /// <summary>
        /// md5 пароля
        /// </summary>
        private static string GetHash(string password) {
            try {
                using (var md5 = MD5.Create()) {
                    var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
                    var hashString = Encoding.Default.GetString(hash);
                    return hashString;
                }
            }
            catch (Exception ex) {
                return "";
            }
        }

    }
}