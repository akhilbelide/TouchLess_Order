const express=require('express')
const app=express()
const cors=require('cors')
const d_b=require('./db_firebase').d_b
const bodyParser=require('body-parser')



const categoryRouter=require('./routes/items')
const orderRouter=require('./routes/order')
const tokenRouter=require('./routes/token')
const ownerRouter=require('./routes/owner')

app.use(bodyParser.json())

app.use(cors())

app.use((req,res,next)=>{
    // res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization')
    next()
})




app.use('/owner',ownerRouter)
app.use('/token',tokenRouter)
app.use('/order', orderRouter)
app.use('/categories', categoryRouter)
app.listen(process.env.PORT || 8090)
 