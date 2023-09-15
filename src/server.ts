import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import userRouter from './routes/users'
import productRouter from './routes/products'
import orderRouter from './routes/orders'
import 'dotenv/config'
import authenticationRouter from './routes/authentication'

export const app: express.Application = express()

app.use(bodyParser.json())

app.use((request: Request, response: Response, next: NextFunction) => {
    const date = new Date();
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const hour: number = date.getHours();
    const minute: number = date.getMinutes();
    const second: number = date.getSeconds();
    const time = `[${year}/${month}/${day} ${hour}:${minute}:${second}]`;
    console.log(time + ' ' + request.method + ' ' + request.url);
    next();
});

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/authentications', authenticationRouter)

const { PORT } = process.env

app.listen(PORT, function () {
    console.log(`starting app on: ${PORT}`)
})
