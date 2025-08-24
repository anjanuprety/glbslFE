// Utility types for React Router NavLink
export type NavLinkClassNameFunction = ({ isActive, isPending }: {
  isActive: boolean;
  isPending: boolean;
}) => string;

export const createNavLinkClassName = (baseClasses: string, activeClasses?: string, pendingClasses?: string): NavLinkClassNameFunction => {
  return ({ isActive, isPending }) => {
    let className = baseClasses;
    if (isPending && pendingClasses) {
      className += ` ${pendingClasses}`;
    } else if (isActive && activeClasses) {
      className += ` ${activeClasses}`;
    }
    return className;
  };
};

// Common NavLink styles
export const getNavLinkClass = (isActive: boolean, isPending: boolean): string => {
  if (isPending) return "pending";
  if (isActive) return "active";
  return "";
};
