$(document).ready(()=> {
    showPanier();
    if(panier) $('#panier-badge').text(Object.keys(JSON.parse(panier).articles).length) 
});
userId = $("[data-current-user-id]").data('currentUserId') || 'guest';


const showPanier = (modalPanier = false) =>{
    panier = (localStorage.getItem(`localPanier-${userId}`));
    data = {panier};
    data.modal = modalPanier;
    $.post(`/paniers/dataPanier?modalPanier=${modalPanier}`,data, result => {
        $("#panier").html(result);
        if (modalPanier) $("#panier-modal-container").html(result);
        if(panier) $('#panier-badge').text(Object.keys(JSON.parse(panier).articles).length) 

        $('.quantite-input').on('change', e => modifyArticleQuantity(e));
        $('.delete-article-in-panier').on('click', e => removeToPanier(e));
        $('.order-btn').on('click', e => orderFromPanier(e));
    });
}

const orderFromPanier = () => {
    if (userId == 'guest') return window.location.href = '/signup';
    localPanier = JSON.parse(localStorage.getItem(`localPanier-${userId}`));
    data = {};
    Object.keys(localPanier.articles).forEach(article =>{
        data[localPanier.articles[article].id] = {};
        data[localPanier.articles[article].id].id = localPanier.articles[article].id;
        data[localPanier.articles[article].id].quantite = localPanier.articles[article].quantite;
    })

    req= {panier:JSON.stringify(data)}

    $.post('/paniers/confirmation',req, result => {
        if (result.res === "OK") {
            localStorage.removeItem(`localPanier-${userId}`);
            $('#panier').html('<h2 class="col">Le panier est vide</h2>');
            if ($('.modal-backdrop.fade.show').length) $('#right-panier-modal').modal('hide')
            
        }
        alert(result.message);
    })
}