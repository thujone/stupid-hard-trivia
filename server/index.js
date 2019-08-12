const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/Seinfeld', { useNewUrlParser: true })
mongoose.set('debug', true)

//process.on('unhandledRejection', (reason, p) => { throw reason });

const AnswerSchema = new Schema({
  qid: { type: Number, required: true },
  q: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  response: { type: String, required: false }
})

const QuizResultSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  avatar: { type: String, required: true },
  score: {type: Number, required: true },
  correctAnswers: {type: Number, required: true },
  incorrectAnswers: {type: Number, required: true },
  wasCompleted: {type: Boolean, required: true},
  createdAt: {type: Date},
  answers: [AnswerSchema]
})

const QuizResultModel = mongoose.model('quizresult', QuizResultSchema)

nextApp.prepare().then(() => {
  const app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/leaderboard', (request, response, next) => {
    QuizResultModel.find({}).select('name avatar level createdAt correctAnswers score').sort('-score').limit(100).exec(function (err, quizResults) {
      if (err) {
        console.error(err)
        return response.status(500).send(err)
      }
      console.log(quizResults);
      response.send(quizResults)
    })
  })

  app.post('/api/quiz-results', async (request, response, next) => {
    try {
      const quizResult = new QuizResultModel({
        name: request.body.name,
        level: request.body.level,
        avatar: request.body.avatar,
        score: request.body.score,
        correctAnswers: request.body.correctAnswers,
        incorrectAnswers: request.body.incorrectAnswers,
        wasCompleted: request.body.wasCompleted,
        createdAt: new Date
      })
      for (let answer of request.body.answers) {
        quizResult.answers.push(answer)
      }
      const result = await quizResult.save()
      response.send(result)
    } catch (error) {
      response.status(500).send(error)
    }
  })

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`)
  })

  app.get('*', (req, res) => {
  return handle(req, res) 
  })

})