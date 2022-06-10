require('dotenv').config();
require('express-async-errors');
const express = require('express')

const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const productroute = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')




app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

//middleware
app.use('/api/v1/products' , productroute)
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