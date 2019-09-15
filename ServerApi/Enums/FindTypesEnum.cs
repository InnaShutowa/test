using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerApi.Enums {
    public enum FindTypesEnum : int{
        ByName = 1,
        ByAccountFor = 2,
        ByAccountTo = 3
    }
}