export default class Article {

    init() {
        let me = this;
        console.log("new Article loaded")
        
        let btnArticles = $('#admin-btn-articles');
        let btnCreateArticle = $('#btn-create-article');
        let btnShowCreateArticle = $('#btn-show-create-article');
        let btnCancelCreateArticle = $('.btn-cancel-create-article');
        
        btnArticles.on('click', function() {
            me.add();
            me.list();
        })

        btnCreateArticle.on("click", function() {
            me.create();
        })

        btnCancelCreateArticle.on("click", function() {
            me.cancelCreate();
        })
        
    }

    add() {
        let me = this;
        let btn = '<button class="btn btn-success" id="btn-show-create-article">Ajouter un article</button>';
        $('#panel-add').html(btn);
        console.log("done addArticles()");

        $('#btn-show-create-article').on("click", function() {
            console.log("click btnShowCreateArticle");
            me.showCreate();
        })
    };

    showCreate() {
        let me = this;
        $('#modal-create-articles').show();
        
    }

    cancelCreate() {
        $('#modal-create-articles').hide();
    }

    beforeCreate() {
        let me = this;
        //TODO : récup les differentes catégories
    }

    create() {
        let me = this;
        me.beforeCreate();
        console.log("create !")
        let form = $("form-create-article");

        $.post("/articles/create", form.serialize(), function(result) {
            console.log(result);
        })
        
    }

    list() {
        let me = this;
        // (@data , @title of page, @new route)
        if (this.getUrlVars()["tab"] !== "articles") history.replaceState('', 'Articles', '/admin?tab=articles'); 
        $.get('articles/jsonList', function(articles) {
            if (articles.data) {
            let tableHead = `
            <table class="table table-responsive table-striped">
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
                    <td scope="row">${index + 1}</td>
                    <td>${article.nom}</td>
                    <td>${article.detail}</td>
                    <td>${article.prix}</td>
                    <td>${article.image}</td>
                    <td>${article.categories_id}</td>
                    <td class="col">
                        <a href="/articles/edit/${article.id}" class="btn btn-info btn-sm" data-id="${article.id}">Edit</a>
                        <a href="/articles/delete/${article.id}" class="btn btn-danger btn-sm" data-id="${article.id}">Delete</a>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            me.tableResponsiveTitle();
            }
            if (articles.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucuns articles n\'a été trouvé');
            console.log("done listArticles()");
        })
    }

    
    //____________________________FAIRE UN TRUC MIEUX
    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    
    tableResponsiveTitle() {
        
        $('.table-responsive').each( (i,table) => {
            let labels = Array.from($(table).find('th')).map( th => $(th).text());
            $(table).find('td').each( (i, td) => $(td).attr('data-label', labels[i % labels.length]))
        })
    }
    
    
}

