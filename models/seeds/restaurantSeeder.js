//載入套件
const db = require('../../config/mongoose')
// 載入 restaurant model
const RestaurantData = require('../restaurant')

//範本資料
const restaurantList = require('../../restaurant.json').results

//新增種子資料
db.once('open', () => {
  for (let i = 0; i < restaurantList.length; i++) {
    RestaurantData.create({
      name: restaurantList[i].name,
      name_en: restaurantList[i].name_en,
      category: restaurantList[i].category,
      image: restaurantList[i].image,
      location: restaurantList[i].location,
      phone: restaurantList[i].phone,
      google_map: restaurantList[i].google_map,
      rating: restaurantList[i].rating,
      description: restaurantList[i].description,
      region: restaurantList[i].region
    })
  }

  console.log('Data insert done')
})