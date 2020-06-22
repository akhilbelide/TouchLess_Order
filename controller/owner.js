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
