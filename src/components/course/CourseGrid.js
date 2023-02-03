import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
} from 'react-bootstrap';
import Flex from 'components/common/Flex';
import ModalIframeContent from './ModalIframeContent';

const CourseGrid = ({ course }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    video,
    id,
    name,
  } = course;

  return (
    <>
      <ModalIframeContent
        show={showModal}
        setShow={setShowModal}
        attachment={{ src: video }}
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
    video: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })
};

export default CourseGrid;
