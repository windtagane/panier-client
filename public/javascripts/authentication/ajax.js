$(document).ready(()=> {
    $('#login-submit-btn').on('click', e => login(e));
    $('#signup-submit-btn').on('click', e => signup(e));
})

const login = e => {
    e.preventDefault();
    if ($('#login-form').parsley().validate() !== true) return false
        
    let data = {
        email_user: $('#login-email').val(),
        password_user: $('#login-password').val()
    }
    $.post('/login', data, result => {
        if (result.res === 'KO') return alert('Identifiants incorrect');

        if (result.res === 'OK') window.location.href = '/'  
    })
}

const signup = e => {
    e.preventDefault(); 
    if ($('#signup-form').parsley().validate() !== true) return false
    let data = {}
    $('#signup-form input').each((i,el)=>{
        let name = $(el).attr('name');
        let value = $(el).val();
        data[name] = value; // 
    }) 
    $.post('/signup', data, result => {
        if (result.res === 'KO') return alert(result.message);

        if (result.res === 'OK'){
            if (localStorage.getItem('localPanier-guest')) {
                guestPanier = localStorage.getItem('localPanier-guest');
                localStorage.setItem(`localPanier-${result.userId}`, guestPanier);
                localStorage.removeItem('localPanier-guest');
                return window.location.href = '/paniers/mon-panier';
            }
            window.location.href = '/';
        } 
    })

}