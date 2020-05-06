const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

const DB = []

io.on('connection', socket=>{
  console.log( 'user 进来了' )

  socket.emit('message', DB)

  socket.on('message', msg=>{
    console.log( msg )
    DB.push(msg)
    io.emit('message', DB)
  })

  socket.on('disconnect', (reason)=>{
    console.log( `user 离开了`, reason )
  })
})

server.listen(5500, ()=>console.log( 'server running at 5500' ))