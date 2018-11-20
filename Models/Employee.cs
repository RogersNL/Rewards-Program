using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rewards.Models
{
    public class Employee
    {
        public long EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int CurrentPoints { get; set; }
        public int LifetimePoints { get; set; }
        public Location Location { get; set; }

    }
}
