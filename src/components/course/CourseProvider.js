import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { CourseContext } from 'context/Context';
import { courseReducer } from 'reducers/courseReducer';


const CourseProvider = ({ children }) => {

  let courseData = []

  const setCourseData = async () => {
    let { data: video_content, error } = await supabase
    .from('video_content')
    .select('*')

    if (error) {
      console.log(error)
    } else {
      console.log(video_content)
      courseData = video_content;
    }
  }

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
        coursesState,
        coursesDispatch
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
