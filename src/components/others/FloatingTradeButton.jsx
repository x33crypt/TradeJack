import React from "react";
import { RiExchangeFundsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdDataExploration } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";

const FloatingTradeButton = () => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    // navigateTo("/offers/user/create"); // 👈 change this to your ongoing trades/messages route
  };

  return (
    <div className="fixed bottom-28 right-6 shadow-lg z-20 w-max flex gap-1 items-center justify-center bg-tradeAshExtraLight border border-tradeAshExtraLight p-2 h-max rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
      {/* Badge */}
      {true > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow-md">
          1
        </span>
      )}

      <button onClick={handleClick}>
        <IoChatbubbles className="text-[40px] text-tradeFadeWhite" />
      </button>
    </div>
  );
};

export default FloatingTradeButton;

// import React, { useState, useRef, useEffect } from "react";
// import { RiExchange2Fill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// const FloatingTradeButton = ({ activeTrades = 1 }) => {
//   const navigate = useNavigate();
//   const [dragging, setDragging] = useState(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const moved = useRef(false);

//   const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

//   // 📍 Initialize with a safe fallback (but will be updated below)
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   // ✅ Load position after mount (safe for mobile)
//   useEffect(() => {
//     const loadPosition = () => {
//       const saved = localStorage.getItem("floatingTradePos");

//       const defaultPos = {
//         x: window.innerWidth - 80, // button width + margin
//         y: window.innerHeight - 100,
//       };

//       if (saved) {
//         const pos = JSON.parse(saved);
//         setPosition({
//           x: clamp(pos.x, 10, window.innerWidth - 100),
//           y: clamp(pos.y, 10, window.innerHeight - 100),
//         });
//       } else {
//         setPosition(defaultPos);
//       }
//     };

//     loadPosition();

//     // 🖥️ Recalculate on window resize (orientation change / rotation / resize)
//     window.addEventListener("resize", loadPosition);
//     return () => window.removeEventListener("resize", loadPosition);
//   }, []);

//   // 🖱️ / 📱 Drag start
//   const startDrag = (clientX, clientY) => {
//     setDragging(true);
//     dragStart.current = { x: clientX - position.x, y: clientY - position.y };
//     moved.current = false;
//   };

//   // 🖱️ / 📱 Drag move
//   const moveDrag = (clientX, clientY) => {
//     if (!dragging) return;
//     const newX = clamp(
//       clientX - dragStart.current.x,
//       10,
//       window.innerWidth - 80
//     );
//     const newY = clamp(
//       clientY - dragStart.current.y,
//       10,
//       window.innerHeight - 80
//     );

//     if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
//       moved.current = true;
//     }
//     setPosition({ x: newX, y: newY });
//   };

//   // 🖱️ / 📱 Drag end
//   const endDrag = () => {
//     setDragging(false);
//     localStorage.setItem("floatingTradePos", JSON.stringify(position));
//   };

//   const handleClick = () => {
//     if (!moved.current) navigate("/offers/user/create");
//   };

//   return (
//     <div
//       className="fixed z-[30] select-none"
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         transition: dragging ? "none" : "transform 0.2s ease",
//       }}
//       onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
//       onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
//       onMouseUp={endDrag}
//       onMouseLeave={endDrag}
//       onTouchStart={(e) =>
//         startDrag(e.touches[0].clientX, e.touches[0].clientY)
//       }
//       onTouchMove={(e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
//       onTouchEnd={endDrag}
//     >
//       <button
//         onClick={handleClick}
//         className="relative bg-tradeGreen border border-tradeAshExtraLight p-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
//       >
//         {activeTrades > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow-md z-10">
//             {activeTrades}
//           </span>
//         )}
//         <RiExchange2Fill className="text-5xl text-black" />
//       </button>
//     </div>
//   );
// };

// export default FloatingTradeButton;
