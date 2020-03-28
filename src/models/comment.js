const sequelize = require('../database.js').sequelize;
const Sequelize = require('sequelize');



const Comment = sequelize.define('commentaires', {
    id: {type: Sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    description: {type: Sequelize.STRING(255),allowNull:false},
    utilisateurs_id: {type: Sequelize.INTEGER,allowNull:false},
    articles_id: {type: Sequelize.INTEGER,allowNull:false}
    
},
    {tableName: 'commentaires', underscored: true, paranoid: true}
);

const User = require('./user.js');
const Article = require('./article.js')

Comment.belongsTo(User,{foreignKey: 'utilisateurs_id'}); // le commentaire à un utilisateur.
Comment.belongsTo(Article,{foreignKey: 'articles_id'}); // le commentaire conserne un article.

User.hasMany(Comment, {foreignKey: 'utilisateurs_id'});// Un utilisateur peut faire plusieur commentaires.
Article.hasMany(Comment, {foreignKey: 'articles_id'});// Un article peut avoir plusieur commentaires.





module.exports = Comment;