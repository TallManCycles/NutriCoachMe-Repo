import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton, Modal } from 'react-bootstrap';

const ModalIframeContent = ({ show, setShow, attachment }) => {
  return (
    <Modal
      show={show}
      size="xl"
      onHide={() => setShow(false)}
      className="video-popup"
      contentClassName="bg-transparent border-0"
      backdropClassName="video-popup-backdrop"
      centered
    >
      <CloseButton
        variant="white"
        onClick={() => setShow(false)}
        className="video-popup-close-btn"
      />
      <Modal.Body className="p-0 rounded overflow-hidden">
      <iframe className="d-block" src={attachment.src} width={'100%'} height={1000} allowFullScreen></iframe>
      </Modal.Body>
    </Modal>
  );
};

ModalIframeContent.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  attachment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    src: PropTypes.string,
  })
};

export default ModalIframeContent;
