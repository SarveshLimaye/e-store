require('dotenv').config();
require('express-async-errors');
const express = require('express')
const cors = require('cors');
const path = require('path');


const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const productroute = require('./routes/products')
const userroute = require('./routes/user')
const orderroute = require('./routes/order')
const striperoute = require('./routes/stripe')
const errorHandlerMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')




app.get('/api', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

//middleware


app.use(cors())
app.use(express.json())
app.use('/api/v1/products' , productroute)
app.use('/api/users', userroute)
app.use('/api/stripe', striperoute)
app.use('/api/orders', orderroute)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});


const port = process.env.PORT || 5000

const start = async () => {
    try{
       await connectDB(process.env.MONGODB_URI)
      app.listen(port , console.log(`Server started at port ${port}`))
    } catch(err) {
        console.log(err)
    }
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  })
}

start()

module.exports = app