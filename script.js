{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // script.js\
document.addEventListener('DOMContentLoaded', function() \{\
\
    /********** CATEGORY BUTTONS SWITCH **********/\
    const categoryButtons = document.querySelectorAll('.category-btn');\
    const productLists = document.querySelectorAll('.product-list');\
\
    categoryButtons.forEach(button => \{\
        button.addEventListener('click', () => \{\
            const category = button.getAttribute('data-category');\
\
            // Hapus active di semua tombol\
            categoryButtons.forEach(btn => btn.classList.remove('active'));\
            // Set active pada tombol yang diklik\
            button.classList.add('active');\
\
            // Tampilkan list produk sesuai kategori, sembunyikan yang lain\
            productLists.forEach(list => \{\
                if (list.id === category + '-list') \{\
                    list.style.display = 'block';\
                \} else \{\
                    list.style.display = 'none';\
                \}\
            \});\
        \});\
    \});\
\
\
    /********** FLASH SALE COUNTDOWN **********/\
    const flashBanner = document.getElementById('flash-sale-banner');\
    const countdownEl = document.getElementById('countdown-timer');\
\
    if (flashBanner && countdownEl) \{\
        flashBanner.style.display = 'block';\
\
        // Durasi countdown dalam detik (contoh 1 jam = 3600 detik)\
        let countdown = 3600;\
\
        const interval = setInterval(() => \{\
            const hours = String(Math.floor(countdown / 3600)).padStart(2, '0');\
            const minutes = String(Math.floor((countdown % 3600) / 60)).padStart(2, '0');\
            const seconds = String(countdown % 60).padStart(2, '0');\
\
            countdownEl.textContent = `$\{hours\}:$\{minutes\}:$\{seconds\}`;\
\
            countdown--;\
\
            if (countdown < 0) \{\
                clearInterval(interval);\
                countdownEl.textContent = '00:00:00';\
                flashBanner.style.display = 'none';\
            \}\
        \}, 1000);\
    \}\
\
\
    /********** FORM SUBMIT KE WHATSAPP **********/\
    const form = document.getElementById('whatsappForm');\
\
    form.addEventListener('submit', function(e) \{\
        e.preventDefault();\
\
        const name = document.getElementById('nama').value.trim();\
        const phone = document.getElementById('telepon').value.trim();\
        const city = document.getElementById('kota').value.trim();\
\
        if (!name || !phone || !city) \{\
            alert('Harap isi semua data yang diperlukan!');\
            return;\
        \}\
\
        // Buat pesan WhatsApp\
        const message = `Halo Primafood Rilldelish, saya $\{name\} dari $\{city\}. Saya berminat jadi reseller.`;\
\
        // Buka WhatsApp di tab baru\
        window.open(`https://wa.me/$\{phone\}?text=$\{encodeURIComponent(message)\}`, '_blank');\
    \});\
\
\});\
}