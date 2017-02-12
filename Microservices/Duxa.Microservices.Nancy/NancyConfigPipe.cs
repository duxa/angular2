using System;
using Microsoft.Owin.Host;
namespace Duxa.Microservices.Nancy
{
    public class NancyConfigPipe : ConfigPipe
    {
        public NancyConfigPipe(IConfigPipe previous) : base(previous)
        {
        }

        public override ISetup Build()
        {
            return previous.Build();
        }
    }

    public class WebConfigPipe : ConfigPipe
    {
        public WebConfigPipe(IConfigPipe previous) : base(previous)
        {
            using (Microsoft.Owin.Hosting.WebApp.Start<Startup>("http://localhost:8000"))
            {
                Console.WriteLine("Сервер запущен. Нажмите любую клавишу для завершения работы...");
                Console.ReadLine();
            }
        }

        public override ISetup Build()
        {
            return previous.Build();
        }

    }

    namespace Duxa.Microservices
    {
        using System;
        using System.Linq.Expressions;

        public static class NancyExt
        {
            public static NancyConfigPipe UseNancy(this IConfigPipe previous)
            {
                return new NancyConfigPipe(previous);
            }
        }

        public static class WebApi
        {
            public static WebConfigPipe UseWebApi(this IConfigPipe previous)
            {

                return new WebConfigPipe(previous);
            }
        }
    }
}


