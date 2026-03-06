// Countdown to 27. 6. 2026 14:00
const PARTY_DATE = new Date('2026-06-27T14:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = PARTY_DATE - now;

  if (diff <= 0) {
    document.getElementById('days').textContent  = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('mins').textContent  = '0';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById('days').textContent  = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('mins').textContent  = String(mins).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 30000);

// Animate cards on scroll
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

// RSVP button - pokud ještě není nastavena URL, schovat ji
const rsvpBtn = document.getElementById('rsvpBtn');
if (rsvpBtn && rsvpBtn.getAttribute('href') === 'RSVP_PLACEHOLDER') {
  rsvpBtn.style.display = 'none';
}
