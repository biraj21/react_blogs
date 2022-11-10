import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import "./Home.scss";
import BlogList from "../components/BlogList";

const categories = ["art", "business", "cinema", "food", "science", "technology"];

export default function Home() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("cat");

  const { data: blogs, error } = useFetch(`${serverBaseUrl}/blogs`);

  let content;
  if (error) {
    content = <p className="error-msg">{error}</p>;
  } else if (blogs) {
    content = <BlogList blogs={blogs} />;
  } else {
    content = <h3 className="loading-msg">Loading...</h3>;
  }

  return (
    <div className="page home">
      <div className="categories">
        <Link to="/" className={activeCategory === null ? "active" : ""}>
          ALL
        </Link>

        {categories.map((category, i) => (
          <Link to={`/?cat=${category}`} className={activeCategory === category ? "active" : ""} key={i}>
            {category.toUpperCase()}
          </Link>
        ))}
      </div>
      {content}
    </div>
  );
}