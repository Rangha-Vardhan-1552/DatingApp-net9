﻿using System.ComponentModel.DataAnnotations;

namespace WebApp.Entities
{
    public class AppUser
    {
        [Key]
        public int Id { get; set; }
        public required string UserName { get; set; }
    }
}