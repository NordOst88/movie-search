import Swiper from 'swiper';

export default class MySwiper {
  static createInstance() {
    const mySwiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet(index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        520: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        740: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1020: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 30,
      observer: true,
      updateOnImagesReady: true,
      preloadImages: true,
    });
    return mySwiper;
  }
}
