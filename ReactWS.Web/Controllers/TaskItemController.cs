using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ReactWS.Data;
using System.Threading.Tasks;

namespace ReactWS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private string _connectionString;

        private IHubContext<TaskHub> _hub;
        public TaskItemController(IConfiguration configuration, IHubContext<TaskHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;
        }
        [HttpGet]
        [Route("getTasks")]
        public List<TaskItem> GetTasks()
        {
            var repo = new TaskRepository(_connectionString);
            return repo.GetUpdatedTasks();
        }

        [HttpPost]
        [Route("addTask")]
        public void AddTask(TaskItem task)
        {
            var repo = new TaskRepository(_connectionString);
            repo.AddTask(task);
            _hub.Clients.All.SendAsync("jobreceived", task);
        }

        [HttpPost]
        [Route("setTaskToDone")]
        public void BeingDone(TaskItem task)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            var taskRepo = new TaskRepository(_connectionString);
            task.UserId = user.Id;
            taskRepo.BeingDone(task);
            _hub.Clients.All.SendAsync("updatedTasks", taskRepo.GetUpdatedTasks());
        }
        [HttpPost]
        [Route("deleteTask")]
        public void DeleteTask(TaskItem task)
        {
            var repo = new TaskRepository(_connectionString);
            repo.DeleteTask(task.Id);
            _hub.Clients.All.SendAsync("updatedTasks", repo.GetUpdatedTasks());
        }
    }
}
