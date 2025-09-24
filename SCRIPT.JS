// Array para armazenar os itens do carrinho
let cart = [];

// Elementos do DOM
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartCountSpan = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const openCartButton = document.getElementById('open-cart-button');
const closeCartButton = document.getElementById('close-cart');
const checkoutWhatsappButton = document.getElementById('checkout-whatsapp');

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            <button class="remove-from-cart" data-id="${item.id}">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCountSpan.textContent = cart.length > 0 ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

    // Adiciona evento de remover ao novo botão
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Função para adicionar um item ao carrinho
function addToCart(event) {
    const productItem = event.target.closest('.product-item');
    const id = productItem.dataset.id;
    const name = productItem.dataset.name;
    const price = parseFloat(productItem.dataset.price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartDisplay();
}

// Função para remover um item do carrinho
function removeFromCart(event) {
    const idToRemove = event.target.dataset.id;
    const itemIndex = cart.findIndex(item => item.id === idToRemove);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // Remove o item se a quantidade for 1
        }
    }
    updateCartDisplay();
}


// Event Listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

openCartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('cart-hidden');
});

closeCartButton.addEventListener('click', () => {
    cartSidebar.classList.add('cart-hidden');
});

// Inicializa a exibição do carrinho
updateCartDisplay();

// Telefone do seu WhatsApp Business (com código do país e DDD, sem + ou outros caracteres especiais)
const whatsappNumber = '5531984833222'; // Exemplo: 55 para Brasil, 11 para DDD SP

checkoutWhatsappButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione itens antes de fazer o pedido!');
        return;
    }

    // 1. Coleta os dados do cliente (ex: nome e endereço)
    // Para simplificar, vou criar um prompt, mas você idealmente teria um formulário no seu checkout.
    const clientName = prompt('Qual o seu nome?');
    if (!clientName) return; // Se o cliente cancelar, não prossegue

    const clientAddress = prompt('Qual o seu endereço para entrega?');
    if (!clientAddress) return; // Se o cliente cancelar, não prossegue

    const clientPhone = prompt('Qual o seu telefone com DDD para contato?');
    if (!clientPhone) return; // Se o cliente cancelar, não prossegue

    // 2. Monta a mensagem do pedido
    let orderMessage = `*NOVO PEDIDO - CK BURGER*\n\n`;
    orderMessage += `*Cliente:* ${clientName}\n`;
    orderMessage += `*Endereço:* ${clientAddress}\n`;
    orderMessage += `*Telefone:* ${clientPhone}\n\n`;
    orderMessage += `*Itens do Pedido:*\n`;

    let total = 0;
    cart.forEach(item => {
        orderMessage += `- ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
        total += item.price * item.quantity;
    });

    orderMessage += `\n*Total do Pedido:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    orderMessage += `Aguardamos a confirmação!`;

    // 3. Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(orderMessage);

    // 4. Cria o link do WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // 5. Abre o link (irá abrir o WhatsApp do usuário)
    window.open(whatsappLink, '_blank');

    // Opcional: Limpar o carrinho após o envio
    cart = [];
    updateCartDisplay();
    alert('Seu pedido foi enviado! Em breve entraremos em contato via WhatsApp.');
});

// Inicializa o carrossel de ofertas
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    // ajuste proporção de tela e grid de produtos em carrosel
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});