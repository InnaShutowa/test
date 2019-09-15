using ServerApi.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServerApi.Controllers {
    public class PaymentInfoController : ApiController {
        [HttpGet]
        public object Get(string apikey, int paymentId) {
            var manager = new PaymentManager(apikey);
            return manager.GetInfoAbountPayment(paymentId);
        }

        [HttpOptions]
        public HttpResponseMessage Options() {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
