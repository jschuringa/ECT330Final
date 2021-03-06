﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace code.Models
{
    public class address
    {
        public address()
        {

        }
        public int customerID { get; set; }
        [Key]
        public int custAddressID { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zipcode { get; set; }
        public string country { get; set; }

        public virtual customer customers { get; set; }

    }
}