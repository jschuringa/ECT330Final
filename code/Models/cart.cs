using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace code.Models
{
    public class cart
    {
        public cart()
        {

        }

        public int customerID { get; set; }
        public int itemID { get; set; }
        public int itemQTY { get; set; }

        public virtual customer customers { get; set; }
        public virtual item items { get; set; }
    }
}