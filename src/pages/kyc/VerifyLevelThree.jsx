import Footer from "@/components/others/Footer";
import InAppNav from "@/components/others/InAppNav";
import React, { useRef } from "react";
import Button from "@/components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { useKyc } from "@/context/userContext/KycContext";
import { MdAddCircle } from "react-icons/md";
import { useToast } from "@/context/otherContext/ToastContext";
import { IoMdCloseCircle } from "react-icons/io";

const VerifyLevelThree = () => {
  const { tierThree, setTierThree } = useKyc();
  const { toast, setToast } = useToast();

  console.log(tierThree);

  const navigateTo = useNavigate();

  const selfieRef = useRef();
  const ninRef = useRef();

  const handleSelfieClick = () => selfieRef.current?.click();
  const handleNinClick = () => ninRef.current?.click();

  const handleSelfieChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          ...toast,
          error: true,
          errorMessage: `${name} must be less than 5MB`,
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setToast({
          ...toast,
          error: true,
          errorMessage: ` ${name} must be an image (JPEG, PNG, etc.)`,
        });
        return;
      }

      setTierThree((prevDetails) => ({
        ...prevDetails,
        selfiePhoto: file,
      }));
    }
  };

  const handleNinChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          ...toast,
          error: true,
          errorMessage: `${name} must be less than 5MB`,
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setToast({
          ...toast,
          error: true,
          errorMessage: ` ${name} must be an image (JPEG, PNG, etc.)`,
        });
        return;
      }

      setTierThree((prevDetails) => ({
        ...prevDetails,
        ninPhoto: file,
      }));
    }
  };

  const handleRemoveSelfie = () => {
    setTierThree((prevDetails) => ({
      ...prevDetails,
      selfiePhoto: null,
    }));
  };

  const handleRemoveNinPhoto = () => {
    setTierThree((prevDetails) => ({
      ...prevDetails,
      ninPhoto: null,
    }));
  };

  return (
    <>
      <InAppNav />
      <div className="md:pt-[70px] pt-[57px] lg:px-[2%] md:px-[2.5%] min-h-svh flex bg-black">
        <div className="flex flex-1 flex-col gap-[20px] lg:mx-[22.8%] p-[15px]">
          <div className="flex items-center justify-between ">
            <p className="text-lg font-semibold text-white flex items-center gap-1">
              KYC TIER 3
            </p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[25px]">
              <p className="text-xs text-tradeFadeWhite font-medium leading-relaxed">
                Finish your verification by uploading your selfie and NIN photo.
                This quick step confirms your identity and gives you full
                platform access.
              </p>
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col overflow-hidden h-[180px] bg-tradeAshLight hover:bg-tradeAshLight/70 border border-tradeAshLight rounded-[15px] gap-[15px] duration-300 transition-all">
                  {tierThree?.selfiePhoto === null ? (
                    <div
                      // onClick={handleSelfieClick}
                      className="flex flex-1 flex-col  gap-[10px] items-center justify-center cursor-pointer bg-transparent"
                    >
                      <MdAddCircle className="text-5xl text-tradeOrange" />
                      <p className="text-white font-semibold text-sm">
                        UPLOAD A SELFIE
                      </p>
                    </div>
                  ) : (
                    <div className="relative flex flex-1 flex-col gap-[10px] items-center justify-center ">
                      <img
                        src={URL.createObjectURL(tierThree.selfiePhoto)}
                        alt="Selfie preview"
                        className="w-full h-[180px] object-cover"
                      />

                      {tierThree.selfiePhoto && (
                        <div
                          onClick={handleRemoveSelfie}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-600/80 text-white rounded-full p-1 transition-all duration-300 cursor-pointer"
                        >
                          <IoMdCloseCircle />
                        </div>
                      )}
                    </div>
                  )}

                  <input
                    type="file"
                    ref={selfieRef}
                    name="Selfie"
                    className="hidden"
                    onChange={handleSelfieChange}
                    accept="image/*"
                  />
                </div>
                {/* <div className="flex flex-col overflow-hidden h-[180px] bg-tradeAshLight hover:bg-tradeAshLight/70 border border-tradeAshLight rounded-[15px] gap-[15px] duration-300 transition-all">
                  {tierThree?.ninPhoto === null ? (
                    <div
                      onClick={handleNinClick}
                      className="flex flex-1 flex-col gap-[10px] items-center justify-center cursor-pointer bg-transparent"
                    >
                      <MdAddCircle className="text-5xl text-tradeOrange" />
                      <p className="text-white font-semibold text-sm">
                        UPLOAD YOUR NIN PHOTO
                      </p>
                    </div>
                  ) : (
                    <div className="relative flex flex-1 flex-col gap-[10px] items-center justify-center ">
                      <img
                        src={URL.createObjectURL(tierThree.ninPhoto)}
                        alt="Selfie preview"
                        className="w-full h-[180px] object-cover"
                      />

                      {tierThree.ninPhoto && (
                        <div
                          onClick={handleRemoveNinPhoto}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-600/80 text-white rounded-full p-1 transition-all duration-300 cursor-pointer"
                        >
                          <IoMdCloseCircle />
                        </div>
                      )}
                    </div>
                  )}

                  <input
                    type="file"
                    ref={ninRef}
                    name="NIN Photo"
                    className="hidden"
                    onChange={handleNinChange}
                    accept="image/*"
                  />
                </div> */}
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigateTo("/kyc/tier/3")}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyLevelThree;
