namespace Rewards.Models
{
  public class User
  {
    public string Name { get; set; }
    public string Location { get; set; }
    public int CurrentPoints { get; set; }
    public int LifetimePoints { get; set; }
    public bool isAdmin { get; set; }
    public int Id { get; set; }
  }
}
