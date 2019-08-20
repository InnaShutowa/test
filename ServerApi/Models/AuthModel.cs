using Newtonsoft.Json;

namespace ServerApi.Models {
    public class AuthModel {
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}