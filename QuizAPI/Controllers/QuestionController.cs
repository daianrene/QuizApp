using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.DataAccess;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {

        private readonly DbDataContext _context;

        public QuestionController(DbDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Question>>> GetQuestions()
        {
            var random5Qns = await _context.Questions
                .Select(x => new
                {
                    QnId = x.Id,
                    QnInWords = x.QnInWords,
                    ImageName = x.ImageName,
                    Options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
                })
                .OrderBy(y => Guid.NewGuid())
                .Take(5)
                .ToListAsync();

            return Ok(random5Qns);
        }

        [HttpPost("GetAnswers")]
        public async Task<ActionResult<List<Question>>> RetrieveAnswer(int[] qnsIds)
        {
            var answers = await _context.Questions
                .Where(x => qnsIds.Contains(x.Id))
                .Select(y => new
                {
                    QnId = y.Id,
                    QnInWords = y.QnInWords,
                    ImageName = y.ImageName,
                    Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 },
                    Answer = y.Answer
                }).ToListAsync();

            return Ok(answers);
        }
    }
}
