import React from 'react';
import ProfileBanner from '../ProfileBanner';
import coverSrc from 'assets/img/generic/bg-3.jpg';
import avatar from 'assets/img/team/avatar.png';
import { Col, Row } from 'react-bootstrap';
import ProfileSettings from './ProfileSettings';
import ExperiencesSettings from './ExperiencesSettings';
import EducationSettings from './EducationSettings';
import AccountSettings from './AccountSettings';
import BillingSettings from './BillingSettings';
import ChangePassword from './ChangePassword';
import DangerZone from './DangerZone';

const Settings = () => {
  return (
    <>
      <ProfileBanner>
        <ProfileBanner.Header
          coverSrc={coverSrc}
          avatar={avatar}
          className="mb-8"
        />
      </ProfileBanner>
      <Row className="g-3">
        <Col lg={8}>
          <ProfileSettings />
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <BillingSettings />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
