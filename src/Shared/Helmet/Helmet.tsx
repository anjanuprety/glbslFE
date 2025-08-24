import React from "react";
import { Helmet } from "react-helmet-async";
import { HelmetProps } from "../../types";

const HelmetChanger: React.FC<HelmetProps> = ({ title }) => {
  return (
    <Helmet>
      <title>Royella - {title}</title>
    </Helmet>
  );
};

export default HelmetChanger;
