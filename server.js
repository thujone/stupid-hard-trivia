const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // server.get('/question', (req, res) => {
    //   const actualPage = '/question'
    //   const queryParams = { qid: req.params.qid }
    //   app.render(req, res, actualPage, queryParams) 
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(80, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:80')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
