import { useEffect, useRef } from "react";

export const useCreteLink = (links) => {
  const ref = useRef(null);

  // console.log("calledCreateLink", links);

  useEffect(() => {
    const joinPoints = () => {
      const svg = ref?.current;
      if (!svg) {
        return;
      }
      links?.forEach(({ startingPoint, endingPoint }, idx) => {
        const startPoint = document.getElementById(startingPoint);
        const endPoint = document.getElementById(endingPoint);
        if (startPoint && endPoint) {
          const position1 = startPoint?.getBoundingClientRect();
          const position2 = endPoint?.getBoundingClientRect();

          const startX = position1.right + window.scrollX;
          const startY = position1.top + position1.height / 2 + window.scrollY;
          const endX = position2.left + window.scrollX;
          const endY = position2.top + position2.height / 2 + window.scrollY;

          const controlX = (startX + endX) / 2;
          const controlY = (startY + endY) / 2 + 70;

          const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          if (idx == 0 || idx == 5) {
            path.setAttribute("d", `M ${startX} ${startY} L ${endX} ${endY}`);
          } else {
            path.setAttribute(
              "d",
              `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
            );
          }
          path.setAttribute("stroke", "#0066ff4d");
          path.setAttribute("stroke-width", "7");
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-linecap", "round");

          svg.appendChild(path);
        }
      });
    };
    const timeoutId = setTimeout(() => {
      joinPoints();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [links]);

  return ref;
};
