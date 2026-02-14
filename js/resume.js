const buttons = document.querySelectorAll('.resume-btn');
const details = document.querySelectorAll('.resume-detail');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    details.forEach(d => d.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});
