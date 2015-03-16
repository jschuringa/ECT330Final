using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace code.Controllers {
    public class paymentController : ApiController {
        // GET api/<controller>
        public IEnumerable<string> Get() {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id) {
            return "value";
        }

        // POST api/<controller>
        public string Post([FromBody]string value) {
            //Assign the values for the properties we need to pass to the service
            String AppId = ConfigurationManager.AppSettings["CreditAppId"];
            String SharedKey = ConfigurationManager.AppSettings["CreditAppSharedKey"];
            String AppTransId = "20";
            String AppTransAmount = "12.50";

            // Hash the values so the server can verify the values are original
            

            String hash =
            HttpUtility.UrlEncode(CreditAuthorizationClient.GenerateClientRequestHash(SharedKey,
            AppId, AppTransId, AppTransAmount));

            return hash;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value) {
        }

        // DELETE api/<controller>/5
        public void Delete(int id) {
        }
    }
}