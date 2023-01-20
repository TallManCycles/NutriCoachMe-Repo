import React, { useEffect, useState } from 'react';
import ProfileBanner from './Banner';
import { Col, Row } from 'react-bootstrap';
import activities from 'data/activities';
import ActivityLog from './ActivityLog';

const Profile = () => {

  return (
    <>
      <ProfileBanner />
      <Row className="g-3 mb-3">
        <Col lg={8}>
          <ActivityLog className="mt-3" activities={activities} />
          {/* <Photos /> */}
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
