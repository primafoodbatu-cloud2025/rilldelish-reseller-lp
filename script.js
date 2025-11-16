document.addEventListener('DOMContentLoaded', function () {
    // =========================
    // 1) Tab Switching
    // =========================
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productLists = {
        'pure-veggie': document.getElementById('pure-veggie-list'),
        'coated': document.getElementById('coated-list'),
        'fruit': document.getElementById('fruit-list')
    };

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const selected = btn.dataset.category;

            // Toggle active button
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show selected list
            Object.keys(productLists).forEach(key => {
                if (key === selected) {
                    productLists[key].style.display = 'block';
                    productLists[key].classList.add('active');
                } else {
                    productLists[key].style.display = 'none';
                    productLists[key].classList.remove('active');
                }
            });
        });
    });

    // =========================
    // 2) Form Submission (basic)
    // =========================
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // For demo purposes: show alert
            alert(`Terima kasih ${data.name}! Form Anda telah terkirim.`);

            form.reset();
        });
    }

    // =========================
    // 3) Lazy-load External Scripts
    // =========================
    function lazyLoadScript(src, callback) {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.onload = callback || function(){};
        document.body.appendChild(s);
    }

    // Example: GTM or FB Pixel can be lazy-loaded if needed
    // lazyLoadScript('https://www.googletagmanager.com/gtag/js?id=G-M4C764ED4G');

    // =========================
    // 4) Accessibility: add focus outline
    // =========================
    const allFocusable = document.querySelectorAll('button, a, input, textarea');
    allFocusable.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #27ae60';
            el.style.outlineOffset = '2px';
        });
        el.addEventListener('blur', () => {
            el.style.outline = 'none';
        });
    });
});
