using Newtonsoft.Json;

namespace ServerApi.Models {
    public class CreatePaymentModel {
        [JsonProperty("apikey")]
        public string Apikey { get; set; }
        [JsonProperty("sum")]
        public int Sum { get; set; }
        [JsonProperty("payment_name")]
        public string PaymentName { get; set; }
        [JsonProperty("payment_note")]
        public string PaymentNote { get; set; }
        [JsonProperty("status")]
        public int Status { get; set; }
        [JsonProperty("account_for_number")]
        public string AccountForNumber { get; set; }
    }
}