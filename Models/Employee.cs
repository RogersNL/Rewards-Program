using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rewards.Models
{
    public class Employee
    {
        public long EmployeeId { get; set; }
        public int CurrentPoints { get; set; }
        public int LifetimePoints { get; set; }
        public string GraphId { get; set; }
        public int LocationId { get; set; }

    }
}
