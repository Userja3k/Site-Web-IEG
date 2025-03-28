// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  updateThemeIcon(true);
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
  themeToggle.innerHTML = isDark
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
}

// Hero Slider
const slides = [  
  {
    image: 'Slide/Header-Img.jpg',        
    title: 'Empowering Through Education',
    description: 'Our educational initiatives help build stronger, more resilient communities for the future.'
    
  },

  {
    image: 'Slide/Header-Img2.jpg',
    title: 'Building Communities',
    description: 'We work together with local communities to create lasting positive change and sustainable development.'
  },
  {
    image: 'Slide/Header-Img3.jpg',
    title: 'Making a Positive Impact',
    description: 'Impact Eco Group is committed to creating sustainable solutions and fostering positive change in communities.'
  }  
];

let currentSlide = 0;


const heroSlider = document.querySelector('.hero-slider');
const heroDots = document.querySelector('.hero-dots');

// Create slides
slides.forEach((slide, index) => {
  const slideElement = document.createElement('div');
  slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
  slideElement.style.backgroundImage = `url('${slide.image}')`;
  
  const content = document.createElement('div');
  content.className = 'slide-content';
  content.setAttribute('data-aos', 'fade-up');
  content.innerHTML = `
    <h1>${slide.title}</h1>
    <p>${slide.description}</p>
    <button class="cta-button">Learn More</button>
  `;
  
  slideElement.appendChild(content);
  heroSlider.appendChild(slideElement);
  
  // Add event listener for the button
  const learnMoreButton = content.querySelector('.cta-button');
  learnMoreButton.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
  
  // Create dot
  const dot = document.createElement('button');
  dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
  dot.addEventListener('click', () => goToSlide(index));
  heroDots.appendChild(dot);
});

function goToSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.hero-dot');
  
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Auto-advance slides
setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 5000);

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
    } else {
      document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
    }
  });
});

// Page Navigation
function loadPage(pageName) {
  fetch(`pages/${pageName}.html`)
    .then(response => response.text())
    .then(html => {
      document.querySelector('main').innerHTML = html;
      // Reinitialize AOS for new content
      AOS.refresh();
      // Scroll to top
      window.scrollTo(0, 0);
    });
}

// Update navigation
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('href');
    loadPage(page);
    
    // Update active state
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    e.target.classList.add('active');
  });
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('href').substring(1);
    loadPage(page);
    
    // Update active state
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Load home page by default
loadPage('home');

// Form submission
document.addEventListener('submit', (e) => {
  if (e.target.id === 'contact-form') {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Here you would typically send the data to a server
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Message sent successfully!');
    e.target.reset();
  }
});

// Like and comment functionality
document.addEventListener('click', (e) => {
  if (e.target.closest('.like-btn')) {
    alert('Comment feature coming soon!');
  }
});

