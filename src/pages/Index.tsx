// src/pages/Index.tsx
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import CategoryCards from "../components/CategoryCards";
import PortfolioGrid from "../components/PortfolioGrid";
import Footer from "../components/Footer";
import { Link } from "react-router-dom"; // Import Link for "See More" button
import { Button } from "@/components/ui/button"; // Optional: Use Shadcn Button for consistency

// Định nghĩa kiểu cho một mục portfolio (có thể là ảnh hoặc video)
interface PortfolioItem {
  id: number;
  title: string;
  image?: string; // URL ảnh (tùy chọn)
  videoId?: string; // ID video YouTube (tùy chọn)
}

// Dữ liệu cho Music Producer - Sử dụng videoId
// Thay thế "YOUTUBE_VIDEO_ID_X" bằng ID thực tế của video YouTube của bạn
const musicItems: PortfolioItem[] = [
  { id: 1, videoId: "WNn3WhG4T_E", title: "Tabby Neko - The Weekend Coffee" },
  { id: 2, videoId: "VtcYFCBUmWk", title: "Tabby Neko - Adorable" },          
  { id: 3, videoId: "LigIs5LDOf0", title: "Lặng - Compa ft.Nhii (Kimchisushi, Tabby Neko Remix)" },       
  { id: 4, videoId: "7W_O-wABToc", title: "麦吉_Maggie x 盖盖Nyan - Summertime (Nyanko, Beninoki Remix)" },
  { id: 5, videoId: "eCTjt3vY2kk", title: "nyanko - summer rain" },
  { id: 6, videoId: "DbXNVlSy-Yw", title: "Padoru Padoru (Nyanko Remix)" },
];

// Dữ liệu cho Programming - Để trống để hiển thị "Not Available Now"
const programmingItems: PortfolioItem[] = [
    // Ví dụ nếu sau này có project:
    // { id: 7, image: "/portfolio/programming/prog-1.jpg", title: "Portfolio Website V1" },
    // { id: 8, image: "/portfolio/programming/prog-2.jpg", title: "Discord Bot Project" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background"> {/* Thêm dark:bg-background */}
      <Navigation />

      {/* Main content area */}
      <main className="pt-16 md:pt-0">
        {/* Section 1: Hero */}
        <section className="min-h-[calc(100vh-4rem)] md:min-h-0 md:h-auto snap-start flex">
          <Hero />
        </section>

        {/* Section 2: Category Cards */}
        <section className="min-h-screen md:min-h-0 md:h-auto snap-start flex">
          <CategoryCards />
        </section>

        {/* --- Section 3: Portfolio Grid 1 (Music) --- */}
        <section className="snap-start py-12 md:py-16 bg-gray-100 dark:bg-gray-800/50"> {/* Thêm padding và bg */}
          <div className="max-w-7xl mx-auto px-4 md:px-6"> {/* Container */}
            <PortfolioGrid title="MUSIC PRODUCER" items={musicItems} />
            {/* Nút See More */}
            {musicItems.length > 0 && ( // Chỉ hiển thị nếu có items
                <div className="text-center mt-8 md:mt-12">
                  <Link to="/music"> {/* Liên kết đến trang chi tiết nhạc */}
                    {/* Sử dụng Button của Shadcn nếu muốn */}
                    <Button size="lg" variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
                      See More Music
                    </Button>
                    {/* Hoặc dùng link Tailwind thuần */}
                    {/* <span className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 px-6 py-3 rounded-lg text-lg font-medium transition-colors cursor-pointer">
                        See More Music
                    </span> */}
                  </Link>
                </div>
            )}
          </div>
        </section>
        {/* --- Kết thúc Section Music --- */}


        {/* --- Section 4: Portfolio Grid 2 (Programming) --- */}
        <section className="snap-start py-12 md:py-16"> {/* Thêm padding */}
          <div className="max-w-7xl mx-auto px-4 md:px-6"> {/* Container */}
            {/* Kiểm tra xem programmingItems có rỗng không */}
            {programmingItems.length > 0 ? (
              // Nếu có items, hiển thị grid
              <>
                <PortfolioGrid title="PROGRAMMING" items={programmingItems} />
                 {/* Optional: Add See More button for programming too if needed */}
                 {/* <div className="text-center mt-8 md:mt-12"> ... </div> */}
              </>
            ) : (
              // Nếu không có items, hiển thị thông báo
              <div className="text-center py-16">
                 {/* Title vẫn hiển thị */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center text-foreground dark:text-primary-foreground">
                    <span className="text-3xl md:text-4xl mr-3">💻</span>
                    PROGRAMMING
                </h2>
                <p className="text-xl text-muted-foreground dark:text-gray-400">
                  Projects are not available yet. Please check back later!
                </p>
              </div>
            )}
          </div>
        </section>
        {/* --- Kết thúc Section Programming --- */}


        {/* Section 5: Footer */}
        <section className="snap-start">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Index;