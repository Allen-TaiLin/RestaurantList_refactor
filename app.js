// require packages used in the projects
const express = require('express')
const app = express()
//const mongoose = require('mongoose')
const db = require('./config/mongoose')
const port = 3000

//設定連線字串
//mongoose.connect('mongodb://localhost/restaurant-list-refactor', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
//const db = mongoose.connection
// 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })


app.get('/', (req, res) => {
  res.send('restaurant')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})