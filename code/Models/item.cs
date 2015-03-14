using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace code.Models
{
    public class item
    {
        public item()
        {
            this.orders = new HashSet<order>();
            this.reviews = new HashSet<review>();
        }
        [Key]
        public int itemID { get; set; }
        public string itemName { get; set; }
        public double itemPrice { get; set; }
        public string imgPath { get; set; }
        public string itemDescription { get; set; }

        public virtual ICollection<order> orders { get; set; }
        public virtual ICollection<review> reviews { get; set; }
    }
}