# Strapi Committee Configuration Guide
## Advanced Committee Structure with Different Position Contexts

### **Problem Statement**
The same person can have different positions in different contexts:
- Board Member with position "Director" 
- Same person in Audit Committee with position "Committee Chair"
- Same person in Risk Committee with position "Committee Member"

### **Solution: Committee Member Component**
Instead of direct many-to-many relationships, we'll use a **Committee Member** component that stores the person reference AND their specific position in that committee.

---

## **Step 1: Create Committee Member Component**

### 1.1 Navigate to Component Creation
1. Go to Strapi Admin Panel (`http://localhost:1337/admin`)
2. Click **"Content-Type Builder"** in the left sidebar
3. Click on the **"Components"** tab at the top
4. Click the blue **"Create a new component"** button

### 1.2 Create the Component
1. In the popup dialog:
   - **Display name**: `Committee Member`
   - **Icon**: Select any icon (e.g., user icon)
   - **Category**: Select **"Create new category"**
   - **New category name**: `Committee Components`
   - Click the blue **"Continue"** button

### 1.3 Add Person Relation Field
1. Click **"Add another field"**
2. Select **"Relation"**
3. Configure the relation:
   - Select relation type: **"Committee Member belongs to one Person"**
   - This creates a one-to-many relationship from Person to Committee Member
   - Click **"Add another field"** button

### 1.4 Add Committee Position Field
1. Select **"Text"**
2. Select **"Short text"**
3. Configure:
   - **Name**: `committeePosition`
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Turn ON **"Required field"**
   - Click **"Add another field"** button

### 1.5 Add Role Description Field (Optional)
1. Select **"Text"**
2. Select **"Long text"**
3. Configure:
   - **Name**: `roleDescription`
   - Switch to **"Advanced Settings"** tab
   - Turn ON **"Enable localization for this field"**
   - Click **"Add another field"** button

### 1.6 Add Order Field
1. Select **"Number"**
2. Select **"Integer"**
3. Configure:
   - **Name**: `order`
   - **Default value**: `0`
   - Click **"Finish"** button

### 1.7 Save the Component
1. Click the green **"Save"** button in the top right

---

## **Step 2: Modify Committee Content Type**

### 2.1 Navigate to Committee Content Type
1. In **"Content-Type Builder"**
2. Under **"COLLECTION TYPES"**, click on **"Committee"**

### 2.2 Remove Old People Relation (if exists)
1. If you have a direct `people` relation field, click on it
2. Click the **"Delete"** button
3. Confirm the deletion

### 2.3 Add Committee Members Component Field
1. Click **"Add another field"**
2. Select **"Component"**
3. Configure:
   - **Component**: Select **"Committee Components.Committee Member"** from dropdown
   - Select **"Repeatable component"**
   - **Name**: `members`
   - Click **"Finish"** button

### 2.4 Save Committee Changes
1. Click the green **"Save"** button in the top right

---

## **Step 3: Create Monitoring and Supervision Unit Component**

### 3.1 Create Supervision Unit Component
1. Go to **"Components"** tab in Content-Type Builder
2. Click **"Create a new component"**
3. Configure:
   - **Display name**: `Supervision Unit`
   - **Icon**: Select appropriate icon
   - **Category**: `Committee Components`
   - Click **"Continue"**

### 3.2 Add Unit Title Field
1. Click **"Add another field"**
2. Select **"Text"** → **"Short text"**
3. Configure:
   - **Name**: `title`
   - **Advanced Settings**: Enable localization, make required
   - Click **"Add another field"**

### 3.3 Add Unit Description Field
1. Select **"Text"** → **"Rich text - Block"**
2. Configure:
   - **Name**: `description`
   - **Advanced Settings**: Enable localization
   - Click **"Add another field"**

### 3.4 Add Unit Members Field
1. Select **"Component"**
2. Configure:
   - **Component**: `Committee Components.Committee Member`
   - Select **"Repeatable component"**
   - **Name**: `unitMembers`
   - Click **"Finish"**

### 3.5 Save Supervision Unit Component
1. Click **"Save"**

---

## **Step 4: Add Supervision Unit to Corporate Team**

### 4.1 Create Corporate Team Structure Content Type
1. Go to **"Content-Type Builder"**
2. Click **"Create new single type"**
3. Configure:
   - **Display name**: `Corporate Team Structure`
   - Click **"Continue"**

### 4.2 Add Corporate Team Members Field
1. Click **"Add another field"**
2. Select **"Component"**
3. Configure:
   - **Component**: `Committee Components.Committee Member`
   - Select **"Repeatable component"**
   - **Name**: `corporateMembers`
   - Click **"Add another field"**

### 4.3 Add Supervision Units Field
1. Select **"Component"**
2. Configure:
   - **Component**: `Committee Components.Supervision Unit`
   - Select **"Repeatable component"**
   - **Name**: `supervisionUnits`
   - Click **"Finish"**

