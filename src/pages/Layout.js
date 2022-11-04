import * as React from "react";
import { useParams } from "react-router-dom";
//import { getArticle } from "../utils";

function Layout() {
  const [article, setArticle] = React.useState(null);
  const { topicId } = useParams();

  return <div>heh</div>;
}

export default Layout;
