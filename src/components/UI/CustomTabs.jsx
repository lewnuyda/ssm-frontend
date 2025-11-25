import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const CustomTabs = ({
  value: initialValue,
  data = [], // array of { label, value, content, icon?, className? }
  onChange, // callback when tab changes
  headerClassName = "", // className for TabsHeader
  bodyClassName = "", // className for TabsBody
  tabClassName = "", // default className for each Tab
  indicatorProps = {}, // pass to TabsHeader for underline or custom indicator
  animate, // animation props for TabsBody
  orientation = "horizontal",
  className = "", // root Tabs class
  ...rest // any other props to pass to Tabs
}) => {
  const [value, setValue] = React.useState(initialValue ?? data[0]?.value);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation={orientation}
      className={className}
      {...rest}
    >
      <TabsHeader
        className={`flex flex-wrap sm:flex-nowrap overflow-x-auto space-x-2 ${headerClassName}`}
        indicatorProps={indicatorProps}
      >
        {data.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            className={`${tabClassName} ${tab.className ?? ""}`}
          >
            {tab.icon &&
              React.createElement(tab.icon, { className: "w-5 h-5 mr-2" })}
            {tab.label}
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody
        className={`${bodyClassName} text-gray-800 dark:text-gray-200`}
        animate={animate}
      >
        {data.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default CustomTabs;
