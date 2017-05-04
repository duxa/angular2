using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.BL;
using Duxa.DAL;
using Duxa.DAL.Repo;
using Duxa.Infrastructure;

namespace XMLParseStart
{
    class Program
    {
        static void Main(string[] args)
        {
            QuartzSheduller sheduller = new QuartzSheduller();
            sheduller.ExecuteScheduler();
            Console.ReadLine();
        }
    }
}
