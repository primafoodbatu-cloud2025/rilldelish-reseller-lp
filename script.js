document.addEventListener("DOMContentLoaded", function () {
  // ==== Tab Switching ====
  const tabs = document.querySelectorAll(".category-btn");
  const tabPanels = document.querySelectorAll(".product-list");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Reset all tabs
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      // Reset all panels
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Activate current
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const category = tab.getAttribute("data-category");
      const panel = document.getElementById(`${category}-list`);
      if (panel) panel.classList.add("active");
    });
  });

  // ==== Form Handling ====
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.querySelector("#name").value.trim();
      const whatsapp = form.querySelector("#whatsapp").value.trim();
      const email = form.querySelector("#email").value.trim();
      const note = form.querySelector("#note").value.trim();

      if (!name || !whatsapp) {
        alert("Nama & Nomor WA wajib diisi!");
        return;
      }

      // Optional: simple validation
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Format email tidak valid!");
        return;
      }

      // Replace this with actual submission (Ajax, Google Sheet, API, etc.)
      console.log({ name, whatsapp, email, note });

      alert("Terima kasih, data Anda sudah terkirim!");
      form.reset();
    });
  }

  // ==== Performance Tip: Minimal DOM query caching ====
  // All DOM queries are cached above, event delegation used
});
