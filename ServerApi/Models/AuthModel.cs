using Newtonsoft.Json;

namespace ServerApi.Models {
    public class AuthModel {
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }


    public class AuthUserInfoModel {
        public AuthUserInfoModel() { }

        public AuthUserInfoModel(TestDbEntities db, UserProfile user) {
            Apikey = user.Apikeys.Apikey ?? "";
            Budget = user.Budget;
            Email = user.Email;
            FirstName = user.FirstName;
            SecondName = user.SecondName;
            AccountNumber = user.AccountNumber;
            UserId = user.UserId;
        }

        public AuthUserInfoModel(string apikey,
            decimal budget,
            string email,
            string name,
            string secondName,
            string accountNumber,
            int userId) {

            Apikey = apikey;
            Budget = budget;
            Email = email;
            FirstName = name;
            SecondName = secondName;
            AccountNumber = accountNumber;
            UserId = userId;
        }
        [JsonProperty("apikey")]
        public string Apikey { get; set; }
        [JsonProperty("budget")]
        public decimal Budget { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
        [JsonProperty("second_name")]
        public string SecondName { get; set; }
        [JsonProperty("account_number")]
        public string AccountNumber { get; set; }
        [JsonProperty("user_id")]
        public int UserId { get; set; }
    }
}