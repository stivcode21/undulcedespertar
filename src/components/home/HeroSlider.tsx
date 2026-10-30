import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    img: '/assets/images/BANNER-navidad-web-2026.jpg',
    alt: 'Regalos de Navidad - Un Dulce Despertar',
  },
  {
    img: '/assets/images/BANNER-HALLOWEEN-2026-WEB-.jpg',
    alt: 'Halloween especial - Un Dulce Despertar',
  },
  {
    img: '/assets/images/bannerqs.png',
    alt: 'Desayunos sorpresa - Un Dulce Despertar',
  },
  {
    img: '/assets/images/bannertemporada-e1727744180230.png',
    alt: 'Temporada especial - Un Dulce Despertar',
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
        style={{ '--swiper-pagination-color': '#F0356B', '--swiper-pagination-bullet-inactive-color': '#ffffff', '--swiper-pagination-bullet-inactive-opacity': '0.6' } as React.CSSProperties}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full" style={{ paddingTop: '40%' }}>
              <img
                src={slide.img}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).parentElement!.style.background = '#FFF0F5';
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
