import TitleText from "../UI/TitleText";

const Footer = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between dark:border-gray-700 dark:text-gray-300">
      <TitleText
        variant="small"
        color="blue-gray"
        className="mx-auto font-normal dark:text-gray-300"
      >
        &copy; 2023 Material Tailwind
      </TitleText>
    </footer>
  );
};
export default Footer;
