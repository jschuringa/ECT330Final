using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace code.Models
{
    public partial class DBcontext : DbContext
    {
        public DBcontext() : base("name=smznDB")
        {

        }

        public virtual DbSet<address> addresses { get; set; }
        public virtual DbSet<item> items { get; set; }
        public virtual DbSet<cart> carts { get; set; }
        public virtual DbSet<customer> customers { get; set; }
        public virtual DbSet<order> orders { get; set; }
        public virtual DbSet<paymentOption> paymentOptions { get; set; }
        public virtual DbSet<review> reviews { get; set; }
        
    }
}