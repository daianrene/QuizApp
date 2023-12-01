using System.ComponentModel.DataAnnotations;

namespace QuizAPI.Models
{
    public class Participant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
}
