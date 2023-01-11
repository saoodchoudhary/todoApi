const express = require('express');
const morgan = require('morgan');
 const app = express();
 const dotenv = require('dotenv');


 const connectDB = require('./config/db.js');

 
 app.use(morgan('dev'));

 app.use(express.json({}));
 app.use(express.json({
   extended:true
 }))

 dotenv.config({
    path: './config/config.env'
 });
 connectDB();

app.use('/api/todo', require('./routes/user'));
//  app.get("/get", (req, res)=>{
//     res.status(200).json({
//         "name":"saood"
//     });
//  });

 const PORT = process.env.PORT || 3000;

app.listen(PORT,
     console.log(`server is running on port:${PORT}`)
     );