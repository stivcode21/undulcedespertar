import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    img: '/assets/images/Pioneros-en-Desayunos-Sorpresa-Creando-momentos-inolvidables-con-amor-y-dedicacion.jpg',
    alt: 'Pioneros en Desayunos Sorpresa - Un Dulce Despertar',
  },
  {
    img: '/assets/images/bannerqs.png',
    alt: 'Desayunos sorpresa - Un Dulce Despertar',
  },
  {
    img: '/assets/images/bannertemporada-e1727744180230.png',
    alt: 'Temporada especial - Un Dulce Despertar',
  },
  {
    img: '/assets/images/BANNER-navidad-web-2026.jpg',
    alt: 'Regalos de Navidad - Un Dulce Despertar',
  },
  {
    img: '/assets/images/BANNER-HALLOWEEN-2026-WEB-.jpg',
    alt: 'Halloween especial - Un Dulce Despertar',
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative overflow-hidden group/slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={900}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.slider-next',
          prevEl: '.slider-prev',
        }}
        loop={true}
        grabCursor={true}
        touchRatio={1}
        allowTouchMove={true}
        style={{
          '--swiper-pagination-color': '#F0356B',
          '--swiper-pagination-bullet-inactive-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-opacity': '0.55',
          '--swiper-pagination-bullet-size': '10px',
          '--swiper-pagination-bullet-horizontal-gap': '5px',
        } as React.CSSProperties}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ cursor: 'grab' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '34%', minHeight: '200px' }}>
              <img
                src={slide.img}
                alt={slide.alt}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).parentElement!.style.background = '#FFF0F5';
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flechas custom */}
      <button
        className="slider-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
        aria-label="Anterior"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="slider-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
        aria-label="Siguiente"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style>{`
        .swiper-pagination { bottom: 14px !important; }
        .swiper-pagination-bullet { transition: all 0.35s ease; }
        .swiper-pagination-bullet-active { width: 26px !important; border-radius: 9999px !important; }
        .swiper-button-disabled { opacity: 0.3; pointer-events: none; }

        .swiper,
        .swiper-wrapper,
        .swiper-slide { cursor: grab !important; }

        .swiper:active,
        .swiper-wrapper:active,
        .swiper-slide:active { cursor: grabbing !important; }
      `}</style>
    </div>
  );
}
