const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const orderForm = document.getElementById('orderForm');
const formMessage = document.getElementById('formMessage');
const revealElements = document.querySelectorAll('.animate-on-scroll');

function toggleMenu() {
  hamburger.classList.toggle('active');
  navbar.classList.toggle('open');
}

function closeMenu() {
  hamburger.classList.remove('active');
  navbar.classList.remove('open');
}

function filterMenu(category) {
  menuItems.forEach((item) => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block';
      item.classList.remove('animate-on-scroll');
      setTimeout(() => {
        item.classList.add('animate-on-scroll');
      }, 10);
    } else {
      item.style.display = 'none';
    }
  });

  filterButtons.forEach((btn) => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

function setupFilterButtons() {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const category = btn.getAttribute('data-filter');
      filterMenu(category);
    });
  });
}

function setupScrollReveal() {
  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.1,
  });

  revealElements.forEach((element) => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const name = formData.get('name') || 'Customer';

  formMessage.textContent = `Thanks ${name}! Your order has been placed. We'll prepare it fresh and deliver within 30 minutes!`;
  formMessage.style.color = '#fca311';

  orderForm.reset();

  setTimeout(() => {
    formMessage.textContent = '';
  }, 5000);
}

function setupAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll('.btn-small');
  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const menuItem = btn.closest('.menu-item');
      const itemName = menuItem.querySelector('h3').textContent;
      const price = menuItem.querySelector('.price').textContent;

      btn.textContent = 'Added!';
      btn.style.background = '#fca311';

      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '#ff6b35';
      }, 2000);

      console.log(`Added: ${itemName} - ${price}`);
    });
  });
}

function setupNavLinks() {
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function setupHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.borderBottomColor = '#ff6b35';
    } else {
      header.style.borderBottomColor = 'rgba(255, 107, 53, 0.15)';
    }
  });
}

function init() {
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  setupFilterButtons();
  setupScrollReveal();
  setupAddToCartButtons();
  setupNavLinks();
  setupHeaderScroll();

  if (orderForm) {
    orderForm.addEventListener('submit', handleFormSubmit);
  }

  if (window.innerWidth <= 768) {
    document.addEventListener('touchend', () => {
      if (navbar.classList.contains('open')) {
        closeMenu();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
