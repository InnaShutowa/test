using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace ServerApi.Models {
    public class RegistrationModel {
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
        [JsonProperty("second_name")]
        public string SecondName { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}