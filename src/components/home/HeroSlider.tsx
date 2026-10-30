import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Todos los banners son 2195×644: se muestran completos (sin recorte) en cualquier ancho
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
        } as React.CSSProperties}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ cursor: 'grab' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '2195 / 644', background: '#FFF0F5' }}>
              <img
                src={slide.img}
                alt={slide.alt}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                draggable={false}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flechas custom — solo desktop; en mobile se navega con swipe */}
      <button
        className="slider-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-md hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        className="slider-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-md hidden md:flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      <style>{`
        .swiper { --swiper-pagination-bullet-size: 8px; --swiper-pagination-bullet-horizontal-gap: 4px; }
        .swiper-pagination { bottom: 6px !important; }
        @media (min-width: 768px) {
          .swiper-pagination { bottom: 14px !important; }
          .swiper { --swiper-pagination-bullet-size: 10px; --swiper-pagination-bullet-horizontal-gap: 5px; }
        }
        .swiper-pagination-bullet { transition: all 0.35s ease; }
        .swiper-pagination-bullet-active { width: 22px !important; border-radius: 9999px !important; }
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
