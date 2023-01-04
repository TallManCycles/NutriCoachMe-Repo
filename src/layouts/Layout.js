import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import is from 'is_js';
import MainLayout from './MainLayout';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import ErrorLayout from './ErrorLayout';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton } from 'components/common/Toast';
import Starter from 'components/pages/Starter';
import AppContext from 'context/Context';
import Error404 from 'components/errors/Error404';

import AuthSimpleLayout from './AuthSimpleLayout';
import SimpleLogin from 'components/authentication/Login';
import SimpleLogout from 'components/authentication/Logout';
import SimpleRegistration from 'components/authentication/Registration';
import SimpleForgetPassword from 'components/authentication/ForgetPassword';
import SimplePasswordReset from 'components/authentication/PasswordReset';
import SimpleConfirmMail from 'components/authentication/ConfirmMail';
import SimpleLockScreen from 'components/authentication/LockScreen';
import CheckIn from 'components/checkin/CheckIn';

import { supabase } from 'supabase/supabaseClient'
import Login from 'components/authentication/Login';

const Layout = () => {

  const [session, setSession] = useState(null)

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Routes>
        {/*- ------------- Authentication ---------------------------  */}
        <Route element={<AuthSimpleLayout />}>
          <Route path="authentication/login" element={<SimpleLogin />} />
          <Route
            path="authentication/register"
            element={<SimpleRegistration />}
          />
          <Route
            path="authentication/logout"
            element={<SimpleLogout />}
          />
          <Route
            path="authentication/forgot-password"
            element={<SimpleForgetPassword />}
          />
          <Route
            path="authentication/reset-password"
            element={<SimplePasswordReset />}
          />
          <Route
            path="authentication/confirm-mail"
            element={<SimpleConfirmMail />}
          />
          <Route
            path="authentication/lock-screen"
            element={<SimpleLockScreen />}
          />
        </Route>

        
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
        </Route>

        <>
        {!session ? 
        <Route element={<AuthSimpleLayout />}>
          <Route path="/" element={<Login/>} />
        </Route>
       : 
        <Route element={<MainLayout />}>
        <Route path="/" element={<Starter />} />
        <Route path="/checkin/checkin" element={<CheckIn />} />
        <Route path="pages/starter" element={<Starter />} />
      </Route>
      }
        </>


        <Route element={<MainLayout />}>
          <Route path="/" element={<Starter />} />
          <Route path="/checkin/checkin" element={<CheckIn />} />
          <Route path="pages/starter" element={<Starter />} />
        </Route>
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>

      {/* <SettingsToggle /> */}
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </>
  );
};

export default Layout;
