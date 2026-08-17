const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');
const carouselDots = document.getElementById('carouselDots');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const modalClose = document.getElementById('modalClose');

let currentImages = [];
let currentIndex = 0;

function openModal(card) {
  const title = card.dataset.title;
  const images = card.dataset.images.split(',').map(i => i.trim());
  const description = card.dataset.description;
  const link = card.dataset.link;

  currentImages = images;
  currentIndex = 0;

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalLink.href = link;

  updateCarousel();
  renderDots();

  // Affiche/masque les flèches si une seule image
  const showControls = currentImages.length > 1;
  carouselPrev.style.display = showControls ? 'flex' : 'none';
  carouselNext.style.display = showControls ? 'flex' : 'none';
  carouselDots.style.display = showControls ? 'flex' : 'none';

  modal.classList.add('open');
}

function updateCarousel() {
  modalImage.src = currentImages[currentIndex];
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function renderDots() {
  carouselDots.innerHTML = '';
  currentImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    carouselDots.appendChild(dot);
  });
}

function closeModal() {
  modal.classList.remove('open');
}

document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const card = link.closest('.project-card');
    openModal(card);
  });
});

carouselPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
});

carouselNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateCarousel();
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});