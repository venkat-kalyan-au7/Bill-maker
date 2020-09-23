import express from "express"
import morgan from "morgan"
import cookie from "cookie-parser"
import cors from "cors"
import path from "path"
//importing routes
import userRoutes from "./routes/authRoutes"



const app = express()


app.use(morgan('tiny'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookie())


app.use("/api/users",userRoutes)



if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", 'index.html'))
    })
}


module.exports =app