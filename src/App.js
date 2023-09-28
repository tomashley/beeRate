import React, { useEffect, useState } from "react";
import BeerCardList from "./components/beerCardList";
// import data from './mock_data/beerCardData.json'
import { supabase } from "./supabase";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import Logout from "./components/logout";
// import Login from "./components/login";
// import Signup from "./components/signup";
import AuthForm from "./components/authForm";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

    return () => subscription.unsubscribe()
  }, [])


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Bar */}
      <div className="bg-yellow-500 p-4 flex justify-end items-center fixed top-0 w-full">
        {session && (
          <div className="flex items-center">
            <p className="text-white text-lg font-semibold mr-2">
              {session.user_metadata?.full_name || session.user.email}
            </p>
        {/* Logout button */}
        {session && <Logout />} {/* Render the LogoutButton component */}
      </div>
        )}
      </div>

    {/* <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start p-8"> */}
    <div className="p-8 pt-16">
      <h1 className="text-3xl font-semibold mb-6 text-yellow-800 text-center">
        Beer Rated
      </h1>
    {session ? (
      <div>
        <BeerCardList cards />
      </div>
    ) : (
      // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      <div>
      <p className="text-center text-red-600">
        Please sign in to get Beerated!
      </p>
      <AuthForm />
    </div>
     )}
    </div>
    </div>
  );
}

export default App;
