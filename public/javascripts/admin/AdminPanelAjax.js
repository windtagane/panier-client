import Articles from './ajax/articles/articlesAjax.js';
import Categories from './ajax/categories/categoriesAjax.js';

$(document).ready(function() {
    console.log("AdminPanelAjax loaded");
    Articles.prototype.init();
    Categories.prototype.init();
    
    function getStats(){
        $.get('/admin/stats', (stats) => {
            console.log(stats);
            $(".nb-articles").text(stats.nbArticles);
            $(".nb-users").text(stats.nbUsers);
            $(".nb-commandes").text(stats.nbCommandes);
            $(".sum-all-commandes").text(stats.sumAllCommandes.toFixed(2) + ' €');
        })
    }

    getStats();
})