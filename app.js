import express from "express"
import morgan from "morgan"
import cookie from "cookie-parser"
import cors from "cors"
import path from "path"
import rateLimit from "express-rate-limit"
//importing routes
import userRoutes from "./routes/authRoutes"
import productRoutes from "./routes/productRoutes"
import customerRoutes from "./routes/customerRoutes"
import transactionRoutes from "./routes/transactionRoutes"



const app = express()


app.use(morgan('tiny'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookie())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(limiter)




app.use('/uploads', express.static('uploads'));


app.use("/api/users",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/customer",customerRoutes)
app.use("/api/transaction",transactionRoutes)



if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", 'index.html'))
    })
}


module.exports =app