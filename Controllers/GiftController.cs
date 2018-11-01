using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rewards.Models;

namespace Rewards.Solutions.Controllers
{
    [Route("api/[controller]")]
    public class GiftController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Gift> Gifts()
        {
            List<string> nameList = new List<string>{"Prize A", "Prize B", "Prize C"};
            List<int> pointList = new List<int>{1500, 1000, 100};
            List<string> descriptionList = new List<string>{"Home System", "New Monitor", "Free Lunch"};
            return Enumerable.Range(0, 3).Select(index => new Gift
            {
              Name = nameList[index],
              PointValue = pointList[index],
              Description = descriptionList[index],
              Id = index
              });
        }
    }
}
