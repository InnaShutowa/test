using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerApi.Models {
    
    /// <summary>
    /// модель отдельного платежа
    /// </summary>
    public class PaymentModel {
        public PaymentModel() { }
        public PaymentModel(TestDbEntities db,
            Payments payment,
            bool output) {

            var sTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            var userFor = db.UserProfile
                .FirstOrDefault(a => a.UserId == payment.UserForId);

            var user = db.UserProfile
                .FirstOrDefault(a => a.UserId == payment.UserId);
            if (userFor == null || user == null) return;

            UserFor = new AuthUserInfoModel(db, userFor);
            PaymentId = payment.PaymentId;
            ToAccountNumber = db.UserProfile
                                  .FirstOrDefault(a => a.UserId == payment.UserId)
                                  ?.AccountNumber ?? "";

            PaymentDateUnix = payment.PaymentDate.ToString();
            PaymentName = payment.Name;
            PaymentNote = payment.Note;
            Sum = payment.Sum;
            Status = payment.Status;
            UserId = payment.UserId;
            Output = output;
            UserFristName = user.FirstName;
            UserSecondName = user.SecondName;
            UserForId = userFor.UserId;
            ForAccountNumber = userFor.AccountNumber;
        }
        [JsonProperty("user_id")]
        public int UserId { get; set; }
        [JsonProperty("output")]
        public bool Output { get; set; }
        [JsonProperty("payment_id")]
        public int PaymentId { get; set; }
        [JsonProperty("for_account_number")]
        public string ForAccountNumber { get; set; }
        [JsonProperty("to_account_number")]
        public string ToAccountNumber { get; set; }
        [JsonProperty("payment_date_unix")]
        public string PaymentDateUnix { get; set; }
        [JsonProperty("payment_name")]
        public string PaymentName { get; set; }
        [JsonProperty("payment_note")]
        public string PaymentNote { get; set; }
        [JsonProperty("sum")]
        public decimal Sum { get; set; }
        [JsonProperty("status")]
        public int Status { get; set; }
        [JsonProperty("user_for_id")]
        public int UserForId { get; set; }
        [JsonProperty("user_for")]
        public AuthUserInfoModel UserFor { get; set; }
        [JsonProperty("user_first_name")]
        public string UserFristName { get; set; }
        [JsonProperty("user_second_name")]
        public string UserSecondName { get; set; }
    }
}