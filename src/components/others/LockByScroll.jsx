import React from "react";

const LockByScroll = () => {
  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return null;
};

export default LockByScroll;
