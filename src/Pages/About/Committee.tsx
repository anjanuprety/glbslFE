import React from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import PersonTile from "./components/PersonTile";

const committees = [
  { name: "Audit Committee", members: 3 },
  { name: "Risk Committee", members: 3 },
  { name: "Remuneration Committee", members: 4 },
  { name: "Social Responsibility Committee", members: 5 },
];

const Committee: React.FC = () => {
  return (
    <div>
      <BreadCrumb title="Committee" home="/" />
      {/* Expert Members */}
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container">
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img
                src="/images/inner/inner-logo.png"
                alt="room_section_logo"
                className="w-[50px] h-[50px]"
              />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              COMMITTEES
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Our specialized committees ensuring governance and oversight
            </p>
          </div>

          {/* Section Content */}
          <div className="mt-[60px] space-y-12">
            {committees.map((c, idx) => (
              <div key={idx}>
                <h3 className="font-Garamond text-2xl font-semibold mb-6 text-center text-lightBlack dark:text-white">{c.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                  {new Array(c.members).fill(0).map((_, i) => (
                    <PersonTile
                      key={`${idx}-${i}`}
                      id={`${idx}-${i}`}
                      name={`${c.name} Member ${i + 1}`}
                      position={c.name}
                      email={`${c.name.replace(/\s+/g, "").toLowerCase()}${i + 1}@example.com`}
                      phone={`+977-1-${(7000000 + idx * 1000 + i + 1).toString()}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committee;
