// Arrow advance buttons in testimonial section
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#SBS-Arrow-Advance .section');
    let currentIndex = 0;

    // Show the initial section
    sections[currentIndex].classList.add('active');

    document.getElementById('next').addEventListener('click', () => {
        sections[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % sections.length;
        sections[currentIndex].classList.add('active');
    });

    document.getElementById('prev').addEventListener('click', () => {
        sections[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + sections.length) % sections.length;
        sections[currentIndex].classList.add('active');
    });
});
