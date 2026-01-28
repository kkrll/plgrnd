interface DividerProps {
    direction?: 'horizontal' | 'vertical';
    className?: string;
}

export const Divider = ({
    direction = 'horizontal',
    className = ''
}: DividerProps) => {
    const baseStyles = "bg-gray-200 dark:bg-gray-700";
    const orientationStyles = direction === 'horizontal' ? "w-full h-px" : "h-full w-px";

    return (
        <div
            role="separator"
            aria-orientation={direction}
            className={`${baseStyles} ${orientationStyles} ${className}`}
        />
    );
};