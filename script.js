document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    /********** CATEGORY BUTTONS SWITCH **********/
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productLists = document.querySelectorAll('.product-list');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-category');

            // Update active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide product lists
            productLists.forEach(list => {
                if(list.id === target + '-list') {
                    list.style.display = 'block';
                } else {
                    list.style.display = 'none';
                }
            });
        });
    });

    /********** SMOOTH SCROLL TO FORM **********/
    const ctaButtons = document.querySelectorAll('.cta-button[href^="#"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const targetId = btn.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if(targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /********** FORM SUBMISSION LEAD TRACKING **********/
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Bisa diganti jika pakai submit server
            // Facebook Pixel Lead Event
            if(typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
            // Optional: tampilkan alert/success message
            alert('Terima kasih! Formulir Anda sudah terkirim.');
            contactForm.reset();
        });
    }

});
