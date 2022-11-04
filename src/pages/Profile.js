import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import loading_gif from "../images/loading.gif";

function format_dob(dob) {
  const d = new Date(dob);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()}`;
}
function Home() {
  const [first_name, setFirstName] = useState("?");
  const [last_name, setLastName] = useState("?");
  const [street, setStreet] = useState("?");
  const [city, setCity] = useState("?");
  const [state, setState] = useState("?");
  const [postal_code, setPostalCode] = useState("?");
  const [email, setEmail] = useState("?");
  const [date_of_birth, setDateOfBirth] = useState("?");
  const [phone, setPhone] = useState("?");
  const [profile_image, setProfileImage] = useState(null);
  const { memberId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=20&seed=randomuser")
      .then((res) => res.json())
      .then(
        (result) => {
          for (const user of result.results) {
            if (user.login.username === memberId) {
              setFirstName(user.name.first);
              setLastName(user.name.last);
              setStreet(user.location.street.name);
              setCity(user.location.city);
              setState(user.location.state);
              setPostalCode(user.location.postcode);
              setEmail(user.email);
              setDateOfBirth(format_dob(user.dob.date));
              setPhone(user.cell);
              setProfileImage(user.picture.large);
              window.setTimeout(() => {
                setLoading(false);
              }, 1000);
              return;
            }
          }
          setError(`No user found`);
          setLoading(false);
        },
        (error) => {
          console.error({ error });
        }
      );
  }, [memberId]);

  return (
    <div className="profile-page">
      <div className="nav">
        <div>
          <Link to="/">Home</Link>
          <Link to="/members">Members</Link>
        </div>
      </div>
      <div className="error">{error}</div>
      <div className="profile">
        <div>
          {loading && (
            <div className="loading-screen">
              <img src={loading_gif} />
            </div>
          )}
          {!loading && (
            <>
              <div className="profile-image-wrapper">
                {error === null && (
                  <>
                    <img src={profile_image} />
                  </>
                )}
                {error !== null && "???"}
              </div>
              <div className="attributes">
                <ul>
                  <li>
                    <b>First:</b> {first_name}
                  </li>
                  <li>
                    <b>Last:</b> {last_name}
                  </li>
                  <li>
                    <b>Street:</b> {street}
                  </li>
                  <li>
                    <b>City:</b> {city}
                  </li>
                  <li>
                    <b>State:</b> {state}
                  </li>
                  <li>
                    <b>Postal code:</b> {postal_code}
                  </li>
                  <li>
                    <b>Email:</b> {email}
                  </li>
                  <li>
                    <b>Date of birth:</b> {date_of_birth}
                  </li>
                  <li>
                    <b>Phone:</b> {phone}
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
