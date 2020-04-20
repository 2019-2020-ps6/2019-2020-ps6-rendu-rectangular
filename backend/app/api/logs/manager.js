const { User } = require('../../models')
const { Log } = require('../../models')

const buildUser = (userId) => {
    return User.getById(userId)
}

const buildAllUsers = () => {
    const logs = Log.get()
    return logs.map((log) => buildUser(log.userId))
}

module.exports = {
    buildAllUsers
}