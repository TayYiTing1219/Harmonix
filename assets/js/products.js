let listProductHTML = document.querySelector('.listProduct');
let listProducts = [];

const addDatatoHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <div class="card rounded-0">
                <img class="card-img rounded-0 img-fluid" src="${product.image}">
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled">
                        <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <a href="shop-single.html" class="h3 text-decoration-none">${product.name}</a>
                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li class="">Colour: ${product.colour}</li>
                </ul>
                <p class="price mb-0">${product.price}</p>
            </div>    
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
