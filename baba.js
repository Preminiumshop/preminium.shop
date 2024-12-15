// Kaydırma kontrolü değişkenleri
let lastScrollTop = 0;
const header = document.getElementById('header');
const showOnScrollUp = 7; // Minimum yukarı kaydırma hareketi (piksel)

window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Eğer aşağı doğru kaydırılıyorsa header gizlensin
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.style.transform = "translateY(-100%)"; // Header gizleniyor
    } 
    // Yukarı doğru kaydırılıyorsa header görünsün
    else if (lastScrollTop - currentScroll > showOnScrollUp) {
        header.style.transform = "translateY(0)"; // Header tekrar açılıyor
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Negatif değerleri önle
});
