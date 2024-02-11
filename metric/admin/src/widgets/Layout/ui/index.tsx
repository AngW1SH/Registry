import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface LayoutProps {
  aside: ReactElement;
  children: ReactNode;
  gap?: number;
}

const Layout: FC<LayoutProps> = ({ aside, children, gap = 50 }) => {
  const [contentOffset, setContentOffset] = useState<number | null>(null);

  const asideRef = useRef<HTMLDivElement>(null);
  const updateContentOffset = () => {
    if (asideRef.current) {
      // 50 is the padding
      setContentOffset(asideRef.current.clientWidth + gap);
    }
  };

  useEffect(() => {
    updateContentOffset();
  }, [asideRef]);

  useEffect(() => {
    addEventListener("resize", updateContentOffset);

    return () => {
      removeEventListener("resize", updateContentOffset);
    };
  }, []);

  return (
    <div className="flex">
      <div ref={asideRef} className="w-max fixed h-screen py-5 pl-5 ">
        {aside}
      </div>
      <div
        className="w-full relative top-5"
        style={{
          marginLeft: contentOffset + "px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
