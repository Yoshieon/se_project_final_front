import NewsCard from "../components/NewsCard.jsx";
import "./SavedNews.css";

const TOPIC_RULES = [
  {
    label: "Photography",
    terms: ["photo", "photography", "camera", "image", "portrait", "shoot"],
  },
  {
    label: "Nature",
    terms: ["nature", "environment", "wildlife", "forest", "earth", "green"],
  },
  {
    label: "Politics",
    terms: [
      "politics",
      "government",
      "election",
      "policy",
      "senate",
      "congress",
      "president",
      "diplomacy",
    ],
  },
  {
    label: "Entertainment",
    terms: [
      "entertainment",
      "movie",
      "music",
      "tv",
      "celebrity",
      "show",
      "concert",
      "festival",
    ],
  },
];

function getArticleTopics(article) {
  const text =
    `${article.title || ""} ${article.description || ""} ${article.content || ""}`.toLowerCase();
  return TOPIC_RULES.filter(({ terms }) =>
    terms.some((term) => text.includes(term)),
  ).map((topic) => topic.label);
}

function uniq(array) {
  return [...new Set(array)];
}

function SavedNews({ children }) {
  return (
    <div className="saved-news-wrapper" data-page="saved-news">
      {children}
    </div>
  );
}

function SavedNewsHeader({ userName, savedCount }) {
  const itemLabel = savedCount === 1 ? "article" : "articles";

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-title">Saved Articles</h1>
      <p className="saved-news-description">
        {userName}, you have {savedCount} saved {itemLabel}.
      </p>
    </div>
  );
}

export default function SavedNewsPage({
  savedArticles,
  isLoggedIn,
  onToggleSave,
}) {
  const userName = isLoggedIn
    ? localStorage.getItem("userName") || "User"
    : "Guest";
  const savedCount = savedArticles.length;
  const savedKeywords = uniq(
    savedArticles.flatMap((article) => getArticleTopics(article)),
  );

  return (
    <SavedNews>
      <section className="saved-news-page">
        <SavedNewsHeader userName={userName} savedCount={savedCount} />
        <div className="saved-news-actions">By Keywords:</div>
        <div className="saved-news-keywords">
          {savedKeywords.length > 0 ? (
            savedKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)
          ) : (
            <span>No keyword tags available for saved articles.</span>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="saved-news-list">
            <article className="saved-news-card">
              <h2>Sign in to view saved articles</h2>
              <p>Saved Articles are only available when you are logged in.</p>
            </article>
          </div>
        ) : savedArticles.length === 0 ? (
          <div className="saved-news-list">
            <article className="saved-news-card">
              <h2>No saved articles yet</h2>
              <p>Save articles from the home page to see them here.</p>
            </article>
          </div>
        ) : (
          <div className="saved-news-list">
            {savedArticles.map((article) => (
              <NewsCard
                key={article.url}
                id={article.url}
                article={article}
                keywords={getArticleTopics(article)}
                isSaved={true}
                isSavedPage={true}
                isLoggedIn={isLoggedIn}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </SavedNews>
  );
}
