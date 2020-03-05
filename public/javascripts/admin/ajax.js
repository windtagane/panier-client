$(document).ready(function() {

    function init() {
        let btnUsers = $('#admin-btn-users');
        let btnCategories = $('#admin-btn-categories');
        let btnArticles = $('#admin-btn-articles');

        btnUsers.on('click', function() {
            addUsers();
            listUsers();
        })

        btnCategories.on('click', function() {
            addCategories();
            listCategories();
        })

        btnArticles.on('click', function() {
            addArticles();
            listArticles();
        })
    }

    function listUsers() {
        $.get('users/jsonList', function(users) {
            if(users.statut == "OK") {
            let tableHead = `
            <table class="table table-striped">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Mail</th>
            <th scope="col">Adresse</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>`
            let tableEnd = `</tbody></table>`
            let rows = "";
            users.forEach((user, index) => {
                let row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${user.nom}</td>
                    <td>${user.mail}</td>
                    <td>${user.adresse}</td>
                    <td>${user.telephone}</td>
                    <td>
                        <a href="users/edit/${user.id}" target="blank_" class="btn btn-primary btn-sm" data-id="${user.id}">Edit</a>
                        <a href="users/delete/${user.id}" target="blank_" class="btn btn-primary btn-sm" data-id="${user.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
        }

        if (users.statut === 'KO') {$('#data-display').html('');}
        })
    }

    function listCategories() {
        $.get('categories/jsonList', function(categories) {
            console.log(categories);
            let tableHead = `
            <table class="table table-striped">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Statut</th>
            <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>`
            let tableEnd = `</tbody></table>`
            let rows = "";
            categories.data.forEach((categorie, index) => {
                let row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${categorie.nom}</td>
                    <td>${categorie.active}</td>
                    <td>
                        <a href="categories/edit/${categorie.id}" target="blank_" class="btn btn-info btn-sm" data-id="${categorie.id}">Edit</a>
                        <a href="categories/delete/${categorie.id}" target="blank_" class="btn btn-danger btn-sm" data-id="${categorie.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
        })
    }

    function listArticles() {
        $.get('articles/jsonList', function(articles) {
            console.log(articles);
            let tableHead = `
            <table class="table table-striped">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Détails</th>
            <th scope="col">Prix</th>
            <th scope="col">Image</th>
            <th scope="col">Catégorie ID</th>
            <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>`
            let tableEnd = `</tbody></table>`
            let rows = "";
            articles.data.forEach((article, index) => {
                let row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${article.nom}</td>
                    <td>${article.detail}</td>
                    <td>${article.prix}</td>
                    <td>${article.image}</td>
                    <td>${article.categories_id}</td>
                    <td>
                        <a href="article/edit/${article.id}" target="blank_" class="btn btn-info btn-sm" data-id="${article.id}">Edit</a>
                        <a href="article/delete/${article.id}" target="blank_" class="btn btn-danger btn-sm" data-id="${article.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
        
        })
    }

    function addUsers() {
        $('#panel-add').html('');
    };
    function addCategories() {
        let btn = '<a href="/categories/add" target="blank_" class="btn btn-success">Ajouter une catégorie</a>';
        $('#panel-add').html(btn);
    };
    function addArticles() {
        let btn = '<a href="/articles/add" target="blank_" class="btn btn-success">Ajouter un article</a>';
        $('#panel-add').html(btn);
    };

    init();
});
