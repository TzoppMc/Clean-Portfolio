// Menggunakan Intersection Observer untuk efek animasi saat scroll
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Animasi jalan kalau 10% elemen udah masuk layar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Biar animasinya jalan sekali aja
            }
        });
    }, observerOptions);

    // Cari semua elemen yang punya class 'fade-element'
    const fadeElements = document.querySelectorAll(".fade-element");
    fadeElements.forEach(el => observer.observe(el));
});
