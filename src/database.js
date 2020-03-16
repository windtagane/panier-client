const DATABASE = require('./env.database');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV;

if (env === "development") {
    let sequelize = new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USERNAME, process.env.LOCAL_DB_PASSWORD, { 
        host: process.env.LOCAL_DB_HOST,
        dialect: 'mysql',
        logging: false, // passer a true pour voir les différentes requêtes effectuées par l'ORM
    });

    //on exporte pour utiliser notre connexion depuis les autre fichiers.
    var exports = module.exports = {};
    exports.sequelize = sequelize;
}

if (env === "production") {
    let sequelize = new Sequelize(process.env.PROD_DB_NAME, process.env.PROD_DB_USERNAME, process.env.PROD_DB_PASSWORD, { 
        host: process.env.PROD_DB_HOST,
        dialect: 'mysql',
        logging: false, // passer a true pour voir les différentes requêtes effectuées par l'ORM
    });

    //on exporte pour utiliser notre connexion depuis les autre fichiers.
    var exports = module.exports = {};
    exports.sequelize = sequelize;
}

