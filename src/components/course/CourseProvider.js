import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { CourseContext } from 'context/Context';
import { courseReducer } from 'reducers/courseReducer';


const courseData = [
  // {
  //   id: '1',
  //   name: 'Offile',
  //   video: '',
  //   tags: ''
  // }
]


const CourseProvider = ({ children }) => {

  const initData = {
    initCourses: courseData,
    courses: courseData,
    primaryCourses: courseData,
    cartItems: [{ ...courseData[1] }, { ...courseData[2] }],
    favouriteItems: []
  };
  const [coursesState, coursesDispatch] = useReducer(courseReducer, initData);

  return (
    <CourseContext.Provider
      value={{
        coursesState
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CourseProvider;
