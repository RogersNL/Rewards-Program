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
          List<string> nameList = new List<string>{"Nick Nonadmin", "John Admin", "Oliver Schmidt", "Casey Diaz", "Katie Pham", "Avery Ramos", "Liam Armstrong", "Derek Stanley", "Eddie Miranda", "Lawrence Edwards", "Bryanna Robertson", "Amelia Aguilar", "Clara Fox", "Alyssa Ford", "Skylar Thompson", "Frederick Yang", "William Newman", "Alyson Reeves", "Melody Stevens", "Marina Mclaughlin", "Bridget Lindsey", "Javon Wolfe", "Cassidy Acosta", "Holly Fowler", "Kameron Smith", "Brianna Chandler", "Angelica Lawrence", "Regina Reid", "Jesus Medina", "Melinda Blake", "Leslie Harper", "Javon Becker", "Andres Lewis", "Larry Barton", "William Allen", "Anthony Duncan", "Grayson Hampton", "Jon Rodgers", "Marisol Richards", "Kyla Jones", "Shawn Matthews", "Raquel Parks", "Dale Wood", "Jarrod Pierce", "Tucker Meyer", "Davis Gill", "Shaun Rojas", "Claudia Brooks", "Cooper Mendez", "Camille Byrd", "Karina Navarro", "Amelia Burke", "Amelia Fowler", "Marie Woods", "Ernesto Cobb", "Javon Ramirez", "Cara Garrett", "Dominique King", "Glenn Lewis", "Maya Thompson", "Isabelle Dawson", "Devin Lucas", "Alisha Juarez", "Christian Acosta", "Eva Bowman", "Stefanie Andrews", "Zackary Rodgers", "Wendy Park", "Marc Ball", "Sandra Robertson", "Maria Diaz", "Leticia Gibbs", "Sophie Hughes", "Richard Wade", "Abbey Baldwin", "Stanley Wade", "Moises Rice", "Ramon Ramirez", "Trenton Pierce", "Kevin Osborne", "Jared Fowler", "Meagan Russell", "Destinee Baker", "Jimmy Owens", "Emilee Leon", "Emmanuel Henry", "Anita Little", "Joey Pope", "Jenna Bell", "Sidney Torres", "Fernando Burton", "Grant Doyle", "Chelsea Farmer", "Miles Taylor", "Kailey Bowers", "Jonathan Holt", "Jonathan Marshall", "Wilson Pratt", "Tommy Scott", "Rebekah Lucas", "Sonia Dominguez", "Santiago Davis"};
          List<string> locationList = new List<string>{"Bothell", "Virginia", "Los Angeles", "Atlanta", "Houston", "Chennai", "Pune", "Trichy", "Malaysia", "U.A.E"};
          List<int> lifetimePointList = new List<int>{1000, 3940, 2400, 2400, 300, 1200, 1750, 1700};
          List<int> currentPointList = new List<int>{500, 1500, 425, 100, 1000, 900, 900, 1100};
          List<bool> adminList = new List<bool>{true, true};
          var rng = new Random();

          return Enumerable.Range(0, 87).Select(index => new User
          {

            // Name = "Test Name " + index.ToString(),
            // Location = "Test Location " + index.ToString(),
            // CurrentPoints = 100,
            // LifetimePoints = rng.Next(0, 10000),
            // Id = index
            Name = nameList[index],
            Location = locationList[rng.Next(0,10)],
            CurrentPoints = rng.Next(0,10000),
            LifetimePoints = rng.Next(0,10000),
            IsAdmin = true,
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
