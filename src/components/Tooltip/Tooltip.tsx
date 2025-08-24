import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const TooltipBox = styled.div`
  position: absolute;
  background: #13233d;
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  white-space: nowrap;
  font-size: 13px;
  z-index: 99999;
  pointer-events: none;
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
`;

type TooltipProps = {
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = "top",
  children,
}) => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const showTooltip = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;

    switch (position) {
      case "top":
        y = rect.top - 8;
        x = rect.left + rect.width / 2;
        break;
      case "bottom":
        y = rect.bottom + 8;
        x = rect.left + rect.width / 2;
        break;
      case "left":
        x = rect.left - 8;
        y = rect.top + rect.height / 2;
        break;
      case "right":
        x = rect.right + 8;
        y = rect.top + rect.height / 2;
        break;
    }

    setCoords({ x, y });
  };

  const hideTooltip = () => setCoords(null);

  return (
    <>
      <span
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: "inline-flex" }}
      >
        {children}
      </span>
      {coords &&
        ReactDOM.createPortal(
          <TooltipBox
            style={{
              left: coords.x,
              top: coords.y,
              transform:
                position === "top"
                  ? "translate(-50%, -100%)"
                  : position === "bottom"
                  ? "translate(-50%, 0)"
                  : position === "left"
                  ? "translate(-100%, -50%)"
                  : "translate(0, -50%)",
              opacity: 1,
            }}
          >
            {text}
          </TooltipBox>,
          document.body
        )}
    </>
  );
};
