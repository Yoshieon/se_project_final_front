import SearchFrom from "../components/SearchFrom.jsx";
import NewsCard from "../components/NewsCard.jsx";
import Preloader from "../components/Preloader.jsx";
import heroImage from "../assets/search_background_homepage.png";
import avatarImage from "../assets/placeholder-image-below.png";
import "./Home.css";
import errorMessage from "../assets/not-found_v1.svg";

function Home({ children }) {
  return <div className="home-wrapper">{children}</div>;
}

export default function HomePage({
  onSearch,
  articles,
  visibleCount,
  onShowMore,
  isLoading,
  searchExecuted,
  searchError,
  searchTerm,
  onToggleSave,
  savedArticleUrls,
  isLoggedIn,
}) {
  return (
    <Home>
      <section className="home-page">
        <div className="hero-wrapper">
          <img
            className="hero-top-image"
            src={heroImage}
            alt="NewsExplorer hero banner"
          />

          <div className="hero-overlay">
            <h1 className="hero-title">What's going on in the world?</h1>
            <p className="hero-subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
            <div className="hero-search">
              <SearchFrom onSearch={onSearch} />
            </div>
          </div>
        </div>

        {searchExecuted && (
          <section className="search-results-block">
            {isLoading ? (
              <Preloader />
            ) : searchError ? (
              <p className="results-message">{searchError}</p>
            ) : articles.length === 0 ? (
              <div className="results-message results-not-found">
                <img
                  className="results-message__image"
                  src={errorMessage}
                  alt="No matching results"
                />
                <p className="results-message__title">Nothing Found</p>
                <p className="results-message__text">
                  Sorry, but nothing matched your search terms.
                </p>
              </div>
            ) : (
              <>
                <div className="search-results">
                  {articles.slice(0, visibleCount).map((article, index) => {
                    const articleId =
                      article.url || article.title || String(index);
                    return (
                      <NewsCard
                        key={articleId}
                        id={articleId}
                        article={article}
                        isSaved={savedArticleUrls.includes(articleId)}
                        isLoggedIn={isLoggedIn}
                        onToggleSave={onToggleSave}
                      />
                    );
                  })}
                </div>
                {visibleCount < articles.length && (
                  <button
                    type="button"
                    className="show-more-button"
                    onClick={onShowMore}>
                    Show more
                  </button>
                )}
              </>
            )}
          </section>
        )}

        <div className="below-content">
          <img
            className="below-content-image"
            src={avatarImage}
            alt="Placeholder image."
          />
          <div className="author-overlay">
            <h1 className="author-Title">About the author</h1>
            <p className="author-Description">
              This block describes the project author. Here you should indicate
              your name, what you do, and which development technologies you
              know.
              <br></br>
              You can also talk about your experience with TripleTen, what you
              learned there, and how you can help potential customers.
            </p>
          </div>
        </div>
      </section>
    </Home>
  );
}
