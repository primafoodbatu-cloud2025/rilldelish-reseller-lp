<script>
    // Konfigurasi Flash Sale
    const FLASH_SALE_DURATION = 3600; // 1 Jam (3600 detik)
    let isFlashSaleActive = false;
    let flashSaleEndTime;
    
    // --- Fungsi Utama Timer ---
    function startCountdownTimer() {
        const timerElement = document.getElementById('countdown-timer');
        const bannerElement = document.getElementById('flash-sale-banner');
        
        const storedEndTime = localStorage.getItem('flashSaleEndTime');
        if (storedEndTime && parseInt(storedEndTime) > Date.now()) {
            flashSaleEndTime = parseInt(storedEndTime);
        } else {
            flashSaleEndTime = Date.now() + FLASH_SALE_DURATION * 1000;
            localStorage.setItem('flashSaleEndTime', flashSaleEndTime);
        }

        function updateTimer() {
            const now = Date.now();
            const distance = flashSaleEndTime - now;

            if (distance < 0) {
                isFlashSaleActive = false;
                if (bannerElement) bannerElement.style.display = 'none';
                if (timerElement) timerElement.textContent = 'Sale Selesai!';
                localStorage.removeItem('flashSaleEndTime');
                return;
            }

            isFlashSaleActive = true;
            if (bannerElement) bannerElement.style.display = 'block';

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (timerElement) {
                timerElement.textContent = 
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
            setTimeout(updateTimer, 1000);
        }
        updateTimer();
    }

    // --- Fungsionalitas WhatsApp (FORM KLAIM DISKON) ---
    function sendWhatsAppOrder(event) {
        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const telepon = document.getElementById('telepon').value;
        const kota = document.getElementById('kota').value;

        // Cek jika Flash Sale masih aktif saat submit
        let flashSaleNote = isFlashSaleActive ? "\n\nMohon konfirmasi Diskon Flash Sale 5% saya (terkunci saat mendaftar)." : "";

        // Format pesan WhatsApp
        const message = `
Halo Primafood Rilldelish! 👋
Saya (Nama: ${nama}) telah mendaftar sebagai Reseller/Grosir via Landing Page.

No. WhatsApp: ${telepon}
Lokasi Saya: ${kota}

Mohon kirimkan info langkah order selanjutnya.${flashSaleNote}

Terima kasih!
        `.trim(); 

        const whatsappNumber = '628124966298'; 
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        // ▼▼▼ KODE PIXEL EVENT 'Lead' ▼▼▼
        if (typeof fbq === 'function') { 
            fbq('track', 'Lead');
        }
        // ▲▲▲ AKHIR KODE PIXEL EVENT ▲▲▲
        
        window.open(whatsappUrl, '_blank');
    }

    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', function() {
        // Submit Form
        document.getElementById('whatsappForm').addEventListener('submit', sendWhatsAppOrder);
        
        // Mulai Timer Flash Sale
        startCountdownTimer();


        // --- Fungsionalitas Filtering Katalog Satuan ---
        const categoryButtons = document.querySelectorAll('.category-btn');
        const productLists = document.querySelectorAll('.product-list');
        const buahList = document.getElementById('fruit-list');
        const coatedList = document.getElementById('coated-list');
        if (buahList) buahList.style.display = 'none';
        if (coatedList) coatedList.style.display = 'none';

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-category');
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                productLists.forEach(list => {
                    if (list.id === targetId + '-list') {
                        list.style.display = 'block';
                    } else {
                        list.style.display = 'none';
                    }
                });
            });
        });
    });
    </script>
