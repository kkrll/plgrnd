const Logo = ({ center = false }: { center?: boolean }) => {
    return (
        <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
            <img
                src="/man-funnel/logo.svg"
                alt="Logo"
                className="h-12 w-auto"
            />
        </div>
    );
};

export default Logo;