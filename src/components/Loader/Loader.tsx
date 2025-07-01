import styles from "./Loader.module.css";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      className="
        fixed
        inset-0
        flex
        items-center
        justify-center
        pointer-events-none
        z-50">
      <div
        className="
          absolute
          w-screen
          h-screen
          bg-[var(--color-bg)]
          opacity-50"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="200px"
        width="200px"
        viewBox="0 0 200 200"
        className="
          p-0
          m-0
          aspect-square
          text-[var(--color-text)]
          rounded-full
          z-50">
        <defs>
          <clipPath className={styles.pencilEraser}>
            <rect
              height={30}
              width={30}
              ry={5}
              rx={5}
            />
          </clipPath>
        </defs>
        <circle
          transform="rotate(-113,100,100)"
          strokeLinecap="round"
          strokeDashoffset="439.82"
          strokeDasharray="439.82 439.82"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          r={70}
          className={styles.pencilStroke}
        />
        <g
          transform="translate(100,100)"
          className={styles.pencilRotate}>
          <g fill="none">
            <circle
              transform="rotate(-90)"
              strokeDashoffset={402}
              strokeDasharray="402.12 402.12"
              strokeWidth={30}
              stroke="hsl(223,90%,50%)"
              r={64}
              className={styles.pencilBody1}
            />
            <circle
              transform="rotate(-90)"
              strokeDashoffset={465}
              strokeDasharray="464.96 464.96"
              strokeWidth={10}
              stroke="hsl(223,90%,60%)"
              r={74}
              className={styles.pencilBody2}
            />
            <circle
              transform="rotate(-90)"
              strokeDashoffset={339}
              strokeDasharray="339.29 339.29"
              strokeWidth={10}
              stroke="hsl(223,90%,40%)"
              r={54}
              className={styles.pencilBody3}
            />
          </g>
          <g
            transform="rotate(-90) translate(49,0)"
            className={styles.pencilEraser}>
            <g className={styles.pencilEraserSkew}>
              <rect
                height={30}
                width={30}
                ry={5}
                rx={5}
                fill="hsl(223,90%,70%)"
              />
              <rect
                clipPath="url(#pencil-eraser)"
                height={30}
                width={5}
                fill="hsl(223,90%,60%)"
              />
              <rect
                height={20}
                width={30}
                fill="hsl(223,10%,90%)"
              />
              <rect
                height={20}
                width={15}
                fill="hsl(223,10%,70%)"
              />
              <rect
                height={20}
                width={5}
                fill="hsl(223,10%,80%)"
              />
              <rect
                height={2}
                width={30}
                y={6}
                fill="hsla(223,10%,10%,0.2)"
              />
              <rect
                height={2}
                width={30}
                y={13}
                fill="hsla(223,10%,10%,0.2)"
              />
            </g>
          </g>
          <g
            transform="rotate(-90) translate(49,-30)"
            className={styles.pencilPoint}>
            <polygon
              points="15 0,30 30,0 30"
              fill="hsl(33,90%,70%)"
            />
            <polygon
              points="15 0,6 30,0 30"
              fill="hsl(33,90%,50%)"
            />
            <polygon
              points="15 0,20 10,10 10"
              fill="var(--color-text)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
