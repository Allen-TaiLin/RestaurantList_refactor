// require packages used in the projects
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const app = express()
const session = require('express-session')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

// 設定資料庫
require('./config/mongoose')
//const RestaurantData = require('./models/restaurant')
const port = 3000
// 引用路由器
const routes = require('./routes/index')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 自定義helper
handlebars.registerHelper('if_equal', function (job, expectedJob, options) {
  if (job === expectedJob) {
    return options.fn(this);
  }
  return options.inverse(this);
})

// Session設定
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// routes setting
// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})