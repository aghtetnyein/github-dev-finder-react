import { useEffect, useState } from "react";
import moment from 'moment';

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

function App() {
	// states
	const [theme, setTheme] = useState(localStorage.theme || "light");
	const [value, setValue] = useState("");
  const [user, setUser]:any = useState({});

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

	// console.log(localStorage.theme);

	const clickHandler = () => {
		// console.log(value)
		fetch(`https://api.github.com/users/${value}`).then((response) =>
			response.json().then((data) => {
				setUser(data);
        	console.log(data)
			})
		);
	};



	return (
		<div className="w-screen h-screen bg-primaryLight dark:bg-primaryDark flex flex-col items-center justify-center gap-8 text-primaryDark dark:text-primaryLight">
			<div className="flex flex-col items-center justify-center gap-6 px-2 overflow-auto">
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
					onChange={(e: any) => setValue(e.target.value)}
					value={value}
					onclick={clickHandler}
				/>

				<div className="w-full flex flex-col md:flex-row p-6 gap-12 bg-secondaryLight dark:bg-secondaryDark rounded-md">
					<img
						className="w-24 h-24 rounded-full object-cover"
						src={user.avatar_url}
						alt="profile"
					/>
					<div>
						{/* name and joined date */}
						<div className="flex items-center justify-between gap-4">
							<p className="text-[1.2rem] font-bold">{user?.login}</p>
							<p className="text-[0.8rem]">Joined : {moment(user?.created_at).format('DD MMM YYYY')}</p>
						</div>
						{/* username */}
						<p className="text-[0.8rem] text-red font-bold">{user?.name}</p>
						{/* bio */}
						<p className="my-6 text-[0.8rem]">{user?.bio ? user.bio : "This profile has no bio"} </p>
						{/* repo, followers and following */}
						<div className="my-8 bg-primaryLight dark:bg-primaryDark grid grid-cols-3 items-center md:gap-20 px-6 py-4 rounded-md">
							<div className="flex flex-col items-center">
								<p className="text-[0.8rem]">Repos</p>
								<p className="text-[1rem] font-bold">{user?.public_repos}</p>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-[0.8rem]">Followers</p>
								<p className="text-[1rem] font-bold">{user?.followers}</p>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-[0.8rem]">Following</p>
								<p className="text-[1rem] font-bold">{user?.following}</p>
							</div>
						</div>
						{/* location, website and twitter */}
						<div className="my-8 grid grid-cols-2 gap-4">
							<div className="flex items-center gap-3">
								<MapPinIcon className="w-6 h-6" />
								<p className="text-[0.8rem]">{user?.location}</p>
							</div>
							<div className="flex items-center gap-3">
								<TwitterIcon className="w-6 h-6" />
								<a
									href="https://twitter.com/elonmusk"
									className="text-[0.8rem]"
								>
									{user.twitter_username ? user.twitter_username : "-"}
								</a>
							</div>
							<div className="flex items-center gap-3">
								<LinkIcon className="w-6 h-6" />
								<a href="https://www.tesla.com/" className="text-[0.8rem]">
									{user.blog ? user.blog : "-"}
								</a>
							</div>
							<div className="flex items-center gap-3">
								<GithubIcon className="w-6 h-6" />
								<a href={user?.html_url} className="text-[0.8rem]" target="_blank">
									{user?.name}
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
