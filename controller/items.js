const d_b=require('../db_firebase').d_b
const async = require('async')
const mapping={
    "1":"Burgers",
    "2":"Noodles",
    "3":"Pizza",
    "4":"Puffs"
}

exports.getCategories=(req,res,next)=>{
     
    const catRef=d_b.ref('Categories')

    catRef.once('value',snap=>{
        const categories=snap.val()
        const all_Categories=Object.keys(categories)
        res.status(200).json({categories:all_Categories})
    })
}
exports.updateItems = (req,res,next)=>{
    
    const data = req.body.data
    console.log(data)
    const chkRef=d_b.ref('Categories')
    async.map(data,(i,cb)=>{
        console.log(i)
        const cat_id=i.cat_id
        chkRef.child(mapping[i.cat_id]).update({
            [i.name]:{
                name:i.name,
                quantity:i.quantity,
                price:i.price
            }
        },(val,err)=>{
            cb(null)
        })

    },(err,result)=>{
        res.status(200).json({message:"success.....!"})
    })

}

exports.getItems=(req,res,next)=>{
    const itemId=req.params.itemId
    console.log(req.originalUrl)
    const itemName=mapping[itemId]

    const itemref=d_b.ref('Categories').child(itemName)
    itemref.once('value',(snap,err)=>{
        if(err){
            console.log(err)
        }
        else{
            const items=Object.values(snap.val())
            res.status(200).json({items:items})
        }
    })
}


