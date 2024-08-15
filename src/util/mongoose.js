module.exports = {
    mutipleMongooseToObject: function(mongooseArr){
        return mongooseArr = mongooseArr.map(mongooseArr => mongooseArr.toObject())
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose
    }
}