using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ServerApi.Managers;
using ServerApi.Models;

namespace ServerApi.Controllers
{
    public class AuthController : ApiController
    {
        // GET: Auth
        [HttpPost]
        public object Post(AuthModel model) {
            return UserManager.AuthorizeUser(model.Email, model.Password);
        }

        [HttpOptions]
        public HttpResponseMessage Options() {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}