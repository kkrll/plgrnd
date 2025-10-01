export default function OnboardingCalibration() {
  return (
    <div className="bg-[#f3f4f7] relative min-h-screen w-full max-w-[390px] mx-auto">
      {/* Status Bar */}
      <div className="absolute flex h-[59px] items-end justify-center left-0 top-0 w-full">
        <div className="basis-0 flex flex-col gap-[8px] grow h-full items-center justify-center">
          <div className="h-[21px] relative rounded-[24px] w-[54px]">
            <div className="absolute font-semibold h-[20px] left-[50%] text-[17px] text-black text-center top-px translate-x-[-50%] w-[54px]">
              <p className="leading-[22px]">9:41</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full items-center pb-0 pt-[10px] px-0 relative">
          <div className="bg-black h-[37px] relative rounded-[100px] w-[125px]"></div>
        </div>
        <div className="basis-0 flex gap-[8px] grow h-full items-center justify-center">
          <div className="flex gap-[8px] items-start">
            <div className="h-[12px] w-[18px] bg-black rounded-sm"></div>
            <div className="h-[11px] w-[17px] bg-black rounded-sm"></div>
            <div className="h-[13px] w-[27px] bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute flex flex-col gap-[24px] items-end left-[23px] top-[128px] w-[343px]">
        <div className="flex flex-col gap-[40px] items-start w-full">
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex flex-col gap-[24px] items-start">
              {/* Avatar */}
              <div className="relative size-[80px]">
                <div className="absolute bg-[#d7dae5] inset-0 rounded-full"></div>
                <div className="absolute bg-center bg-cover bg-no-repeat inset-0 rounded-full bg-gray-600"></div>
              </div>
              {/* Plus Icon */}
              <div className="absolute bg-gradient-to-r flex from-[#c490f9] items-center left-[56px] rounded-[23px] to-[#5177eb] via-[#8c25f4] top-[56px] size-[24px] justify-center">
                <div className="text-[#e3cafc] text-[15px] font-bold">+</div>
              </div>
            </div>
            {/* Headline */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <h1 className="font-semibold text-[32px] text-[rgba(0,0,0,0.8)] leading-[40px] w-full">
                  We use first workouts to adapt to your fitness level and style.
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="backdrop-blur-[20px] bg-white/90 flex flex-col gap-[16px] p-[24px] rounded-[32px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] w-[343px]">
          <div className="flex gap-[24px] items-center w-full">
            <div className="flex gap-[8px] items-center grow">
              <div className="flex items-center justify-center size-[24px]">
                <div className="border-[#681bb5] border-[3px] rounded-full size-[24px] relative">
                  <div className="absolute inset-2 bg-[#681bb5] rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="font-semibold text-[16px] text-black grow">
                Calibrating your reps and weights...
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-[#f3f4f7] from-34% to-[#e3cafc] h-[40px] overflow-hidden rounded-[24px] relative w-full">
              <div className="absolute bg-gradient-to-r from-[#a655f6] to-[#681bb5] h-[36px] left-[2px] rounded-[20px] top-[2px] w-[118px]"></div>
              <div className="absolute flex h-[40px] items-center justify-between left-0 right-0 top-0">
                <div className="flex gap-[8px] items-center px-[24px] py-[18px] basis-0 grow">
                  <div className="flex flex-col h-full justify-center text-[#e3cafc] text-[12px] text-center">
                    <p>✓</p>
                  </div>
                </div>
                <div className="flex gap-[8px] items-center px-[24px] py-[18px] basis-0 grow">
                  <div className="size-[12px] flex items-center justify-center">
                    <div className="text-[12px]">📊</div>
                  </div>
                </div>
                <div className="flex gap-[8px] items-center px-[24px] py-[18px] basis-0 grow">
                  <div className="bg-[rgba(0,0,0,0.16)] rounded-[8px] size-[4px]"></div>
                </div>
                <div className="flex gap-[8px] items-center px-[24px] py-[18px] basis-0 grow">
                  <div className="bg-[rgba(0,0,0,0.16)] rounded-[8px] size-[4px]"></div>
                </div>
                <div className="flex gap-[8px] items-center justify-center px-[24px] py-[18px] basis-0 grow">
                  <div className="text-[#061338] text-[12px] opacity-[0.24]">
                    <p>→</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Labels */}
            <div className="flex font-semibold items-start justify-between text-[12px] uppercase w-full">
              <div className="text-[#a3abc3] text-center w-[56px]">
                <p className="leading-[16px]">Profile</p>
              </div>
              <div className="text-black">
                <p className="leading-[16px]">Workouts assessment</p>
              </div>
              <div className="text-[#a3abc3] text-center w-[56px]">
                <p className="leading-[16px]">Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 h-[94px] left-0 w-full">
        <div className="absolute bottom-0 left-0 right-0">
          <div className="absolute bottom-0 h-[66px] left-0 right-0 bg-gradient-to-t from-white/20 to-transparent"></div>
          <div className="absolute bg-black bottom-[40px] flex flex-col gap-[16px] items-center left-[6.15%] px-[24px] py-[16px] right-[6.15%] rounded-[16px]">
            <div className="flex gap-[10px] items-center">
              <div className="font-semibold text-[16px] text-white">
                Got It
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}