import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ input, setInput }: SearchInputProps) => {
  return (
    <div className="relative w-fit">
      <div className="absolute top-3 left-6 text-white">
        <FaSearch />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="space-y-1.5 px-3 py-2 m-4 rounded-xl bg-[#434E78] flex flex-row items-center focus:outline-0 text-white"
      />
    </div>
  );
};

export default SearchInput;
