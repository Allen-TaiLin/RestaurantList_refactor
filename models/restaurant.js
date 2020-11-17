//載入套件
const mongoose = require('mongoose')
//使用mongoose.Schema
const Schema = mongoose.Schema
//建立Schema規則
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: String,
  category: {
    type: String,
    required: true
  },
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
  region: {
    type: String,
    required: true
  }

})

//匯出模型樣板
module.exports = mongoose.model('RestaurantData', restaurantSchema)