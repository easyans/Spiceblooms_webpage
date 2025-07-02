// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});

// Navbar background change on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-white/95");
    navbar.classList.remove("bg-white/90");
  } else {
    navbar.classList.add("bg-white/90");
    navbar.classList.remove("bg-white/95");
  }
});

// Counter animation
const counters = document.querySelectorAll("[data-count]");
const animateCounters = () => {
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const current = parseInt(counter.textContent);
    const increment = target / 100;

    if (current < target) {
      counter.textContent = Math.ceil(current + increment);
      setTimeout(() => animateCounters(), 20);
    } else {
      counter.textContent = target.toLocaleString();
    }
  });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector("[data-count]").closest("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});

if (statsSection) {
  observer.observe(statsSection);
}

// Form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We'll get back to you soon.");
  form.reset();
});

// Add scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animation to sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  animateOnScroll.observe(section);
});

// Hero section is visible by default
document.querySelector("#home").style.opacity = "1";
document.querySelector("#home").style.transform = "translateY(0)";

// Tailwind Css config...
// tailwind.config = {
//   theme: {
//     extend: {
//       colors: {
//         primary: "#FF6B35",
//         secondary: "#F7931E",
//         accent: "#FFB800",
//         dark: "#2D2D2D",
//         light: "#F8F9FA",
//       },
//       fontFamily: {
//         display: ["Inter", "system-ui", "sans-serif"],
//         body: ["Inter", "system-ui", "sans-serif"],
//       },
//     },
//   },
// };


// Testimonial Slider
const testimonialSlider = () => {
  const track = document.querySelector('.slide-track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Initialize
  dots[0].classList.add('bg-primary');
  
  // Auto rotate every 5 seconds
  const autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
  }, 5000);
  
  // Update slider position
  const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
          dot.classList.toggle('bg-primary', index === currentIndex);
          dot.classList.toggle('bg-gray-300', index !== currentIndex);
      });
  };
  
  // Dot click handlers
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentIndex = index;
          updateSlider();
          // Reset auto-slide timer
          clearInterval(autoSlide);
          autoSlide = setInterval(() => {
              currentIndex = (currentIndex + 1) % slideCount;
              updateSlider();
          }, 5000);
      });
  });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', testimonialSlider);