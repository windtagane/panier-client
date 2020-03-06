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
            if (users.data > 1) {
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
                        <a href="users/update/${user.id}" target="blank_" class="btn btn-primary btn-sm" data-id="${user.id}">Update</a>
                        <a href="users/delete/${user.id}" target="blank_" class="btn btn-primary btn-sm" data-id="${user.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            }
            if (users.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucuns utilisateurs n\'a été trouvé');
        })

    }

    function listCategories() {
        $.get('categories/jsonList', function(categories) {
            if (categories.data) {
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
                        <a href="categories/update/${categorie.id}" target="blank_" class="btn btn-info btn-sm" data-id="${categorie.id}">Update</a>
                        <a href="categories/delete/${categorie.id}" target="blank_" class="btn btn-danger btn-sm" data-id="${categorie.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            }

            if (categories.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucunes categories n\'a été trouvé');
        })
    }

    function listArticles() {
        $.get('articles/jsonList', function(articles) {
            if (articles.data) {
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
                        <a href="articles/edit/${article.id}" target="blank_" class="btn btn-info btn-sm" data-id="${article.id}">Edit</a>
                        <a href="articles/edit/${article.id}" target="blank_" class="btn btn-info btn-sm" data-id="${article.id}">Update</a>
                        <a href="articles/delete/${article.id}" target="blank_" class="btn btn-danger btn-sm" data-id="${article.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            }
            if (articles.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucuns articles n\'a été trouvé');
            
        })
    }

    function addUsers() {
        let btn = '<a href="/users/add" target="blank_" class="btn btn-success disabled" disabled>Ajouter un utilisateur</a>';
        $('#panel-add').html(btn);
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
