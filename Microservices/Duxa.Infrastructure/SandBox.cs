using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    public class SandBox: ISandBox
    {

        private readonly string SandboxPath = @"..\Repos";

        public SandBox()
             : base()
        {
            string  fullPath = Path.Combine(Directory.GetCurrentDirectory(), SandboxPath);
            if (!Directory.Exists(fullPath))
            {
                Directory.CreateDirectory(fullPath);
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
