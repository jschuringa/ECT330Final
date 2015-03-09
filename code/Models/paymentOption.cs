using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace code.Models
{
    public class paymentOption
    {
        public paymentOption()
        {
            this.orders = new HashSet<order>();
        }

        public int customerID { get; set; }
        [Key]
        public int custPayOptID { get; set; }
        public int cardNumber { get; set; }
        public string expDate { get; set; }
        public int secCode { get; set; }

        public virtual ICollection<order> orders { get; set; }

        public virtual customer customers { get; set; }
    }
}