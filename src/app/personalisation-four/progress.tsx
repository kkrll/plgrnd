import { log } from "console";

type AnimationPhase = null | "start" | "middle" | "end";

const Progress = ({
  currentLevel,
  animationPhase,
}: {
  currentLevel: number;
  animationPhase: AnimationPhase;
}) => {
  const getHeight = () => {
    if (animationPhase === "start" || animationPhase === "middle") {
      return "40px";
    } else {
      return "40px";
    }
  };

  console.log("currentLevel:", currentLevel, "animationPhase:", animationPhase);

  const getWidthPercentage = () => {
    return (currentLevel / 4) * 100;
  };

  // V1: Hide all symbols during animation
  // const getSymbolOpacity = () => {
  //   if (animationPhase.start || animationPhase.middle) {
  //     return 0;
  //   } else {
  //     return 1;
  //   }
  // };

  const getSymbolClass = (level: number) => {
    // For regular items (0-3), fade out the next item (currentLevel)
    if (level === currentLevel && animationPhase === "start") {
      return "animate-fade-out";
    }
    // Pop animation for newly completed items
    if (level === currentLevel - 1 && animationPhase === "middle") {
      return "animate-checkmark-pop";
    }
    return "";
  };

  return (
    <div
      className={`w-full p-0.5 rounded-[20px] bg-gradient-to-r from-34% from-[#F3F4F7] to-66% to-[#e3cafc] transition-all duration-500 ease-in-out relative`}
      style={{ height: getHeight() }}
    >
      <div
        className={`rounded-[18px] h-full`}
        style={{
          width: `${getWidthPercentage()}%`,
          background: "linear-gradient(to right, #a655f6 0%, #681bb5 100%)",
          transition: "width 1500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      ></div>
      <div
        className={`absolute top-0.5 left-0.5 rounded-[18px] h-full ease-in-out ${
          animationPhase === "middle" ? "animate-gradient-move" : ""
        }`}
        style={{
          width: `calc(${getWidthPercentage()}% - 2px)`,
          background: "linear-gradient(to right, #a655f6 0%, #8C25F4 100%)",
          opacity: animationPhase ? 1 : 0,
          height: "36px",
          transition:
            "width 1500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms ease-in-out",
        }}
      ></div>
      <div className="absolute top-0 left-0 p-0.5 w-full h-full pointer-events-none grid grid-cols-4">
        {[0, 1, 2].map((level) => (
          <div
            key={level}
            className={`h-full text-[12px] flex items-center justify-center text-white ${getSymbolClass(
              level
            )}`}
          >
            {level < currentLevel ? (
              "✓"
            ) : (
              <div className="bg-[rgba(0,0,0,0.16)] rounded-[8px] shrink-0 size-[4px] mx-auto" />
            )}
          </div>
        ))}
        <div
          className={`h-full text-[12px] flex items-center justify-center text-white ${getSymbolClass(
            3
          )}`}
        >
          {currentLevel == 4 ? (
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33203 12.623C0.998047 12.623 0.722656 12.3477 0.722656 12.0078V2.29297C0.722656 1.75977 0.974609 1.45508 1.39648 1.26172C1.88867 1.03906 2.32227 0.921875 3.19531 0.921875C5.30469 0.921875 6.82227 1.99414 8.84375 1.99414C9.74023 1.99414 10.2617 1.7832 10.6191 1.7832C11.0586 1.7832 11.3691 2.05859 11.3691 2.48633V8.25781C11.3691 8.80859 11.1348 9.16602 10.707 9.36523C10.2441 9.57617 9.78711 9.69922 8.89648 9.69922C6.82812 9.69922 5.35742 8.63281 3.24805 8.63281C2.57422 8.63281 2.11133 8.78516 1.94141 8.84375V12.0078C1.94141 12.3535 1.66602 12.623 1.33203 12.623ZM1.98242 5.9668C2.10547 5.81445 2.50977 5.60938 3.23047 5.60938C3.54688 5.60938 3.75195 5.63867 3.97461 5.66211V7.42578C4.73047 7.49609 5.4043 7.68945 6.05469 7.88281V6.16602C6.75195 6.38867 7.38477 6.53516 8.13477 6.63477V8.39844C8.375 8.43359 8.61523 8.45117 8.86133 8.45117C9.58203 8.45117 9.99219 8.25781 10.1094 8.09961V6.52344C9.79297 6.61133 9.39453 6.66992 8.87305 6.66992C8.66211 6.66992 8.41016 6.66406 8.13477 6.63477V4.83008C8.39844 4.85938 8.62695 4.86523 8.80859 4.86523C9.37109 4.86523 9.83984 4.78906 10.1094 4.71875V3.08398C9.77539 3.17773 9.33008 3.23047 8.80859 3.23047C8.58008 3.23047 8.35156 3.21289 8.13477 3.18945V4.83008C7.44336 4.75391 6.72852 4.57812 6.05469 4.36133V2.72656C5.36914 2.52148 4.70117 2.31055 3.97461 2.2168V3.85742C3.72266 3.82227 3.40625 3.80469 3.23047 3.80469C2.50977 3.80469 2.10547 4.00391 1.98242 4.16211V5.9668ZM3.97461 5.66211V3.85742C4.73633 3.95703 5.36328 4.15625 6.05469 4.36133V6.16602C5.31641 5.94922 4.73633 5.76172 3.97461 5.66211Z"
                fill="white"
              />
            </svg>
          ) : (
            <div className="bg-[rgba(0,0,0,0.16)] rounded-[8px] shrink-0 size-[4px] mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
