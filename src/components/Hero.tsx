// src/components/Hero.tsx

// Import các icon cần thiết từ react-icons (chủ yếu từ bộ 'fa' - Font Awesome và 'si' - Simple Icons)
import {
  FaFacebookF, // Hoặc FaFacebook
  FaYoutube,
  FaSoundcloud,
  FaSpotify,
  FaInstagram
} from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si'; // Apple Music thường có trong Simple Icons

import { useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

// Định nghĩa cấu trúc dữ liệu cho các liên kết
interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType; // Kiểu cho component icon
  ariaLabel: string; // Để cải thiện accessibility
}

interface SocialProfile {
  name: string;
  links: SocialLink[];
}

// Dữ liệu các profile mạng xã hội
const socialProfiles: SocialProfile[] = [
  {
    name: "Tabby Neko",
    links: [
      { platform: "Facebook", url: "https://www.facebook.com/tabbynekokawaii", icon: FaFacebookF, ariaLabel: "Tabby Neko Facebook Profile" },
      { platform: "YouTube", url: "https://www.youtube.com/@tabbynekokawaii", icon: FaYoutube, ariaLabel: "Tabby Neko YouTube Channel" }, // Xây dựng URL đầy đủ từ handle
      { platform: "SoundCloud", url: "https://soundcloud.com/tabbyneko", icon: FaSoundcloud, ariaLabel: "Tabby Neko SoundCloud Profile" },
      { platform: "Spotify", url: "https://open.spotify.com/artist/4ujVUQ6lsATVZc8BUKx6QC", icon: FaSpotify, ariaLabel: "Tabby Neko Spotify Profile" },
      { platform: "Apple Music", url: "https://music.apple.com/us/artist/tabby-neko/1479904561", icon: SiApplemusic, ariaLabel: "Tabby Neko Apple Music Profile" },
      { platform: "Instagram", url: "https://www.instagram.com/tabbyneko.kawaii/", icon: FaInstagram, ariaLabel: "Tabby Neko Instagram Profile" },
    ]
  },
  {
    name: "Nyanko",
    links: [
      { platform: "Facebook", url: "https://www.facebook.com/itsnyanko", icon: FaFacebookF, ariaLabel: "Nyanko Facebook Profile" },
      { platform: "YouTube", url: "https://www.youtube.com/@nyankoisme", icon: FaYoutube, ariaLabel: "Nyanko YouTube Channel" }, // Xây dựng URL đầy đủ từ handle
      { platform: "SoundCloud", url: "https://soundcloud.com/itsnyanko", icon: FaSoundcloud, ariaLabel: "Nyanko SoundCloud Profile" },
      { platform: "Spotify", url: "https://open.spotify.com/artist/55s6uxgHctw4uJl6n7qtRl?si=aoDdyRqZRsOhHYtHkNtUhA&nd=1&dlsi=6ee533b10c3b412e", icon: FaSpotify, ariaLabel: "Nyanko Spotify Profile" },
    ]
  }
];


const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageEntry = useIntersectionObserver(imageRef, { threshold: 0.3 });
  const textEntry = useIntersectionObserver(textRef, { threshold: 0.3 });

  const isImageVisible = imageEntry?.isIntersecting;
  const isTextVisible = textEntry?.isIntersecting;

  // Lớp CSS chung cho các icon link
  const iconLinkClasses = "text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground transition-all duration-200 hover:scale-110";

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 md:min-h-[60vh] flex items-center"> {/* Đảm bảo container đủ cao và căn giữa nội dung dọc */}
      <div className="grid grid-cols-1 content-stretch justify-center items-stretch md:grid-cols-2 gap-6 md:gap-8 w-full"> {/* Tăng gap, w-full */}
        {/* Image section */}
        <div
          ref={imageRef}
          className={`
            w-full aspect-square md:aspect-auto md:h-full relative rounded-2xl overflow-hidden self-center /* Thêm self-center */
            transition-all duration-700 ease-out
            ${isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <img
            src="/hero-image.jpg" // Đảm bảo ảnh này tồn tại trong thư mục public
            alt="Tabby Neko"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text section */}
        <div
          ref={textRef}
          className={`
            bg-secondary/50 dark:bg-secondary/30 p-6 md:p-8 rounded-2xl flex flex-col justify-center /* Giữ justify-center */
            transition-all duration-700 ease-out delay-150 /* Giảm nhẹ delay */
            ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {/* Tên chính */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-foreground dark:text-primary-foreground">
             Tabby Neko
          </h1>
          {/* Mô tả */}
          <p className="text-base md:text-lg text-muted-foreground dark:text-gray-300 mb-6 md:mb-8"> {/* Tăng margin bottom */}
            Hello. I'm Tabby Neko (also as Nyanko), a music producer and programmer. {/* Thêm mô tả */}
          </p>

          {/* Phần liên kết mạng xã hội */}
          <div className="space-y-5"> {/* Tạo khoảng cách giữa các nhóm profile */}
            {socialProfiles.map((profile) => (
              <div key={profile.name}>
                {/* Tên profile (có thể ẩn nếu chỉ có 1 profile chính) */}
                <h4 className="text-sm font-semibold uppercase text-muted-foreground/80 dark:text-gray-500 mb-2 tracking-wider">
                  {profile.name}
                </h4>
                {/* Danh sách icon links */}
                <div className="flex flex-wrap gap-x-4 gap-y-2"> {/* flex-wrap và gap cho icon */}
                  {profile.links.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank" // Mở link ở tab mới
                      rel="noopener noreferrer" // Bảo mật cho target="_blank"
                      className={iconLinkClasses}
                      aria-label={link.ariaLabel} // Accessibility
                      title={link.platform} // Tooltip khi hover
                    >
                      {/* Render component icon */}
                      <link.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;