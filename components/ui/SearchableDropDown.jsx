'use client'

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function SearchableDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between  bg-white ${value ? "text-[#03435e]" : "text-gray-300"}  text-xs sm:text-sm border-0 border-b-2 border-[#03435e] cursor-pointer py-2 italic`}
      >
        <span>{value || "Select Location"}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-[#03435e] rounded shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border-b border-[#03435e] px-3 py-2 text-sm text-[#03435e] focus:outline-none placeholder:italic"
          />
          <ul className="max-h-[200px] overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="px-3 py-2 hover:bg-[#f0f0f0] cursor-pointer text-[#03435e]"
                >
                  {opt}
                </li>
              ))
            ) : (
              <li
                onClick={() => {
                  onChange("Other");
                  setIsOpen(false);
                  setSearch("");
                }}
                className="px-3 py-2 cursor-pointer text-[#03435e] hover:bg-[#f0f0f0]"
              >
                Other
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
