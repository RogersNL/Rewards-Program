using System;
using System.Collections.Generic;

namespace Rewards.Models
{
    public class Reward
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int Cost { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Location Location { get; set; }

    }
}
