$(document).ready(()=> {
    $('.btn-add-panier-submit').on('click', e => addToPanier(e));
    $('.delete-article-in-panier').on('click', e => removeToPanier(e));
    $('.edit-quantity-btn').on('click', e => modifyArticleQuantity(e));
});

const addToPanier = e => {
    e.preventDefault();
    // console.log(e.currentTarget.data('articleId'));
    const articleId = $(e.currentTarget).data('articleId');
    if (!$(`form[data-article-id="${articleId}"] input[name=user_id]`)) return false;
    let quantite = $(`form[data-article-id="${articleId}"] input[name=quantity]`).val();
    let userId = $(`form[data-article-id="${articleId}"] input[name=user_id]`).val()
    const data = {
        user_id :userId,
        article_id: articleId,
        quantite: quantite
    } 
    $.post('/paniers/create',data, result => {
        console.log(result);
        if (result.res === 'KO') return alert(result.message);

        if (result.res === 'OK' && $('.mon-panier-link').length === 0){
            $(`form[data-article-id="${articleId}"] input[name=quantity]`).val('')
            window.location.reload();
            return alert("votre article a été ajouter à votre panier");
        } 

        if (result.res === 'OK') {
            alert("votre article a été ajouter à votre panier")
            $(`form[data-article-id="${articleId}"] input[name=quantity]`).val('')
        }
    })

}

const removeToPanier = e => {
    e.preventDefault();
    let articleId = $(e.currentTarget).data('articleId');
    const panierId = $('[data-panier-id]').data('panierId');
    data = {
        user_id: $('[data-current-user-id]').data('currentUserId')
    }
    $.post(`/paniers/${panierId}/removeToPanier/${articleId}`, data, result => {
        // console.log(result)
        
        if (result.res === "OK") window.location.reload();

        return alert(result.message);
    })


}

const modifyArticleQuantity = e => {
    e.preventDefault();
    let articleId = $(e.currentTarget).data('articleId');
    const panierId = $('[data-panier-id]').data('panierId');
    data = {
        user_id: $('[data-current-user-id]').data('currentUserId'),
        quantite: $(`.quantite-input[data-article-id='${articleId}']`).val()
    }
    $.post(`/paniers/${panierId}/quantite/${articleId}`, data, result => {
        console.log(result);
        if (result.res === "OK") window.location.reload();
        return alert(result.message);
    })

}
// 