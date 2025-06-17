import { GoDotFill } from "react-icons/go";

const Stepper = ({ totalSteps = 3, currentStep = 1 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center w-full">
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
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-xs font-bold ${
                isActive
                  ? "bg-tradeGreen border-tradeGreen text-white"
                  : "bg-tradeAshExtraLight border-tradeAshExtraLight text-white"
              }`}
            >
              {step}
            </div>

            {/* Line: only render if not last */}
            {!isLast && (
              <div
                className={`flex-1 h-[2px] ${
                  step < currentStep ? "bg-tradeGreen" : "bg-tradeAshExtraLight"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
