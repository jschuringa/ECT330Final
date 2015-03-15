using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace code.Models
{
    public class order
    {
        public order()
        {

        }

        public int customerID { get; set; }
        public int itemID { get; set; }
        [Key]
        public int orderID { get; set; }
        public DateTime orderDate { get; set; }
        public int custAddressID { get; set; }
        public int custPayOptID { get; set; }
        public int itemQTY { get; set; }

        public virtual customer customers { get; set; }
        public virtual item items { get; set; }
        public virtual address addresses { get; set; }

    }
}