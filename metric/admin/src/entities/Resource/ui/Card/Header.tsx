import { ArrowDown } from "@/shared/ui/Icons";
import { FC, HTMLAttributes, ReactElement, ReactNode, useRef } from "react";
import { useActionsToggleOpen } from "./useActionsToggleOpen";
import { Transition, TransitionStatus } from "react-transition-group";

interface HeaderProps {
  title: string;
  icon: ReactElement<HTMLAttributes<SVGSVGElement>>;
  opened?: boolean;
  actions?: ReactNode;
}

const Header: FC<HeaderProps> = ({ title, icon, opened = true, actions }) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const nodeRef = useRef<HTMLDivElement>(null);

  const { styles } = useActionsToggleOpen(actionsRef, actions);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!arrowRef.current || !arrowRef.current.contains(e.target as Node)) {
      e.stopPropagation();
    }
  };

  return (
    <div onClick={handleClick} className="px-14 py-12 rounded-lg bg-background">
      <div
        className="flex items-center justify-between cursor-pointer"
        ref={arrowRef}
      >
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 p-2 border border-[#dedede] rounded-xl bg-background flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-4xl font-medium">{title}</h2>
        </div>
        <div
          className={`hover:bg-[#eee] cursor-pointer border h-12 w-12 flex justify-center items-center pt-[3px] rounded-full transition-transform ${
            opened ? "" : "rotate-180"
          }`}
        >
          <ArrowDown height="15" width="24" />
        </div>
      </div>
      {!!actions && (
        <Transition nodeRef={nodeRef} in={opened} timeout={150}>
          {(state: TransitionStatus) => (
            <div
              ref={nodeRef}
              className={`relative ${
                state == "entered" ? "overflow-visible" : "overflow-hidden"
              }`}
            >
              <div
                className="relative"
                style={{
                  ...styles.default,
                  ...styles.transition[state],
                }}
              >
                <div ref={actionsRef}>
                  <div className="pt-14" />
                  <div>{actions}</div>
                </div>
              </div>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default Header;
