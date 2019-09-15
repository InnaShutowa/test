using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ServerApi.Models {
    
    public class ResultModel {
        public ResultModel() { }

        public ResultModel(bool status) {
            Status = status;
        }

        public ResultModel(string error) {
            Error = error;
            Status = false;
        }

        public ResultModel(object data) {
            Status = true;
            Data = data;
        }

        public ResultModel(bool status, string apikey) {
            Apikey = apikey;
            Status = status;
        }
        [JsonProperty("status")]
        public bool Status { get; set; }
        [JsonProperty("error")]
        public string Error { get; set; }
        [JsonProperty("data")]
        public object Data { get; set; }
        [JsonProperty("apikey")]
        public string Apikey { get; set; }

    }
}