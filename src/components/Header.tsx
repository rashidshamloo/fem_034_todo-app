// theme-toggles
import '@theme-toggles/react/css/Classic.css';
import { Classic } from '@theme-toggles/react';

// types
interface headerProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Header = ({ darkMode, setDarkMode }: headerProps) => {
  const onToggle = () => {
    setDarkMode(!darkMode);
  };
  return (
    <header className="flex justify-between pt-14 text-[2.25rem] font-bold tracking-[0.65rem] text-white sm:pt-[4.25rem] sm:text-[2.5rem] sm:tracking-[1rem]">
      <div
        className={
          "absolute left-0 top-0 -z-[1] h-[200px] w-full bg-[url('/images/bg-mobile-light.jpg')] bg-cover bg-center bg-no-repeat transition-all duration-500 sm:h-[18.75rem] sm:bg-[url('/images/bg-desktop-light.jpg')] " +
          (darkMode ? 'opacity-0' : '')
        }
        aria-hidden="true"
      ></div>
      <div
        className={
          "absolute left-0 top-0 -z-[1] h-[200px] w-full bg-[url('/images/bg-mobile-dark.jpg')] bg-cover bg-center bg-no-repeat transition-all duration-500 sm:h-[18.75rem] sm:bg-[url('/images/bg-desktop-dark.jpg')] " +
          (darkMode ? '' : 'opacity-0')
        }
        aria-hidden="true"
      ></div>
      <h1 className="ml-[6%] select-none sm:ml-0">TODO</h1>
      <Classic
        duration={750}
        onToggle={onToggle}
        toggled={darkMode ? false : true}
        className="mr-[6%] text-4xl transition-all duration-500 hover:scale-110 hover:text-blue-200 hover:drop-shadow-[0_0_0.5rem_hsla(0,0%,0%,0.25)] sm:mr-0 sm:text-inherit"
      />
    </header>
  );
};

export default Header;
