import SavedNewsPage from "../pages/SavedNews";

export default function NewsCard({
  article,
  keywords = [],
  isSaved,
  isSavedPage = false,
  isLoggedIn,
  onToggleSave,
}) {
  const sourceName = article.source?.name || "Unknown source";
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : "";
  const articleUrl = article.url || "#";

  const handleSaveClick = () => {
    if (!isLoggedIn) return;
    onToggleSave(article);
  };

  const saveButtonClass = `news-card-save ${isSaved ? "news-card-save--saved" : "news-card-save--ghost"} ${isSavedPage ? "news-card-save--saved-page" : ""}`;
  const saveAriaLabel = isSavedPage
    ? "Delete saved article"
    : isSaved
      ? "Unsave article"
      : "Save article";

  return (
    <article className="news-card">
      {article.urlToImage && (
        <img
          className="news-card-image"
          src={article.urlToImage}
          alt={article.title || "Article image"}
        />
      )}
      {keywords.length > 0 && (
        <div className="news-card-tags">
          {keywords.map((keyword) => (
            <span key={keyword} className="news-card-tag">
              {keyword}
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        className={saveButtonClass}
        onClick={handleSaveClick}
        aria-disabled={!isLoggedIn}
        aria-label={saveAriaLabel}>
        <span className="news-card-save-icon" />
        {isSavedPage ? (
          <span className="news-card-save-tooltip news-card-save-tooltip--saved-page">
            Removed from Saved
          </span>
        ) : !isLoggedIn ? (
          <span className="news-card-save-tooltip" img={SavedNewsPage}>
            Sign in to save articles.
          </span>
        ) : null}
      </button>
      <div className="news-card-body">
        <p className="news-card-date">{publishedDate}</p>
        <h3 className="news-card-title">
          <a href={articleUrl} target="_blank" rel="noreferrer noopener">
            {article.title}
          </a>
        </h3>
        <p className="news-card-description">{article.description}</p>
        <p className="news-card-source">{sourceName}</p>
      </div>
    </article>
  );
}
