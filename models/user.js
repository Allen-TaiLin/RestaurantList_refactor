// 載入套件
const mongoose = require('mongoose')
// 使用mongoose.Schema
const Schema = mongoose.Schema

// 建立Schema規則
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

// 匯出模型樣板
module.exports = mongoose.model('User', userSchema)