const {addProduct, showProduct, spesificProduct, editProduct, deleteProduct} = require('../controller/produkController')
const upload = require('../middleware/multer')

const app = require('express')
const router = app.Router()

router.post('/product', upload.single('foto_produk'), addProduct)
router.get('/product', showProduct)
router.get('/product/:id', spesificProduct)
router.put('/product/:id', upload.single('foto_produk'), editProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router