export default function WorkoutResults() {
  const exercises = [
    {
      name: "Dynamic Stretch Routine",
      duration: "30 sec"
    },
    {
      name: "Air Squats",
      duration: "30 sec"
    },
    {
      name: "Dynamic Stretch",
      duration: "30 sec"
    }
  ];

  const mainExercises = [
    {
      name: "Barbell Incline Bench Press",
      sets: [
        { reps: 15, weight: "20 kg" },
        { reps: 20, weight: "15 kg" },
        { reps: 25, weight: "10 kg" }
      ]
    },
    {
      name: "Cable Bicep Curl",
      sets: [
        { reps: 15, weight: "20 kg" },
        { reps: 20, weight: "15 kg" },
        { reps: 25, weight: "10 kg" }
      ]
    },
    {
      name: "Box Jumps",
      sets: [
        { reps: 15 },
        { reps: 20 },
        { reps: 25 }
      ]
    }
  ];

  const supersetExercises = [
    {
      name: "Barbell Incline Bench Press",
      sets: [
        { reps: 15, weight: "10 kg" },
        { reps: 15, weight: "10 kg" },
        { reps: 15, weight: "10 kg" }
      ]
    },
    {
      name: "Cable Bicep Curl",
      sets: [
        { reps: 15, weight: "10 kg" },
        { reps: 15, weight: "10 kg" },
        { reps: 15, weight: "10 kg" }
      ]
    },
    {
      name: "Box Jumps",
      sets: [
        { reps: 15 },
        { reps: 15 },
        { reps: 15 }
      ]
    }
  ];

  return (
    <div className="bg-white relative min-h-screen w-full max-w-[390px] mx-auto">
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

      {/* Share Button */}
      <div className="absolute backdrop-blur-[25px] bg-[rgba(179,179,179,0.82)] flex items-center justify-center left-[322px] p-[16px] rounded-[16px] size-[44px] top-[60px]">
        <div className="text-white">📤</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-[40px] items-start px-[24px] pt-[128px] pb-[120px] w-full">
        {/* Header Section */}
        <div className="bg-white flex flex-col gap-[24px] items-center rounded-[16px] w-full">
          <div className="flex flex-col gap-[40px] items-center w-full">
            <div className="flex flex-col gap-[40px] items-start w-full">
              <div className="flex flex-col gap-[8px] items-start w-full">
                <div className="flex flex-col gap-[8px] items-center w-full">
                  <div className="text-[32px] font-semibold text-black text-center w-full">
                    🏃‍♂️
                  </div>
                  <div className="text-[32px] font-semibold text-black text-center w-full">
                    My Activity
                  </div>
                  <div className="flex items-start justify-between w-full">
                    <div className="text-[16px] text-[#797f91] grow">
                      Fri, 21 Apr 2023
                    </div>
                    <div className="text-[16px] text-[#797f91] text-right">
                      10:20 – 11:03 (43 min)
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-[4px] w-full">
                <div className="bg-[#fafbfc] flex flex-col gap-[8px] items-center justify-center px-0 py-[16px] rounded-[16px] grow">
                  <div className="text-[24px] font-semibold text-[#a0dd1d] text-center">
                    🏋️
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="text-[18px] font-semibold text-black">12</div>
                    <div className="text-[16px] text-[#797f91]">Exercise</div>
                  </div>
                </div>
                <div className="bg-[#fafbfc] flex flex-col gap-[8px] items-center justify-center px-0 py-[16px] rounded-[16px] grow">
                  <div className="text-[24px] font-semibold text-[#ec5929] text-center">
                    🔥
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="text-[18px] font-semibold text-black">257</div>
                    <div className="text-[16px] text-[#797f91]">Kcal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Muscle Groups Section */}
        <div className="flex flex-col gap-[40px] items-start w-full">
          <div className="flex flex-col gap-[40px] items-center justify-center rounded-[24px] w-full">
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[8px] items-start w-full">
                <div className="text-[12px] text-[#797f91] uppercase w-full">
                  UPPER BODY WORKOUT
                </div>
                <div className="text-[16px] text-black w-full">
                  Upper Body (Lower Body; Full Body) muscle groups are loaded in 50%
                </div>
              </div>

              {/* Body Diagram Placeholder */}
              <div className="flex gap-[23px] items-center justify-center w-full">
                <div className="bg-[#e0e7ff] rounded-lg p-8 flex items-center justify-center">
                  <div className="text-[#5177eb] text-6xl">🏃‍♂️</div>
                </div>
                <div className="bg-[#d7dae5] w-px h-[80px]"></div>
                <div className="bg-[#f0f0f0] rounded-lg p-8 flex items-center justify-center">
                  <div className="text-gray-400 text-6xl">🚶‍♂️</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises Section */}
        <div className="flex flex-col gap-[40px] items-start w-full">
          {/* Exercises Header */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="text-[12px] text-[#797f91] uppercase">EXERCISES</div>

            {/* Warm-up */}
            <div className="text-[12px] text-[#797f91] uppercase">WARM–UP</div>
            <div className="flex flex-col gap-[8px] items-start w-full">
              {exercises.map((exercise, index) => (
                <div key={index}>
                  <div className="flex gap-[10px] items-center w-full">
                    <div className="font-semibold text-black grow">
                      {exercise.name}
                    </div>
                    <div className="text-[#797f91] text-right">
                      {exercise.duration}
                    </div>
                  </div>
                  <div className="bg-[#d7dae5] h-px w-full mt-[8px]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Exercises */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="text-[12px] text-[#797f91] uppercase">MAIN</div>
            <div className="flex flex-col gap-[8px] items-start w-full">
              {mainExercises.map((exercise, index) => (
                <div key={index}>
                  <div className="flex gap-[8px] items-start w-full">
                    <div className="font-semibold text-black grow">
                      {exercise.name}
                    </div>
                    <div className="flex flex-col gap-[8px] items-end text-[#797f91] text-right">
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex}>
                          {"weight" in set ? (
                            <span>
                              {set.reps} reps <span className="text-[#bec4d5]">×</span> {set.weight}
                            </span>
                          ) : (
                            <span>{set.reps} reps</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#d7dae5] h-px w-full mt-[8px]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Superset */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[8px] items-baseline text-[12px] text-[#797f91] uppercase">
              <span>SUPERSET,</span>
              <span>3 ROUNDS</span>
            </div>
            <div className="flex flex-col gap-[8px] items-start w-full">
              {supersetExercises.map((exercise, index) => (
                <div key={index}>
                  <div className="flex gap-[8px] items-start w-full">
                    <div className="font-semibold text-black grow">
                      {exercise.name}
                    </div>
                    <div className="flex flex-col gap-[8px] items-end text-[#797f91] text-right">
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex}>
                          {"weight" in set ? (
                            <span>
                              {set.reps} reps <span className="text-[#bec4d5]">×</span> {set.weight}
                            </span>
                          ) : (
                            <span>{set.reps} reps</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#d7dae5] h-px w-full mt-[8px]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Cool-down */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="text-[12px] text-[#797f91] uppercase">COOL–DOWN</div>
            <div className="flex flex-col gap-[8px] items-start w-full">
              {exercises.map((exercise, index) => (
                <div key={index}>
                  <div className="flex gap-[10px] items-center w-full">
                    <div className="font-semibold text-black grow">
                      {exercise.name}
                    </div>
                    <div className="text-[#797f91] text-right">
                      {exercise.duration}
                    </div>
                  </div>
                  <div className="bg-[#d7dae5] h-px w-full mt-[8px]"></div>
                </div>
              ))}
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
                Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}