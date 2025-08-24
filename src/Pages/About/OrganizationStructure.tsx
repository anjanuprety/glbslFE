import React, { useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import data from "./data/organizational_structure.json";

const OrgNode: React.FC<{ node: any; level?: number }> = ({ node, level = 0 }) => {
  const [open, setOpen] = useState(level < 1);
  return (
    <div className={`pl-${level * 4} mb-4`}>
      <div className="p-4 bg-white dark:bg-normalBlack shadow rounded">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-Garamond font-semibold">{node.title}</div>
            {node.name && <div className="text-sm text-gray-600">{node.name}</div>}
          </div>
          {node.children && (
            <button onClick={() => setOpen(!open)} className="btn-link">
              {open ? "-" : "+"}
            </button>
          )}
        </div>
      </div>
      {open && node.children && (
        <div className="mt-4">
          {node.children.map((c: any, i: number) => (
            <OrgNode key={i} node={c} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrganizationStructure: React.FC = () => {
  return (
    <div>
      <BreadCrumb title="Organization Structure" home="/" />
      <div className="Container py-20">
        <OrgNode node={data} />
      </div>
    </div>
  );
};

export default OrganizationStructure;
