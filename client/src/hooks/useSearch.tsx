import { useContext } from "react";
import { SearchContext } from "@/context/SearchProvider";

export const useSearch = () => useContext(SearchContext);
