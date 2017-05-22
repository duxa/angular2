using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    public class SandBox: ISandBox
    {
        private readonly string SandboxPath = ConfigurationManager.AppSettings["FileRepository"];

        public SandBox()
             : base()
        {
            if (!Directory.Exists(SandboxPath))
            {
                Directory.CreateDirectory(SandboxPath);
            }
        }
        public string GetNewTempFileName()
        {
            return Path.Combine(SandboxPath, string.Format("{0}.tmp", Guid.NewGuid()));
        }
        public string GetNewTempFolderName()
        {
            return Path.Combine(SandboxPath, Guid.NewGuid().ToString());
        }
    }
}
