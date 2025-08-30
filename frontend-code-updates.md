# Frontend Code Updates for New Committee Structure

## Files to Update After Implementing New Strapi Committee Configuration

### **1. Update Strapi Service (`src/services/strapi.ts`)**

Replace the existing `getCommittees` function with:

```typescript
// In src/services/strapi.ts - aboutService object
getCommittees: async () => {
  const locale = getLocale();
  // Updated API call to populate new committee member structure
  const res = await api.get(`/api/committees?locale=${locale}&populate[members][populate][person][populate]=image&sort=id:asc`);
  return res.data.data || [];
},

// New function for Corporate Team Structure
getCorporateTeamStructure: async () => {
  const locale = getLocale();
  const res = await api.get(`/api/corporate-team-structure?locale=${locale}&populate[corporateMembers][populate][person][populate]=image&populate[supervisionUnits][populate][unitMembers][populate][person][populate]=image`);
  return res.data.data || null;
},
```

### **2. Update Committee Component (`src/Pages/About/Committee.tsx`)**

Replace the entire file content with:

```tsx
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import PersonTile from "./components/PersonTile";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { renderStrapiBlocks } from "../../utils/strapiHelpers";

const Committee: React.FC = () => {
  const [committees, setCommittees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getCommittees();
        setCommittees(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load committees");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Helper function to map committee member data
  const mapCommitteeMemberData = (member: any) => {
    const person = member.person;
    return {
      id: person.id,
      name: person.name,
      position: member.committeePosition, // Use committee-specific position
      email: person.email || "",
      phone: person.phone || "",
      image: person.image?.url || "",
      roleDescription: member.roleDescription || "",
      order: member.order || 0
    };
  };

  return (
    <div>
      <BreadCrumb title="Committee" home="/" />
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container">
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img
                src="/images/inner/inner-logo.png"
                alt="committee_section_logo"
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
            {loading && (
              <div className="text-center">
                <p className="text-lightGray">Loading committees...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            
            {!loading && !error && committees.map((committee) => (
              <div key={committee.id} className="committee-section">
                <h3 className="font-Garamond text-2xl font-semibold mb-6 text-center text-lightBlack dark:text-white">
                  {committee.name}
                </h3>
                
                {committee.description && (
                  <div className="text-center text-lightGray mb-6 max-w-2xl mx-auto">
                    <p>{renderStrapiBlocks(committee.description)}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                  {committee.members && committee.members.length > 0 ? 
                    committee.members
                      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) // Sort by order
                      .map((member: any) => {
                        const mappedMember = mapCommitteeMemberData(member);
                        return (
                          <div key={`${committee.id}-${mappedMember.id}`} className="committee-member">
                            <PersonTile
                              id={mappedMember.id}
                              name={mappedMember.name}
                              position={mappedMember.position} // Committee-specific position
                              email={mappedMember.email}
                              phone={mappedMember.phone}
                              image={getStrapiMediaUrl(mappedMember.image)}
                            />
                            {mappedMember.roleDescription && (
                              <p className="text-sm text-lightGray mt-2 text-center px-4">
                                {mappedMember.roleDescription}
                              </p>
                            )}
                          </div>
                        );
                      })
                    : 
                    <div className="col-span-full text-center py-8">
                      <p className="text-lightGray">No members assigned to this committee yet.</p>
                    </div>
                  }
                </div>
              </div>
            ))}
            
            {!loading && !error && committees.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lightGray">No committees found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committee;
```

### **3. Update Corporate Team Component (`src/Pages/About/CorporateTeam.tsx`)**

Add supervision unit support by replacing the existing component:

