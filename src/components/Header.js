import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../contextApi/AppContext';
import SearchBar from './SearchBar';

function Header() {
  const { searchBtn, showsearchBtn } = useContext(AppContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const getPageTitle = () => {
    const title = pathname.replace('/', '').replace('-', ' ').split(' ');
    let pageTitle = '';
    if (title.length > 1) {
      const fisrString = title[0][0].toUpperCase() + title[0].substring(1);
      const secondString = title[1][0].toUpperCase() + title[1].substring(1);
      pageTitle = `${fisrString} ${secondString} `;
    } else {
      pageTitle = title[0][0].toUpperCase() + title[0].substring(1);
    }
    return pageTitle;
  };

  const pageTitle = getPageTitle();

  return (
    <header>
      <Link to="/profile">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      {
        (pathname === '/drinks' || pathname === '/meals') && (
          <button type="button" onClick={ showsearchBtn }>
            <img src={ searchIcon } alt="seacrh" data-testid="search-top-btn" />
          </button>
        )
      }
      {
        searchBtn && <SearchBar />
      }

      <h2 data-testid="page-title">{ pageTitle }</h2>
    </header>
  );
}

export default Header;
