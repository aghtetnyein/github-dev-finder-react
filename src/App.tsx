import { Fragment, useEffect, useState, useReducer } from "react";
import moment from "moment";

// https://docs.github.com/en/rest/users#get-a-user

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
import { INITIAL_STATE, userReducer } from "./userReducer";

function App() {
  // states
  const [theme, setTheme] = useState(localStorage.theme || "light");
  const [inputValue, setInputValue] = useState("");

  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE);

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

  const clickHandler = () => {
    userDispatch({ type: "FETCH_START", payload: null });
    fetch(`https://api.github.com/users/${inputValue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        userDispatch({
          type: "FETCH_SUCCESS",
          payload: {
            message: data.message,
            name: data.name,
            avatar_url: data.avatar_url,
            login: data.login,
            bio: data.bio,
            created_at: data.created_at,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            location: data.location,
            twitter_username: data.twitter_username,
            blog: data.blog,
            html_url: data.html_url,
          },
        });
      })
      .catch((err) => {
        userDispatch({ type: "FETCH_FAIL", payload: null });
      });
  };

  useEffect(() => {
    if (inputValue === "") {
      userDispatch({ type: "RESET_USER", payload: null });
    }
  }, [inputValue]);

  return (
    <div className="w-screen h-screen bg-primaryLight dark:bg-primaryDark flex flex-col items-center justify-start gap-8 text-primaryDark dark:text-primaryLight py-28">
      <div className="flex flex-col items-center justify-center gap-6 px-2">
        <div className="w-full flex items-center justify-between">
          <p className="text-[1rem] font-bold">devFinder</p>
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

        <Search
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onClick={clickHandler}
        />

        {(inputValue === "" || userState.user === null) && !userState.loading && (
          <div className="w-full md:w-[40rem] text-center p-6 bg-secondaryLight dark:bg-secondaryDark rounded-md">
            <p className="text-[0.8rem]">
              Type Github Username to search Dev...
            </p>
          </div>
        )}

        {userState.loading && (
          <div className="w-full md:w-[40rem] text-center p-6 bg-secondaryLight dark:bg-secondaryDark rounded-md">
            <div className="flex items-center justify-center gap-3">
              <img
                className="w-7 h-7 rounded-full object-cover bg-transparent"
                src="./Loading.gif"
                alt="loading"
              />
              <p className="text-[0.8rem]">Loading</p>
            </div>
          </div>
        )}

        {inputValue !== "" && userState.user && (
          <Fragment>
            {userState.user.message !== "Not Found" && (
              <div className="w-full md:w-[40rem] flex flex-col md:flex-row p-6 gap-12 bg-secondaryLight dark:bg-secondaryDark rounded-md">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={userState.user.avatar_url}
                  alt="profile"
                />
                <div>
                  {/* name and joined date */}
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[1.2rem] font-bold">
                      {userState.user.name}
                    </p>
                    <p className="text-[0.8rem]">
                      Joined :{" "}
                      {moment(userState.user.created_at).format("DD MMM YYYY")}
                    </p>
                  </div>
                  {/* username */}
                  <p className="text-[0.8rem] text-red font-bold">
                    {userState.user.login}
                  </p>
                  {/* bio */}
                  <p className="my-6 text-[0.8rem]">
                    {userState.user.bio ?? "This profile has no bio"}{" "}
                  </p>
                  {/* repo, followers and following */}
                  <div className="my-8 bg-primaryLight dark:bg-primaryDark grid grid-cols-3 items-center md:gap-20 px-6 py-4 rounded-md">
                    <div className="flex flex-col items-center">
                      <p className="text-[0.8rem]">Repos</p>
                      <p className="text-[1rem] font-bold">
                        {userState.user.public_repos}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[0.8rem]">Followers</p>
                      <p className="text-[1rem] font-bold">
                        {userState.user.followers}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[0.8rem]">Following</p>
                      <p className="text-[1rem] font-bold">
                        {userState.user.following}
                      </p>
                    </div>
                  </div>
                  {/* location, website and twitter */}
                  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-6 h-6" />
                      <p className="text-[0.8rem]">
                        {userState.user.location
                          ? userState.user.location
                          : "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <TwitterIcon className="w-6 h-6" />
                      {userState.user.twitter_username ? (
                        <a
                          href={`https://twitter.com/${userState.user.twitter_username}`}
                          className="text-[0.8rem]"
                          rel="noreferrer"
                          target="_blank"
                        >
                          {userState.user.twitter_username}
                        </a>
                      ) : (
                        <p className="text-[0.8rem]">-</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <LinkIcon className="w-6 h-6" />
                      {userState.user.blog ? (
                        <a
                          href={userState.user.blog}
                          className="text-[0.8rem] hover:underline"
                          rel="noreferrer"
                          target="_blank"
                        >
                          {userState.user.blog}
                        </a>
                      ) : (
                        <p className="text-[0.8rem]">-</p>
                      )}
                      <p></p>
                    </div>
                    <div className="group flex items-center gap-3 cursor-pointer">
                      <GithubIcon className="w-6 h-6" />
                      <a
                        href={userState.user.html_url}
                        className="text-[0.8rem] group-hover:underline"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {userState.user.login ?? "-"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {userState.user.message === "Not Found" && (
              <div className="w-full text-center p-6 bg-secondaryLight dark:bg-secondaryDark rounded-md">
                <p className="text-[0.8rem]">
                  Sorry. Username do not match. Please try again !
                </p>
              </div>
            )}
          </Fragment>
        )}

        {/* error  */}
        {userState.error === true && (
          <div className="w-full md:w-[40rem] text-center p-6 bg-secondaryLight dark:bg-secondaryDark rounded-md">
            Sorry. We couldn't find any results. Please try again !
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
