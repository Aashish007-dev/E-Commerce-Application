import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());


app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API Working!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});