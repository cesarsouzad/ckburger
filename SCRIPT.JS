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
// VARIÁVEIS DO NOVO MODAL
// ----------------------------------------------------
const modalConfirmacao = document.getElementById('modalConfirmacao');
const formularioCliente = document.getElementById('formularioCliente');
const fecharModalBtn = document.querySelector('.close-btn-modal');

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <div class="quantity-controls">
                    <button class="decrease-qty" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-qty" data-id="${item.id}">+</button>
                </div>
                <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="remove-from-cart" data-id="${item.id}">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCountSpan.textContent = cart.length > 0 ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

    // Eventos dos botões
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
}

// ===== FUNÇÃO DE MODAL DE ALERTA =====
const alertModal = document.getElementById('alertModal');
const alertMessage = document.getElementById('alertMessage');
const alertCloseBtn = document.getElementById('alertCloseBtn');

function showAlert(message) {
    alertMessage.textContent = message;
    alertModal.classList.remove('hidden');
}

alertCloseBtn.addEventListener('click', () => {
    alertModal.classList.add('hidden');
});



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
function increaseQuantity(event) {
    const id = event.target.dataset.id;
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
        updateCartDisplay();
    }
}

function decreaseQuantity(event) {
    const id = event.target.dataset.id;
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else if (item && item.quantity === 1) {
        // se quiser remover direto ao chegar em 0:
        cart = cart.filter(i => i.id !== id);
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
const whatsappNumber = '5531984833222'; // Seu número

// ----------------------------------------------------
// LÓGICA DE ABRIR/FECHAR MODAL
// ----------------------------------------------------

// 1. O clique no botão "Fazer Pedido via WhatsApp" AGORA SÓ ABRE O MODAL
checkoutWhatsappButton.addEventListener('click', () => {
    if (cart.length === 0) {
        showAlert('Seu carrinho está vazio. Adicione itens antes de fazer o pedido!');

        return;
    }
    // Fecha a sidebar do carrinho
    cartSidebar.classList.add('cart-hidden');
    // Abre o modal de dados
    modalConfirmacao.classList.remove('cart-hidden');
});

// 2. Fechar o modal pelo botão "x"
fecharModalBtn.addEventListener('click', () => {
    modalConfirmacao.classList.add('cart-hidden');
});

// 3. Fechar o modal clicando fora dele
modalConfirmacao.addEventListener('click', (event) => {
    if (event.target === modalConfirmacao) {
        modalConfirmacao.classList.add('cart-hidden');
    }
});


// ----------------------------------------------------
// LÓGICA DE ENVIO (NOVA FUNÇÃO)
// ----------------------------------------------------

formularioCliente.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // 1. Coleta os dados do cliente do formulário
    const clientName = document.getElementById('clienteNome').value;
    const clientRua = document.getElementById('clienteRua').value;
    const clientBairro = document.getElementById('clienteBairro').value;
    const clientReferencia = document.getElementById('clienteReferencia').value;
    const clientWhatsapp = document.getElementById('clienteWhatsapp').value;

    // 2. Monta a mensagem do pedido
    let orderMessage = `*NOVO PEDIDO - CK BURGER*\n\n`;
    orderMessage += `*Cliente:* ${clientName}\n`;
    orderMessage += `*WhatsApp/Contato:* ${clientWhatsapp}\n\n`;
    
    orderMessage += `*ENDEREÇO DE ENTREGA:*\n`;
    orderMessage += `Rua/Nº: ${clientRua}\n`;
    orderMessage += `Bairro: ${clientBairro}\n`;
    if (clientReferencia) {
        orderMessage += `Ponto de Ref.: ${clientReferencia}\n`;
    }
    orderMessage += `\n`;

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

    // Opcional: Limpar o carrinho e fechar o modal
    cart = [];
    updateCartDisplay();
    modalConfirmacao.classList.add('cart-hidden');
    formularioCliente.reset(); // Limpa os campos após o envio
    alert('Seu pedido será enviado para o WhatsApp! Finalize o envio na nova janela/aba.');
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