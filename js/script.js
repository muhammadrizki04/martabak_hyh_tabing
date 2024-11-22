document.addEventListener("DOMContentLoaded", () => {
    setupOrderSummary();
    setupWhatsAppButton();
    setupContactForm();
});

// Menambahkan item ke keranjang
let cart = [];

function setupOrderSummary() {
    const orderSummary = document.getElementById("order-summary");
    const orderList = document.getElementById("order-list");
    const whatsappBtn = document.getElementById("whatsapp-order");

    function updateOrderSummary() {
        orderList.innerHTML = ""; // Menghapus item sebelumnya
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `  
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                ${item.name} - Rp${item.price}
            `;
            total += parseFloat(item.price.replace("Rp", "").replace(",", "").trim());
            orderList.appendChild(listItem);
        });

        orderSummary.innerHTML = `Total Belanja: Rp${total.toLocaleString()}`;
    }

    window.addToCart = function (item) {
        cart.push(item);
        updateOrderSummary();
    };

    // Update tombol WhatsApp
    window.whatsappOrder = function () {
        const cartDetails = cart.map(item => `${item.name}: Rp${item.price}`).join("\n");
        const totalAmount = `Total: Rp${cart.reduce((total, item) => total + parseFloat(item.price.replace("Rp", "").replace(",", "").trim()), 0).toLocaleString()}`;
        const message = `Halo, saya ingin memesan:\n${cartDetails}\n\n${totalAmount}`;
        const whatsappUrl = `https://wa.me/6282288475030?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
}

// Mengirim pesan menggunakan EmailJS
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const notification = document.getElementById("contact-notification");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm("service_xxxxx", "template_xxxxx", this).then(
            function (response) {
                notification.textContent = "Pesan berhasil dikirim!";
                notification.style.color = "green";
            },
            function (error) {
                notification.textContent = "Gagal mengirim pesan, coba lagi.";
                notification.style.color = "red";
            }
        );
    });
}

// Menampilkan gambar modal
function openModal(imageSrc) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

// Menutup modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
