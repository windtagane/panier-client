exports.data = `
<%if (locals.panier) { %>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 panel-liste-articles">
                <% Object.keys(panier.articles).forEach(function(key){ %>

                    <div data-article-id="<%=panier.articles[key].id%>"data-article-prix="<%= panier.articles[key].prix %>" data-article-image="<%= panier.articles[key].image %>" data-article-nom="<%= panier.articles[key].nom %>" class="row bg-white m-2 p-3 rounded ligne-panier-panel">

                        <div class="card-img-right col-6 col-sm-2">
                            <img class="w-100" src="<%if (locals.panier.articles[key]) { %>/uploads/<%=panier.articles[key].image%> <%}else{%> https://via.placeholder.com/150<%}%>" alt="<%if (locals.panier.articles[key]) { %> <%=panier.articles[key].nom%> <%}else{%> _article.nom<%}%>">
                        </div>
                        
                        <div class="col-5">
                            <div class="card-title">
                                <h5><%if (locals.panier.articles[key]) { %> <%=panier.articles[key].nom%> <%}else{%> _article.nom<%}%></h5>
                            </div>
                            <div class="card-text">
                                <%if (locals.panier.articles[key]) { %> <%=panier.articles[key].prix%> €<%}else{%> _article.prix<%}%>
                            </div>
                        </div>
                        
                        <div class="col col-sm-4">
                            <div class="form-group m-0">
                                <label>Quantité : 
                                    <input aria-label="Quantité"
                                    data-article-id="<%=panier.articles[key].id %>"
                                    value=<%if (locals.panier.articles[key]) { %> <%= panier.articles[key].quantite %><%}%>
                                    class="quantite-input form-control d-inline-block" min="1" type="number"
                                       >
                                </label>
                            </div>
                        </div>

                        <div class="col-1 button-delete text-right">
                            <button aria-label="Enlever du panier" data-article-id="<%=panier.articles[key].id %>" class="delete-article-in-panier fa fa-times text-danger bg-transparent border-0"></button>
                        </div>

                    </div>
                    
                <% }); %>
            </div>
            <div class="col-md-4 position-relative">
                <div class="row bg-white m-2 px-sm-3 py-3 rounded panel-prix-total">
                    
                        <div class="col">
                            <h3>Prix total:</h2>
                        </div>
                        <div class="col-auto">
                            <h3><span id="prix-total"><%=panier.prixTotal%></span> €</h2>
                        </div>

                        <div class="col-12 d-flex align-items-end justify-content-center p-0"><button class="btn btn-success order-btn font-weight-bold"><i class="fas fa-credit-card mr-2"></i>Commander</button></div>
                    
                </div>
    
            </div>
    
        </div>
        
    </div>
    

<%}else{%>
    <div class="col-12">
        
        <h4>Le panier est vide</h4>
    </div>
<%}%>
`