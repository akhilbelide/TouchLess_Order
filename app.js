const express=require('express')
const app=express()
const cors=require('cors')
const d_b=require('./db_firebase').d_b
const bodyParser=require('body-parser')



const categoryRouter=require('./routes/items')
const orderRouter=require('./routes/order')
const tokenRouter=require('./routes/token')
const ownerRouter=require('./routes/owner')

// const orderRef=db.ref('orders')
// const msg='First Message'
// orderRef.push(msg, err=>{
//     if(err){
//         console.log('An error occured')
//     }
//     else{
//         console.log('Data pushed to db')
//     }
// })

// const order2ref=db.ref('ord').set({
//     name:'Akhil',
//     age:'22'
// })
// .then(result=>{
//     console.log('data in db')
// })
// .catch(err=>{
//     console.log('error')
// })



// const order3ref=db.ref('users').child(data.id)

// const data={
//     name:'Sachin',
//     age:'47',
//     id:'2'
// }
// order3ref.update(data,err=>{
//     if(err){
//                 console.log('An error occured')
//             }
//             else{
//                 console.log('Dat
app.use(bodyParser.json())



// const data={
//     'Veg Noodles':{
//         name:'Veg Noodles',
//         price:'60',
//         quantity:20
//     },
//     'Egg Noodles':{
//         name:'Egg Noodles',
//         price:'75',
//         quantity:'15'
//     }
// }
// const catRef=d_b.ref('Categories').child('Noodles')
// catRef.update(data, err=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('Data pushed')
//     }
// })


app.use(cors())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization')
    next()
})




app.use('/owner',ownerRouter)
//app.use('/token',tokenRouter)
app.use('/order', orderRouter)
app.use('/categories', categoryRouter)
app.listen(process.env.PORT || 8090)
 