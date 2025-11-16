// script.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Tab Switching ---
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productLists = {
    'pure-veggie': document.getElementById('pure-veggie-list'),
    'coated': document.getElementById('coated-list'),
    'fruit': document.getElementById('fruit-list')
  };

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Aktifkan tombol
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Tampilkan list sesuai kategori
      Object.keys(productLists).forEach(cat => {
        if(cat === btn.dataset.category){
          productLists[cat].style.display = 'block';
        } else {
          productLists[cat].style.display = 'none';
        }
      });
    });
  });

  // --- Form Submission ---
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const whatsapp = contactForm.whatsapp.value.trim();
    const email = contactForm.email.value.trim();
    const note = contactForm.note.value.trim();

    if(!name || !whatsapp){
      alert('Nama dan WA wajib diisi!');
      return;
    }

    // Track Lead event Facebook Pixel
    if(window.fbq){
      fbq('track', 'Lead');
    }

    // Optional: Track submission event Google Analytics
    if(window.gtag){
      gtag('event', 'submit_reseller_form', {
        event_category: 'Form',
        event_label: 'Reseller Form'
      });
    }

    // Bisa kirim ke backend / WA API
    console.log('Form data:', {name, whatsapp, email, note});
    alert('Terima kasih, data Anda telah dikirim!');
    contactForm.reset();
  });
});
