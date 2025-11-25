import React from "react";
import { Breadcrumbs as MTBreadcrumbs } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import TitleText from "./TitleText";

// Capitalize each word after dash (-) or underscore (_)
const capitalize = (str) =>
  str
    .split(/[-_]/g) // split by dash or underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Breadcrumbs = ({ textOnly = false }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (textOnly) {
    const pageTitle = pathnames.length
      ? capitalize(pathnames[pathnames.length - 1])
      : "Dashboard";

    return (
      <TitleText
        variant="small"
        className="text-gray-800 dark:text-gray-100 font-semibold inline whitespace-nowrap"
      >
        {pageTitle}
      </TitleText>
    );
  }

  return (
    <div className="mb-4 mt-2">
      <MTBreadcrumbs
        fullWidth
        className="bg-gray-100 dark:bg-gray-800 rounded-md p-2"
      >
        <Link
          to="/dashboard"
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          Dashboard
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <TitleText
              key={name}
              variant="small"
              className="text-gray-800 dark:text-gray-100 font-medium"
            >
              {capitalize(name)}
            </TitleText>
          ) : (
            <Link
              key={name}
              to={routeTo}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {capitalize(name)}
            </Link>
          );
        })}
      </MTBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
