import { Link } from "react-router-dom";
import { formatIndianDate } from "../helpers/Helper";
export default function BlogCard({ article , url }) {
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const imageUrl = `${imageBaseUrl}${article.bannerImage || "/default-image.jpg"}`;
  return (
    <article className="group min-w-0">
      <Link
        to={`${url}/${article.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8e2330] focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[1.4/1] overflow-hidden rounded-[14px] bg-[#eee8df] shadow-[0_3px_10px_rgba(31,24,18,0.08)]">
          <img
            src={imageUrl}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <h3 className="mt-3.5 text-[17px] font-medium leading-[1.22] tracking-[-0.045em] text-[#201e1c] sm:text-[18px] line-clamp-2">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 text-[11px] tracking-[0.01em] text-[#77716d]">
        Team Else <span className="mx-1 text-[#b8b1aa]">·</span>
        {formatIndianDate(article.publishedAt)}
      </p>
    </article>
  );
}
