const newsRoute = require('./news')
const siteRoute = require('./site')
const courseRoute = require('./course')
const meRoute = require('./me')

function route(app){
    app.use('/news', newsRoute)
    app.use('/course', courseRoute) 
    app.use('/', siteRoute) 
    app.use('/me', meRoute)
}

module.exports = route;