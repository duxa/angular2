using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Duxa.Infrastructure
{
    public interface ISandBox
    {
        string GetNewTempFileName();
        string GetNewTempFolderName();
    }
}
