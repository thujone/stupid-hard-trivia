const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
const jsonRouter = jsonServer.router('static/data/seinfeld.json')
const middlewares = jsonServer.defaults()
const next = require('next')
const bodyParser = require('body-parser')
const PORT = 80 || 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const HOST = process.env.HOST;

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/seinfeldtrivia.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/seinfeldtrivia.net/fullchain.pem')
}

server.use(middlewares)
server.use(jsonRouter)

https.createServer(httpsOptions, server).listen(3010, function() {
  console.log('json-server started on port 3010')
})

mongoose.connect('mongodb://127.0.0.1:27017/Seinfeld', { useNewUrlParser: true, useUnifiedTopology: true })
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

  app.listen(PORT, HOST, err => {
    if (err) throw err;
    console.log(`ready at ${PORT}`)
  })

  https.createServer(httpsOptions, app).listen(443)

  app.get('*', (req, res) => {
    return handle(req, res) 
  })

  app.use(function(request, response) {
    if (!request.secure) {
      response.redirect('https://' + request.headers.host + request.url);
    }
  })


})
