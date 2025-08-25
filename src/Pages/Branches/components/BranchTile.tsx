import React from "react";
import BranchMap from "./BranchMap";

// Props interface for BranchTile component
// Similar to PersonTile but adapted for branch-specific information
export interface BranchTileProps {
  id: string;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
  manager: {
    name: string;
    position: string;
    image: string;
    phone: string;
    email?: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  className?: string;
}

// BranchTile component - displays individual branch information
// Inspired by PersonTile but specifically designed for branch data
// Features hover reveal panel with contact info and branch details
const BranchTile: React.FC<BranchTileProps> = ({
  id,
  name,
  location,
  address,
  phoneNumber,
  manager,
  coordinates,
  className = "",
}) => {
  
  // Fallback values for missing data
  const managerImage = manager.image || "/images/inner/member-1.jpg";
  const managerName = manager.name || "Branch Manager";
  const managerPosition = manager.position || "Manager";
  const managerPhone = manager.phone || phoneNumber;
  const managerEmail = manager.email || "";
  
  return (
    // Main container with member class for consistent styling with PersonTile
    // Uses same hover animation patterns but adapted for branch information
    <div className={`member group ${className}`} data-id={id}>
      
      {/* Manager image - similar to PersonTile image display */}
      <img 
        src={managerImage} 
        className="w-full object-cover" 
        alt={`${managerName} - ${name}`}
        onError={(e) => {
          // Fallback image if manager photo fails to load
          e.currentTarget.src = "/images/inner/member-1.jpg";
        }}
      />
      
      {/* Content container with relative positioning for hover overlay */}
      <div className="relative">
        
        {/* Visible content - branch name and location */}
        <div className="px-4 lg:px-[30px] pt-5">
          {/* Branch name - similar styling to PersonTile name */}
          <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-[28px] leading-7 md:leading-8 lg:leading-10 text-lightBlack dark:text-white font-semibold font-Garamond text-center hover:opacity-0 transition-opacity duration-500">
            {name}
          </h3>
          
          {/* Branch location - similar to PersonTile position */}
          <p className="text-sm md:text-base leading-[26px] text-Gray dark:text-lightGray font-normal font-Lora text-center group-hover:text-white dark:hover:text-white hover:opacity-0 transition-all duration-500">
            {location}
          </p>
          
          {/* Manager info - shows on normal state */}
          <div className="mt-2 group-hover:opacity-0 transition-opacity duration-500">
            <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-Lora">
              Manager: {managerName}
            </p>
          </div>
        </div>

        {/* Hover reveal panel - similar to PersonTile but with branch-specific content */}
        {/* Uses bg-normalBlack (green) instead of bg-khaki (yellow) for consistency */}
        <div className="p-[30px] bg-normalBlack grid items-center justify-center absolute bottom-[-250px] sm:bottom-[-270px] md:bottom-[-250px] group-hover:bottom-[-38px] lg:group-hover:bottom-[-30px] transition-all duration-500 left-0 right-0">
          
          {/* Main content container with two sections: contact info and map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            
            {/* Contact information section */}
            <div className="text-center lg:text-left text-white space-y-2">
              
              {/* Branch phone number */}
              <p className="text-white font-medium leading-6 text-base lg:text-lg font-Garamond">
                {phoneNumber}
              </p>
              
              {/* Branch address */}
              <p className="text-white font-medium leading-5 text-sm lg:text-base font-Lora">
                {address}
              </p>
              
              {/* Divider line */}
              <div className="border-t border-white/30 my-3"></div>
              
              {/* Manager contact information */}
              <div className="space-y-1">
                <p className="text-white font-medium leading-5 text-sm font-Garamond">
                  {managerName}
                </p>
                <p className="text-white/90 font-normal leading-4 text-xs font-Lora">
                  {managerPosition}
                </p>
                
                {/* Manager phone if different from branch phone */}
                {managerPhone && managerPhone !== phoneNumber && (
                  <p className="text-white/90 font-normal leading-4 text-xs font-Lora">
                    Direct: {managerPhone}
                  </p>
                )}
                
                {/* Manager email if available */}
                {managerEmail && (
                  <p className="text-white/90 font-normal leading-4 text-xs font-Lora break-all">
                    {managerEmail}
                  </p>
                )}
              </div>
            </div>
            
            {/* Map section - shows branch location */}
            <div className="flex items-center justify-center">
              <div className="w-full lg:w-auto">
                <BranchMap 
                  coordinates={coordinates}
                  location={location}
                  height="120px"
                  width="100%"
                  zoom={15}
                  showMarker={true}
                  className="rounded-md border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                />
                {/* View larger map link */}
                <div className="text-center mt-2">
                  <button 
                    className="text-white/80 hover:text-white text-xs font-Lora underline underline-offset-2 hover:no-underline transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Open larger map modal or redirect to Google Maps
                      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
                      window.open(googleMapsUrl, '_blank');
                    }}
                    aria-label={`View ${location} on larger map`}
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchTile;

// Usage example:
// <BranchTile 
//   id="1"
//   name="Kathmandu Main Branch"
//   location="Kathmandu"
//   address="New Road, Kathmandu 44600"
//   phoneNumber="+977-1-4000001"
//   manager={{
//     name: "Rajesh Sharma",
//     position: "Branch Manager",
//     image: "/images/inner/member-1.jpg",
//     phone: "+977-1-4000001",
//     email: "rajesh.sharma@globalimebank.com"
//   }}
//   coordinates={{ latitude: 27.7172, longitude: 85.3240 }}
// />
