import React from "react";
import { Helmet } from "react-helmet";

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keywords' content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to BookMark",
  description: "Find soul-lightening books and share your insights.",
  keywords: "book, bookmark",
};
