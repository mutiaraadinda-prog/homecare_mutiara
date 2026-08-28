document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const service = document.getElementById('service').value;

      alert(`Terima kasih Bpk/Ibu ${name}.\n\nPermintaan reservasi layanan "${service}" telah berhasil dikirim! Tim CareDove akan segera menghubungi nomor WhatsApp Anda.`);

      bookingForm.reset();
    });
  }
});