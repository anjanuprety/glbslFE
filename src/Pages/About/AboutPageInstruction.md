# Comprehensive Implementation Prompt for About Section

## Objective
Create a complete **About** section for a microfinance website with **6 distinct pages**, following specific design requirements while ensuring compatibility with **Strapi CMS** for future content management.

---

## Project Structure
Implement the following pages in the About section:

1. **About Us Page** – Company overview with vision, mission, and goals  
2. **Board of Directors** – 8 members in the same format used inside Our Team page.  
3. **Management Team** – 9 members in same format used inside Our Team page.
4. **Corporate Team** – 14 members (including 4 in *Monitoring and Supervision Units*)  
5. **Committee** – 4 committees with varying member counts (3, 3, 4, and 5 members)  
6. **Organization Structure** – Interactive flowchart based on `organizational_structure.json`  

---

## Technical Requirements
- Use **React with Vite + TypeScript**  
- Create **modular, reusable components**  
- Design with **Strapi CMS integration** in mind (all content must be dynamic)  
- Implement **bilingual support (English/Nepali)**  
- Ensure **mobile responsiveness**  
`  

---

## Component Design Guidelines
- **PersonTile Component**  
  - Reusable  format tile with same format used inside Our Team page.:  
    - Consistent styling across all pages  
  - Must be **Strapi-compatible**  
  - Include **unique identifiers** for styling flexibility  

- **Committee Section**  
  - Design a nested structure for committees with their members  

- **Organization Chart**  
  - Implement an **animated flowchart** with proper hierarchy  

---

## Implementation Process
1. Create the necessary **folder structure** and routing  
2. Build the reusable **PersonTile component**


## Please work only within the about section directory. Each implementation should be thoroughly tested before moving to the next component or page.
