import React from "react";
import LoadingPage from "../errorScreens/LoadingPage";
import ReloadPage from "../errorScreens/ReloadPage";
import NotFoundPage from "../errorScreens/NotFoundPage";

const StateHandler = ({ loading, error, loadingText, children }) => {
  console.log("Hey its statehandler loading text - ", loadingText);

  if (loading) return <LoadingPage text={loadingText} />;

  if (error) return <ReloadPage />;

  return children;
};

export default StateHandler;
