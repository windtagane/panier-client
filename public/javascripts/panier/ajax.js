$(document).ready(()=> {
    $('.btn-add-panier-submit').on('click', e => addToPanier(e));
});

const addToPanier = e => {
    e.preventDefault();
    // console.log(e.currentTarget.data('articleId'));
    const articleId = $(e.currentTarget).data('articleId');
    if (!$(`form[data-article-id="${articleId}"] input[name=user_id]`)) return false;
    const data = {
        user_id :$(`form[data-article-id="${articleId}"] input[name=user_id]`).val(),
        article_id: articleId,
        quantite: $(`form[data-article-id="${articleId}"] input[name=quantity]`).val()
    } 
    $.post('/paniers/create',data, result => {
        console.log(result);
    })

}