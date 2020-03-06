$(document).ready(function() {

    function init() {
        getCategories();
    }

    function getCategories() {
        $.get("/categories/jsonList", function(categories) {
            let options = "";
            categories.data.forEach(categorie => {
                options += `<option value="${categorie.id}">${categorie.nom}</option>`
            });

            $('#select-categories').html(options);
        })
    }
    
    init();
    
})