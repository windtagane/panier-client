$(document).ready(function() {

    function init() {
        let btnUsers = $('#admin-btn-users');
        let btnCategories = $('#admin-btn-categories');
        let btnArticles = $('#admin-btn-articles');

        btnUsers.on('click', function() {
            listUsers();
        })

        btnCategories.on('click', function() {
            listCategories();
        })

        btnArticles.on('click', function() {
            listArticles();
        })
    }

    function listUsers() {
        $.get('/users/', function(users) {
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
                    <th scope="row">${index}</th>
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
        })
    }

    function listCategories() {
        $.get('/categories/articles', function(categories) {
            console.log(categories);
        })
    }

    function listArticles() {
        $.get('/articles', function(articles) {
            console.log(articles);
        })
    }

    init();
});
