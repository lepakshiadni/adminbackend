const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dbconnect = require('./config/dbconnect');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const os = require('os');
const dotenv = require('dotenv').config();

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/admin.sissoo.in/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/admin.sissoo.in/fullchain.pem')
};

const app = express();

// Routes imports 
const { notFound, errorHandler } = require('./middleware/errorhandler');
const userauth = require('./route/useroute');
const message = require('./route/messageroute');
const conversation = require('./route/conversationroute');
const trainer = require('./route/trainerroute');
const employer = require('./route/employerroute');
const postRequirement = require('./route/employerpostrequirementroute');
const trainerPost = require('./route/trainercreatepostroute');

// Increase payload size limit (adjust the limit as needed)
app.use(express.json({ limit: '100mb' }));
app.use(bodyparser.json());
app.use(express.urlencoded({
    limit: '100mb',
    parameterLimit: 10000,
    extended: true
}));
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true 
}));

dbconnect();

// All user routes
app.use("/trainer", trainer); // All trainer routes 
app.use("/employer", employer); // All employer routes
app.use('/employerpost', postRequirement); // All employer post
app.use('/trainerpost', trainerPost); // All trainer post
app.use("/user", userauth);
app.use("/message", message);
app.use("/conversation", conversation);

// Uncomment the following lines if you have error handling middleware
// app.use(notFound);
// app.use(errorHandler);

function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();

    for (const interfaceName of Object.keys(interfaces)) {
        const networkInterface = interfaces[interfaceName];

        for (const iface of networkInterface) {
            if (!iface.internal && iface.family === 'IPv4') {
                return iface.address;
            }
        }
    }

    return 'localhost'; // Default to localhost if no suitable address is found
}

const localIp = getLocalIpAddress();
console.log(localIp, "Test");

app.get("/localip", (req, resp) => {
    try {
        resp.json({ message: 'localIp fetched', localIp: localIp });
    } catch (error) {
        resp.json({ message: 'error in ip' });
    }
});

app.get("/server", (req, resp) => {
    resp.send("<h1>Working From Server</h1>");
});

const PORT = process.env.PORT || 4000;
const server = https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT} with HTTPS`);
});












// const express = require('express')
// const bodyparser = require('body-parser')
// const cors = require('cors')
// const dbconnect = require('./config/dbconnect')
// const cookieParser = require('cookie-parser')
// const app = express()
// const os=require('os')
// const dotenv = require('dotenv').config()

// //routes imports 
// const {notFound,errorHandler} =require('./middleware/errorhandler')
// const userauth = require('./route/useroute')
// const message=require('./route/messageroute')
// const conversation=require('./route/conversationroute')
// const trainer=require('./route/trainerroute')
// const employer=require('./route/employerroute')
// const postRequirement=require('./route/employerpostrequirementroute')
// const trainerPost=require('./route/trainercreatepostroute')


// // Increase payload size limit (adjust the limit as needed)
// app.use(express.json({ limit: '100mb' }));
// app.use(bodyparser.json())
// // app.use(express.urlencoded({ limit: '50mb', extended: true , parameterLimit: 10000 }));
// app.use(express.urlencoded({
//     limit:'100mb',
//     parameterLimit: 10000,
//     extended:true
// }))
// app.use(cookieParser())
// app.use(cors({
//     origin:"*",
//     credentials: true 
// }))

// dbconnect()

// //All user routes
// app.use("/trainer",trainer) //all trainer routes 
// app.use("/employer",employer) //all employer routes
// app.use('/employerpost',postRequirement)//all employer post
// app.use('/trainerpost',trainerPost)// all trainer post
// app.use("/user", userauth)
// app.use("/message",message)
// app.use("/conversation",conversation)

// // app.use(notFound);
// // app.use(errorHandler);




// function getLocalIpAddress() {
//     const interfaces = os.networkInterfaces();

//     for (const interfaceName of Object.keys(interfaces)) {
//         const networkInterface = interfaces[interfaceName];

//         for (const iface of networkInterface) {
//             if (!iface.internal && iface.family === 'IPv4') {
//                 return iface.address;
//             }
//         }
//     }

//     return 'localhost'; // Default to localhost if no suitable address is found
// }



 

// const localIp = getLocalIpAddress();
// console.log(localIp, "Test")

// app.get("/localip",(req,resp)=>{
//     try{
//         resp.json({message:'localIpfected',localIp:localIp})
//     }
//     catch(error){
//         resp.json({message:'error in ip'})
//     }
// })

// app.get("/server",(req,resp)=>{
//     resp.send("<h1>Working From Server</h1>")
// })

// const PORT = process.env.PORT || 8080
// const server = app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


