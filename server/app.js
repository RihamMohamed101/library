

import express from 'express'
import { dbConnection } from './database/dbConnect.js'
import bookRouter from './modules/books/books.routes.js'
import cors from 'cors'
import memberRouter from './modules/members/member.routes.js'
import brrowRouter from './modules/brrowsing/brrow.routes.js'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.use('/book', bookRouter)
app.use('/member', memberRouter)
app.use('/borrow',brrowRouter)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))