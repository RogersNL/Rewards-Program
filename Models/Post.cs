using System;

namespace Rewards.Models
{
  public class Post
  {
    public string Name { get; set; }
    public string DateOpened { get; set; }
    public string DateClosed { get; set; }
    public int PointValue { get; set; }
    public string Description { get; set; }
    public int Id { get; set; }
  }
}
