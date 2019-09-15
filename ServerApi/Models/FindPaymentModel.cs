using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerApi.Models {
    public class FindPaymentModel {
        [JsonProperty("type")]
        public int Type { get; set; }
        [JsonProperty("value")]
        public string Value { get; set; }
        [JsonProperty("apikey")]
        public string Apikey { get; set; }
    }
}