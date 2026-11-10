import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MessageCircle, Send } from "lucide-react";
import { addBlogComment, getBlogArticleById } from "../api";
import { formatIndianDate } from "../../../helpers/Helper";

function BlogArticleDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "";

  useEffect(() => {
    let active = true;
    const fetchArticleDetails = async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const response = await getBlogArticleById(slug);
        if (!active) return;
        const post = response.data.data;
        setArticle(post);
        setComments(post.comments || []);
      } catch (error) {
        console.error("Error fetching article details:", error);
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchArticleDetails();
    return () => {
      active = false;
    };
  }, [slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!article || submitting) return;

    setSubmitting(true);
    setCommentError("");
    const commentData = {
      blogPostId: article.id,
      name: form.name.trim(),
      email: form.email.trim(),
      comment: form.comment.trim(),
    };

    try {
      const response = await addBlogComment(slug, commentData);
      if (!response?.success) {
        throw new Error(response?.message || "Your comment could not be added.");
      }

      const savedComment = response.data?.data?.comment || response.data?.data;
      setComments((current) => [
        ...current,
        {
          ...commentData,
          ...(savedComment && typeof savedComment === "object" ? savedComment : {}),
          id: savedComment?.id || `local-${Date.now()}`,
          createdAt: savedComment?.createdAt || new Date().toISOString(),
        },
      ]);
      setForm({ name: "", email: "", comment: "" });
    } catch (error) {
      console.error("Error adding blog comment:", error);
      setCommentError(error.message || "We couldn't add your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="journal-state" aria-live="polite">
        <span className="journal-state-mark" aria-hidden="true" />
        <p>Opening the journal…</p>
      </main>
    );
  }

  if (loadError || !article) {
    return (
      <main className="journal-state">
        <p className="journal-eyebrow">ELSE JOURNAL</p>
        <h1>This story is taking a moment.</h1>
        <Link to="/blogs" className="journal-back-link">
          <ArrowLeft size={16} aria-hidden="true" /> Back to all stories
        </Link>
      </main>
    );
  }

  const bannerImage = article.bannerImage
    ? `${imageBaseUrl}${article.bannerImage}`
    : "/default-image.jpg";

  return (
    <main className="journal-page">
      <div className="journal-shell">
        <nav className="journal-breadcrumb" aria-label="Breadcrumb">
          <Link to="/blogs">Journal</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">The story</span>
        </nav>

        <article className="journal-article">
          <header className="journal-header">
            <p className="journal-eyebrow"><span /> The Else Journal</p>
            <h1>{article.title}</h1>
            {article.description && <p className="journal-dek">{article.description}</p>}
            <div className="journal-byline">
              <span className="journal-author-mark" aria-hidden="true">E</span>
              <span className="journal-author">Words by <strong>Team Else</strong></span>
              <span className="journal-byline-divider" aria-hidden="true" />
              <CalendarDays size={15} aria-hidden="true" />
              <time dateTime={article.publishedAt}>{formatIndianDate(article.publishedAt)}</time>
            </div>
          </header>

          <figure className="journal-cover">
            <img src={bannerImage} alt={article.title} />
          </figure>

          <div className="journal-reading-grid">
            <aside className="journal-reading-note" aria-label="Article details">
              <span className="journal-reading-label">A little read</span>
              <span className="journal-reading-rule" />
              <span>Thoughtfully considered<br />for everyday life.</span>
            </aside>
            <div
              className="journal-prose"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />
          </div>

          {article.metaTags?.length > 0 && (
            <footer className="journal-tags" aria-label="Article topics">
              <span>Filed under</span>
              {article.metaTags.map((tag) => <span className="journal-tag" key={tag}>{tag}</span>)}
            </footer>
          )}
        </article>

        <section className="journal-conversation" aria-labelledby="comments-title">
          <div className="journal-conversation-heading">
            <div>
              <p className="journal-eyebrow"><span /> Around the story</p>
              <h2 id="comments-title">A thoughtful conversation</h2>
              <p className="journal-comment-count">
                {comments.length} {comments.length === 1 ? "note" : "notes"} from readers
              </p>
            </div>
            <MessageCircle size={24} strokeWidth={1.4} aria-hidden="true" />
          </div>

          {comments.length > 0 ? (
            <ol className="journal-comment-list">
              {comments.map((comment, index) => (
                <li className="journal-comment" key={comment.id || index}>
                  <div className="journal-comment-avatar" aria-hidden="true">
                    {(comment.name || "R").trim().charAt(0).toUpperCase()}
                  </div>
                  <div className="journal-comment-body">
                    <div className="journal-comment-meta">
                      <h3>{comment.name}</h3>
                      {(comment.createdAt || comment.publishedAt) && (
                        <time dateTime={comment.createdAt || comment.publishedAt}>
                          {formatIndianDate(comment.createdAt || comment.publishedAt)}
                        </time>
                      )}
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="journal-empty-comments">Be the first to leave a kind thought about this story.</p>
          )}

          <form onSubmit={handleSubmit} className="journal-comment-form">
            <div className="journal-form-intro">
              <h3>Leave a note</h3>
              <p>We’d love to hear what you think.</p>
            </div>
            <div className="journal-form-fields">
              <label>
                <span>Your name</span>
                <input
                  required
                  maxLength={120}
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Name"
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  required
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                />
              </label>
              <label className="journal-message-field">
                <span>Your note</span>
                <textarea
                  required
                  rows={4}
                  value={form.comment}
                  onChange={(event) => setForm({ ...form, comment: event.target.value })}
                  placeholder="Write your thoughts here…"
                />
              </label>
            </div>
            {commentError && <p className="journal-form-error" role="alert">{commentError}</p>}
            <div className="journal-form-submit-row">
              <p>Your email won’t be shown publicly.</p>
              <button type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Share your note"}
                <Send size={15} aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default BlogArticleDetails;
