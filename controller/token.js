const d_b=require('../db_firebase').d_b

exports.postToken=(req,res,next)=>{
    
    const token=req.body.token
    const tokenRef=d_b.ref('Token')
    tokenRef.update({
        [token]:token
    })
    .then(result=>{
        res.status(200).json({mesage:"success!"})
    })
    .catch(err => console.log(err))
}