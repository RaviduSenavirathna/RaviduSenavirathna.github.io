document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     NAVIGATION TOGGLE
  =============================== */

  const initNavigation = () => {
    const menuIcon = document.querySelector('#menu-icon');
    const navBar = document.querySelector('header nav');

    if (!menuIcon || !navBar) return;

    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navBar.classList.toggle('active');
    });
  };


  /* ===============================
     RESUME SECTION TOGGLE
  =============================== */

  const initResumeToggle = () => {
    const resumeBtns = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    if (!resumeBtns.length || !resumeDetails.length) return;

    resumeBtns.forEach(button => {
      button.addEventListener('click', () => {
        const targetClass = button.textContent.replace(/\s+/g, '');

        resumeBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        resumeDetails.forEach(detail => {
          detail.classList.remove('active');
          if (detail.classList.contains(targetClass)) {
            detail.classList.add('active');
          }
        });
      });
    });
  };


  /* ===============================
     PORTFOLIO SLIDER
  =============================== */

  const initPortfolioSlider = () => {
    const arrowRight = document.querySelector('.project-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.project-box .navigation .arrow-left');
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const projectDetails = document.querySelectorAll('.project-details');

    if (!arrowRight || !arrowLeft || !imgSlide || !projectDetails.length) return;

    let index = 0;
    const maxIndex = projectDetails.length - 1;

    const updateSlider = () => {
      imgSlide.style.transform =
        `translateX(calc(${index * -100}% - ${index * 2}rem))`;

      projectDetails.forEach(detail =>
        detail.classList.remove('active')
      );
      projectDetails[index].classList.add('active');

      arrowLeft.classList.toggle('disabled', index === 0);
      arrowRight.classList.toggle('disabled', index === maxIndex);
    };

    updateSlider();

    arrowRight.addEventListener('click', () => {
      if (index < maxIndex) {
        index++;
        updateSlider();
      }
    });

    arrowLeft.addEventListener('click', () => {
      if (index > 0) {
        index--;
        updateSlider();
      }
    });
  };


  /* certification page now uses portfolio slider; extra code removed */


  /* ===============================
     CONTACT FORM
  =============================== */

  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (!form || !toast) return;

    const showToast = (message, type = 'success') => {
      toast.textContent = message;
      toast.className = 'toast show ' + type;

      setTimeout(() => {
        toast.className = 'toast';
      }, 5000);
    };

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
        const response = await fetch(
          'https://formspree.io/f/xanlajkn',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        );

        if (response.ok) {
          showToast('✅ Message sent successfully!', 'success');
          form.reset();
        } else {
          showToast('❌ Failed to send message.', 'error');
        }
      } catch {
        showToast('⚠️ Network error.', 'error');
      }
    });
  };


  /* ===============================
     INITIALIZE EVERYTHING
  =============================== */

  initNavigation();
  initResumeToggle();
  initPortfolioSlider();
  initContactForm();

});
