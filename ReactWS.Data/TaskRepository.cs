using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWS.Data
{
    public class TaskRepository
    {
        private string _connectionString { get; set; }

        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddTask(TaskItem task)
        {
            var context = new DataContext(_connectionString);
            context.Tasks.Add(task);
            context.SaveChanges();
        }
        public List<TaskItem> GetUpdatedTasks()
        {
            var context = new DataContext(_connectionString);
            return context.Tasks
                .Include(t => t.User)
                .ToList();
        }
        public void BeingDone(TaskItem task)
        {
            var context = new DataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"Update Tasks set UserId = {task.UserId} Where Id = {task.Id}");
            context.SaveChanges();
        }

        public void DeleteTask(int id)
        {
            var context = new DataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(@$"Delete from Tasks WHERE Id = {id}");
        }
    }
}
