const {addCart, showCart, deleteCartProduct, updateStatus, showMyBought} = require('../controller/keranjangController')

const app = require('express')
const router = app.Router()

router.post('/cart/:id', addCart)
router.get('/cart', showCart)
router.delete('/cart/:id', deleteCartProduct)
router.put('/cart/:id', updateStatus)
router.get('/history', showMyBought)

module.exports = router