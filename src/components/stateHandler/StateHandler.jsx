import React, { useEffect, useState } from "react";
import LoadingPage from "../errorScreens/LoadingPage";
import ReloadPage from "../errorScreens/ReloadPage";
import NotFoundPage from "../errorScreens/NotFoundPage";

const StateHandler = ({ loading, error, children }) => {
  const [delayedDone, setDelayedDone] = useState(false);

  useEffect(() => {
    let timeout;

    if (!loading) {
      // Add delay after loading is false
      timeout = setTimeout(() => {
        setDelayedDone(true);
      }, 1000); // 1 second delay
    } else {
      setDelayedDone(false); // reset if loading starts again
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  // if (loading || !delayedDone) return <LoadingPage />;

  // Handle error screen if needed
  // if (error) return <ReloadPage />;

  return children;
};

export default StateHandler;
