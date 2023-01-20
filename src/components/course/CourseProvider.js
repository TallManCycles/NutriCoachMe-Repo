import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { CourseContext } from 'context/Context';
import { courseReducer } from 'reducers/courseReducer';


const courseData = [
  {
    id: 'CN000001',
    name: 'Seasons Of Nutrition',
    price: 0,
    oldPrice: 0,
    trainer: 'Aaron Day',
    excerpt:
      '',
    thumbnail: {
      image: '',
      video: "https://streamable.com/e/0le0pz",
      videoPoster: ''
    },
    totalEnrolled: 0,
    rating: 0,
    review: 0,
    tags: []
  },
  {
    id: 'CN000002',
    name: 'Group Coaching Session',
    price: 39.99,
    oldPrice: 139.99,
    excerpt:
      '',
    trainer: 'Aaron Day',
    thumbnail: {
      image: '',
      video: "https://streamable.com/e/dinfcr",
      videoPoster: ''
    },
    totalEnrolled: 0,
    rating: 0,
    review: 0,
    tags: []
  },
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

  const isInCart = id =>
    !!coursesState.cartItems.find(cartItem => cartItem.id === id);
  const isInFavouriteItems = id =>
    !!coursesState.favouriteItems.find(
      favouriteItem => favouriteItem.id === id
    );

  return (
    <CourseContext.Provider
      value={{
        coursesState,
        coursesDispatch,
        isInCart,
        isInFavouriteItems
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
