module.exports = function(app){  
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // app.locals.title = 'Express - Generated with IronGenerator'
    res.status(err.status || 500)
    res.render('error')
  })
}
