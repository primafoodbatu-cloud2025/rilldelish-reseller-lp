// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------
    // 1) Product Category Tab Switching
    // -----------------------------
    const categoryButtons = document.querySelectorAll(".category-btn");
    const productLists = document.querySelectorAll(".product-list");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-category");

            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            // Show target product list, hide others
            productLists.forEach(list => {
                if (list.id === `${target}-list`) {
                    list.classList.add("active");
                } else {
                    list.classList.remove("active");
                }
            });
        });
    });

    // -----------------------------
    // 2) Contact Form Submission (prevent default & minimal validation)
    // -----------------------------
    const contactForm = document.querySelector(".contact-form");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name").trim();
        const whatsapp = formData.get("whatsapp").trim();
        const email = formData.get("email").trim();
        const note = formData.get("note").trim();

        if (!name || !whatsapp) {
            alert("Nama dan Nomor WA wajib diisi!");
            return;
        }

        // Minimal feedback for demonstration (replace with AJAX/endpoint as needed)
        alert(`Terima kasih ${name}, data Anda telah terkirim!`);

        contactForm.reset();
    });

    // -----------------------------
    // 3) Lazy-load non-critical external scripts
    // -----------------------------
    function loadExternalScript(src, callback) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = callback || function () {};
        document.body.appendChild(script);
    }

    // Load Facebook Pixel and GTM scripts after initial render
    setTimeout(() => {
        // GTM already async/defer in HTML; optional: load additional analytics if needed
        // loadExternalScript("https://www.googletagmanager.com/gtag/js?id=G-M4C764ED4G");
        // loadExternalScript("https://connect.facebook.net/en_US/fbevents.js");
    }, 3000);

});
