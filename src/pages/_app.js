import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import authService from "src/_services/auth.service";
import { AppContext } from "src/lib/contextLib";
import IdleTimer from "src/IdleTimer";
import appService from "src/_services/app.service";
import PlanbarRoutes from "src/components/routes/PlanbarRoutes";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isTimeout, setIsTimeout] = useState(false);

  const [holidays, setHolidays] = useState(undefined);
  const [semesterData, setSemesterData] = useState(undefined);
  //once authenticated, this enables page views for the authenticated user
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  //this makes sure that no webcontext / session is rendered DURING the authentication process
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  //this allows navigation to protected /dashboard while checking into the app
  const [checkin, setCheckin] = useState(false);

  const getLayout = Component.getLayout ?? ((page) => page);

  //for authentication:
  useEffect(() => {
    // console.log("is authenticated: " + isAuthenticated);
    const user = authService.getCurrentUser();
    if (user !== null && user !== undefined) {
      console.log("The current user is:");
      console.log(user);
      setCurrentUser(user);
      //now we are free to "release" the authentication
      userHasAuthenticated(true);
      setCheckin(false);
    } else {
      console.log("no current user");
    }
    //finish the authentication process and "release the webpage"
    setIsAuthenticating(false);
  }, []);

  //for automatic logout
  useEffect(() => {
    if (isAuthenticated) {
      const timer = new IdleTimer({
        timeout: 300, //expire after 300 seconds
        onTimeout: () => {
          console.log("time is up");
          setIsTimeout(true);
        },
        onExpired: () => {
          console.log("session has expired");
          //do something if expired on load
          setIsTimeout(true);
        },
      });

      return () => {
        timer.cleanUp();
      };
    }
  }, [isAuthenticated]);

  //for fetching app data after login:
  useEffect(() => {
    if (isAuthenticated) {
      try {
        appService
          .getHolidays()
          .then(console.log("we just got the holidays"))
          // .then((response) => console.log("Holidays are: " + response.data))
          .then((response) => setHolidays(response.data));
      } catch (err) {
        console.error(err);
      }
    }
  }, [isAuthenticated]);

  //for fetching app data after login:
  useEffect(() => {
    if (isAuthenticated) {
      try {
        //outsource this to the semester service!
        appService
          .getSemesterData()
          .then(console.log("response from axios has arrived:"))
          .then((response) => setSemesterData(response.data));
        // .then((response) => console.log(response.data));
      } catch (err) {
        console.error(err);
      }
    }
  }, [isAuthenticated]);

  //regular db update fetch
  //https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
  //Using setInterval inside React components allows us to execute a function or some code at specific intervals.
  //The code below schedules a new interval to run every xyz seconds inside of the useEffect Hook.
  // This will schedule once the React component mounts for the first time.
  //A function or block of code that is bound to an interval executes until it is stopped.
  //To stop an interval, use the clearInterval() method.
  //code below schedules a new interval when the React component mounts for the first time.
  //After the React component unmounts the interval is cleared
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const interval = setInterval(() => {
          appService
            .activateDatabaseUpdate()
            .then(console.log("We asked for a db update"))
            .then((response) => console.log("The response status is: " + response.status));
        }, 200000); // milliseconds
        return () => clearInterval(interval);
      } catch (err) {
        console.error(err);
      }
    }
  }, [isAuthenticated]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>planBar</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppContext.Provider
        value={{
          isAuthenticated,
          userHasAuthenticated,
          holidays,
          checkin,
          setCheckin,
          currentUser,
          setCurrentUser,
          semesterData,
          isTimeout,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
        {/* <PlanbarRoutes /> */}
      </AppContext.Provider>
    </CacheProvider>
  );
};

export default App;
