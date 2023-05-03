const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clinic', 'postgres', 'xouayang20@', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    timezone: '+07:00',
    port:5432
});

sequelize.authenticate()
    .then(() => {
        console.log('DB connection established successfully')
    })
    .catch((error) => {
        console.log(error)
    })


sequelize.sync();

module.exports = sequelize