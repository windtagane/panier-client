$(document).ready(()=> {
    $('.delete-article-in-panier').on('click', e => removeToPanier(e));
    $('.quantite-input').on('change', e => modifyArticleQuantity(e));
    $('.btn-add-panier-submit').on('click', e => addToLocalPanier(e));
    $('.btn-number').click(e => changeBtnNumber(e));
    
});
const userId = $("[data-current-user-id]").data('currentUserId') || 'guest';


const addToLocalPanier = e =>{
    e.preventDefault();
    const articleId = $(e.currentTarget).data('articleId');
    let quantite = Number($(`form[data-article-id="${articleId}"] input[name=quantity]`).val());
    let prixArticle = Number($(e.currentTarget).data('articlePrix'));
    let nomArticle = $(e.currentTarget).data('articleNom');
    let ImageArticle = $(e.currentTarget).data('articleImage');


    // si pas de panier local, on le créé ici
    if (localStorage.getItem(`localPanier-${userId}`) === null) {
        let panier = {
            articles: {},
            prixTotal: 0
        }
        localStorage.setItem(`localPanier-${userId}`, JSON.stringify(panier));
    }
    // parse la variable local pour en faire en objet
    let localPanier = JSON.parse(localStorage.getItem(`localPanier-${userId}`));

    // si l'article est déja quand le panier déduit le prix
    present = false
    if (localPanier.articles[articleId]){
        localPanier.prixTotal -= localPanier.articles[articleId].quantite * localPanier.articles[articleId].prix;
    } 

    const article = new Article(articleId,quantite,prixArticle,nomArticle,ImageArticle);
    localPanier.articles[articleId] = article;
    localPanier.prixTotal += prixArticle * quantite;
    localStorage.setItem(`localPanier-${userId}`, JSON.stringify(localPanier)); // on enregistre dans le local storage
    showPanier(true);
    $('#right-panier-modal').modal();
}

function Article(id, quantite, prix, nom, image) {
    this.id = id;
    this.quantite = quantite;
    this.prix = prix;
    this.nom = nom;
    this.image = image;
    this.id = id;
}

const removeToPanier = e => {
    e.preventDefault();
    let confirmation = confirm("Vous êtes sûr de retirer cet article de votre panier ?");
    if (confirmation == false) return false;

    let articleId = $(e.currentTarget).data('articleId');
    let localPanier = JSON.parse(localStorage.getItem(`localPanier-${userId}`));


    localPanier.prixTotal -= localPanier.articles[articleId].quantite * localPanier.articles[articleId].prix;
    delete localPanier.articles[articleId];
    
    localStorage.setItem(`localPanier-${userId}`, JSON.stringify(localPanier)); // on enregistre dans le local storage

    $(`.ligne-panier-panel[data-article-id="${articleId}"]`).hide('slow',function(){$(this).remove()});
    $('#prix-total').text(localPanier.prixTotal);
    
    $('#panier-badge').text($('#panier-badge').text() - 1) 
    if (!Object.keys(localPanier.articles).length){
        localStorage.removeItem(`localPanier-${userId}`);
        $('#panier').html('<h2 class="col">Le panier est vide</h2>');
    }
}

const modifyArticleQuantity = e => {
    e.preventDefault();

    let articleId = $(e.currentTarget).data('articleId');

    let quantite = $(`.quantite-input[data-article-id='${articleId}']`).val();
    if (quantite < 1) quantite = 1;
    let prixArticle = Number($(`div[data-article-id='${articleId}']`).data('articlePrix'));
    let nomArticle = $(`[data-article-id='${articleId}']`).data('articleNom');
    let ImageArticle = $(`[data-article-id='${articleId}']`).data('articleImage');
    let localPanier = JSON.parse(localStorage.getItem(`localPanier-${userId}`));

    localPanier.prixTotal -= localPanier.articles[articleId].quantite * localPanier.articles[articleId].prix;

    const article = new Article(articleId,quantite,prixArticle,nomArticle,ImageArticle);
    localPanier.articles[articleId] = article;
    localPanier.prixTotal += prixArticle * quantite;
    $('#prix-total').text(localPanier.prixTotal);
    localStorage.setItem(`localPanier-${userId}`, JSON.stringify(localPanier)); // on enregistre dans le local storage

}

const changeBtnNumber = e => {
    fieldName = $(e.currentTarget).data('field');
    type = $(e.currentTarget).data('type');
    const input = $(`input[data-field="${fieldName}"]`);
    const currentVal = parseInt(input.val());
    if (!Number(currentVal)) return input.val(1);

    if(type == 'plus') {
        if(currentVal < input.attr('max')) input.val(currentVal + 1).change();
        if(parseInt(input.val()) == input.attr('max')) $(e.currentTarget).attr('disabled', true);
        $(`.btn-number[data-field="${fieldName}"][data-type="minus"]`).attr('disabled', false);
    }

    if(type == 'minus') {
        if(currentVal > input.attr('min')) input.val(currentVal - 1).change();
        if(parseInt(input.val()) == input.attr('min')) $(e.currentTarget).attr('disabled', true);
        $(`.btn-number[data-field="${fieldName}"][data-type="plus"]`).attr('disabled', false);
    }

}
