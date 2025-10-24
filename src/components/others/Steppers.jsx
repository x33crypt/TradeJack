import { GoDotFill } from "react-icons/go";

const Stepper = ({ totalSteps = 3, currentStep = 1 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Labels Row */}
      <div className="flex justify-between items-center w-full px- bg-tradeOrang">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-sm font-bold ${
              index === steps.length - 1
                ? "text-tradeFadeWhite"
                : "text-tradeFadeWhite"
            }`}
          >
            {index === steps.length - 1 ? "PREVIEW" : `STEP ${step}`}
          </div>
        ))}
      </div>

      {/* Stepper Row */}
      <div className="flex items-center w-full px-[15px]">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step <= currentStep;

          return (
            <div
              key={step}
              className={`flex items-center ${!isLast ? "flex-1" : "shrink-0"}`}
            >
              {/* Dot */}
              <div
                className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs font-bold ${
                  isActive
                    ? "bg-tradeOrange border-tradeOrange text-white"
                    : "bg-tradeAshExtraLight border-tradeAshExtraLight text-white"
                }`}
              ></div>

              {/* Line: only render if not last */}
              {!isLast && (
                <div
                  className={`flex-1 h-[2px] ${
                    step < currentStep
                      ? "bg-tradeOrange"
                      : "bg-tradeAshExtraLight"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
