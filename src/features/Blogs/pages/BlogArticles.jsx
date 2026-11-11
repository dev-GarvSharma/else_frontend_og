import React, { useEffect, useState } from "react";
import { getAllBlogArticles } from "../../Homepage/api";
import BlogCard from "../../../component/BlogCard";
import Pagination from "../../../component/Pagination";
import { BlogCardSkeleton, SkeletonGroup } from "../../../component/CardSkeletons";

function BlogArticles() {
  const [blogArticles, setBlogArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchBlogArticles = async (requestedPage) => {
    setLoading(true);
    try {
      const response = await getAllBlogArticles(requestedPage, limit);
      const { data, meta } = response.data;
      setBlogArticles(data);
      setTotalPages(meta.totalPages);
      setPage(meta.currentPage);
    } catch (error) {
      console.error("Error fetching blog articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogArticles(page);
  }, [page, limit]);
  return (
    <div className="mx-auto max-w-[1016px] py-10">
      <h1 className="text-3xl font-bold mb-4">Blog Articles</h1>
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <SkeletonGroup count={limit} className="col-span-full grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <BlogCardSkeleton />
          </SkeletonGroup>
        ) : blogArticles.map((article) => (
          <BlogCard key={article.slug} article={article} url="/blogs" />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mt-10"
      />
    </div>
  );
}

export default BlogArticles;
