// icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search = () => {
  return (
    <div className="w-full flex justify-between items-center p-2 gap-4 bg-secondaryLight dark:bg-secondaryDark rounded-md">
      <div className="ml-2 md:ml-4 flex items-center gap-4">
        <MagnifyingGlassIcon className="w-6 h-6" />
        <input
          type="text"
          className="w-full md:w-[20rem] border-none outline-none p-3 bg-transparent text-[0.9rem] placeholder:text-primaryDark dark:placeholder:text-primaryLight"
          placeholder="Search Github username ..."
        />
      </div>
      <button className="py-3 px-4 rounded-md bg-blue text-[0.8rem] font-bold text-white">
        Search
      </button>
    </div>
  );
};

export default Search;
