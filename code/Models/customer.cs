using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace code.Models
{
    public class customer
    {
        public customer()
        {
            this.orders = new HashSet<order>();
            this.paymentOptions = new HashSet<paymentOption>();
            this.addresses = new HashSet<address>();
        }
        [Key]
        public int customerID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public bool admin { get; set; }

        public virtual ICollection<cart> carts { get; set; }
        public virtual ICollection<order> orders { get; set; }
        public virtual ICollection<paymentOption> paymentOptions { get; set; }
        public virtual ICollection<address> addresses { get; set; }

    }
}