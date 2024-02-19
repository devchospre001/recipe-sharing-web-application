import { ChangeEvent, createContext, useState } from "react";

import { TChildProps, TRecipe } from "@/types";
import { options } from "@/pages/Feed";

type TSearchContext = {
  inputText: string;
  checkedTag: number | null;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSearchData: (arr: TRecipe[], choice: typeof options) => TRecipe[];
  handleSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTagCheck: (value: number | null) => void;
};

export const SearchContext = createContext<TSearchContext>(
  {} as TSearchContext
);

const SearchContextProvider = ({ children }: TChildProps) => {
  const { Provider } = SearchContext;
  const [inputText, setInputText] = useState("");
  const [checkedTag, setCheckedTag] = useState<number | null>(null);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value.toLowerCase();
    setInputText(searchWord);
  };

  const handleTagCheck = (value: number | null) => {
    setCheckedTag((previousState) => (value === previousState ? null : value)!);
  };

  const handleSearchData = (arr: TRecipe[], choice: typeof options) => {
    const filteredSearchData = arr.filter((recipe) => {
      if (!choice[checkedTag!] || choice[checkedTag!] === "Title") {
        const titleMatch = recipe.title.toLowerCase().includes(inputText);
        return titleMatch;
      }

      if (choice[checkedTag!] === "Category") {
        const categoryMatch = recipe.category.toLowerCase().includes(inputText);
        return categoryMatch;
      }

      if (choice[checkedTag!] === "Cuisine") {
        const cuisineMatch = recipe.cuisine.toLowerCase().includes(inputText);
        return cuisineMatch;
      }
    });

    return filteredSearchData;
  };

  const contextValue = {
    inputText,
    checkedTag,
    setInputText,
    handleSearchData,
    handleSearchInput,
    handleTagCheck,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};

export default SearchContextProvider;
