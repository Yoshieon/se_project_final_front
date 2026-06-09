import "./Preloader.css";

export default function Preloader() {
  return (
    <div className="preloader-container" aria-live="polite">
      <div className="circle-preloader" aria-hidden="true"></div>
      <p className="preloader-text">Searching for news...</p>
    </div>
  );
}
