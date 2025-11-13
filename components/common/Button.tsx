import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        // Common Styles
        `rounded-full transition-all duration-300
        text-black bg-[#F3EFEA] hover:text-white hover:bg-black
        flex items-center justify-center
        font-reddit font-bold py-2
        leading-[1.1] tracking-[-0.02em] wrap-break-word
        border-black hover:pointer-cursor
                `,
        // Responsive Styles
        `text-[16px] min-[1080px]:text-[22px]
        w-[140px] min-[1080px]:w-[180px]
        h-9 min-[1080px]:h-10
        border-2 min-[1080px]:border-3
                `,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
