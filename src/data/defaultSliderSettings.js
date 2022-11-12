export const defaultSliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  fade: false,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
      }
    },
    {
      breakpoint: 600,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      }
    }
  ]
};
