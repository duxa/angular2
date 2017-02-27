using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Ionic.Zip;

namespace Duxa.BL.Utils
{
    public static class ClientDataLoader
    {
        public static void LoadFromExternalStore(Uri url, string sandBox)
        {
            using (WebClient wc = new WebClient())
            {
                wc.DownloadFile(url, sandBox);
            }
        }

        public static void UnzipClientData(string zipfilePath, string sandBoxPath)
        {
            using (ZipFile zip = ZipFile.Read(zipfilePath))
            {
                foreach (ZipEntry e in zip)
                {
                    e.Extract(sandBoxPath, ExtractExistingFileAction.OverwriteSilently);
                }
            }
        }
    }
}
