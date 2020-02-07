const express = require('express')
const Product = require('../model/product')
const { auth } = require('../middleware/auth')
const router = express.Router()

// get all products
router.get('/', async (req, res) => {
    const foundProducts = await Product.find().populate({
        path: 'author',
        select: '_id name'
    })

    res.json({
        success: true,
        products: foundProducts
    })
})

// set product
router.post('/', auth, async (req, res) => {

    const product = new Product(req.body)

    try {
        const savedProduct = await product.save()
        res.json({ success: true, product: savedProduct })
    } catch (err) {
        res.json({ success: false, err })
    }
})

module.exports = router