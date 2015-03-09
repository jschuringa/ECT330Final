using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace code.Models
{
    public class address
    {
        public address()
        {
            this.orders = new HashSet<order>();
        }

        public int customerID { get; set; }
        public int custAddressID { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zipcode { get; set; }
        public string country { get; set; }

        public virtual customer customers { get; set; }

        public virtual ICollection<order> orders { get; set; }
    }
}