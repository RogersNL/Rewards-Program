namespace Rewards.Models
{
  public class WeatherForecast
  {
      // private string _DateFormatted;
      // private int _TemperatureC;
      // private string _Summary;
      // private int _TemperatureF;
      //
      // public WeatherForecast(string DateFormatted, int TemperatureC, string Summary){
      //   _DateFormatted = DateFormatted;
      //   _TemperatureC = TemperatureC;
      //   _Summary = Summary;
      //   _TemperatureF = 32 + (int)(TemperatureC / 0.5556);
      // }

      public string DateFormatted { get; set; }
      public int TemperatureC { get; set; }
      public string Summary { get; set; }

      public int TemperatureF
      {
          get
          {
              return 32 + (int)(TemperatureC / 0.5556);
          }
      }
  }
}
