import { type FunctionComponent } from "react";

type BadgeProps = {
    children: React.ReactNode,
    variant?: string,
    asDiv?: boolean,
    [key: string]: any
}

const Badge: FunctionComponent<BadgeProps> = ({ children, variant = 'muted', asDiv = false, ...props }) => {
    const bg = 'bg-gray-200';
    const text = 'text-gray-800';
  
    const variantStyles: Record<string, string> = {
      primary: 'bg-teal-100 text-teal-800',
      secondary: 'bg-indigo-100 text-indigo-800',
      tertiary: 'bg-purple-100 text-purple-800',
      success: 'bg-sky-200 text-sky-800',
      warning: 'bg-amber-200 text-amber-800',
      danger: 'bg-red-200 text-red-800',
      muted: 'bg-gray-200 text-gray-800',
    };
  
    const variantStyle = variantStyles[variant];
  
    // Validate variant prop to avoid potential bugs
    if (!variantStyle) {
      console.warn(`Invalid variant "${variant}" provided for Badge. Defaulting to "muted".`);
    }
  
    const badgeClass = `${bg} ${text} rounded-[3px] text-xs px-1 font-medium ${variantStyle}`;
  
    return !asDiv ? (
      <span className={badgeClass} {...props}>
        {children}
      </span>
    ) : (
      <div className={badgeClass} {...props}>
        {children}
      </div>
    );
  };
  
  export default Badge;