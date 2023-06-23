import { Router } from 'express'
import { prisma } from '../db.js'

const router = Router()

router.get('/products', async (req, res) => {
  const products = await prisma.product.findMany()

  if (!products.length === 0)
    return res.status(404).json({ msg: 'Products not found', data: [] })
  res.status(200).json({ msg: 'Products found', data: products })
})

router.get('/products/:id', async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(req.params.id),
    },
    //Relacion
    include: {
      category: true,
    },
  })
  if (!product)
    return res.status(404).json({ msg: 'Product not found', data: [] })
  res.status(200).json({ msg: 'Product found', data: product })
})

router.post('/products', async (req, res) => {
  const nenwProduct = await prisma.product.create({
    data: req.body,
  })

  if (!nenwProduct)
    return res.status(400).json({ msg: 'Bad request', data: [] })
  res.status(201).json({ msg: 'Product created', data: nenwProduct })
})

router.put('/products/:id', async (req, res) => {
  const nenwProduct = await prisma.product.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  })

  if (!nenwProduct)
    return res.status(400).json({ msg: 'Bad request', data: [] })
  res.status(201).json({ msg: 'Product updated', data: nenwProduct })
})

router.delete('/products/:id', async (req, res) => {
  const productDeleted = await prisma.product.delete({
    where: {
      id: Number(req.params.id),
    },
  })
  if (!productDeleted) return res.status(404).json({ msg: 'Product not found' })
  res.status(200).json({ msg: 'Product deleted', productDeleted })
})
export default router

//export default router;
