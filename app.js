const express = require('express')
const { sequelize } = require('./models')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const user_routes = require('./routes/user.routes')
const rule_routes = require('./routes/rule.routes')

app.use('/api/users', user_routes)
app.use('/api/rules', rule_routes)

app.listen(process.env.NODE_PORT, async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log('Error occured while syncing models with database', error)
    }
    console.log(`Server is running on ${process.env.NODE_PORT} PORT`);
})