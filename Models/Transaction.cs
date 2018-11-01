using System;

namespace Rewards.Models
{
  public class Transaction
  {
    public string Name { get; set; }
    public string Date { get; set; }
    public int Points { get; set; }
    public string Type { get; set; }
    public int UserId { get; set; }
    public int Id { get; set; }
  }
}
