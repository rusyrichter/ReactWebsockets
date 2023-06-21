
using Microsoft.AspNetCore.Authentication.Cookies;

namespace ReactWS.Web
{
    public class Program
    {
        private static string CookieScheme = "ReactAuthorization";
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication(CookieScheme)
           .AddCookie(CookieScheme, options =>
           {
               options.Events = new CookieAuthenticationEvents
               {
                   OnRedirectToLogin = context =>
                   {
                       context.Response.StatusCode = 403;
                       context.Response.ContentType = "application/json";
                       var result = System.Text.Json.JsonSerializer.Serialize(new { error = "You are not authenticated" });
                       return context.Response.WriteAsync(result);
                   }
               };
           });
            builder.Services.AddSession();
            builder.Services.AddControllersWithViews();
            builder.Services.AddSignalR();

            var app = builder.Build();


            if (!app.Environment.IsDevelopment())
            {
              
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.MapHub<TaskHub>("/api/taskhub");

            app.UseSession();
            app.UseAuthentication();
            app.UseAuthorization();



            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}
