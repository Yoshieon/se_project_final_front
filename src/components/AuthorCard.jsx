import "./AuthorCard.css";

export default function AuthorCard({ name, role, description }) {
  return (
    <section className="author-card">
      <div className="author-copy">
        <h2 className="author-title">{name}</h2>
        <p className="author-role">{role}</p>
        <p className="author-description">{description}</p>
      </div>
    </section>
  );
}
