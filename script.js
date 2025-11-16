document.addEventListener("DOMContentLoaded", function () {
    // --- Tab Switching ---
    const categoryButtons = document.querySelectorAll(".category-btn");
    const productLists = document.querySelectorAll(".product-list");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from buttons
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Hide all lists
            productLists.forEach(list => list.classList.remove("active"));

            // Show corresponding list
            const category = btn.dataset.category;
            const listToShow = document.getElementById(`${category}-list`);
            if (listToShow) listToShow.classList.add("active");
        });
    });

    // --- Form Accessibility & Validation ---
    const form = document.querySelector(".contact-form");
    if (form) {
        // Add explicit label association for screen readers
        form.querySelectorAll("input, textarea").forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.tagName.toLowerCase() === "label") {
                input.setAttribute("aria-labelledby", label.innerText.replace(/\s/g, "_"));
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.querySelector("input[name='name']").value.trim();
            const whatsapp = form.querySelector("input[name='whatsapp']").value.trim();
            const email = form.querySelector("input[name='email']").value.trim();
            const note = form.querySelector("textarea[name='note']").value.trim();

            if (!name || !whatsapp) {
                alert("Nama dan Nomor WA wajib diisi.");
                return;
            }

            // Example: replace this with your real form submission (AJAX/fetch)
            console.log({
                name,
                whatsapp,
                email,
                note
            });

            alert("Terima kasih, data Anda telah dikirim.");
            form.reset();
        });
    }
});
