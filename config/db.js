const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            })
        console.log(`Mongo DB Connected: ${conn.connection.host} `.cyan.bold)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.italic)
        process.exit(1)
    }

}

module.exports = connectDB