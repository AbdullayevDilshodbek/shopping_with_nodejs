/**
 * Qanday foydalaniladi ?
 * "check_rule" module 3 ta argument larni talab qiladi.
 *     1) Qaysi modulga kirmoqchi
 *     2) Shu modulda qanday ish qilmoqchi (show,create,update or delete)
 *     3) Amalyot bajarayotgan foydalanuvchi(profil egasi) id si 
 * Argumentlar to'liq berilgan holda foydalanuvchi shu action ni 
 * bajara olishga huquqi bor yoki yo'q (true or false) ni qaytaradi
 */
const { User, Rule, Action,Module } = require('../models')
module.exports.check_rule = (module_, action, user_id) => {
    try {
        const user = User.findByPk(user_id,{
            where: {active: true},
            include: [
                {
                    model: Rule,
                    as: 'rule_',
                    required: true,
                    attributes: ['title'],
                    include: [
                        {
                            model: Action,
                            as: 'action',
                            where: {title: action},
                            attributes: ['title']
                        },
                        {
                            model: Module,
                            as: 'module',
                            where: {title: module_},
                            attributes: ['title']
                        },
                    ]
                }
            ]
        })
        return user;
    } catch (error) {
        return error.message
    }
}