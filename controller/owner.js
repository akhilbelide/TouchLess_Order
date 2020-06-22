const d_b=require('../db_firebase').d_b

exports.getOrders=(req,res,next)=>{
    
    const allorderRef=d_b.ref('Orders')
    allorderRef.orderByChild('order_status').equalTo('PENDING').once('value',(snap,err)=>{
        if(err){
            console.log(err)
        }
        else{
            const allord=Object.values(snap.val())
            console.log(allord)

            res.status(200).json({orders:allord})
        }
    })
}

exports.modifyOrder=(req,res,next)=>{
    const ord_id=req.body.order_id
    const modRef=d_b.ref('Orders')
    modRef.update({
        [ord_id]:{
            order_status:'DONE'
        }
    }).then(result =>{
        res.status(200).json({message:'success!'})
    })
}


exports.getSeenOrders=(req,res,next)=>{
    
    const allorderRef=d_b.ref('Orders')
    allorderRef.orderByChild('order_status').equalTo('DONE').once('value',(snap,err)=>{
        if(err){
            console.log(err)
        }
        else{
            const allord=Object.values(snap.val())
            console.log(allord)

            res.status(200).json({orders:allord})
        }
    })
}