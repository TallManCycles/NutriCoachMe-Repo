import React, { useContext, useEffect, useRef } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import waveBg from 'assets/img/illustrations/bg-wave.png';
import AppContext, { CourseContext } from 'context/Context';
import {
  courseContents
} from 'data/elearning/courseDetails';
import CourseBanner from './CourseBanner';
import CourseContents from './CourseContents';
import { Navigate, useParams } from 'react-router-dom';

const Coursedetails = () => {
  const {
    config: { navbarPosition },
    setConfig
  } = useContext(AppContext);

  const {
    coursesState: { courses }
  } = useContext(CourseContext);

  const { courseId } = useParams();
  const prevNavbarPosition = useRef(navbarPosition);

  const course = courses.find(course => course.id === courseId);

  // useEffect(() => {
  //   if (navbarPosition !== 'double-top') setConfig('navbarPosition', 'top');
  //   setConfig('disabledNavbarPosition', ['vertical', 'combo']);
  // }, [navbarPosition]);

  useEffect(() => {
    return () => {
      setConfig('disabledNavbarPosition', []);
      setConfig('navbarPosition', prevNavbarPosition.current);
    };
  }, []);

  return course ? (
    <>
      <CourseBanner course={course} />
      <Row className="g-lg-3">
        <Col lg={8} className="order-1 order-lg-0">
          <CourseContents data={courseContents} />
        </Col>
        <Col lg={4}>
          <div className="course-details-sticky-sidebar mb-lg-8 mt-xl-n10 pe-xl-4 pe-xxl-7">
            <div className="d-none d-xl-block position-absolute z-index--1 top-0 end-0 text-end me-n2 me-xxl-4 mt-xl-6">
              <Image
                src={waveBg}
                alt=""
                style={{ maxWidth: '23.75rem' }}
                className="bg-card"
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  ) : (
    <Navigate to={`/course/course-details/${courses[0].id}`} />
  );
};

export default Coursedetails;
