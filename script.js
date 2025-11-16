// script.js final

document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching ---
    const tabs = document.querySelectorAll('.category-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Show corresponding content
            const targetId = tab.getAttribute('aria-controls');
            tabContents.forEach(tc => {
                if(tc.id === targetId) {
                    tc.style.display = 'block';
                } else {
                    tc.style.display = 'none';
                }
            });
        });
    });

    // --- Form Handling ---
    const form = document.querySelector('.contact-form');
    if(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[name="name"]').value.trim();
            const whatsapp = form.querySelector('input[name="whatsapp"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const note = form.querySelector('textarea[name="note"]').value.trim();

            if(!name || !whatsapp){
                alert('Nama dan WhatsApp wajib diisi.');
                return;
            }

            // Simulate form submission (replace with your actual submission)
            console.log({name, whatsapp, email, note});
            alert('Terima kasih, data Anda telah dikirim.');
            form.reset();
        });
    }

    // --- Lazy load GTM & FB Pixel after LCP ---
    function loadTrackingScripts() {
        // Google Tag Manager
        const gtmScript = document.createElement('script');
        gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-M4C764ED4G";
        gtmScript.async = true;
        document.body.appendChild(gtmScript);

        gtmScript.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M4C764ED4G', { 'anonymize_ip': true });
        };

        // Facebook Pixel
        const fbScript = document.createElement('script');
        fbScript.src = "https://connect.facebook.net/en_US/fbevents.js";
        fbScript.async = true;
        document.body.appendChild(fbScript);

        fbScript.onload = () => {
            if(typeof fbq === "function") return;
            window.fbq = function(){window.fbq.callMethod ?
                window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)};
            window.fbq.queue = [];
            fbq('init', '203XXXXXX'); // replace with your FB Pixel ID
            fbq('track', 'PageView');
        };
    }

    // Load tracking after LCP (~2s)
    setTimeout(loadTrackingScripts, 2000);

});
