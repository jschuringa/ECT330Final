using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace code.Models
{
    public class item
    {
        public item()
        {
            this.carts = new HashSet<cart>();
            this.orders = new HashSet<order>();
            this.reviews = new HashSet<review>();
        }

        public int itemID { get; set; }
        public string itemName { get; set; }
        public float itemPrice { get; set; }
        public string imgPath { get; set; }
        public string itemDescription { get; set; }

        public virtual ICollection<cart> carts { get; set; }
        public virtual ICollection<order> orders { get; set; }
        public virtual ICollection<review> reviews { get; set; }
    }
}