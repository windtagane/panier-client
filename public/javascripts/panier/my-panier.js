$(document).ready(()=> {
    showPanier();
});

const showPanier = () =>{
    const userId = $("[data-current-user-id]").data('currentUserId');
    panier = (localStorage.getItem(`localPanier-${userId}`));
    data = {panier};
    $.post('/paniers/dataPanier',data, result => {
        $("#panier").html(result);

        $('.quantite-input').on('change', e => modifyArticleQuantity(e));
        $('.delete-article-in-panier').on('click', e => removeToPanier(e));
        $('.order-btn').on('click', e => orderFromPanier(e));
    });
}

const orderFromPanier = () => {
    const userId = $("[data-current-user-id]").data('currentUserId');
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
        }
        alert(result.message);
    })
}