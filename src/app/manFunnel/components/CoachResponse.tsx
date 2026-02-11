const CoachResponse = ({ coach, quote }: { coach: string; quote: string }) => {
  return (
    <div>
      <div className="coach-avatar flex items-center gap-2 mb-2">
        <img src={`/man-funnel/avatars/${coach}.png`} className="w-12 h-12" />
        <p className="capitalize font-semibold text-grey-400">{`Coach ${coach}`}</p>
      </div>
      <div className="flex flex-col coach-quote">
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6L2.62268e-07 6L1.65509e-07 3.78641C1.83513e-08 0.419829 4.30857 -1.26616 6.82843 1.11437L12 6Z"
            fill="#1339AB"
          />
        </svg>
        <p className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pb-3 pt-2">
          {quote}
        </p>
      </div>
    </div>
  );
};

export default CoachResponse;
