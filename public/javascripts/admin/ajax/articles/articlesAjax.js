export default class Article {

    init() {
        let me = this;
        
        let btnArticles = $('#admin-btn-articles');
        let btnCreateArticle = $('#btn-create-article');
        let btnShowCreateArticle = $('#btn-show-create-article');
        let btnCancelCreateArticle = $('.btn-cancel-create-article');
        let btnShowEditArticle = $('.btn-show-edit-article');
        let btnCancelEdit = $('.btn-cancel-edit-article');
        let btnCancelDelete = $('.btn-cancel-delete-article');
        let btnDelete = $("#btn-delete-article");
                
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

        btnShowEditArticle.on("click", function() {
            me.showEdit($(this).data("id")); 
        })

        btnCancelEdit.on("click", function() {
            me.cancelEdit();
        })
        
        btnCancelDelete.on("click", function() {
            me.cancelDelete();
        })

        btnDelete.on("click", function() {
            me.delete();
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
        me.beforeCreate();
        
    }

    cancelCreate() {
        $('#modal-create-articles').hide();
    }

    beforeCreate() {
        let me = this;
        //TODO : récup les differentes catégories
        $.get("categories/jsonList", function(result) {
            let categories = result.data;

            let categoriesOptions = "";
            categories.forEach(categorie => {
                categoriesOptions += `<option value="${categorie.id}">${categorie.nom}</option>`;
            })

            $("#select-categories").html(categoriesOptions);

        })
    }

/*     create() {
        let me = this;
        let form = $("#form-create-article");
        console.log(form.serializeArray());
        console.log($("#image-article").val());
        $.post("/articles/create", form.serialize(), function(result) {
            console.log("create !")
            console.log(result);
        })
        
    }
 */

    cancelEdit() {
        let me = this;
        $('#form-edit-article')[0].reset();
        $('#modal-edit-articles').hide();
    }
   
    beforeEdit() {

    }
    
    showEdit(id) {
        let me = this;
        console.log("showEdit()")
        $("#modal-edit-articles").show();
        me.beforeEdit(id);
    }

    beforeEdit(id) {
        let me = this;
        if (id) {

            $.get("categories/jsonList", function(result) {
                let categories = result.data;
    
                let categoriesOptions = "";
                categories.forEach(categorie => {
                    categoriesOptions += `<option value="${categorie.id}">${categorie.nom}</option>`;
                })
                
                $("#select-categories-edit").html(categoriesOptions);
    
            })
            
            $.get(`/articles/view/${id}/json`, function(result) {
                if (result.success) {

                    console.log(result);
                    $("#form-edit-article").attr("action", `/articles/update/${result.data.id}`);
                    $("#form-edit-article").find("input[name=nom_article]").val(result.data.nom);
                    $("#form-edit-article").find("input[name=detail_article]").val(result.data.detail);
                    $("#form-edit-article").find("input[name=prix_article]").val(result.data.prix);
                    $("#select-categories-edit").val(result.data.categories_id);

                    /* let optionValue;
                    if (result.data.active == true) {let optionValue = 1};
                    if (result.data.active == false) {let optionValue = 2};
                    $("#active-categorie").val(optionValue); */
                }
            })
        }
    }

    delete() {
        let me = this;
        let articleID = $("#article_id").val();
        
        $.post(`/articles/delete/${articleID}/json`, function(result) {
            if (result.success) {
                me.validAlert();
                me.list();
            }
            if (result.success == false) {
                me.errorAlert();
            }

        })
    }

    beforeDelete(id) {
        let me = this;
        if (id) {
            $.get(`/articles/view/${id}/json`, function(result) {
                if (result.success) {
                    $("#article_id").val(result.data.id);
                    $("#article_nom").val(result.data.nom);
                    $("#article_nom_delete").html(`<strong>${result.data.nom}</strong>`);
                }
            })
        }
    }
    
    showDelete(id) {
        let me = this;
        $("#modal-delete-articles").show();
        me.beforeDelete(id);
    }

    cancelDelete() {
        let me = this;
        $('#modal-delete-articles').hide();
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
                    <button class="btn btn-primary btn-sm btn-show-edit-article" data-id="${article.id}">Modifier</button>
                    <button class="btn btn-danger btn-sm btn-show-delete-article" data-id="${article.id}">Supprimer</button>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            me.tableResponsiveTitle();
            }
            if (articles.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucuns articles n\'a été trouvé');
            
            $('.btn-show-edit-article').on("click", function() {
                me.showEdit($(this).data("id"));
            })

            $('.btn-show-delete-article').on("click", function() {
                me.showDelete($(this).data("id"));
            })
            
        })
    }

    validAlert() {
        let me = this;
        me.cancelCreate();
        me.cancelEdit();
        me.cancelDelete();
        $("alert-success").show().alert();
    }

    errorAlert() {
        let me = this;
        me.cancelCreate();
        me.cancelEdit();
        me.cancelDelete();
        $("alert-failure").show('5000', function() {
            this.hide();
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

