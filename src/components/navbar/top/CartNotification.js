import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// NOTE: CartNotification Structure changed for shorter version of Falcon react.
// if you use ecommerce functionalities, plese check this file from full version of Falcon react.
const CartNotification = () => {
  return (
    <Nav.Item as="li" className="d-none d-sm-block">
      <Nav.Link
        as={Link}
        to="#!"
        className="px-0 notification-indicator notification-indicator-warning notification-indicator-fill"
      >
        <span className="notification-indicator-number">1</span>
        <FontAwesomeIcon
          icon="shopping-cart"
          transform="shrink-7"
          className="fs-4"
        />
      </Nav.Link>
    </Nav.Item>
  );
};

export default CartNotification;
