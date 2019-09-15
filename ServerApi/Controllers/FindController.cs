using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using ServerApi.Managers;
using ServerApi.Models;

namespace ServerApi.Controllers {
    public class FindController : ApiController {
        // GET: Auth
        [HttpPost]
        public object Post(FindPaymentModel model) {
            var manager = new PaymentManager(model.Apikey);
            return manager.FindPayments(model.Type, model.Value);
        }

        [HttpOptions]
        public HttpResponseMessage Options() {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}