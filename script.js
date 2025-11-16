// script.js
document.addEventListener('DOMContentLoaded', function() {

    /********** CATEGORY BUTTONS SWITCH **********/
    var categoryWrapper = document.querySelector('.product-categories');
    if (categoryWrapper) {
        var lists = document.querySelectorAll('.product-list');
        lists.forEach(function(list) {
            if (!list.classList.contains('active')) list.classList.add('hidden');
        });

        categoryWrapper.addEventListener('click', function(e) {
            var btn = e.target.closest('.category-btn');
            if (!btn) return;

            // Remove active class from all
            categoryWrapper.querySelectorAll('.category-btn').forEach(function(b){ b.classList.remove('active'); });

            // Add active to clicked
            btn.classList.add('active');

            // Show/Hide lists
            var target = btn.dataset.category;
            lists.forEach(function(list) {
                if (list.id === target + '-list') {
                    list.classList.remove('hidden');
                    list.style.display = 'block';
                } else {
                    list.classList.add('hidden');
                    list.style.display = 'none';
                }
            });
        });
    }

    /********** FLASH SALE COUNTDOWN **********/
    var FLASH_SALE_DURATION = 3600; // 1 jam
    var flashSaleEndTime = null;
    var flashTimer = null;
    var isFlashSaleActive = false;

    function initFlashSale() {
        var timer = document.getElementById('countdown-timer');
        var banner = document.getElementById('flash-sale-banner');

        try {
            var saved = localStorage.getItem('flashSaleEndTime');
            if (saved && +saved > Date.now()) {
                flashSaleEndTime = +saved;
            } else {
                flashSaleEndTime = Date.now() + FLASH_SALE_DURATION * 1000;
                localStorage.setItem('flashSaleEndTime', flashSaleEndTime);
            }
        } catch (_) {
            flashSaleEndTime = Date.now() + FLASH_SALE_DURATION * 1000;
        }

        function tick() {
            var distance = flashSaleEndTime - Date.now();
            if (distance <= 0) {
                isFlashSaleActive = false;
                if (banner) banner.style.display = 'none';
                if (timer) timer.textContent = 'Sale Selesai!';
                try { localStorage.removeItem('flashSaleEndTime'); } catch (_) {}
                clearInterval(flashTimer);
                return;
            }

            isFlashSaleActive = true;
            if (banner) banner.style.display = 'block';

            var h = Math.floor(distance / 3600000);
            var m = Math.floor((distance % 3600000) / 60000);
            var s = Math.floor((distance % 60000) / 1000);

            if (timer) {
                timer.textContent =
                    ('' + h).padStart(2,'0') + ':' +
                    ('' + m).padStart(2,'0') + ':' +
                    ('' + s).padStart(2,'0');
            }
        }

        tick();
        flashTimer = setInterval(tick, 1000);
    }

    initFlashSale();

    /********** WHATSAPP FORM HANDLER **********/
    var form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var nama = (document.getElementById('nama')?.value || '').trim();
            var telepon = (document.getElementById('telepon')?.value || '').trim();
            var kota = (document.getElementById('kota')?.value || '').trim();

            if (!nama || !telepon) {
                alert('Mohon isi nama dan nomor WhatsApp.');
                return;
            }

            var msg = 'Halo Primafood Rilldelish! 👋%0A' +
                      'Saya (Nama: ' + encodeURIComponent(nama) + ') telah mendaftar sebagai Reseller/Grosir via Landing Page.%0A%0A' +
                      'No. WhatsApp: ' + encodeURIComponent(telepon) + '%0A' +
                      'Lokasi Saya: ' + encodeURIComponent(kota) + '%0A%0A' +
                      'Mohon kirimkan info langkah order selanjutnya.' +
                      (isFlashSaleActive ? '%0A%0AMohon konfirmasi Diskon Flash Sale 5% saya (terkunci saat mendaftar).' : '');

            var waUrl = 'https://api.whatsapp.com/send?phone=628124966298&text=' + msg;

            window.open(waUrl, '_blank', 'noopener');
        });
    }

});
