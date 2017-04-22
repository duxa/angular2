using Newtonsoft.Json;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using Duxa.Infrastructure;
using DUXA.Microservices.Nancy;
using Gaev.Microservices.Nancy;

namespace Duxa.Microservices.Nancy
{

    public class BuldHttpConfiguration : HttpConfiguration
    {
        public BuldHttpConfiguration()
        {
            ConfigureRoutes();
        }

        private void ConfigureRoutes()
        {
            Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            this.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            AutofacConfiguraion.Modules = new List<Module>();
            AutofacConfiguraion.Modules.Add(new AppModule());
            AutofacConfiguraion.Modules.ForEach(m => builder.RegisterModule(m));
            builder.Build();
            app.UseWebApi(new BuldHttpConfiguration());
        }
    }
}
