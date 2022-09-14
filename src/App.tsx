import { useEffect, useState } from "react";

// icons
import {
  SunIcon,
  MoonIcon,
  MapPinIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import { ReactComponent as TwitterIcon } from "./icons/twitter.svg";
import { ReactComponent as GithubIcon } from "./icons/github.svg";

// components
import Search from "./components/Search";

function App() {
  // states
  const [theme, setTheme] = useState(localStorage.theme || "light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  console.log(localStorage.theme);

  return (
    <div className="w-screen h-screen bg-primaryLight dark:bg-primaryDark flex flex-col items-center justify-center gap-8 text-primaryDark dark:text-primaryLight">
      <div className="flex flex-col items-center justify-center gap-6 px-2 overflow-auto">
        <div className="w-full flex items-center justify-between">
          <p className="text-[1rem] font-bold">defFinder</p>
          <button className="flex items-center gap-2" onClick={toggleTheme}>
            <p className="text-[0.8rem] font-bold uppercase">
              {theme === "dark" && "Light"}
              {theme === "light" && "Dark"}
            </p>
            {theme === "dark" && (
              <SunIcon className="text-primaryLight w-6 h-6" />
            )}
            {theme === "light" && (
              <MoonIcon className="text-primaryDark w-6 h-6" />
            )}
          </button>
        </div>

        <Search />

        <div className="w-full flex flex-col md:flex-row p-6 gap-12 bg-secondaryLight dark:bg-secondaryDark rounded-md">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1662874616833-78a4a4f17077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt="profile"
          />
          <div>
            {/* name and joined date */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-[1.2rem] font-bold">The Octocat</p>
              <p className="text-[0.8rem]">Joined 28 Jun 2011</p>
            </div>
            {/* username */}
            <p className="text-[0.8rem] text-red font-bold">The Octocat</p>
            {/* bio */}
            <p className="my-6 text-[0.8rem]">This profile has no bio</p>
            {/* repo, followers and following */}
            <div className="my-8 bg-primaryLight dark:bg-primaryDark grid grid-cols-3 items-center md:gap-20 px-6 py-4 rounded-md">
              <div className="flex flex-col">
                <p className="text-[0.8rem]">Repos</p>
                <p className="text-[1rem] font-bold">21</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[0.8rem]">Followers</p>
                <p className="text-[1rem] font-bold">2928</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[0.8rem]">Following</p>
                <p className="text-[1rem] font-bold">21</p>
              </div>
            </div>
            {/* location, website and twitter */}
            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-6 h-6" />
                <p className="text-[0.8rem]">San Francisco</p>
              </div>
              <div className="flex items-center gap-3">
                <TwitterIcon className="w-6 h-6" />
                <a
                  href="https://twitter.com/elonmusk"
                  className="text-[0.8rem]"
                >
                  elonmusk
                </a>
              </div>
              <div className="flex items-center gap-3">
                <LinkIcon className="w-6 h-6" />
                <a href="https://www.tesla.com/" className="text-[0.8rem]">
                  Tesla
                </a>
              </div>
              <div className="flex items-center gap-3">
                <GithubIcon className="w-6 h-6" />
                <a href="https://www.tesla.com/" className="text-[0.8rem]">
                  elonmusk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
