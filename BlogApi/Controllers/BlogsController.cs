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
    public class BlogsController : ApiController
    {
        private readonly IBlogServices _blogsServices;
        public BlogsController(IBlogServices blogsServices)
        {
            _blogsServices = blogsServices;
        }

        [HttpPost]
        public HttpResponseMessage GetAllBlogs()
        {
            return Request.CreateResponse(HttpStatusCode.OK, _blogsServices.GetAllBlogs());
        }

        [HttpPost]
        public HttpResponseMessage AddBlog(BlogBO data)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _blogsServices.AddBlog(data));
        }

        [HttpPost]
        public HttpResponseMessage DeleteBlogs(BlogBO data)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _blogsServices.DeleteBlog(data.BlogId));
        }

        [HttpPost]
        public HttpResponseMessage GetBlogById(BlogBO data)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _blogsServices.GetBlogById(data.BlogId));
        }

    }
}
