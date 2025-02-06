let iconCart = document.querySelector('.icon-cart');
let closeCart =document.querySelector('.close')
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let checkOutButton = document.querySelector('.checkOut');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDatatoHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="card mb-4 product-wap rounded-0 ">
                    <div class="card rounded-0">
                        <img class="card-img rounded-0 img-fluid" src="${product.image}">
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul class="list-unstyled">
                                <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2 addCart"><i class="fas fa-cart-plus"></i></a></li>
                            </ul>
                        </div>
                    </div>
                
                    <div class="card-body">
                        <a href="shop-single.html" class="h3 text-decoration-none">${product.name}</a>
                        <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                            <li class="">Colour: ${product.colour}</li>
                        </ul>
                        <p class="price mb-0">$${product.price}</p>
                    </div>
                    
                </div>
                <button class="addCart">Add To Cart</button>
                `
            ;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id)
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;

            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            if (positionProduct !== -1) {
                let info = listProducts[positionProduct];
                newCart.innerHTML = `
                    <div class="image">
                        <img src="${info.image}" alt="">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">$${info.price * cart.quantity}</div>
                    <div class="quantity" data-id="${cart.product_id}">
                        <span class="minus">-</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                listCartHTML.appendChild(newCart);
            } else {
                console.error(`Product with id ${cart.product_id} not found.`);
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id)
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
            
            default:
                let valueChange = carts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

checkOutButton.addEventListener('click', () => {
    clearCart();
});
const clearCart = () => {
    sessionStorage.setItem('orderSummary', JSON.stringify(carts));
    carts = [];
    localStorage.removeItem('cart');
    addCartToHTML();
    iconCartSpan.innerText = 0;
    body.classList.remove('showCart');
    window.location.href = 'payment.html';
};

checkOutButton.addEventListener('click', () => {
    window.location.href = 'payment.html';
});
const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDatatoHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();