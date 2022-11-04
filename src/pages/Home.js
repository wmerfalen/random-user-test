import * as React from "react";
import { useParams, Link } from "react-router-dom";
//import { getArticle } from "../utils";

function Home() {
  const [article, setArticle] = React.useState(null);

  return (
    <div>
      <Link to="/members">Members</Link>
    </div>
  );
}

export default Home;
