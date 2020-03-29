export default class User {
    
    init() {
        let me = this;
        let btnUsers = $('#admin-btn-users');
        let btnCancelEdit = $(".btn-cancel-edit-user");
        let btnCancelDelete = $(".btn-cancel-delete-user");
        let btnEdit = $("#btn-edit-user");
        let btnDelete = $("#btn-delete-user");
        
        btnUsers.on('click', function() {
            me.add();
            me.list();
        })

        btnCancelEdit.on("click", function() {
            me.cancelEdit();
        })
        
        btnCancelDelete.on("click", function() {
            me.cancelDelete();
        })

        btnEdit.on("click", function() {
            me.edit();
        })

        btnDelete.on("click", function() {
            me.delete();
        })
        
    }

    add() {
        let me = this;
        $("#panel-add").html('');
    }

    showEdit(id) {
        let me = this;
        $("#modal-edit-users").show();
        me.beforeEdit(id);
    }

    beforeEdit(id) {
        let me = this;
        if (id) {
            
            $.get(`/users/view/${id}/json`, function(result) {
                if (result.success) {
                    $("#user_id_edit").val(result.data.id);
                    $("#form-edit-user").find("input[name=nom_user]").val(result.data.nom);
                    $("#form-edit-user").find("input[name=prenom_user]").val(result.data.prenom);
                    $("#form-edit-user").find("input[name=adresse_user]").val(result.data.adresse);
                    $("#form-edit-user").find("input[name=email_user]").val(result.data.email);
                    $("#form-edit-user").find("input[name=telephone_user]").val(result.data.telephone);
                    $("#form-edit-user").find("input[name=role_user]").val(result.data.role);
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
        let form = $("#form-edit-user");
        let userID = $("#user_id_edit").val();
        
        $.post("/users/update/" + userID, form.serialize(), function(result) {
            if (result.success) {
                me.validAlert();
                me.list();
            }
            if (result.success == false) {
                me.errorAlert();
            }

        })
    }

    cancelEdit() {
        $('#form-edit-user')[0].reset();
        $('#modal-edit-users').hide();
    }
    
    showDelete(id) {
        let me = this;
        console.log("showEdit()")
        $("#modal-delete-users").show();
        me.beforeDelete(id);
    }

    cancelDelete() {
        $("#modal-delete-users").hide();
    }

    delete() {
        let me = this;
        let userID = $("#user_id_delete").val();
        
        $.post(`/users/delete/${userID}/json`, function(result) {
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
            $.get(`/users/view/${id}/json`, function(result) {
                if (result.success) {
                    $("#user_id_delete").val(result.data.id);
                }
            })
        }
    }

    list() {
        let me = this;
        if (me.getUrlVars()["tab"] !== "users") history.replaceState('', 'Users', '/admin?tab=users'); // (@data , @title of page, @new route)
        $.get('users/jsonList', function(users) {
            if (users.data) {
            let tableHead = `
            <table class="table table-responsive table-striped">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Email</th>
            <th scope="col">Adresse</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Rôle</th>
            <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>`
            let tableEnd = `</tbody></table>`
            let rows = "";
            const currentUserId = $('[data-current-user-id]').data('currentUserId')

            users.data.forEach((user, index) => {
                let row = `
                <tr>
                    <td scope="row">${index + 1}</td>
                    <td>${user.nom}</td>
                    <td>${user.prenom}</td>
                    <td>${user.email}</td>
                    <td>${user.adresse}</td>
                    <td>${user.telephone}</td>
                    <td>${user.role}</td>
                    <td class="col">
                        <button class="btn btn-primary btn-sm btn-show-edit-user" data-id="${user.id}">Modifier</button>
                        ${currentUserId != user.id ? `<button class="btn btn-danger btn-sm btn-show-delete-user" data-id="${user.id}">Supprimer</button>` : ``}
                    </td>
                </tr>`
                rows += row;
            });
            let datatable = tableHead + rows + tableEnd;
            $('#data-display').html(datatable);
            me.tableResponsiveTitle();
            }
            if (users.data == 0) $('#data-display').html('<span class="d-flex justify-content-center">Aucuns utilisateurs n\'a été trouvé');

            $('.btn-show-edit-user').on("click", function() {
                me.showEdit($(this).data("id"));
            })

            $('.btn-show-delete-user').on("click", function() {
                me.showDelete($(this).data("id"));
            })

        })

    }

    validAlert() {
        let me = this;
        me.cancelEdit();
        me.cancelDelete();
        $("alert-success").show().alert();
    }

    errorAlert() {
        let me = this;
        me.cancelEdit();
        me.cancelDelete();
        $("alert-failure").show('5000', function() {
            this.hide();
        })
    }

    //________________________TROUVER PLUS PROPRE
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