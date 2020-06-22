const express=require('express')
const router=express.Router()

const ownerController=require('../controller/owner')

router.get('/allOrders',ownerController.getOrders)

router.get('/allSeenOrders',ownerController.getSeenOrders)


router.post('/ord',ownerController.modifyOrder)


module.exports=router