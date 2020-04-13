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
const PORT = 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const HOST = process.env.HOST;
const config = require('dotenv').config().parsed
const app = express()

console.log(config)

server.use(middlewares)
server.use(jsonRouter)

let httpsOptions
if (config.NODE_ENV === 'production') {
  httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/seinfeldtrivia.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/seinfeldtrivia.net/fullchain.pem')
  }
  
  https.createServer(httpsOptions, server).listen(config.REACT_APP_JSON_PORT, function() {
    console.log(`json-server started on port ${config.REACT_APP_JSON_SERVER_URL}`)
  })

  https.createServer(httpsOptions, app).listen(config.REACT_APP_HTTPS_PORT, function() {
    console.log(`https started on port ${config.REACT_APP_HTTPS_PORT}`)
  })
}

mongoose.connect('mongodb://127.0.0.1:27017/Seinfeld', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('debug', true)

const AnswerSchema = new Schema({
  qid: { type: Number, required: true, max: 999 },
  q: { type: Number, required: true, max: 999 },
  isCorrect: { type: Boolean, required: true },
  response: { type: String, required: false, maxLength: 512 }
})

const QuizResultSchema = new Schema({
  name: { type: String, required: true, maxLength: 64 },
  level: { type: String, required: true, maxLength: 64 },
  avatar: { type: String, required: true, maxLength: 64 },
  score: {type: Number, required: true, max: 9999 },
  correctAnswers: {type: Number, required: true, max: 999 },
  incorrectAnswers: {type: Number, required: true, max: 999 },
  wasCompleted: {type: Boolean, required: true},
  createdAt: {type: Date},
  answers: [AnswerSchema]
})

const QuizResultModel = mongoose.model('quizresult', QuizResultSchema)

nextApp.prepare().then(() => {
  const httpServer = http.createServer(app)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/leaderboard', (request, response, next) => {
    QuizResultModel.find({}).select('name avatar level createdAt correctAnswers score').sort('-score').limit(250).exec(function (err, quizResults) {
      if (err) {
        console.error(err)
        return response.status(500).send(err)
      }
      //console.log(quizResults);
      response.send(quizResults)
    })
  })

  app.get('/api/leaderboard/:level', (request, response, next) => {
    QuizResultModel.find({ level: request.params.level }).select('name avatar level createdAt correctAnswers score').sort('-score').limit(250).exec(function (err, quizResults) {
      if (err) {
        console.error(err)
        return response.status(500).send(err)
      }
      //console.log(quizResults);
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

  /*app.listen(PORT, HOST, err => {
    if (err) throw err;
    console.log(`ready at ${config.REACT_APP_HTTP_PORT}`)
  })
  */
  httpServer.listen(`${config.REACT_APP_HTTP_PORT}`)

  app.get('*', (req, res) => {
    return handle(req, res) 
  })
})
