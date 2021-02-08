using BlogAssignmentBO;
using BlogServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BlogApi.Controllers
{
    public class AuthenticateController : ApiController
    {
        private readonly IBlogServices _blogsServices;
        public AuthenticateController(IBlogServices blogsServices)
        {
            _blogsServices = blogsServices;
        }
        [HttpPost]
        public HttpResponseMessage Authenticate(TokenBO data)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _blogsServices.Authenticate(data));
        }
    }
}
