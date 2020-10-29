require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./routes')
const errorHandle = require("./middlewares/errorHandle.js");
const app = express()
const port = 4000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/', routes)
app.use(errorHandle)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

