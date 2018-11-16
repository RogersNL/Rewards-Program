using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rewards.Models;

namespace Rewards.Solutions.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
      [HttpGet("[action]")]
      public IEnumerable<User> Users()
      {
          List<string> nameList = new List<string>{"Nick Nonadmin", "John Admin", "Random guy haha"};
          List<string> locationList = new List<string>{"Bothell", "Virginia", "Bothell"};
          List<int> lifetimePointList = new List<int>{1000, 3940, 2400, 2400, 300, 1200, 1750, 1700};
          List<int> currentPointList = new List<int>{500, 1500, 425, 100, 1000, 900, 900, 1100};
          List<bool> adminList = new List<bool>{false, true, true};
          var rng = new Random();

          return Enumerable.Range(0, 3).Select(index => new User
          {

            // Name = "Test Name " + index.ToString(),
            // Location = "Test Location " + index.ToString(),
            // CurrentPoints = 100,
            // LifetimePoints = rng.Next(0, 10000),
            // Id = index
            Name = nameList[index],
            Location = locationList[index],
            CurrentPoints = currentPointList[index],
            LifetimePoints = lifetimePointList[index],
            IsAdmin = adminList[index],
            Id = index
            });
      }
        // private static string[] Summaries = new[]
        // {
        //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        // };
        //
        // [HttpGet("[action]")]
        // public IEnumerable<WeatherForecast> WeatherForecasty(int startDateIndex)
        // {
        //     var rng = new Random();
        //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //     {
        //         DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
        //         TemperatureC = rng.Next(-20, 55),
        //         Summary = Summaries[rng.Next(Summaries.Length)]
        //     });
        // }

    }
}
