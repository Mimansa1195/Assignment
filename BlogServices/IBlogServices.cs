using BlogAssignmentBO;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogServices
{
    public interface IBlogServices
    {
        List<BlogBO> GetAllBlogs();
        int AddBlog(BlogBO data);

        int DeleteBlog(int blogId);
        BlogBO GetBlogById(int blogId);

        TokenBO Authenticate(TokenBO data);
    }
}
