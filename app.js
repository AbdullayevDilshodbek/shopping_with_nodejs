const express = require('express')
const {sequelize} = require('./models')

const app = express()

app.use(express.json())

const user_routes = require('./routes/user.routes')

app.use('/api/users',user_routes)

app.listen(3000, async () => {
    await sequelize.authenticate()
    console.log('Server is running');
})