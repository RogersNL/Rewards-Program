using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rewards.Models;

namespace Rewards.Solutions.Controllers
{
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Transaction> Transactions()
        {
            var rng = new Random();
            List<string> nameList = new List<string>{"Interview", "Claim Gift", "Volunteer"};
            List<DateTime> dateList = new List<DateTime>{new DateTime(2018, 10, 29), new DateTime(2018, 11, 3), new DateTime(2018, 11, 16)};
            List<int> pointList = new List<int>{100, -20, 50};
            return Enumerable.Range(0, 40).Select(index => new Transaction
            {
              Name = nameList[rng.Next(0,3)],
              Date = dateList[rng.Next(0,3)].ToString("d"),
              Points = pointList[rng.Next(0,3)],
              UserId = 1 + rng.Next(0,3),
              Id = index
              });
        }
    }
}
