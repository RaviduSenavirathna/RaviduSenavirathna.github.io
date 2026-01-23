// Navigation Bar Toggale
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('header .logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navBar.classList.toggle('active');
});

const activePage = () => {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  sections.forEach(section => {
    section.classList.remove('active');
  });

  menuIcon.classList.remove('bx-x');
  navBar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      activePage();

      link.classList.add('active');

      sections[idx].classList.add('active');
    }
  });
});

logoLink.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    activePage();

    navLinks[0].classList.add('active');
    sections[0].classList.add('active');
  }
});


// Resume Section Toggle
const resumeBtn = document.querySelectorAll('.resume-btn');

resumeBtn.forEach(button => {
    button.addEventListener('click', () => {
        const resumeDetail = document.querySelectorAll('.resume-detail');
        const btnText = button.textContent;

        resumeBtn.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        resumeDetail.forEach(detail => {
            detail.classList.remove('active');
            if(detail.classList.contains(btnText.replace(/\s+/g, ''))) {
                detail.classList.add('active');
            }
        });
    });
});


// Portfolio Section Navigation
const arrowRight = document.querySelector('.project-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.project-box .navigation .arrow-left');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const projectDetails = document.querySelectorAll('.project-details');

let index = 0;
const maxIndex = projectDetails.length - 1;

const activePortfolio = () => {
  // Move images
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

  // Toggle project text
  projectDetails.forEach(detail => detail.classList.remove('active'));
  projectDetails[index].classList.add('active');

  // Handle button states
  arrowLeft.classList.toggle('disabled', index === 0);
  arrowRight.classList.toggle('disabled', index === maxIndex);
};

// Initial state
activePortfolio();

// Right arrow
arrowRight.addEventListener('click', () => {
  if (index < maxIndex) {
    index++;
    activePortfolio();
  }
});

// Left arrow
arrowLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
    activePortfolio();
  }
});


// Contact Form Submission
const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast show ' + type;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      toast.className = 'toast';
    }, 5000);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value
    };

    showToast('📤 Sending...', 'info');

    try {
      const response = await fetch('https://formspree.io/f/xanlajkn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast('✅ Message sent successfully!', 'success');
        form.reset();
      } else {
        showToast('❌ Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      showToast('⚠️ Network error. Please try again later.', 'error');
    }
  });


// Certification Slider (Slide Animation)
const certSlider = document.querySelector('.certification-slider');
const certSlides = document.querySelectorAll('.cert-slide');
const certRight = document.querySelector('.cert-right');
const certLeft = document.querySelector('.cert-left');

let certIndex = 0;

const updateCertSlider = () => {
  certSlider.style.transform = `translateX(-${certIndex * 100}%)`;
};

certRight.addEventListener('click', () => {
  if (certIndex < certSlides.length - 1) {
    certIndex++;
    certLeft.classList.remove('disabled');
  }
  if (certIndex === certSlides.length - 1) {
    certRight.classList.add('disabled');
  }
  updateCertSlider();
});

certLeft.addEventListener('click', () => {
  if (certIndex > 0) {
    certIndex--;
    certRight.classList.remove('disabled');
  }
  if (certIndex === 0) {
    certLeft.classList.add('disabled');
  }
  updateCertSlider();
});


// Certificate meta text fade loop (Year ↔ Issued By)
document.querySelectorAll('.cert-slide').forEach(slide => {
  const year = slide.querySelector('.meta-year');
  const issuer = slide.querySelector('.meta-issuer');

  if (!year || !issuer) return;

  let showYear = true;

  setInterval(() => {
    year.classList.toggle('active', showYear);
    issuer.classList.toggle('active', !showYear);
    showYear = !showYear;
  }, 3500);
});