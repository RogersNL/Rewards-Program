using Microsoft.EntityFrameworkCore;

namespace Rewards.Models
{
    public class RewardContext : DbContext
    {
        public RewardContext(DbContextOptions<RewardContext> options)
            : base(options)
        {
        }

        public DbSet<Reward> Rewards { get; set; }
    }
}
