using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Duxa.DAL.Repo;
using Duxa.DAL.Repo.Dto;

namespace Duxa.BL
{
    public interface IClientService
    {
        FOPS GetFOP(string name);
    }
}
