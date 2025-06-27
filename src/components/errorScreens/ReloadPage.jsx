import React, { useEffect } from "react";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { BsCloudSlashFill } from "react-icons/bs";

const ReloadPage = () => {
  // useAutoReloadOnReconnect();

  const handleReloadPage = () => {};

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center h-svh text-white bg-black">
      <div className="flex flex-col gap-1 items-center">
        <BsCloudSlashFill className="text-[100px] text-tradeAshLight leading-none" />
        <p className="text-sm text-white font-medium">Something went wrong.</p>
      </div>

      <Button
        onClick={handleReloadPage}
        variant="primary"
        maxWidth="max-w-[200px]"
      >
        Retry
      </Button>
    </div>
  );
};

export default ReloadPage;
