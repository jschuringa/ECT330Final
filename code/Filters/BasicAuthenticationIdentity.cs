﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;

namespace code.Filters {
    public class BasicAuthenticationIdentity : GenericIdentity {
        public BasicAuthenticationIdentity(string name, string password)
            : base(name, "Basic") {
            this.Password = password;
        }

        /// <summary>
        /// Basic Auth Password for custom authentication
        /// </summary>
        public string Password { get; set; }
    }
}
