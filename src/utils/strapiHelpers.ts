/**
 * Helper functions for working with Strapi content
 */

/**
 * Renders Strapi blocks/rich text content as plain text
 * @param blocks - Array of Strapi block objects
 * @returns Plain text string
 */
export const renderStrapiBlocks = (blocks: any[]): string => {
  if (!blocks || blocks.length === 0) return '';
  
  return blocks
    .map((block: any) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('');
      }
      if (block.type === 'heading' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('');
      }
      if (block.type === 'list' && block.children) {
        return block.children
          .map((item: any) => 
            item.children?.map((child: any) => child.text || '').join('') || ''
          )
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
};

/**
 * Maps Strapi person data to PersonTile props
 * @param person - Strapi person object
 * @returns Mapped person object
 */
export const mapStrapiPersonData = (person: any) => {
  return {
    id: person.id,
    name: person.name || person.attributes?.name,
    position: person.position || person.attributes?.position,
    email: person.email || person.attributes?.email || "",
    phone: person.phone || person.attributes?.phone || "",
    image: person.image?.url || person.attributes?.image?.data?.attributes?.url || "",
  };
};
