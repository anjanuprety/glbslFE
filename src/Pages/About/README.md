# About Section

This directory contains the About section pages and components. Pages are built with a reusable `PersonTile` so content can be swapped with Strapi fields later.

Files:
- `components/PersonTile.tsx` — reusable tile matching Our Team layout and hover behavior.
- `AboutUs.tsx`, `BoardOfDirectors.tsx`, `ManagementTeam.tsx`, `CorporateTeam.tsx`, `Committee.tsx`, `OrganizationStructure.tsx` — pages.
- `data/organizational_structure.json` — sample structure data for the org chart.

Strapi notes:
- Each `PersonTile` consumes props compatible with a Strapi person content-type: id, name, position, email, image URL.
- Pages currently use local mock data arrays; replace with fetch calls to Strapi endpoints when backend is ready.
