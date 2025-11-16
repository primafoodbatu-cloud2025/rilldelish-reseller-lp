// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- CATEGORY BUTTONS SWITCH ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productLists = document.querySelectorAll('.product-list');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');

            // Remove active class from buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show target product list, hide others
            productLists.forEach(list => {
                if (list.id === targetCategory + '-list') {
                    list.style.display = 'block';
                    list.classList.add('active');
                } else {
                    list.style.display = 'none';
                    list.classList.remove('active');
                }
            });
        });
    });

    // --- FORM SUBMISSION ---
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple validation (HTML5 required handles most)
        const name = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();

        if (!name || !whatsapp) {
            alert('Harap isi nama dan nomor WA!');
            return;
        }

        // Optional: send data via AJAX (placeholder)
        // fetch('/submit-form', { method: 'POST', body: new FormData(contactForm) });

        // Simulate success
        alert('Terima kasih! Formulir Anda telah dikirim.');
        contactForm.reset();
    });

    // --- OPTIONAL: Smooth scroll for CTA button ---
    const ctaButton = document.querySelector('.cta-button[href^="#"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

