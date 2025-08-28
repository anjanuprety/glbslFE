import React from "react";
import PersonTile from "../../Pages/About/components/PersonTile";

const teamMembers = [
  {
    id: 1,
    name: "Team Member 1",
    position: "Contact Specialist",
    email: "contact1@example.com",
    phone: "+977-1-6000001",
    image: "/images/inner/member-1.jpg",
  },
  {
    id: 2,
    name: "Team Member 2", 
    position: "Customer Service",
    email: "contact2@example.com",
    phone: "+977-1-6000002",
    image: "/images/inner/member-2.jpg",
  },
  {
    id: 3,
    name: "Team Member 3",
    position: "Support Manager",
    email: "contact3@example.com", 
    phone: "+977-1-6000003",
    image: "/images/inner/member-3.jpg",
  },
];

const Offers: React.FC = () => {
  return (
    <section className="bg-[#f8f6f3] dark:bg-lightBlack">
      <div className="Container py-20 lg:py-[120px]">
        <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container">
          {/* Section logo */}
          <div className="flex items-center justify-center space-x-2">
            <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            <img
              src="/images/inner/inner-logo.png"
              alt="contact_section_logo"
              className="w-[50px] h-[50px]"
            />
            <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
            CONTACT OUR TEAM
          </h1>
          <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
            Get in touch with our dedicated team members for assistance
          </p>
        </div>

        {/* Section Content */}
        <div className="mt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
          {teamMembers.map((m) => (
            <PersonTile key={m.id} id={m.id} name={m.name} position={m.position} email={m.email} phone={m.phone} image={m.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
