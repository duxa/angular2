using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.BL;
using Duxa.DAL;
using Duxa.DAL.Repo;
using Duxa.Infrastructure;
using Quartz;
using Quartz.Impl;
using System.Collections.Specialized;

public class QuartzSheduller
{
    public QuartzSheduller()
    {

    }

    public void ExecuteScheduler()
    {
        try
        {
            
            StdSchedulerFactory factory = new StdSchedulerFactory();
            Quartz.IScheduler scheduler = factory.GetScheduler();


            // and start it off
            scheduler.Start();

            // define the job and tie it to our HelloJob class
            IJobDetail job = JobBuilder.Create<ParseJob>()
                .WithIdentity("job1", "group1")
                .Build();

            // Trigger the job to run now, and then repeat every 10 seconds
            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("trigger1", "group1")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithInterval(new TimeSpan(10, 0, 0, 0))
                    .RepeatForever())
                .Build();

            // Tell quartz to schedule the job using our trigger
            scheduler.ScheduleJob(job, trigger);


        }
        catch (SchedulerException se)
        {
            Console.WriteLine(se);
        }
    }
}

public class ParseJob : IJob
{
    public void Execute(IJobExecutionContext context)
    {
        var clientService = new ClientService(new ClientRepository(), new SandBox());
        var path = clientService.DownloadFile(new Uri("http://old.minjust.gov.ua/downloads/15-UFOP.zip"));
        var listPath = clientService.UnzipFiles(path);
        var clients = clientService.ParseClients(listPath);
        clientService.SaveClients(clients);
    }
}

