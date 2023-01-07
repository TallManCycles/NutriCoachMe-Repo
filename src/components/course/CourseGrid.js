import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Col,
  Image,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import Flex from 'components/common/Flex';
import playIcon from 'assets/img/icons/play.svg';
import Hoverbox from 'components/common/Hoverbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { CourseContext } from 'context/Context';
import useCourses from 'hooks/useCourses';
import ModalVideoContent from './ModalVideoContent';
import ModalIframeContent from './ModalIframeContent';

const CourseGrid = ({ course }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    thumbnail: { image, video, videoPoster },
    id,
    name,
    trainer,
    price,
    oldPrice,
    totalEnrolled
  } = course;

  const { isInFavouriteItems, isInCart } = useContext(CourseContext);

  const { handleAddToCart, handleFavouriteClick } = useCourses(course);

  return (
    <>
      <ModalIframeContent
        show={showModal}
        setShow={setShowModal}
        attachment={{ image: videoPoster, src: video }}
      />
      <Card className="h-100 overflow-hidden">
        <Card.Body
          as={Flex}
          direction="column"
          justifyContent="between"
          className="p-0"
        >
          <iframe className="d-block" src={video} width={'100%'} height={200} allowFullScreen></iframe>
            <div className="p-3">
              <h5 className="fs-0 mb-2">
                {name}
              </h5>
            </div>
        </Card.Body>
      </Card>
    </>
  );
};

CourseGrid.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    trainer: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      image: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
      videoPoster: PropTypes.string.isRequired
    }),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.number.isRequired,
    totalEnrolled: PropTypes.number.isRequired,
    oldPrice: PropTypes.number.isRequired,
    rating: PropTypes.number
  })
};

export default CourseGrid;
