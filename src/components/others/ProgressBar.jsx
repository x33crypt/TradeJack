export default function ProgressBar({ value = 0 }) {
  return (
    <div className="flex gap-4 w-full items-center">
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        readOnly
        className="
          w-full h-[5px] rounded-lg appearance-none bg-tradeAshLight pointer-events-none
          [&::-webkit-slider-thumb]:appearance-none
          [&::-moz-range-thumb]:appearance-none
          [&::-ms-thumb]:appearance-none
        "
        style={{
          background: `linear-gradient(to right, #22c55e ${value}%, #3a3f44 ${value}%)`,
        }}
      />

      <p className="text-tradeFadeWhite text-xs font-semibold">{value}%</p>
    </div>
  );
}
