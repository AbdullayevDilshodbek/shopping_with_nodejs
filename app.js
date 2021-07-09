const express = require('express')
const { sequelize } = require('./models')
const dotenv = require('dotenv')
const app = express()

app.use(express.json())

const user_routes = require('./routes/user.routes')

app.use('/api/users', user_routes)

dotenv.config();
app.listen(process.env.NODE_PORT, async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log('Error occured while syncing models with database', error)
    }
    console.log(`Server is running on ${process.env.NODE_PORT}`);
})