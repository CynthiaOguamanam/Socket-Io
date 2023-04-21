const mongoose = require('mongoose');
const url = 'mongodb://localhost/socket_IO'

mongoose.connect(url).then(()=>{
    console.log('connected successfully')
}).catch((error)=>{
    console.log(error.message)
})