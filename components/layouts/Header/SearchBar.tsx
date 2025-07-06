import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="relative w-[400px]">
      <Input
        placeholder="Search..."
        className="pr-12 rounded-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:outline-none "
      />
      <div className="absolute right-0 top-0 h-full flex items-center px-3 bg-black rounded-r-full">
        <CiSearch className="text-background text-xl" />
      </div>
    </div>
  );
};

export default SearchBar;
