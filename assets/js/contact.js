const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const toast = document.getElementById('toast');

gsap.from('.container', { duration: 1, opacity: 0, y: 50, ease: 'power3.out' });
gsap.from('.form-group', { duration: 0.8, opacity: 0, y: 20, stagger: 0.2, ease: 'power3.out', delay: 0.5 });
gsap.from('.info-item', { duration: 0.8, opacity: 0, x: 20, stagger: 0.2, ease: 'power3.out', delay: 0.8 });

function showToast(message, isError = false) {
  console.log('showToast called with message:', message);
  if (!toast) {
    console.error('Toast element not found!');
    return;
  }
  toast.textContent = message;
  toast.style.backgroundColor = isError ? 'var(--orange-soda)' : 'var(--glaucous)';
  toast.classList.add('show');
  console.log('Toast classes after adding "show":', toast.classList);
  gsap.fromTo(toast,
    { y: -50, opacity: 0 },
    {
      duration: 0.5, y: 0, opacity: 1, ease: 'power3.out', onComplete: () => {
        console.log('GSAP animation completed');
      }
    }
  );
  setTimeout(() => {
    console.log('Timeout started for hiding toast');
    gsap.to(toast, {
      duration: 0.5,
      y: -50,
      opacity: 0,
      ease: 'power3.in',
      onComplete: () => {
        toast.classList.remove('show');
        console.log('Toast hidden');
      }
    });
  }, 3000);
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Sending...' : 'Send Message';
  submitButton.style.opacity = isLoading ? '0.7' : '1';
}

function validateForm() {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    const error = input.parentElement.querySelector('.error');
    if (error) error.remove();
    if (!input.value.trim()) {
      isValid = false;
      const errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
      input.parentElement.appendChild(errorElement);
    }
  });
  return isValid;
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (validateForm()) {
    setLoading(true);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://my-vercel-project-shankar.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        showToast(result.message || 'Message sent successfully!');
        form.reset();
        gsap.from('.form-group', { duration: 0.5, opacity: 0, y: 10, stagger: 0.1, ease: 'power3.out' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      showToast(error.message || 'An error occurred', true);
    } finally {
      setLoading(false);
    }
  }
});

// Animated background
const animatedBg = document.querySelector('.animated-bg');
for (let i = 0; i < 50; i++) {
  const span = document.createElement('span');
  span.style.width = `${Math.random() * 30 + 10}px`;
  span.style.height = span.style.width;
  span.style.left = `${Math.random() * 100}%`;
  span.style.animationDelay = `${Math.random() * 5}s`;
  animatedBg.appendChild(span);
}
// Debug: Check if toast element exists
console.log('Toast element:', toast);
