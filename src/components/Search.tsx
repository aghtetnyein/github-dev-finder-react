// icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
interface ISearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const Search = ({ onChange, onClick }: ISearchProps) => {
  return (
    <div className="w-full md:w-[40rem] flex justify-between items-center p-2 gap-4 bg-secondaryLight dark:bg-secondaryDark rounded-md">
      <div className="ml-2 md:ml-4 w-full flex items-center gap-4">
        <MagnifyingGlassIcon className="w-6 h-6" />
        <input
          type="text"
          className="bg-transparent w-full border-none outline-none p-3 text-[0.9rem] placeholder:text-primaryDark dark:placeholder:text-gray-300"
          placeholder="Search Github username ..."
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
      </div>
      <button
        className="py-3 px-4 rounded-md bg-blue text-[0.8rem] font-bold text-white"
        onClick={onClick}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
