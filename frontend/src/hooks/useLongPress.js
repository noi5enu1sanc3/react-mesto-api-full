import { useState, useRef } from "react";

export default function useLongPress({ onLongPress, onClick }) {
  const [action, setAction] = useState();

  const timerRef = useRef();
  const isLongPress = useRef();

  function clear() {
    isLongPress.current = false;
    clearTimeout(timerRef.current);
    setAction("");
  }

  function startPressTimer() {
    clear();
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress");
      console.log("looong press");
      if (typeof onLongPress === "function") {
        onLongPress();
      }
    }, 500);
  }

  function handleOnClick(e) {
    if (isLongPress.current) {
      return;
    }
    setAction("click");
    if (typeof onClick === "function") {
      console.log("like clicked!");
      onClick();
    }
  }

  function handleOnMouseDown() {
    startPressTimer();
  }

  function handleOnMouseUp() {
    clear();
  }

  function handleOnTouchStart() {
    clear();
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if (action === "longpress") return;
    clear();
  }

  return {
    action,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
}
