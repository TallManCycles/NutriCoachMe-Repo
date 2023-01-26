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

//Login Screens
import AuthSimpleLayout from './AuthSimpleLayout';
import SimpleLogin from 'components/authentication/Login';
import SimpleLogout from 'components/authentication/Logout';
import SimpleRegistration from 'components/authentication/Registration';
import SimpleForgetPassword from 'components/authentication/ForgetPassword';
import SimplePasswordReset from 'components/authentication/PasswordReset';
import SimpleConfirmMail from 'components/authentication/ConfirmMail';
import SimpleLockScreen from 'components/authentication/LockScreen';
import Login from 'components/authentication/Login';
import { marketShare } from 'data/dashboard/ecom';
import Home from 'components/home/Home';

//Admin pages
import Main from 'components/admin/Main';
import EditUser from 'components/admin/EditUser';

//Check In Screen
import CheckIn from 'components/forms/CheckIn';

//User Settings
import Profile from 'components/user/profile/Profile';
import Settings from 'components/user/settings/Settings';

//Database
import { supabase } from 'supabase/supabaseClient'
import getSupabaseClient from 'supabase/getSupabaseClient';

//Video Call link
import EmbedFrame from 'components/app/EmbedFrame';

//Courses
import Courses from 'components/course/Courses';
import CourseDetails from 'components/course/course-details';
import CreateWorkout from 'components/admin/CreatWorkouts';

//Workouts
import WorkoutLayout from 'components/workouts/WorkoutLayout';

//Chat
import Chat from 'components/app/chat/Chat';

//Nutrution
import Macros from 'components/nutrition/Macros';
import Habits from 'components/nutrition/Habits';

const Layout = () => {

  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  //Sets the session via supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const client = getSupabaseClient()
    if (client) {
      setIsAdmin(client.admin)
    }

    //listens to changes via supabase
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session && session.access_token) {
        supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token
        })
      }
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

          {/* Admin Screens */}
          <Route path="/admin/active" element={<Main />} />
          <Route path="/admin/active/edituser/:id" element={<EditUser />} />
          <Route path="admin/createworkout" element={<CreateWorkout />} />

          {/* User Home Screen */}

          <Route path='/' element={<Home />} />

          {/* Forms */}

          <Route path='forms/onboard' element={<EmbedFrame source={"https://form.jotform.com/fatforweightloss/new-client-intake-form"} />} />
          <Route path="/forms/checkin" element={<CheckIn />} />

          {/* Bookings */}
          <Route path="app/calendar" element={<EmbedFrame source={"https://calendly.com/fatforweightloss/monthly-client-book-in-consultation"}/>} />

          {/* User Settings */}
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/settings" element={<Settings />} />

          {/* Chat */}
          <Route path="app/chat" element={<Chat />} />

          {/* Nutrition */}
          {/* <Route path="nutrition/macros" element={<Macros radius={['100%', '80%']}/>} />
          <Route path="nutrition/habits" element={<Habits />} /> */}


          {/* Course */}
          <Route path="course/:courseLayout" element={<Courses />} />
          <Route
            path="course/course-details"
            element={<CourseDetails />}
          />
          <Route
            path="course/course-details/:courseId"
            element={<CourseDetails />}
          />

          {/* Workouts */}
          <Route path="workouts/workoutlayout" element={<WorkoutLayout />} />

          {/* Catch All Solution*/}
          <Route path="/*" element={<Navigate to="/" replace />} />

        </Route>
        }
        </>

        
        {/* <Route path="*" element={<Navigate to="/errors/404" replace />} /> */}
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
