/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
        menuBtn.textContent = "×";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        menuBtn.textContent = "☰";

    });

});


/* =====================================
   SHOPPING CART
===================================== */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");


cartBtn.addEventListener("click", () => {

    cartOverlay.classList.add("show");

});


closeCart.addEventListener("click", () => {

    cartOverlay.classList.remove("show");

});


cartOverlay.addEventListener("click", event => {

    if (event.target === cartOverlay) {

        cartOverlay.classList.remove("show");

    }

});


/* =====================================
   ADD PRODUCT
===================================== */

function addToCart(name, price) {

    const existing = cart.find(
        product => product.name === name
    );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    cartOverlay.classList.add("show");

}


/* =====================================
   UPDATE CART
===================================== */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;
    let itemCount = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is currently empty.
            </p>
        `;

    }


    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;


        total += productTotal;

        itemCount += product.quantity;


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${product.name}
                </strong>

                <p>
                    ₦${product.price.toLocaleString()}
                    × ${product.quantity}
                </p>

            </div>

            <button
                onclick="removeFromCart(${index})"
                aria-label="Remove product"
            >
                ×
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartCount.textContent = itemCount;

    cartTotal.textContent =
        "₦" + total.toLocaleString();

}


/* =====================================
   REMOVE PRODUCT
===================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =====================================
   PRODUCT FILTER
===================================== */

function filterProducts(category, clickedButton) {

    const products =
        document.querySelectorAll(".product-card");


    const filters =
        document.querySelectorAll(".filter");


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });


    filters.forEach(button => {

        button.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        const matchingFilter =
            [...filters].find(button => {

                return button.textContent
                    .trim()
                    .toLowerCase() === category;

            });


        if (matchingFilter) {

            matchingFilter.classList.add("active");

        }

    }


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================
   WHATSAPP CHECKOUT
===================================== */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your shopping bag is empty.");

        return;

    }


    let message =
        "Hello Cathelia Collectables! 💗\n\n" +
        "I would like to place an order:\n\n";


    let total = 0;


    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;


        total += productTotal;


        message +=
            `• ${product.name} × ${product.quantity}` +
            ` — ₦${productTotal.toLocaleString()}\n`;

    });


    message +=
        `\nTotal: ₦${total.toLocaleString()}` +
        "\n\nPlease send me the payment and delivery details. Thank you!";


    /*
        REPLACE THIS WITH YOUR REAL
        WHATSAPP NUMBER.

        Example:

        const phoneNumber = "2348012345678";

        Do not add + or spaces.
    */


    const phoneNumber =
        "2349114307283";


    const whatsappURL =
        `https://wa.me/${phoneNumber}` +
        `?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    alert(
        "Thank you for contacting Cathelia Collectables! 💗\n\n" +
        "We'll get back to you as soon as possible."
    );


    contactForm.reset();

});


/* =====================================
   INITIALIZE
===================================== */

updateCart();