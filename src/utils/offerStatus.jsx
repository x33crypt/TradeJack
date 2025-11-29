import { GrStatusGoodSmall } from "react-icons/gr";
import { MdPauseCircleFilled } from "react-icons/md";
import { IoWarningSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

export function offerStatus(status) {
  const config = {
    active: {
      icon: GrStatusGoodSmall,
      color: "text-tradeGreen",
      // border: "border-tradeGreen",
    },
    paused: {
      icon: MdPauseCircleFilled,
      color: "text-tradeOrange",
      // border: "border-tradeOrange",
    },
    suspended: {
      icon: IoWarningSharp,
      color: "text-orange-500",
      // border: "border-orange-500",
    },
    closed: {
      icon: IoCloseCircle,
      color: "text-red-600",
      // border: "border-red-600",
    },
  };

  const selected = config[status] || config.closed;
  const Icon = selected.icon;

  return (
    <div
      className={`p-0.5 borde ${selected.border} rounded-full flex items-center justify-center`}
    >
      <Icon className={`text-[10px] ${selected.color} flex-shrink-0`} />
    </div>
  );
}
