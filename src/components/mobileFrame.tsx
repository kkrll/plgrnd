import { ReactNode } from "react";

const MobileFrame = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={`max-w-[412px] min-h-[844px] md:max-h-screen overflow-scroll md:border-8 md:rounded-[48px] md:border-gray-200 md:mx-auto ${className}`}
    >
      {children}
    </section>
  );
};

export default MobileFrame;
