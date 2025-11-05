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