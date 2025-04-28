// src/components/CategoryCards.tsx
import { Link } from "react-router-dom";
import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const CategoryCards = () => {
  const desktopHeight = 'md:h-[calc(100vh-4rem-60vh)]'; // Hoặc chiều cao bạn muốn
  const gridRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(gridRef, { threshold: 0.1 });
  const isVisible = entry?.isIntersecting;

  const cardItems = [
    { to: "/music", img: "/music-bg.png", alt: "Music", title: "MUSIC" },
    { to: "/program", img: "/program-bg.jpg", alt: "Program", title: "PROGRAM" },
    { to: "/commission", img: "/commission-bg.png", alt: "Commission", title: "COMMISSION" },
  ];

  return (
    // Container chính của CategoryCards
    <div className={`container mx-auto px-4 md:px-6 py-6 md:py-8 ${desktopHeight} w-full h-full flex flex-col`}>
      {/* Grid container - THÊM CÁC LỚP CĂN CHỈNH Ở ĐÂY */}
      <div ref={gridRef} className="grid grid-cols-1 content-stretch justify-center items-stretch md:grid-cols-3 gap-4 md:gap-6 flex-grow min-h-0 w-full"> {/* <--- THÊM content-stretch justify-center items-stretch */}
        {cardItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={`
              group relative aspect-video md:aspect-auto rounded-2xl overflow-hidden min-h-0 shadow-md hover:shadow-lg
              transition-all duration-500 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
            `}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"> {/* Tăng nhẹ overlay */}
              <h2 className="text-white text-xl md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105 text-center"> {/* Căn giữa text */}
                {item.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;