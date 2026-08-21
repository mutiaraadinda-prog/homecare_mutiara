document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil nilai input
    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const layanan = document.getElementById('layanan-select').value;
    const alamat = document.getElementById('alamat').value;

    // Nomor WhatsApp Tujuan (Ganti dengan nomor WhatsApp Admin Anda, format: 628...)
    const nomorAdmin = "6281234567890"; 

    // Menyusun format pesan WhatsApp
    const pesan = `Halo Admin, saya ingin memesan layanan Homecare.%0A%0A` +
                  `*Nama:* ${encodeURIComponent(nama)}%0A` +
                  `*No. HP:* ${encodeURIComponent(telepon)}%0A` +
                  `*Layanan:* ${encodeURIComponent(layanan)}%0A` +
                  `*Alamat:* ${encodeURIComponent(alamat)}`;

    // Redirect ke URL WhatsApp
    const urlWhatsApp = `https://wa.me/${nomorAdmin}?text=${pesan}`;
    
    window.open(urlWhatsApp, '_blank');
});