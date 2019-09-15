using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ServerApi.Managers;
using ServerApi.Models;

namespace ServerApi.Controllers {
    public class PaymentsController : ApiController {
        // GET: Payments
        [HttpGet]
        public object Get(string apikey) {
            var manager = new PaymentManager(apikey);
            return manager.GetPaymentsList();
        }
        [HttpPost]
        public object Post(CreatePaymentModel model) {
            var manager = new PaymentManager(model.Apikey);
            return manager.CreatePayment(model);
        }

        [HttpOptions]
        public HttpResponseMessage Options() {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}