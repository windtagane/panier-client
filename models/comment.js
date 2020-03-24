"use strict";
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		"Comment",
		{
			id: {
				type: DataTypes.INTEGER
			},
			description: {
				type: DataTypes.STRING
			}
		},
		{
			tableName: 'commentaires', 
			underscored: true, 
			paranoid: true
		}
	);
	Comment.associate = function(models) {
		// associations can be defined here
		Comment.belongsTo(User,{foreignKey: 'utilisateurs_id'}); // le commentaire à un utilisateur.
		Comment.belongsTo(Article,{foreignKey: 'articles_id'}); // le commentaire conserne un article.

		User.hasMany(Comment, {foreignKey: 'utilisateurs_id'});// Un utilisateur peut faire plusieur commentaires.
		Article.hasMany(Comment, {foreignKey: 'articles_id'});// Un article peut avoir plusieur commentaires.
	};
	return Comment;
};
