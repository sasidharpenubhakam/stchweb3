import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import projectRouter from './routes/projectRoute.js' // ✅ New line

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(
    cors({
        origin: 'https://stchweb3-f4wc.vercel.app',
        credentials: true,
    })
);
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/v2/projects', projectRouter) // ✅ New line

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, '0.0.0.0', () => console.log('Server started on PORT : ' + port))
