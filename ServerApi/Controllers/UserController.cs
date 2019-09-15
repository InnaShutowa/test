using ServerApi.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServerApi.Controllers {
    public class UserController : ApiController {
        [HttpGet]
        public object Get(string apikey) {
            return UserManager.GetUserInfo(apikey);
        }

        [HttpOptions]
        public HttpResponseMessage Options() {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
