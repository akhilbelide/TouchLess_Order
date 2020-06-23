const admin=require('../db_firebase').admin
const d_b = require('../db_firebase').d_b
const firebase=require('firebase')
const async = require('async')
const cron=require('node-cron')
const mapping={
    "1":"Burgers",
    "2":"Noodles",
    "3":"Pizza",
    "4":"Puffs"
}

let id=1

cron.schedule("00 00 * * *", function(){
    console.log('resetting the id value to 1')
    id=1
})


exports.postOrder=(req,res,next)=>{
    const token='ccVormQqRFCf3YNdgwSG3X:APA91bE-KTB6mHpsbQXmOdM4oIhOnLDEpS3SWuis3eLHRjiLMEBgFkYi7rUxypyIwxAokLBfTz8dbddpTb-JF1WOM1hWL00PCz3jcheUoQGpeV6BXXQ6GmX_5HN89AM0yDkhCCM1DYm6'
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
            console.log(i)
            console.log(snap.val())
           if(i.quantity<=snap.val().quantity){
            fail.push({
                error:0,
                name:i.name,
            })
               console.log("OK")
           }
           else{
               flag=1;
               fail.push({
                   error:1,
                   name:i.name,
                   avail_quantity:snap.val().quantity
               })
               console.log("Choose less quantity")
               
           }
           callback(null)
        })
        
    },(err,result)=>{
        if(err) console.log(err)
        console.log(flag)
        if(flag===0){
            console.log("--")
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
            // console.log('Hey')
            // console.log(fail)
            res.status(200).json({message:"fail!",order_id:0,failed:fail})
        }
    })

    console.log("hey")
    // order.map((i,index)=>{
    //     const cat_id=i.cat_id
    //     chkRef.child(mapping[cat_id]).child(i.name).once('value',snap => {
    //        if(i.quantity<snap.val().quantity){
    //            console.log("OK")
    //        }
    //        else{
    //            flag=1;
    //            fail.push({
    //                name:i.name,
    //                avail_quantity:snap.val().quantity
    //            })
    //            console.log("Choose less quantity")
    //        }
    //     })    
    // })
    // console.log(order)

    //if succeeds
   
}
