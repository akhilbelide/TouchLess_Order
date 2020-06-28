const admin=require('../db_firebase').admin
const d_b = require('../db_firebase').d_b
const firebase=require('firebase')
const async = require('async')
const cron=require('node-cron')
const mapping={
    "1":"Burgers",
    "2":"Cheese Wheel",
    "3":"Cool Drinks",
    "4":"Fried Rice",
    "5":"Grilled Sandwich",
    "6":"Manchuria",
    "7":"Noodles",
    "8":"Pastries",
    "9":"Pizza",
    "10":"Puffs",
    "11":"Rolls",
    "12":"Snacks"
}

let id=1

cron.schedule("0 0 * * *", function(){
    console.log('resetting the id value to 1')
    id=1
})


exports.postOrder=(req,res,next)=>{
    const tokRef=d_b.ref("Token")
    let token;
    tokRef.once('value',(snap,err)=>{
        token= Object.keys(snap.val())
    })
     
    let msg={
        notification:{
            title:'New Order has been placed',
            body:'Click here to view'
        }
    }
    let options={
        priority:"high",
        android:{sound:"default"}
    }
    const order=req.body.order
    const chkRef=d_b.ref('Categories')
    let flag=0
    let fail=[]

    async.map(order,(i,callback)=>{
        const cat_id=i.cat_id
        chkRef.child(mapping[cat_id]).child(i.name).once('value',snap => {
           if(i.quantity<=snap.val().quantity){
            fail.push({
                error:0,
                name:i.name,
            })
           }
           else{
               flag=1;
               fail.push({
                   error:1,
                   name:i.name,
                   avail_quantity:snap.val().quantity
               })
               
           }
           callback(null)
        })
        
    },(err,result)=>{
        if(err) console.log(err)
        if(flag===0){
            const ordRef=d_b.ref('Orders')
            ordRef.push({
                order_id:id,
                order_details:order,
                order_at:firebase.database.ServerValue.TIMESTAMP,
                order_status:'PENDING'
            }).then(result=>{
                id=id+1
                order.map((i,index)=>{
                    chkRef.child(mapping[i.cat_id]).child(i.name).once('value',snap =>{
                        const quantity_old=snap.val().quantity
                        chkRef.child(mapping[i.cat_id]).update({
                            [i.name]:{
                                name:i.name,
                                quantity:quantity_old-i.quantity,
                                price:i.price
                            }
                        })
                    })
                })
                admin.messaging().sendToDevice(token,msg,options).then(response => {
                                    console.log('Notif successfully sent!!')
                                    res.status(200).json({message:"success!",order_id:(id-1),failed:[]})
                                })
                                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    
        if(flag===1){
            res.status(200).json({message:"fail!",order_id:0,failed:fail})
        }
    })
}
