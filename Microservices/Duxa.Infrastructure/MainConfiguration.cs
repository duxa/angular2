using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Autofac;


namespace Duxa.Infrastructure
{
    public interface IMainConfiguration
    {
    }

    public class MainConfiguration : IMainConfiguration
    {
        public static List<Func<IDisposable>> Inializers = new List<Func<IDisposable>>();
        public static IContainer Container { get; set; }
        public static IDictionary<string, string> Args { get; private set; }


        public static IMainConfiguration Configure()
        {
            Args = new ConcurrentDictionary<string, string>();
            return new MainConfiguration();
        }

        public static IMainConfiguration Configure(string[] consoleArgs)
        {
            var conf = Configure();
            Args = ParseArgs(consoleArgs);
            return conf;
        }

        public static bool ContainsArg(string name)
        {
            return Args.ContainsKey(name);
        }

        public static string Arg(string name)
        {
            return Args.ContainsKey(name) ? Args[name] : null;
        }

        public static IDictionary<string, string> ParseArgs(string[] consoleArgs)
        {
            var args = new ConcurrentDictionary<string, string>();
            if (consoleArgs != null)
            {
                foreach (var consoleArg in consoleArgs)
                {
                    var values = consoleArg
                        .Trim('"')
                        .Split(' ', ';')
                        .Select(e => e.Trim().Split('='))
                        .ToDictionary(e => e[0].Trim(), e => e.Length > 1 ? e[1].Trim() : null);
                    foreach (var kv in values)
                        args[kv.Key] = kv.Value;
                }
            }
            return args;
        }
    }
}

  
