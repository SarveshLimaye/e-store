require('dotenv').config();
require('express-async-errors');
const express = require('express')
const cors = require('cors');

const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const productroute = require('./routes/products')
const userroute = require('./routes/user')
const orderroute = require('./routes/order')
const errorHandlerMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')




app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

//middleware
app.use(express.json())
app.use(cors())
app.use('/api/v1/products' , productroute)
app.use('/api/users', userroute)
app.use('/api/orders', orderroute)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 5000

const start = async () => {
    try{
       await connectDB(process.env.MONGODB_URI)
      app.listen(port , console.log(`Server started at port ${port}`))
    } catch(err) {
        console.log(err)
    }
}

start()