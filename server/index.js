const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
const jsonRouter = jsonServer.router('public/static/data/seinfeld.json')
const middlewares = jsonServer.defaults()
const next = require('next')
const bodyParser = require('body-parser')
const PORT = 3000



// THIS IS THE BIG SETTING
process.env.NODE_ENV = 'development';





process.env.HOST = process.env.NODE_ENV === 'production' ? 'seinfeldtrivia.com' : 'localhost';

const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const HOST = process.env.HOST;

// Load the correct config based on NODE_ENV
let config;
if (process.env.NODE_ENV === 'production') {
  config = {
    REACT_APP_HTTPS_PORT: '443',
    REACT_APP_HTTP_PORT: '3000',
    REACT_APP_JSON_PORT: '3010',
    REACT_APP_API_URL: 'https://seinfeldtrivia.com/api',
    REACT_APP_JSON_SERVER_URL: 'https://seinfeldtrivia.com:3010'
  }

} else {
  config = {
    REACT_APP_HTTPS_PORT: '443',
    REACT_APP_HTTP_PORT: '3000',
    REACT_APP_JSON_PORT: '3010',
    REACT_APP_API_URL: 'http://localhost:3000/api',
    REACT_APP_JSON_SERVER_URL: 'http://localhost:3010'
  }
}

process.env = {
  ...process.env,
  REACT_APP_HTTPS_PORT: config.REACT_APP_HTTPS_PORT,
  REACT_APP_HTTP_PORT: config.REACT_APP_HTTP_PORT,
  REACT_APP_JSON_PORT: config.REACT_APP_JSON_PORT,
  REACT_APP_API_URL: config.REACT_APP_API_URL,
  REACT_APP_JSON_SERVER_URL: config.REACT_APP_JSON_SERVER_URL
}






const app = express()

console.log('**********************');
console.log('process.env', process.env);

server.use(middlewares)
server.use(jsonRouter)

let httpsOptions
if (process.env.NODE_ENV === 'production') {
  httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/seinfeldtrivia.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/seinfeldtrivia.com/fullchain.pem')
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
