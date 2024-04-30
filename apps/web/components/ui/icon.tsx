"use client";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

export const Icon = ({
  children,
  className = "fill-black",
  size = 24,
  fill,
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      fill={fill}
      className={className}
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
};
