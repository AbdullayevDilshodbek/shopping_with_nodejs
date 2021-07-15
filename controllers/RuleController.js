const { Rule } = require('../models')
const { Op } = require("sequelize");
const access = require('../middleware/rbac')
module.exports.index = async (req,res) => {
    if (!(await access.check_rule('rules', 'show', req.user.user_id))) {
        res.status(403).send("forbidden")
    }
    try {
        const rules = await Rule.findAll({
            attributes: ['id','title'],
            where: {
                title: {[Op.like]: `%${req.query.search}%`}
            },
        })
        res.send({
            data: rules
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}