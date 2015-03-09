using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace code.Models
{
    public class review
    {
        public review()
        {

        }

        public int itemID { get; set; }
        [Key]
        public int reviewID { get; set; }
        public string reviewText { get; set; }
        public float rating { get; set; }

        public virtual item items { get; set; }
    }
}