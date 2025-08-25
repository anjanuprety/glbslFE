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
  const managerEmail = manager.email || "";
  
  // Create combined branch name (e.g., "Bharatpur Branch" instead of "Chitwan Branch" + "Bharatpur")
  const displayName = name.includes(location) ? name : `${location} Branch`;
  
  return (
    // Main container with member class for consistent styling with PersonTile
    // Uses same hover animation patterns but adapted for branch information
    <div className={`member group ${className}`} data-id={id}>
      
      {/* Manager image - similar to PersonTile image display */}
      <img 
        src={managerImage} 
        className="w-full object-cover" 
        alt={`${managerName} - ${displayName}`}
        onError={(e) => {
          // Fallback image if manager photo fails to load
          e.currentTarget.src = "/images/inner/member-1.jpg";
        }}
      />
      
      {/* Content container with relative positioning for hover overlay */}
      <div className="relative">
        
        {/* Visible content - branch name and manager name */}
        <div className="px-4 lg:px-[30px] pt-5">
          {/* Combined branch name */}
          <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-[28px] leading-7 md:leading-8 lg:leading-10 text-lightBlack dark:text-white font-semibold font-Garamond text-center hover:opacity-0">
            {displayName}
          </h3>
          {/* Manager name - visible normally, hidden on hover like PersonTile */}
          <p className="text-sm md:text-base leading-[26px] text-Gray dark:text-lightGray font-normal font-Lora text-center group-hover:text-white dark:hover:text-white hover:opacity-0">
            {managerName}
          </p>
        </div>

        {/* Hover reveal panel - follows PersonTile pattern exactly */}
        {/* Uses bg-normalBlack (green) and proper positioning like PersonTile */}
        <div className="p-[30px] bg-normalBlack grid items-center justify-center absolute bottom-[-150px] sm:bottom-[-170px] md:bottom-[-150px] group-hover:bottom-[-38px] lg:group-hover:bottom-[-30px] transition-all duration-500 left-0 right-0">
          
          {/* Contact information and map in grid layout */}
          <div className="grid grid-cols-3 gap-4 w-full items-center">
            
            {/* Contact information section - takes 2/3 of the width */}
            <div className="col-span-2 text-center text-white space-y-1">
              
              {/* Branch phone number - no emoji, better font */}
              <p className="text-white font-medium leading-6 text-lg lg:text-xl font-Garamond">
                {phoneNumber}
              </p>
              
              {/* Manager email if available - no emoji, better font */}
              {managerEmail && (
                <p className="text-white font-medium leading-6 text-lg lg:text-xl font-Garamond break-all">
                  {managerEmail}
                </p>
              )}
            </div>
            
            {/* Map section - takes 1/3 of the width */}
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-full">
                <BranchMap 
                  coordinates={coordinates}
                  location={location}
                  height="80px"
                  width="100%"
                  zoom={15}
                  showMarker={true}
                  className="rounded-md border border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchTile;
