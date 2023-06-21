using Microsoft.AspNetCore.SignalR;
using ReactWS.Web.Models;

namespace ReactWS.Web
{
    public class TaskHub : Hub
    {
        public TaskHub(IConfiguration configuration)
        {
            configuration.GetConnectionString("ConStr");
        }
    }
}
