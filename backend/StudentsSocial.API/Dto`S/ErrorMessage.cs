using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto_S
{
    public class ErrorMessage
    {
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public ErrorMessage(string message, string type)
        {
            
        }
    }
}