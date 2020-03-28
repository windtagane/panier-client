export default class Categorie {
    init() {
        let me = this;
        console.log("new Categorie loaded")
        let btnCategories = $('#admin-btn-categories');
        let btnCreate = $('#btn-create-categorie');
        let btnShowCreate = $('#btn-show-create-categorie');
        let btnCancelCreate = $('.btn-cancel-create-categorie');
        let btnEdit = $("#btn-edit-categorie");
        let btnShowEdit = $('.btn-show-edit-categorie');
        let btnCancelEdit = $('.btn-cancel-edit-categorie');
        let btnCancelDelete = $('.btn-cancel-delete-categorie');
        let btnDelete = $("#btn-delete-categorie");
        
        btnCategories.on('click', function() {
            me.add();
            me.list();
        })

        btnCreate.on("click", function() {
            me.create();
        })

        btnEdit.on("click", function() {
            me.edit();
        })

        btnDelete.on("click", function() {
            me.delete();
        })
        
        btnCancelCreate.on("click", function() {
            me.cancelCreate();
        })

        btnCancelEdit.on("click", function() {
            me.cancelEdit();
        })

        btnCancelDelete.on("click", function() {
            me.cancelDelete();
        })
      
    }
    
    add() {
        let me = this;
        let btn = '<button class="btn btn-success" id="btn-show-create-categorie">Ajouter une catégorie</button>';
        $('#panel-add').html(btn);

        $('#btn-show-create-categorie').on("click", function() {
            me.showCreate();
        })
    }
    
    showCreate() {
        console.log("click btnShowCreateCategorie");
        $('#modal-create-categories').show();
    }

    cancelCreate() {
        $('#form-create-categorie')[0].reset();
        $('#modal-create-categories').hide();
    }
    
    create() {
        let me = this;
        let form = $("#form-create-categorie");
        
        $.post("/categories/create", form.serialize(), function(result) {
            if (result.success) {
                me.validCreate();
                me.list();
            }
            if (result.success == false) {
                me.errorCreate();
            }

        })
    }

  

    showEdit(id) {
        let me = this;
        console.log("showEdit()")
        $("#modal-edit-categories").show();
        me.beforeEdit(id);
    }

    beforeEdit(id) {
        let me = this;
        if (id) {
            $.get(`/categories/view/${id}/json`, function(result) {
                if (result.success) {
                    $("#categorie_id_edit").val(result.data.id);
                    $("#form-edit-categorie").find("input[name=nom_categorie]").val(result.data.nom);
                    /* let optionValue;
                    if (result.data.active == true) {let optionValue = 1};
                    if (result.data.active == false) {let optionValue = 2};
                    $("#active-categorie").val(optionValue); */
                }
            })

            
        }
    }

    
    edit() {
        let me = this;
        let form = $("#form-edit-categorie");
        let categorieID = $("#categorie_id_edit").val();
        
        $.post("/categories/update/" + categorieID, form.serialize(), function(result) {
            if (result.success) {
                me.validCreate();
                me.list();
            }
            if (result.success == false) {
                me.errorCreate();
            }

        })
    }

    cancelEdit() {
        $('#form-edit-categorie')[0].reset();
        $('#modal-edit-categories').hide();
    }

    delete() {
        let me = this;
        let categorieID = $("#categorie_id_delete").val();
        
        $.post(`/categories/delete/${categorieID}/json`, function(result) {
            if (result.success) {
                me.validCreate();
                me.list();
            }
            if (result.success == false) {
                me.errorCreate();
            }

        })
    }

    beforeDelete(id) {
        let me = this;
        if (id) {
            $.get(`/categories/view/${id}/json`, function(result) {
                if (result.success) {
                    $("#categorie_id_delete").val(result.data.id);
                    $("#categorie_nom").val(result.data.nom);
                    $("#categorie_nom_delete").html(`<strong>${result.data.nom}</strong>`);
                }
            })
        }
    }
    
    showDelete(id) {
        let me = this;
        $("#modal-delete-categories").show();
        me.beforeDelete(id);
    }

    cancelDelete() {
        let me = this;
        $('#modal-delete-categories').hide();
    }
    
    list() {
        let me = this;
        if (me.getUrlVars()["tab"] !== "categories") history.replaceState('', 'Categories', '/admin?tab=categories'); // (@data , @title of page, @new route)
        $.get('categories/jsonList', function(categories) {
            if (categories.data) {
            let tableHead = `
            <table class="table table-responsive table-striped">
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
                    <td scope="row">${index + 1}</td>
                    <td>${categorie.nom}</td>
                    <td>${categorie.active}</td>
                    <td class="col">
                        <button class="btn btn-primary btn-sm btn-show-edit-categorie" data-id="${categorie.id}">Modifier</button>
                        <button class="btn btn-danger btn-sm btn-show-delete-categorie" data-id="${categorie.id}">Supprimer</button>
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            me.tableResponsiveTitle();
            }

            if (categories.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucunes categories n\'a été trouvé');

            $('.btn-show-edit-categorie').on("click", function() {
                me.showEdit($(this).data("id"));
            })

            $('.btn-show-delete-categorie').on("click", function() {
                me.showDelete($(this).data("id"));
            })
            
        })
    }

    validCreate() {
        let me = this;
        me.cancelCreate();
        me.cancelEdit();
        me.cancelDelete();
        $("alert-success").show().alert();
    }

    errorCreate() {
        let me = this;
        me.cancelCreate();
        me.cancelEdit();
        me.cancelDelete();
        $("alert-failure").show('5000', function() {
            this.hide();
        })
    }
    
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