import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productsRoute.js'
import OrderRoute from './routes/OrderRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import PaymentinfoRoute from './routes/PaymentinfoRoute.js'
import FetchProductsRoute from './routes/FetchProductsRoute.js'
import contactRoute from './routes/contactRoute.js'
import statsRoute from "./routes/statsRoute.js"
dotenv.config(); // Load environme nt variables from .env
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/', (req, res) =>{
  res.send("Welcome")
})
app.use('/api/v1/auth', authRoute);
app.use("/api/v1/stats" , statsRoute)
app.use('/api/v1/contact',contactRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/products', FetchProductsRoute)
app.use('/api/v1/order', OrderRoute);
app.use("/api/v1/payments", PaymentinfoRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
