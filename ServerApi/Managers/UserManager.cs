using System;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Web.Security;
using ServerApi.Models;

namespace ServerApi.Managers {
    public static class UserManager {
        /// <summary>
        /// получаем всю инфу по пользователю
        /// </summary>
        public static ResultModel GetUserInfo(string apikey) {
            try {
                using (var db = new TestDbEntities()) {
                    //var apikeys = db.Apikeys.ToList();
                    //db.Apikeys.RemoveRange(apikeys);
                    //db.SaveChanges();
                    //var auths = db.AuthInfo.ToList();
                    //db.AuthInfo.RemoveRange(auths);
                    //db.SaveChanges();
                    //var users = db.UserProfile.ToList();
                    //db.UserProfile.RemoveRange(users);
                    //db.SaveChanges();


                    var ap = db.Apikeys.FirstOrDefault(a => a.Apikey == apikey);
                    var user = ap?.UserProfile;
                    if (user == null) return new ResultModel("Apikey is wrong");

                    var result = new AuthUserInfoModel(db, user);
                    return new ResultModel(result);

                }
            } catch (Exception ex) {
                return new ResultModel(ex.Message);
            }
        }
        /// <summary>
        /// регистрируем пользователя
        /// </summary>
        public static ResultModel RegistrateUser(RegistrationModel model) {
            try {
                using (var db = new TestDbEntities()) {
                    var newUser = new UserProfile() {
                        CreateDate = DateTime.Now,
                        Budget = 1000
                    };

                    if (!CheckEmail(model.Email)) return new ResultModel("Email is incorrect");
                    if (db.UserProfile.Any(a => a.Email == model.Email)) return new ResultModel("Email is busy");

                    if (string.IsNullOrEmpty(model.FirstName)
                        || string.IsNullOrEmpty(model.SecondName)
                        || string.IsNullOrEmpty(model.Password)
                        || model.Password.Length < 8)
                        return new ResultModel("Data is wrong");

                    newUser.Email = model.Email;
                    newUser.FirstName = model.FirstName;
                    newUser.SecondName = model.SecondName;

                    var accountNumber = GenerateAccountNumber();
                    while (db.UserProfile.Any(a => a.AccountNumber.Equals(accountNumber))) {
                        accountNumber = GenerateAccountNumber();
                    }

                    newUser.AccountNumber = accountNumber;

                    db.UserProfile.Add(newUser);
                    db.SaveChanges();

                    newUser.AuthInfo = new AuthInfo() {
                        UserId = newUser.UserId,
                        PasswordMd5 = GetHash(model.Password)
                    };

                    db.SaveChanges();

                    var apikey = new Apikeys() {
                        UserId = newUser.UserId,
                        Apikey = Membership.GeneratePassword(15, 0)
                    };
                    db.Apikeys.Add(apikey);
                    db.SaveChanges();

                    return new ResultModel(true, apikey.Apikey);
                }
            } catch (Exception ex) {
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

                    return new ResultModel(true, user?.Apikeys?.Apikey ?? "");
                }
            } catch (Exception ex) {
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
            } catch (Exception ex) {
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
            } catch (Exception ex) {
                return "";
            }
        }

        /// <summary>
        /// формируем счет
        /// </summary>
        private static string GenerateAccountNumber() {
            try {
                var number = "";
                var rand = new Random();
                var buf = 0;
                while (buf < 15) {
                    number += rand.Next(0, 9);
                    buf++;
                }
                return number;

            } catch (Exception ex) {
                return "";
            }
        }

    }
}