### 4.4 Save Corporate Team Structure
1. Click **"Save"**

---

## **Step 5: Configure API Permissions**

### 5.1 Set Public Permissions
1. Go to **"Settings"** → **"Users & Permissions Plugin"** → **"Roles"** → **"Public"**
2. Enable permissions for:
   - **Committee**: `find`, `findOne`
   - **Corporate Team Structure**: `find`, `findOne`
   - **Person**: `find`, `findOne`
   - **Upload**: `find`, `findOne`
3. Click **"Save"**

---

## **Step 6: Add Content - Practical Examples**

### 6.1 Create a Committee with Different Positions

#### Example: Audit Committee
1. Go to **"Content Manager"** → **"Committees"**
2. Click **"Create new entry"**
3. Fill basic info:
   - **Name**: "Audit Committee"
   - **Description**: "Responsible for financial oversight and compliance"

4. **Add Members with Different Positions**:
   
   **Member 1**:
   - Click **"+ Add Component"** under Members
   - **Person**: Select "John Smith" (who might be "Director" in Board)
   - **Committee Position**: "Audit Committee Chair"
   - **Role Description**: "Leads audit processes and reports to board"
   - **Order**: 1

   **Member 2**:
   - Click **"+ Add Component"** again
   - **Person**: Select "Jane Doe" (who might be "Secretary" in Board)
   - **Committee Position**: "Audit Committee Member"
   - **Role Description**: "Reviews financial reports and compliance"
   - **Order**: 2

5. Save and Publish

### 6.2 Create Corporate Team with Supervision Unit

1. Go to **"Content Manager"** → **"Corporate Team Structure"**
2. Fill **Corporate Members** (regular corporate team)
3. **Add Supervision Units**:
   
   **Monitoring Unit**:
   - Click **"+ Add Component"** under Supervision Units
   - **Title**: "Monitoring and Supervision Unit"
   - **Description**: "Oversees daily operations and compliance monitoring"
   - **Unit Members**: Add people with their supervision-specific positions
     - Person: "Alice Manager" → Position: "Chief Monitoring Officer"
     - Person: "Bob Supervisor" → Position: "Senior Compliance Monitor"

4. Save and Publish

---

## **Step 7: Update Frontend Code**

### 7.1 Update Strapi Service
The API endpoint will now return data structure like:
```typescript
committee: {
  id: 1,
  name: "Audit Committee",
  members: [
    {
      person: {
        id: 1,
        name: "John Smith",
        image: { url: "/uploads/john.jpg" }
      },
      committeePosition: "Audit Committee Chair",
      roleDescription: "Leads audit processes",
      order: 1
    }
  ]
}
```

### 7.2 API Endpoint Update
The API call should be:
```
/api/committees?populate[members][populate][person][populate]=image
```

---

## **Benefits of This Approach**

### ✅ **Advantages**
1. **No Data Duplication**: Same person entry used everywhere
2. **Context-Specific Positions**: Different positions in different committees
3. **Flexible Structure**: Easy to add new committees or change positions
4. **Consistent Person Data**: Name, photo, email stay consistent across contexts
5. **Easy Management**: Change person details once, reflects everywhere
6. **Scalable**: Can add more committee types without structural changes

### ✅ **Real-World Example**
**John Smith** can be:
- **Board of Directors**: "Director" 
- **Audit Committee**: "Committee Chair"
- **Risk Committee**: "Committee Member"
- **Corporate Team**: Not involved
- **Monitoring Unit**: "Oversight Advisor"

All using the same Person record but with different contextual positions!

---

## **Step 8: Testing the Configuration**

### 8.1 Test Committee API
Visit: `http://localhost:1337/api/committees?populate[members][populate][person][populate]=image`

Expected response structure:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Audit Committee",
      "members": [
        {
          "person": {
            "id": 1,
            "name": "John Smith",
            "image": { "url": "/uploads/john.jpg" }
          },
          "committeePosition": "Committee Chair",
          "order": 1
        }
      ]
    }
  ]
}
```

### 8.2 Test Corporate Team API  
Visit: `http://localhost:1337/api/corporate-team-structure?populate[supervisionUnits][populate][unitMembers][populate][person][populate]=image`

---

## **Migration Strategy**

### If You Have Existing Data:
1. **Backup First**: Export your current committee data
2. **Create New Structure**: Follow steps above
3. **Migrate Data**: Manually recreate committees using new component structure
4. **Update Frontend**: Modify React components to use new data structure
5. **Test Thoroughly**: Ensure all positions display correctly

---

## **Quick Reference: Key Changes**

| **Old Structure** | **New Structure** |
|-------------------|-------------------|
| `committee.people[]` | `committee.members[].person` |
| `person.position` (fixed) | `committee.members[].committeePosition` (flexible) |
| Direct many-to-many | Component-based relationship |
| Position conflicts | Context-specific positions |

This solution provides maximum flexibility while maintaining data consistency and avoiding duplication!
