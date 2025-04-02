// Create stars background
const stars = document.querySelector('.stars');

for (let i = 0; i < 200; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  // Random position
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  // Random size
  const size = Math.random() * 2;

  // Random animation delay
  const delay = Math.random() * 5;

  star.style.left = `${x}%`;
  star.style.top = `${y}%`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDelay = `${delay}s`;

  stars.appendChild(star);
}

// Create orbital system
const orbitalSystem = document.querySelector('.orbital-system');

// Create orbits
for (let i = 1; i <= 5; i++) {
  const orbit = document.createElement('div');
  orbit.classList.add('orbit');

  const size = i * 100;
  orbit.style.width = `${size}px`;
  orbit.style.height = `${size}px`;
  orbit.style.animationDuration = `${20 + i * 5}s`;

  // Create planet
  const planet = document.createElement('div');
  planet.classList.add('planet');

  const planetSize = Math.max(4, 10 - i * 1.5);
  planet.style.width = `${planetSize}px`;
  planet.style.height = `${planetSize}px`;

  // Position planet on orbit
  const angle = Math.random() * Math.PI * 2;
  const orbitRadius = size / 2;
  const planetX = Math.cos(angle) * orbitRadius;
  const planetY = Math.sin(angle) * orbitRadius;

  planet.style.left = `${planetX}px`;
  planet.style.top = `${planetY}px`;

  orbit.appendChild(planet);
  orbitalSystem.appendChild(orbit);
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY <= hero.offsetHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
    orbitalSystem.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});

// 3D effect for skill cards
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;

    card.style.transform = `translateZ(20px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
  });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animation on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'all 1s ease';
  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {
        // Fade out the overlay when page loads
        setTimeout(() => {
            const overlay = document.getElementById('transition-overlay');
            overlay.style.opacity = '0';

            // Remove overlay after transition completes
            setTimeout(() => {
                overlay.remove();
            }, 600);
        }, 100);
});