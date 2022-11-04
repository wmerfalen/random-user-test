import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

function profile_link(user) {
  return `/profile/${user.login.username}`;
}

function Members() {
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=20&seed=randomuser")
      .then((res) => res.json())
      .then(
        (result) => {
          let page = [];
          for (const user of result.results) {
            page.push(
              <a href={profile_link(user)}>
                <div className="profile-preview">
                  <div className="profile-thumb-wrapper">
                    <img
                      className="profile-thumbnail"
                      src={user.picture.thumbnail}
                    />
                  </div>
                  <div className="profile-name-wrapper">
                    <b>
                      {user.name.first} {user.name.last}
                    </b>
                  </div>
                </div>
              </a>
            );
          }
          if (page.length === 0) {
            setError("Unable to fetch results from server");
            return;
          }
          setError(null);
          setMembers(page);
        },
        (error) => {
          console.error({ error });
          setError(`An error occurred: ${error}`);
        }
      );
  }, []);

  return (
    <div>
      <div className="nav">
        <Link to="/">Home</Link>
      </div>
      <section>
        <div className="error">{error}</div>
        <div className="members-wrapper">{members}</div>
      </section>
    </div>
  );
}

export default Members;
