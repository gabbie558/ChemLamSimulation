const modal = document.getElementById('helpModal');
const helpBtn = document.getElementById('helpLink');
const closeBtn = document.querySelector('.close');
const closeModalBtn = document.getElementById('closeModalBtn');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
modal.style.display = 'block';
// Show modal with fade-in effect
helpBtn.onclick = () => {
  modal.classList.remove('hide');
  modal.classList.add('show');
  modal.style.display = 'block';
  showSlide(currentSlide);
};

// Close modal with fade-out effect
function closeModal() {
  modal.classList.remove('show');
  modal.classList.add('hide');

  // Wait for fade-out animation to complete before hiding
  setTimeout(() => {
    modal.style.display = 'none';
  }, 400); // Duration matches CSS animation
}

// Close modal when clicking close buttons
closeBtn.onclick = closeModal;
closeModalBtn.onclick = closeModal;

// Close modal when clicking outside content
window.onclick = (event) => {
  if (event.target === modal) closeModal();
};

// Show slide based on index
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// Next button functionality
document.querySelectorAll('.nextBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
});

// Back button functionality
document.querySelectorAll('.backBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });
});
