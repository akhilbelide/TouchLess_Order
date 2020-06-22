import { d_b } from '../db_firebase'

export function getOrders(req,res,next){
    
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

export function modifyOrder(req,res,next){
    const ord_id=req.body.order_id
    console.log(ord_id)
    console.log()
    const modRef=d_b.ref('Orders').orderByChild('order_id').equalTo(req.body.order_id)
    modRef.once('value',snap =>{
        const k=Object.keys(snap.val())
        snap.ref.child(`${k}`).update({
             order_status:'DONE'
         })
    }).then(result =>{
        res.status(200).json({message:'success!'})
    })
}


export function getSeenOrders(req,res,next){
    
    const allorderRef=d_b.ref('Orders')
    allorderRef.orderByChild('order_status').equalTo('DONE').once('value',(snap,err)=>{
        if(err){
            console.log(err)
        }
        else{
            if(snap.val())
            const allord=Object.values(snap.val())
            console.log(allord)

            res.status(200).json({orders:allord})
        }
    })
}