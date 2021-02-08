using System;

namespace BlogAssignmentBO
{
    public class BlogBO
    {
        public int BlogId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
    public class TokenBO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public Guid Token { get; set; }
    }
}
