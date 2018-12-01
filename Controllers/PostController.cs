using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rewards.Models;

namespace Rewards.Solutions.Controllers
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Post> Posts()
        {
            List<string> nameList = new List<string>{"Event 1", "Event 2", "Event 3", "Event 4", "Event 5"};
            List<DateTime> dateList = new List<DateTime>{new DateTime(2019, 11, 29), new DateTime(2019, 11, 3), new DateTime(2018, 11, 16), new DateTime(2018, 11, 16), new DateTime(2018, 10, 16)};
            List<int> pointList = new List<int>{30, 20, 100, 100, 100};
            List<string> descriptionList = new List<string>{"Help for event 1", "Join event 2", "Sign up for event 3", "Event details", "Event help"};
            List<string> locationList = new List<string>{"Bothell", "Bothell", "Virginia", "Chennai", "Los Angeles"};
            return Enumerable.Range(0, 5).Select(index => new Post
            {
              Name = nameList[index],
              DateClosed = dateList[index].ToString("d"),
              PointValue = pointList[index],
              Description = descriptionList[index],
              // Location = locationList[index],
              Id = index
              });
        }
    }
}
