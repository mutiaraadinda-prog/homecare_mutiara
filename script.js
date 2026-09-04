document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. ANIMASI 1: KURSOR GELEMBUNG PASTEL (CANVAS EFEK)
     =================================================== */
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const colors = ['#F472B6', '#38BDF8', '#FCE7F3', '#BAE6FD'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 4;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.02;
      if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0 || particles[i].size <= 0.2) {
        particles.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ===================================================
     2. ANIMASI 2: SCROLL REVEAL (ELEMEN MUNCUL BERTAHALAP)
     =================================================== */
  const revealElements = document.querySelectorAll('.service-card, .profile-card, .highlight-card, .about-wrapper, .contact-container, .hero-text, .hero-image-wrapper');
  
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger pertama kali

  /* ===================================================
     3. ANIMASI 3: 3D TILT EFFECT UNTUK KARTU (INTERAKTIF)
     =================================================== */
  const cards = document.querySelectorAll('.service-card, .profile-card, .highlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  /* ===================================================
     4. HANDLING FORM PEMESANAN
     =================================================== */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const service = document.getElementById('service').value;

      alert(`✨ Terima kasih Bpk/Ibu ${name}.\n\nPermintaan reservasi untuk "${service}" telah diterima! Tim CareDove akan segera mengonfirmasi melalui WhatsApp Anda.`);
      bookingForm.reset();
    });
  }
});