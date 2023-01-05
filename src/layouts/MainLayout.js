import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import AppContext from 'context/Context';
import Footer from 'components/footer/Footer';
import classNames from 'classnames';

import CourseProvider from 'components/course/CourseProvider';

const MainLayout = () => {
  // NOTE: MainLayout Structure changed for shorter version of Falcon react.
  // if you use kanban/ecommerce functionalities, plese check this file from full version of Falcon react.

  const { hash, pathname } = useLocation();

  const {
    config: { isFluid, navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVertical />
      )}

        <CourseProvider>
          <div className={classNames('content', { 'pb-0': false })}>
            <NavbarTop />
            {/*------ Main Routes ------*/}
            <Outlet />
            <Footer />
          </div>
        </CourseProvider>

      {/* <div className="content">
        <NavbarTop />
        <Outlet />
        <Footer />
      </div> */}
    </div>
  );
};

export default MainLayout;
