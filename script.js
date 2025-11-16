// script.js
document.addEventListener('DOMContentLoaded', () => {

    /********** CATEGORY BUTTON SWITCH **********/
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productLists = document.querySelectorAll('.product-list');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.dataset.category;

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show corresponding product list
            productLists.forEach(list => {
                if(list.id === `${targetCategory}-list`) {
                    list.style.display = 'block';
                    list.classList.add('active');
                } else {
                    list.style.display = 'none';
                    list.classList.remove('active');
                }
            });
        });
    });

    /********** FORM SUBMISSION TRACKING **********/
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            // Facebook Lead tracking
            if(window.fbq) fbq('track', 'Lead');

            // Optional: Google Analytics event
            if(window.gtag) gtag('event', 'submit', {
                'event_category': 'Form',
                'event_label': 'Reseller Signup'
            });

            // Simulasi submit (ganti dengan AJAX atau form action Anda)
            alert('Terima kasih! Formulir Anda telah terkirim.');

            form.reset();
        });
    }

});
