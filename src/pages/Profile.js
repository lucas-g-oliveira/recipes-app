import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmail } from '../services/userStorage';

function Profile() {
  /* const [email, setEmail] = useState([]); */
  const { email } = getEmail();
  console.log(email);
  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="profile-email">
          {email}
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
