import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import coverSrc from 'assets/img/generic/bg-3.jpg';
import apple from 'assets/img/logos/apple.png';
import google from 'assets/img/logos/g.png';
import hp from 'assets/img/logos/hp.png';
import avatar from 'assets/img/team/avatar.png';
import Flex from 'components/common/Flex';
import VerifiedBadge from 'components/common/VerifiedBadge';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from '../ProfileBanner';
import { supabase } from 'supabase/supabaseClient';
import getSupabaseClient from 'supabase/getSupabaseClient';

const Banner = () => {

  const [client, setClient] = useState([])

  useEffect(async () => {
    setClient(await getSupabaseClient());
  },[])

  return (
    <ProfileBanner>
      <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        <Row>
          <Col lg={8}>
            <h4 className="mb-1">
              {!client.full_name ? "" : client.full_name}
            </h4>
            <h5 className="fs-0 fw-normal">
              Status: {client.status}
            </h5>
            <p className="text-500">{!client ? "" : client.email}</p>
            <div className="border-dashed border-bottom my-4 d-lg-none" />
          </Col>
        </Row>
      </ProfileBanner.Body>
    </ProfileBanner>
  );
};

export default Banner;
