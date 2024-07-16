const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
require ("dotenv").config()
const app = express()

// Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(cors({origin:'http://localhost:5173',credentials:true, methods:['GET', 'POST','PUT','DELETE']}))
app.use(cookieParser())

const PORT = process.env.PORT;

// DB Connection
require ("./config/mongoose.config");
// app.options('/api/auctions/edit/:id', cors());

// Routes 
require("./routes/auctions.routes")(app);
require('./routes/user.routes')(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT} for requests 🚀`));