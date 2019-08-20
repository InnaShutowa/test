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
    public class RegistrationController : ApiController
    {
        // GET: Registration
        [HttpPost]
        public object Post(RegistrationModel model)
        {
            return UserManager.RegistrateUser(model); ;
        }

        [HttpOptions]
        public HttpResponseMessage Options() {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}