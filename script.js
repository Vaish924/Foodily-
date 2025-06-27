// Swiper Slider Initialization
var swiper = new Swiper('.swiper-container', {
    loop: true, // Infinite loop mode
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000, // Auto-slide every 3 seconds
    },
    effect: 'fade', // Optional: Add fade transition
});


