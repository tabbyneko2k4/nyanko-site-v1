// src/components/PortfolioGrid.tsx
import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

// Định nghĩa lại kiểu Item (có thể import từ Index.tsx nếu muốn dùng chung)
interface PortfolioItem {
  id: number;
  title: string;
  image?: string; // URL ảnh (tùy chọn)
  videoId?: string; // ID video YouTube (tùy chọn)
}

interface PortfolioGridProps {
  title: string;
  items: PortfolioItem[];
}

const PortfolioGrid = ({ title, items }: PortfolioGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(gridRef, { threshold: 0.05 });
  const isVisible = entry?.isIntersecting;

  // Xác định icon dựa trên title (ví dụ)
  const titleIcon = title.toUpperCase().includes("MUSIC") ? "🎵" : title.toUpperCase().includes("PROGRAM") ? "💻" : "✨";

  // Kiểm tra xem có items nào không trước khi render grid
  if (!items || items.length === 0) {
      // Có thể trả về null hoặc một thông báo nhỏ nếu logic này nằm trong PortfolioGrid
      // Tuy nhiên, chúng ta đã xử lý trường hợp rỗng trong Index.tsx, nên trường hợp này ít xảy ra trừ khi gọi từ nơi khác
      // return <p className="text-center text-muted-foreground">No items to display.</p>;
      return null; // Trả về null nếu không có items (logic hiển thị "Not available" đã ở Index.tsx)
  }


  return (
    // Container chính của component (không cần padding và bg ở đây vì đã thêm ở section cha trong Index.tsx)
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 flex items-center justify-center transition-opacity duration-500 text-foreground dark:text-primary-foreground"
            style={{ opacity: isVisible ? 1 : 0 }}>
          <span className="text-3xl md:text-4xl mr-3">{titleIcon}</span>
          {title}
        </h2>

        {/* Grid container */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 content-stretch justify-center items-stretch md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`
                bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg group
                flex flex-col /* Đảm bảo nội dung xếp chồng lên nhau */
                transition-all duration-500 ease-out
                hover:shadow-xl dark:hover:shadow-primary/20 hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* --- Media Container (Video hoặc Image) --- */}
              <div className="relative w-full"> {/* Container để giữ tỷ lệ */}
                {item.videoId ? (
                  // Hiển thị YouTube Video
                  <div className="aspect-video bg-black rounded-t-2xl overflow-hidden"> {/* aspect-video để giữ tỷ lệ 16:9 */}
                    <iframe
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full" // Iframe lấp đầy container
                    ></iframe>
                  </div>
                ) : item.image ? (
                  // Hiển thị Image
                  <div className="aspect-video md:aspect-auto md:h-[200px] overflow-hidden rounded-t-2xl"> {/* Giữ chiều cao cố định hoặc aspect ratio */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                   // Placeholder nếu không có cả videoId và image
                   <div className="aspect-video md:aspect-auto md:h-[200px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-muted-foreground rounded-t-2xl">
                    No Media Available
                  </div>
                )}
              </div>
              {/* --- End Media Container --- */}

              {/* Text content */}
              <div className="p-4 md:p-5 flex-grow"> {/* flex-grow để đẩy footer xuống nếu card có chiều cao khác nhau */}
                <h3 className="text-lg font-semibold text-foreground dark:text-gray-100">{item.title}</h3>
                {/* Optional: Add description */}
                {/* <p className="text-sm text-muted-foreground mt-1 line-clamp-2">Optional short description here...</p> */}
              </div>

              {/* Optional: Footer cho card (ví dụ: link đến project) */}
               {/* <div className="p-4 pt-0 border-t border-border dark:border-gray-700">
                 <a href="#" className="text-sm text-primary hover:underline">View Details</a>
               </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrid;