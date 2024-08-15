const path = require('path');
const express = require('express')
const morgan = require('morgan')
const hbr = require('express-handlebars')
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./config/db')
const methodOverride = require('method-override')
const sortMiddleware = require('./app/middleware/sortMiddleware')

//Connect database
db.connect();

app.use(express.static(path.join(__dirname, 'public')))

//Example about middlewares - chỉ áp dụng trên route mà nó cầu hình, ko ảnh hưởng đến các route khác
app.get('/middleware', 
    function(req, res, next) {
      if(['vethuong', 'vevip'].includes(req.query.ve)){
        return next();
      }
      else {
        res.status(403).json({ message: 'Access denied'})
      }
    },
    function (req, res, next) {
      res.json({ message: 'Success'})
})



//Hàm xử lý method: POST
app.use(express.urlencoded())
app.use(express.json())

app.use(sortMiddleware);

//HTTP logger
app.use(morgan('combined'))

app.use(methodOverride('_Method'))

//Template engine
app.engine('hbr', hbr.engine({
  extname: '.hbr',
  helpers: {
    sum: (a,b) => a + b,
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'fa-solid fa-sort',
        asc: 'fa-solid fa-caret-up',
        desc: 'fa-solid fa-caret-down'
      }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType]
      const type = types[sortType]

      return `<a href="?_sort&column=${field}&type=${type}">
        <i class="${icon}"></i>
      </a>`
    }
  }
}));
app.set('view engine', 'hbr');
app.set('views', path.join(__dirname, 'resources/views'));

// Kiểm tra đường dẫn
console.log('Views directory:', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})