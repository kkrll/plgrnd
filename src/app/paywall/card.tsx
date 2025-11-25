const Card = ({
  title,
  price,
  isSelected,
  onClick,
  isPromoted,
}: {
  title: string;
  price: string;
  isSelected: boolean;
  onClick: () => void;
  isPromoted: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden border rounded-2xl w-full cursor-pointer min-h-28 ${
        isSelected
          ? "border-blue-500 bg-blue-900"
          : "border-gray-800 bg-blue-950/"
      }`}
    >
      {isPromoted && (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 327 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`absolute inset-0 z-0 transition-all duration-300 ${
            isSelected ? "opacity-100" : "opacity-50 grayscale"
          }`}
        >
          <g clip-path="url(#clip0_944_11287)">
            <g filter="url(#filter0_f_944_11287)">
              <path
                d="M382.969 75.2904C376.135 117.864 185.332 246.079 54.6103 225.095C-76.1116 204.11 -27.3309 51.7601 -20.4966 9.18649C-13.6623 -33.3871 67.8523 95.0392 198.574 116.024C329.296 137.008 389.803 32.7168 382.969 75.2904Z"
                fill="#1A4CE6"
              />
            </g>
            <g filter="url(#filter1_f_944_11287)">
              <path
                d="M-7.37793 94.6688C-46.171 86.5385 -39.1032 150.508 -2.66619 171.873C91.5025 227.089 215.401 269.91 232.747 188.782C244.109 135.643 42.1731 105.054 -7.37793 94.6688Z"
                fill="#E7ECFC"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_944_11287"
              x="-157.027"
              y="-121.404"
              width="662.516"
              height="470.802"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="61"
                result="effect1_foregroundBlur_944_11287"
              />
            </filter>
            <filter
              id="filter1_f_944_11287"
              x="-155.405"
              y="-28.041"
              width="510.614"
              height="383.821"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="61"
                result="effect1_foregroundBlur_944_11287"
              />
            </filter>
            <clipPath id="clip0_944_11287">
              <rect width="327" height="124" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <div className="flex p-4 w-full ">
        <h3 className="text-lg font-semibold mb-2 w-full text-left">{title}</h3>
        <p className="text-2xl font-bold">{price}</p>
      </div>
    </button>
  );
};

export default Card;
