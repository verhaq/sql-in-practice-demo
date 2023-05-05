require('dotenv').config()
const {CONNECTION_URI} = process.env
const Sequelize = require('sequelize')

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_URI, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

// we are mocking a user being signed in
// these ids belong to the same person - "Fern" one of the seeded users
const userId = 4
const clientId = 3

module.exports = {
    getUserInfo: (req, res) => {
        sequelize.query(`select * from cc_clients c
        join cc_users u on c.user_id = u.user_id
        where u.user_id = ${userId};`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }, 

   // updateUserInfo: (req, res)
}