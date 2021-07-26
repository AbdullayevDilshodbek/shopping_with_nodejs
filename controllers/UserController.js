const { User, Rule, Action,Module } = require('../models')
const Joi = require('@hapi/joi');
const { Op, INTEGER } = require('sequelize')
const _ = require('lodash')
const bcrypt = require("bcrypt");
const access = require('../middleware/rbac')
const PG = require('../utils/paginate')
const dotenv = require('dotenv').config()

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
        req.data = users
        res.status(200).send(PG.paginate(req))
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