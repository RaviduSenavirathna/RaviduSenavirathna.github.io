// Navigation Bar Toggale
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('header .logo');

const activePage = () => {
  navLinks.forEach(link => {
    link.classList.remove('active');
  })
}

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      activePage();

      link.classList.add('active');
    }
  });
});

logoLink.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    activePage();

    navLinks[0].classList.add('active');
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

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
  const projectDetails = document.querySelectorAll('.project-details');

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

  projectDetails.forEach(detail => {
    detail.classList.remove('active');
  });
  projectDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
  if (index < 4) {
    index++;
    arrowLeft.classList.remove('disabled');
  }
  else {
    index = 5;
    arrowRight.classList.add('disabled');
  }
  activePortfolio();
});

arrowLeft.addEventListener('click', () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove('disabled');
  }
  else {
    index = 0;
    arrowLeft.classList.add('disabled');
  }
  activePortfolio();
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