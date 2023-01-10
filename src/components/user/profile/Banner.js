import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import coverSrc from 'assets/img/generic/4.jpg';
import apple from 'assets/img/logos/apple.png';
import google from 'assets/img/logos/g.png';
import hp from 'assets/img/logos/hp.png';
import avatar from 'assets/img/team/2.jpg';
import Flex from 'components/common/Flex';
import VerifiedBadge from 'components/common/VerifiedBadge';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileBanner from '../ProfileBanner';
import { supabase } from 'supabase/supabaseClient';

const Banner = () => {

  const [user, setUser] = useState('')
  const [profile, setProfile] = useState('')

  useEffect(async () => {
    const {data, error} = await supabase.auth.getUser()
    
    if (!error)
        setUser(data.user)
        
        console.log(data.user)
  },[])

  return (
    <ProfileBanner>
      <ProfileBanner.Header avatar={avatar} coverSrc={coverSrc} />
      <ProfileBanner.Body>
        {user ?
        <Row>
          <Col lg={8}>
            <h4 className="mb-1">
              {user.full_name} <VerifiedBadge />
            </h4>
            <h5 className="fs-0 fw-normal">
              Senior Software Engineer at Technext Limited
            </h5>
            <p className="text-500">{!user ? "" : user.email}</p>
            <Button variant="falcon-primary" size="sm" className="px-3">
              Following
            </Button>
            <Button variant="falcon-default" size="sm" className="px-3 ms-2">
              Message
            </Button>
            <div className="border-dashed border-bottom my-4 d-lg-none" />
          </Col>
          <Col className="ps-2 ps-lg-3">
            <Link to="#!">
              <Flex alignItems="center" className="mb-2">
                <FontAwesomeIcon
                  icon="user-circle"
                  className="fs-3 me-2 text-700"
                />
              </Flex>
            </Link>
          </Col>
        </Row> : ''}
      </ProfileBanner.Body>
    </ProfileBanner>
  );
};

export default Banner;
