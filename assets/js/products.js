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
    listProductHTML.innerHTML = "";
    if (listProducts.length > 0) {
        listProducts.forEach((product) => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("item");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <div class="card mb-4 product-wap rounded-0">
                    <div class="card rounded-0">
                        <img class="card-img rounded-0 img-fluid" src="${product.image}">
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul class="list-unstyled">
                                <li><a class="btn btn-success text-white" href="shop-single.html?id=${product.id}"><i class="far fa-heart"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html?id=${product.id}"><i class="far fa-eye"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2 addCart"><i class="fas fa-cart-plus"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="card-body text-center">
                        <a href="shop-single.html?id=${product.id}" class="h3 text-decoration-none">${product.name}</a>
                        <ul class="list-unstyled text-center mb-2">
                            <li><strong>Colour:</strong> ${product.colour}</li>
                        </ul>
                        <p class="price mb-3">$${product.price}</p>
                        <button class="btn btn-success w-100 addCart"><i class="fas fa-cart-plus"></i> Add To Cart</button>
                    </div>
                </div>
            `;

            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener("click", (event) => {
    let clickedElement = event.target;
    
    // Check if the clicked element is the "Add to Cart" button or icon
    if (clickedElement.classList.contains("addCart") || clickedElement.closest(".addCart")) {
        let productElement = clickedElement.closest(".item");
        let productId = productElement.dataset.id;

        addToCart(productId);
    }
});

const addToCart = (productId) => {
    let product = listProducts.find((p) => p.id == productId);
    let cartItemIndex = carts.findIndex((item) => item.product_id == productId);

    if (cartItemIndex >= 0) {
        carts[cartItemIndex].quantity += 1;
    } else {
        carts.push({
            product_id: productId,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }

    updateCartDisplay();
    saveCartToLocalStorage();
};

const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
};

// ✅ Load the cart when the page starts
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        updateCartDisplay();
    }
});

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}
const updateCartDisplay = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;

    carts.forEach(cartItem => {
        totalQuantity += cartItem.quantity;

        let cartHTML = `
            <div class="cart-item">
                <img src="${cartItem.image}" alt="${cartItem.name}">
                <div class="cart-details">
                    <h5>${cartItem.name}</h5>
                    <p>Price: $${cartItem.price}</p>
                    <p>Quantity: ${cartItem.quantity}</p>
                </div>
            </div>
        `;

        listCartHTML.innerHTML += cartHTML;
    });

    iconCartSpan.innerText = totalQuantity;
};
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