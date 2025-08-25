import React from "react";

export interface PersonProps {
  id: string | number;
  name: string;
  position: string;
  email?: string;
  phone?: string;
  image?: string;
  className?: string;
}

const PersonTile: React.FC<PersonProps> = ({
  id,
  name,
  position,
  email = "",
  phone = "",
  image = "/images/inner/member-1.jpg",
  className = "",
}) => {
  return (
    <div className={`member group ${className}`} data-id={id}>
      <img src={image} className="w-full" alt={name} />
      <div className="relative">
        <div className="px-4 lg:px-[30px] pt-5">
          <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-[28px] leading-7 md:leading-8 lg:leading-10 text-lightBlack dark:text-white font-semibold font-Garamond text-center hover:opacity-0">
            {name}
          </h3>
          <p className="text-sm md:text-base leading-[26px] text-Gray dark:text-lightGray font-normal font-Lora text-center group-hover:text-white dark:hover:text-white hover:opacity-0">
            {position}
          </p>
        </div>

        <div className="p-[30px] bg-normalBlack grid items-center justify-center absolute bottom-[-150px] sm:bottom-[-170px] md:bottom-[-150px] group-hover:bottom-[-38px] lg:group-hover:bottom-[-30px] transition-all duration-500 left-0 right-0">
          <div className="text-center text-white space-y-1">
            <p className="text-white font-medium leading-6 text-lg lg:text-xl font-Garamond">
              {phone || "+977-1-234567"}
            </p>
            <p className="text-white font-medium leading-6 text-lg lg:text-xl font-Garamond">
              {email || "example@gmail.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonTile;
