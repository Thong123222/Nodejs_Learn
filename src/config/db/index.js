const mongoose = require('mongoose');

//khi sử dụng async nên sử dụng try/catch để bắt lỗi!!!
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/education_dev');
        console.log('Connect successfully!!!!')
    } catch (error) {
        console.log('Connect false!!!')
    }
}

//exports ra một object
module.exports = { connect };