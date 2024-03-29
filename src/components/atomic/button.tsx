import { type ComponentPropsWithoutRef, type FunctionComponent } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary' | 'success' | 'warning' | 'danger';
  };

const Button: FunctionComponent<ButtonProps> = (props) => {
    let classes = '';
  
    // Apply styles based on disabled state
    if (props.disabled === true) {
      classes += 'text-gray-400 cursor-not-allowed hover:shadow-none';
    } else {
      classes = 'hover:ring-gray-200 hover:bg-gray-200';
    }
  
    // Apply styles based on variant if not disabled
    if (props.variant && props.disabled !== true) {
      switch (props.variant) {
        case "primary":
          classes = "hover:ring-teal-200 hover:bg-teal-200";
          break;
        case "success":
          classes = "hover:ring-sky-200 hover:bg-sky-200";
          break;
        case "warning":
          classes = "hover:ring-yellow-200 hover:bg-yellow-200";
          break;
        case "danger":
          classes = "hover:ring-red-200 hover:bg-red-200";
          break;
        // Add default case or handle invalid variant
        default:
          console.warn(`Invalid variant provided for Button. Defaulting to default styles.`);
          break;
      }
    }
  
    return (
      <button className={`${classes} bg-white text-[hsl(280,13.34%,24.04%)] justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:shadow-md`} {...props} />
    );
  }
  
  export default Button;


