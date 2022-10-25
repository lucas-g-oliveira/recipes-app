import React from 'react';
import { Link } from 'react-router-dom';
import drinkicon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkicon } alt="drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="meals" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
