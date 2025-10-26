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