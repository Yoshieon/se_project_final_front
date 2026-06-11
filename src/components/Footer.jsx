import "./Footer.css";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkiden.svg";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-left">
        <p>&copy; 2026 Supersite, Powered by News API</p>
      </div>
      <div className="footer-right">
        <nav className="footer-linkA">
          <a href="/">Home</a>
        </nav>
        <nav className="footer-linkB">
          <a href="/">TripleTen</a>
        </nav>
        <div className="footer-icons">
          <a
            href="https://github.com/yoshieon"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="icon-link">
            <img
              className="github-Icon"
              src={githubIcon}
              alt="GitHub profile"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/joe-roodvoets-1b0838396/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="icon-link">
            <img
              className="linkedin-Icon"
              src={linkedinIcon}
              alt="LinkedIn profile"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
