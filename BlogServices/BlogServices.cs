using BlogAssignmentBO;
using BlogsModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BlogServices
{
    public class BlogServices : IBlogServices
    {
        private readonly AssignmentEntities _dbContext = new AssignmentEntities();

        public TokenBO Authenticate(TokenBO data)
        {
            var res = new TokenBO();
            var ifTrue = _dbContext.UserDetails.FirstOrDefault(x => x.Username == data.Username && x.Password == data.Password);
         if (ifTrue != null)
            {
                res.Token = new Guid();
                res.UserId = ifTrue.UserId;
            }
            return res;
        }
        public List<BlogBO> GetAllBlogs()
        {
            var data = _dbContext.Blogs.ToList();

            var list = data.Select(s => new BlogBO
            {
                BlogId = s.BlogId,
                Title = s.Title,
                Description = s.Description

            }).ToList();
            return list ?? new List<BlogBO>();
        }

        public int AddBlog(BlogBO data)
        {
            if (data.BlogId > 0)
            {
                var blog = _dbContext.Blogs.FirstOrDefault(x => x.BlogId == data.BlogId);
                blog.Title = data.Title;
                blog.Description = data.Description;
                _dbContext.SaveChanges();
            }
            else
            {
                var newBlog = new Blog();
                newBlog.Title = data.Title;
                newBlog.Description = data.Description;
                _dbContext.Blogs.Add(newBlog);
                _dbContext.SaveChanges();
            }
            
            return 1;
        }

        public int DeleteBlog(int blogId)
        {
            var data = _dbContext.Blogs.FirstOrDefault(x => x.BlogId == blogId);
            _dbContext.Blogs.Remove(data);
            _dbContext.SaveChanges();
            return 1;
        }

        public BlogBO GetBlogById(int blogId)
        {
            var data = _dbContext.Blogs.FirstOrDefault(x => x.BlogId == blogId);
            var result = new BlogBO();
            result.Title = data.Title;
            result.Description = data.Description;
            return result;
        }
    }
}