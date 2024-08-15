const { create } = require('express-handlebars');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    name: {type: String, default: ''},
    description: {type: String},
    image: {type: String},
    videoId: {type: String},
    slug: { type: String, slug: 'name'},
    createAt: {type: Date, default: Date.now},//Lưu thời gian được tạo
    updateAt: {type: Date, default: Date.now},//Lưu thời gian cập nhập
});

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', Course);