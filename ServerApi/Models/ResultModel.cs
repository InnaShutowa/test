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
        public bool Status { get; set; }
        public string Error { get; set; }
    }
}