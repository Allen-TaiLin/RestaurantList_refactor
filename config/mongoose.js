// 載入 mongoose
const mongoose = require('mongoose')
//連線字串
mongoose.connect('mongodb://localhost/restaurant-list-refactor', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db