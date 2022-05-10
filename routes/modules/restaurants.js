// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const RestaurantData = require('../../models/restaurant')
// 引用 fs 模組，才能處理檔案 (node.js 內建的 fs (file system) 模組)
const fs = require('fs')
const restaurant = require('../../models/restaurant')

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

//// 定義路由
// 新增頁面
router.get('/new', (req, res) => {
  // 讀取new檔案、渲染畫面
  return res.render('new')
})


// 確定新增
router.post('/new', (req, res) => {
  const userId = req.user._id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  options.userId = userId

  // 建立實例模型
  // 使用 Object.assign 物件淺拷貝
  const restaurantAddNew = new RestaurantData(options)
  const { file } = req // const file = req.file

  // 將圖片檔案上傳到第三方留網址，(三)
  // 如果上傳檔案存在
  if (file) {
    // 設定 Client ID
    imgur.setClientID(IMGUR_CLIENT_ID)
    // 將圖片上傳到第三方網址
    imgur.upload(file.path, (err, img) => {
      if (err) console.log('Error:' + err)
      // 將檔案網址寫入進資料庫
      restaurantAddNew.image = file ? img.data.link : options.image
      // 寫入資料庫
      return restaurantAddNew.save()
        .then((result) => {
          req.flash('success_msg', 'restaurant was successfully created')
          return res.redirect('/')  // 導向router
        })
        .catch((error) => console.log(error)) // 例外處理
    })
  } else {
    return restaurantAddNew.save()  // 寫入資料庫
      .then((result) => {
        req.flash('success_msg', 'restaurant was successfully created')
        return res.redirect('/')
      })
      .catch((error) => console.log(error))  // 例外處理
  }

  //具有上傳檔案內容，(二)
  // // 如果上傳檔案存在
  // if (file) {
  //   // 從 file.path 讀取檔案(temp)
  //   fs.readFile(file.path, (err, data) => {
  //     if (err) console.log('Error:' + err)
  //     // 將檔案 (data) 寫入到 upload/ 資料夾
  //     fs.writeFile(`upload/${file.originalname}`, data, () => {
  //       // 將檔案路徑寫入進資料庫
  //       restaurantAddNew.image = file ? `/upload/${file.originalname}` : options.image
  //       // 寫入資料庫
  //       return restaurantAddNew.save()
  //         .then((result) => {
  //           req.flash('success_msg', 'restaurant was successfully created')
  //           return res.redirect('/')  // 導向router
  //         })
  //         .catch((error) => console.log(error))  // 例外處理
  //     })
  //   })
  // } else {
  //   return restaurantAddNew.save()  // 寫入資料庫
  //     .then((result) => {
  //       req.flash('success_msg', 'restaurant was successfully created')
  //       return res.redirect('/')
  //     })
  //     .catch((error) => console.log(error))  // 例外處理
  // }

  //簡單上傳字串內容，(一)
  //建立實例模型
  //// const restaurantAddNew = new RestaurantData(options)
  // const restaurantAddNew = new RestaurantData({
  //   name: options.name,
  //   category: options.category,
  //   image: options.image,
  //   location: options.location,
  //   phone: options.phone,
  //   google_map: options.google_map,
  //   rating: options.rating,
  //   description: options.description,
  //   region: options.region
  // })

  //將實例存入資料庫
  //// return restaurantAddNew.save()
  ////   .then(() => res.redirect('/'))  //導向router
  ////   .catch((error) => console.log(error))  //例外處理
})


// 讀取特定資料
router.get('/:id/detail', (req, res) => {
  const userId = req.user._id
  // 取得restaurant_id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })  // 從資料庫找出相關資料
    .lean()  // 把資料轉成javascript物件
    .then((restaurant) => res.render('detail', { restaurant }))  // 發送至前端樣板
    .catch((error) => console.log(error))  // 例外處理
})


// 修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  // 取得restaurant_id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })  // 從資料庫找出相關資料
    .lean()  // 把資料轉成javascript物件
    .then((restaurant) => res.render('edit', { restaurant }))  // 發送至前端樣板
    .catch((error) => console.log(error))  // 例外處理
})


// 確定修改
router.put('/:id', (req, res) => {
  const userId = req.user._id
  // 取得restaurant_id
  const _id = req.params.id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  options.userId = userId

  const { file } = req  // const file = req.file

  // 如果上傳檔案存在
  if (file) {
    // 設定 Client ID
    imgur.setClientID(IMGUR_CLIENT_ID)
    // 將圖片上傳到第三方網址
    imgur.upload(file.path, (err, img) => {
      if (err) console.log('Error:', err)
      return RestaurantData.findOne({ _id, userId })  // 從資料庫找出相關資料
        .then((restaurant) => {
          // 記錄舊資料
          const oldImage = restaurant.image
          // 使用 Object.assign 物件淺拷貝
          restaurant = Object.assign(restaurant, options)
          restaurant.image = file ? img.data.link : oldImage
          // 對應資料，寫入資料庫
          return restaurant.save()
        }).then((result) => {
          req.flash('success_msg', 'restaurant was successfully to update')
          return res.redirect(`/restaurants/${_id}/detail`) // 導向router
        })
        .catch((err) => console.log(error)) // 例外處理
    })
    // // 從 file.path 讀取檔案(temp)
    // fs.readFile(file.path, (err, data) => {
    //   if (err) console.log('Error:', err)
    //   // 將檔案 (data) 寫入到 upload/ 資料夾
    //   fs.writeFile(`upload/${file.originalname}`, data, () => {
    //     return RestaurantData.findOne({ _id, userId })  // 從資料庫找出相關資料
    //       .then((restaurant) => {
    //         // 記錄舊資料
    //         const oldImage = restaurant.image
    //         // 使用 Object.assign 物件淺拷貝
    //         restaurant = Object.assign(restaurant, options)
    //         restaurant.image = file ? `/upload/${file.originalname}` : oldImage
    //         // 對應資料，寫入資料庫
    //         return restaurant.save()
    //       })
    //       .then((result) => {
    //         req.flash('success_msg', 'restaurant was successfully to update')
    //         return res.redirect(`/restaurants/${_id}/detail`)  // 導向router
    //       })
    //       .catch((error) => console.log(error))  // 例外處理
    //   })
    // })
  } else {
    return RestaurantData.findOne({ _id, userId })
      .then((restaurant) => {
        // 使用 Object.assign 物件淺拷貝
        restaurant = Object.assign(restaurant, options)
        // 對應資料，寫入資料庫
        return restaurant.save()
      })
      .then((result) => {
        req.flash('success_msg', 'restaurant was successfully to update')
        return res.redirect(`/restaurants/${_id}/detail`)  // 導向router
      })
      .catch((error) => console.log(error))  // 例外處理
  }

  // return RestaurantData.findOne({ _id, userId })  //從資料庫找出相關資料
  //   .then((restaurant) => {
  //     //對應資料，寫入資料庫
  //     restaurant = Object.assign(restaurant, options)
  //     return restaurant.save()
  //   })
  //   .then(() => res.redirect(`/restaurants/${id}/detail`))  //導向router
  //   .catch((error) => console.log(error))  //例外處理
})


// 確定刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  // 取得restaurant_id
  const _id = req.params.id
  RestaurantData.findOne({ _id, userId }) // 從資料庫找出相關資料
    .then((restaurant) => restaurant.remove())  // 刪除資料
    .then(() => res.redirect('/'))  // 導向首頁
    .catch((error) => console.log(error))  // 例外處理
})

// 匯出路由模組
module.exports = router