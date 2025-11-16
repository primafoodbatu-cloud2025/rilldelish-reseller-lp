// script.js
document.addEventListener('DOMContentLoaded', function() {

    /********** CATEGORY BUTTONS SWITCH **********/
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productLists = document.querySelectorAll('.product-list');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            // Show the corresponding product list, hide others
            productLists.forEach(list => {
                if(list.id === `${category}-list`) {
                    list.style.display = 'block';
                    list.classList.add('active');
                } else {
                    list.style.display = 'none';
                    list.classList.remove('active');
                }
            });
        });
    });

    /********** SMOOTH SCROLL FOR CTA BUTTONS **********/
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /********** FORM SUBMISSION PLACEHOLDER **********/
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation example
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const wa = contactForm.querySelector('input[name="whatsapp"]').value.trim();

            if(!name || !wa) {
                alert('Mohon isi Nama Lengkap dan Nomor WA.');
                return;
            }

            // Placeholder submission action
            alert('Terima kasih! Form Anda telah dikirim. (Implementasikan AJAX/Backend sesuai kebutuhan)');

            // Optional: reset form
            contactForm.reset();
        });
    }

});
