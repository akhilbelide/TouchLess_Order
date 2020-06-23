const express=require('express')
const router=express.Router()

const itemController=require('../controller/items')

router.get('/all',itemController.getCategories)
router.get('/all/:itemId/', itemController.getItems)
router.get('/all/admin/:itemId', itemController.getItems)
router.post('/all/items/update',itemController.updateItems)
module.exports=router