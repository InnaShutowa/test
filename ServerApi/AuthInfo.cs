//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServerApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class AuthInfo
    {
        public int UserId { get; set; }
        public string PasswordMd5 { get; set; }
    
        public virtual UserProfile UserProfile { get; set; }
    }
}
