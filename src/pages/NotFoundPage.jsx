import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page">
      <section className="card notFoundCard">
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Link className="homeLink" to="/">
          На главную
        </Link>
      </section>
    </main>
  );
}
