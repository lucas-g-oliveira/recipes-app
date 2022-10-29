import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const copy = require('clipboard-copy');

function ShareAndFavorite() {
  const { location: { pathname } } = useHistory();
  const [hasCopy, setHasCopy] = useState([false]);

  const getCopiedLink = () => {
    copy(`http://localhost:3000${pathname}`);
    setHasCopy(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => getCopiedLink() }
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      {
        hasCopy === true && (
          <div>
            <p>Link copied!</p>
            <button type="button" onClick={ () => setHasCopy(false) }>Ok</button>
          </div>
        )
      }
    </div>
  );
}

export default ShareAndFavorite;
