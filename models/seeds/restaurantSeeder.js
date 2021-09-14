// 載入套件
const bcrypt = require('bcryptjs')
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
// 載入 restaurant model
const RestaurantData = require('../restaurant')
// 載入 User model
const User = require('../user')

const SEED_USERS = [
  {
    name: 'Tom',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'Jerry',
    email: 'user2@example.com',
    password: '12345678'
  }
]


//範本資料
const restaurantList = require('../../restaurant.json').results

//新增種子資料
db.once('open', () => {
  return Promise.all(SEED_USERS.map((item) => {
    //查詢種子資料是否已在資料庫
    User.find({ email: item.email })
      .then((haveUser) => {
        //const userArray = [...haveUser] //find的回傳結果已經是Array
        console.log(haveUser)
        console.log('***')
        //已存在就刪除舊的種子資料
        haveUser.forEach((oldItem) => {
          Promise.all([RestaurantData.deleteMany({ userId: oldItem._id }), User.deleteOne({ _id: oldItem._id })])
          console.log(`已清除：編號 ${oldItem._id} 使用者的相關資料`)
        })
      })
      .then(
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(item.password, salt))
          .then((hash) => User.create({ //寫入使用者的種子資料
            name: item.name,
            email: item.email,
            password: hash
          }))
          .then((user) => {
            console.log('開始準備匯入餐廳的種子資料')
            if (user.name === 'Tom') {
              return Promise.all(Array.from({ length: 9 }, (item, index) => {
                console.log('user1-', user)
                return RestaurantData.create({ ...restaurantList[index], userId: user._id })
              }))
            } else {
              return Promise.all(Array.from({ length: 9 }, (item, index) => {
                console.log('user2-', user)
                return RestaurantData.create({ ...restaurantList[index + 9], userId: user._id })
              }))
            }
          })
          .then(() => {
            console.log('Data insert done.')
            process.exit()
          })
          .catch((error) => console.log(error))
      )
      .catch((error) => console.log(error))


  }))
})

////方法二
// db.once('open', () => {
//   return SEED_USERS.map((item) => {
//     bcrypt
//       .genSalt(10)
//       .then((salt) => bcrypt.hash(item.password, salt))
//       .then((hash) => User.create({
//         name: item.name,
//         email: item.email,
//         password: hash
//       }))
//       .then((user) => {
//         if (user.name === 'Tom') {
//           return Promise.all(Array.from({ length: 3 }, (item, index) => {
//             return RestaurantData.create({ ...restaurantList[index], userId: user._id })

//           }))
//         } else {
//           return Promise.all(Array.from({ length: 3 }, (item, index) => {
//             return RestaurantData.create({ ...restaurantList[index + 3], userId: user._id })
//           }))
//         }
//       })
//       .then(() => {
//         console.log('Data insert done.')
//         process.exit()
//       })
//       .catch((error) => console.log(error))
//   })
// })


////舊資料參考
// db.once('open', () => {
//   for (let i = 0; i < restaurantList.length; i++) {
//     RestaurantData.create({
//       name: restaurantList[i].name,
//       name_en: restaurantList[i].name_en,
//       category: restaurantList[i].category,
//       image: restaurantList[i].image,
//       location: restaurantList[i].location,
//       phone: restaurantList[i].phone,
//       google_map: restaurantList[i].google_map,
//       rating: restaurantList[i].rating,
//       description: restaurantList[i].description,
//       region: restaurantList[i].region
//     })
//   }

//   console.log('Data insert done')
// })