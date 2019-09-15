using System;
using System.Collections.Generic;
using System.Linq;
using ServerApi.Enums;
using ServerApi.Models;

namespace ServerApi.Managers {
    public class PaymentManager {
        private string Error = null;
        private int UserId = -1;
        public PaymentManager() { }

        public PaymentManager(string apikey) {
            UserId = GetUserIdByApikey(apikey);
            if (UserId == -1) Error = "Aoikey is wrong";
        }

        public ResultModel FindPayments(int type, string data) {
            try {
                using (var db = new TestDbEntities()) {
                    var typeEnum = (FindTypesEnum)type;
                    var payments = GetPaymentsList();

                    if (string.IsNullOrEmpty(data)) return payments;

                    if (!payments.Status || payments.Data == null) return new ResultModel(false);

                    var list = (List<PaymentModel>)payments.Data;
                    var result = new List<PaymentModel>();
                    switch (typeEnum) {
                        case FindTypesEnum.ByName: {
                                result = list?
                                    .Where(a => a.PaymentName.Trim().ToLower() == data.Trim().ToLower())?
                                    .ToList();
                                return new ResultModel(result);
                            }
                        case FindTypesEnum.ByAccountFor: {
                                result = list?
                            .Where(a => (a.ForAccountNumber?.Trim().ToLower() ?? "") == data.Trim().ToLower())?
                            .ToList();
                                return new ResultModel(result);
                            }
                        case FindTypesEnum.ByAccountTo: {
                                result = list?
                            .Where(a => (a.ToAccountNumber?.Trim().ToLower() ?? "") == data.Trim().ToLower())?
                            .ToList();
                                return new ResultModel(result);
                            }
                        default: {
                                return new ResultModel(result);
                            }
                    }

                }
            } catch (Exception ex) {
                return new ResultModel(ex.Message);
            }
        }


        /// <summary>
        /// получаем данные по конкретному платежу
        /// </summary>
        public ResultModel GetInfoAbountPayment(int paymentId) {
            try {
                using (var db = new TestDbEntities()) {

                    if (UserId == -1) return new ResultModel(Error);
                    var payment = db.Payments.FirstOrDefault(a => a.PaymentId == paymentId);
                    if (payment == null) return new ResultModel("PaymentId is wrong");
                    if (payment.UserId != UserId && payment.UserForId != UserId)
                        return new ResultModel("No rules for access");

                    var result = new PaymentModel();
                    if (payment.UserId == UserId)
                        result = new PaymentModel(db, payment, true);
                    else {
                        result = new PaymentModel(db, payment, false);
                    }

                    return new ResultModel(result);
                }
            } catch (Exception ex) {
                return new ResultModel(ex.Message);
            }
        }


        /// <summary>
        /// получаем список платежей
        /// </summary>
        public ResultModel GetPaymentsList() {
            try {
                using (var db = new TestDbEntities()) {
                    if (UserId == -1) return new ResultModel(Error);
                    var user = db.UserProfile.First(a => a.UserId == UserId);
                    if (user == null) return new ResultModel("User wasn't found");
                    var from = db.Payments.Where(a => a.UserId == UserId).ToList();
                    var to = db.Payments.Where(a => a.UserForId == UserId).ToList();

                    var result = new List<PaymentModel>();

                    from.ForEach(payment => {
                        result.Add(new PaymentModel(db, payment, true));
                    });

                    to.ForEach(payment => {
                        result.Add(new PaymentModel(db, payment, false));
                    });

                    return new ResultModel(result);
                }
            } catch (Exception ex) {
                Error = ex.Message;
                return new ResultModel(Error);
            }
        }
        /// <summary>
        /// создаем платеж
        /// </summary>
        public ResultModel CreatePayment(CreatePaymentModel model) {
            try {
                using (var db = new TestDbEntities()) {
                    if (UserId == -1) return new ResultModel(Error);
                    var user = db.UserProfile.First(a => a.UserId == UserId);

                    if (string.IsNullOrEmpty(model.AccountForNumber) || user.AccountNumber == model.AccountForNumber) {
                        Error = "Account number is wrong";
                        return new ResultModel(Error);
                    }

                    if (model.Sum == 0 || user.Budget < model.Sum) {
                        Error = "Sum is wrong";
                        return new ResultModel(Error);
                    }

                    var userFor = db.UserProfile.FirstOrDefault(a => a.AccountNumber == model.AccountForNumber);
                    if (userFor == null) {
                        Error = "AccountNumber is wrong!";
                        UserId = -1;
                        return new ResultModel(Error);
                    }

                    user.Budget = user.Budget - model.Sum;
                    userFor.Budget = userFor.Budget + model.Sum;

                    var payment = new Payments() {
                        Name = model.PaymentName,
                        Note = model.PaymentNote ?? "",
                        PaymentDate = DateTime.Now,
                        Status = model.Status,
                        Sum = model.Sum,
                        UserForId = userFor.UserId,
                        UserId = UserId
                    };

                    db.Payments.Add(payment);
                    db.SaveChanges();
                    return new ResultModel(true);
                }
            } catch (Exception ex) {
                Error = ex.Message;
                return new ResultModel(Error);
            }
        }
        /// <summary>
        /// получаем id пользователя по его апикею
        /// </summary>
        private int GetUserIdByApikey(string apikey) {
            try {
                using (var db = new TestDbEntities()) {
                    if (string.IsNullOrEmpty(apikey)) {
                        Error = "Apikey is empty";
                        return -1;
                    }

                    var userId = db.Apikeys.FirstOrDefault(a => a.Apikey.Trim() == apikey.Trim())?.UserId;
                    if (userId == null) {
                        Error = "Apikey is wrong";
                        return -1;
                    }

                    return userId ?? -1;
                }
            } catch (Exception ex) {
                Error = ex.Message;
                return -1;
            }
        }
    }
}