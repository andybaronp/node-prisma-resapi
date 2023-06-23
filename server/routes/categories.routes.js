import { Router } from 'express'
import { prisma } from '../db.js'

const router = Router()

router.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany({
    //Relacion
    include: {
      products: true,
    },
  })

  res.json(categories)
})

export default router
