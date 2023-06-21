namespace ReactWS.Data
{
    public class UserRepository
    {
        private string _connectionString { get; set; }

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public User GetCurrentUser(string email)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public User GetByEmail(string email)
        {
            var context = new DataContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;
        }
        public void Signup(User user, string password)
        {
            var context = new DataContext(_connectionString);
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            context.Users.Add(user);
            context.SaveChanges();
        }
    }
}