```tsx
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import PersonTile from "./components/PersonTile";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { renderStrapiBlocks } from "../../utils/strapiHelpers";

const CorporateTeam: React.FC = () => {
  const [corporateData, setCorporateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Try new structure first, fall back to old if needed
        const structureData = await aboutService.getCorporateTeamStructure();
        if (structureData) {
          setCorporateData(structureData);
        } else {
          // Fallback to old method if new structure doesn't exist
          const oldData = await aboutService.getCorporateTeam();
          setCorporateData({ corporateMembers: oldData.map((person: any) => ({ person })) });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load corporate team");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to map member data (handles both old and new structure)
  const mapMemberData = (member: any) => {
    // New structure: member has person and committeePosition
    if (member.person) {
      const person = member.person;
      return {
        id: person.id,
        name: person.name,
        position: member.committeePosition || person.position, // Use committee position if available
        email: person.email || "",
        phone: person.phone || "",
        image: person.image?.url || "",
        order: member.order || person.order || 0
      };
    }
    
    // Old structure: member is the person directly
    return {
      id: member.id,
      name: member.name,
      position: member.position,
      email: member.email || "",
      phone: member.phone || "",
      image: member.image?.url || "",
      order: member.order || 0
    };
  };

  return (
    <div>
      <BreadCrumb title="Corporate Team" home="/" />
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container">
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img
                src="/images/inner/inner-logo.png"
                alt="corporate_section_logo"
                className="w-[50px] h-[50px]"
              />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              CORPORATE TEAM
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Our dedicated corporate team driving organizational excellence
            </p>
          </div>

          {/* Section Content */}
          <div className="mt-[60px] space-y-12">
            {loading && (
              <div className="text-center">
                <p className="text-lightGray">Loading corporate team...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            
            {!loading && !error && corporateData && (
              <>
                {/* Main Corporate Team Members */}
                {corporateData.corporateMembers && corporateData.corporateMembers.length > 0 && (
                  <div className="corporate-main-section">
                    <h3 className="font-Garamond text-xl font-semibold mb-6 text-center text-lightBlack dark:text-white">
                      Corporate Leadership
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                      {corporateData.corporateMembers
                        .sort((a: any, b: any) => (mapMemberData(a).order) - (mapMemberData(b).order))
                        .map((member: any, index: number) => {
                          const mappedMember = mapMemberData(member);
                          return (
                            <PersonTile
                              key={mappedMember.id || index}
                              id={mappedMember.id}
                              name={mappedMember.name}
                              position={mappedMember.position}
                              email={mappedMember.email}
                              phone={mappedMember.phone}
                              image={getStrapiMediaUrl(mappedMember.image)}
                            />
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Supervision Units */}
                {corporateData.supervisionUnits && corporateData.supervisionUnits.length > 0 && (
                  <div className="supervision-units-section mt-16">
                    {corporateData.supervisionUnits.map((unit: any, unitIndex: number) => (
                      <div key={unitIndex} className="supervision-unit mb-12">
                        <div className="text-center mb-8">
                          <h3 className="font-Garamond text-xl font-semibold mb-4 text-lightBlack dark:text-white">
                            {unit.title}
                          </h3>
                          {unit.description && (
                            <div className="text-lightGray max-w-2xl mx-auto">
                              <p>{renderStrapiBlocks(unit.description)}</p>
                            </div>
                          )}
                        </div>
                        
                        {unit.unitMembers && unit.unitMembers.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                            {unit.unitMembers
                              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                              .map((member: any, memberIndex: number) => {
                                const person = member.person;
                                return (
                                  <PersonTile
                                    key={`${unitIndex}-${person.id || memberIndex}`}
                                    id={person.id}
                                    name={person.name}
                                    position={member.committeePosition || person.position} // Use unit-specific position
                                    email={person.email || ""}
                                    phone={person.phone || ""}
                                    image={getStrapiMediaUrl(person.image?.url)}
                                  />
                                );
                              })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {!loading && !error && !corporateData && (
              <div className="text-center py-12">
                <p className="text-lightGray">No corporate team data found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateTeam;
```

### **4. Testing the New Structure**

After implementing the Strapi configuration and updating the frontend code:

#### Test API Endpoints:

1. **Committees with New Structure:**
   ```
   http://localhost:1337/api/committees?populate[members][populate][person][populate]=image
   ```

2. **Corporate Team Structure:**
   ```
   http://localhost:1337/api/corporate-team-structure?populate[corporateMembers][populate][person][populate]=image&populate[supervisionUnits][populate][unitMembers][populate][person][populate]=image
   ```

#### Expected Data Structure:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Audit Committee",
      "description": "...",
      "members": [
        {
          "person": {
            "id": 1,
            "name": "John Smith",
            "image": { "url": "/uploads/john.jpg" }
          },
          "committeePosition": "Committee Chair",
          "roleDescription": "Leads audit processes",
          "order": 1
        }
      ]
    }
  ]
}
```

### **5. Migration Steps**

1. **Implement Strapi Changes:** Follow the step-by-step guide
2. **Update Frontend Code:** Replace the files with the code above
3. **Test API Endpoints:** Ensure data structure is correct
4. **Migrate Existing Data:** Recreate committees with new structure
5. **Update Content:** Add committee-specific positions for each member

### **Benefits Summary**

✅ **Same person, different positions in different contexts**  
✅ **No data duplication**  
✅ **Flexible committee management**  
✅ **Supervision units support**  
✅ **Backward compatibility during transition**

This approach ensures that John Smith can be "Director" on the Board of Directors page but "Audit Committee Chair" on the Committee page, all while maintaining a single Person record in your CMS!
