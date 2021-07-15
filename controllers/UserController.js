const { User, Rule, Action,Module } = require('../models')
const Joi = require('@hapi/joi');
const { Op, INTEGER } = require('sequelize')
const _ = require('lodash')
const bcrypt = require("bcrypt");
const access = require('../middleware/rbac')

const dotenv = require('dotenv').config()
const os = require("os");

module.exports.create = async (req, res) => {
    try {
        const { full_name, username, password } = req.body
        const validator = userValidator(req.body)
        if (validator.error) {
            let message = validator.error.details.map(err => err.message);
            res.status(400).send(message)
        }
        let hashPassword = await bcrypt.hash(password.toString(), await bcrypt.genSalt(10))
        const user = await User.create({
            full_name,
            username,
            password: hashPassword
        })
        res.status(201).send({
            message: "Foydalanuvchi yaratildi",
            object: user
        })
    } catch (error) {
        res.status(409).json(error.message)
    }
}

userValidator = (fields) => {
    const validatorSchema = {
        full_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.required(),
    }

    return Joi.validate(fields, validatorSchema);
}


module.exports.index = async (req, res) => {
    if (!(await access.check_rule('users', 'show', req.user.user_id))) {
        res.status(403).send("forbidden")
    }
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
              }
        });
        const page = req.query.page || 2
        const limit = process.env.NODE_PG || 10

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const users_ = {}
        const url = process.env.NODE_IS_HOST + req.headers.host
        users_.data = users.slice(startIndex,endIndex)
        const lastPage = Math.ceil(users.length/limit)
        users_.links = {
            first: `${url}/api/users?page=1`,
            last: `${url}/api/users?page=${lastPage}`,
            prev: page > 1 ? `${url}/api/users?page=${page - 1}` : null,
            next: page < lastPage ? `${url}/api/users?page=${page + 1}` : null
        }
        users_.meta = {
            currenct_page: page,
            from: endIndex,
            last_page: lastPage,
            links: generateLinks(url,lastPage,page)
        }
        users_.path = `${url}/api/users`
        users_.per_page = 1 * limit,
        users_.total = users.length,
        res.status(200).send(users_)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.attached_rule_to_user = async (req, res) => {
    if (!(await access.check_rule('rules', 'show', req.user.user_id))) {
        res.status(403).send("forbidden")
    }
    try {
        const validatorSchema = {
            user_id: Joi.number().required(),
            rule_id: Joi.number().required(),
        }
        validator = Joi.validate(req.body,validatorSchema)
        if(validator.error){
            res.status(400).send(validator.error.details.map(el => el.message))
        }
        res.status(201).send(req.body)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

generateLinks = (url,maxPageNumber,activePage) => {
    const links = [];
        for (let i = 1; i <= maxPageNumber; i++) {
            links.push({
                url: `${url}/api/users?page=${i}`,
                label: i,
                active: i == activePage ? true : false
            }) 
        }
    return links
}