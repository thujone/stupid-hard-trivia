const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/Seinfeld', { useNewUrlParser: true })
mongoose.set('debug', true)

process.on('unhandledRejection', (reason, p) => { throw reason });

const QuizResultSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  avatar: { type: String, required: true }
})

const QuizResultModel = mongoose.model('QuizResult', QuizResultSchema)

router.get('/quiz-results', async (request, response, next) => {
  try {
    const quizResult = await QuizResultModel.find().exec()
    response.send(quizResult)
  } catch (error) {
    response.status(500).send(error)
  }
})

router.get('/quiz-results/:id', async (request, response, next) => {
  try {
    const quizResult = await QuizResultModel.findById(request.params.id).exec();
    response.send(quizResult);
  } catch (error) {
    response.status(500).send(error)
  }
})

router.post('/quiz-results', async (request, response, next) => {
  console.log('next', next, 'request.body', request.body);
  try {
    const quizResult = new QuizResultModel({
      name: request.body.name,
      level: request.body.level,
      avatar: request.body.avatar
    })
    console.log('request.body', request.body, 'quizResult', quizResult)
    const result = await quizResult.save()
    response.send(result)
  } catch (error) {
    response.status(500).send(error)
  }
})

module.exports = router;