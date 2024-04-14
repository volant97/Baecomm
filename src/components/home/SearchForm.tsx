import { useSetRecoilState } from "recoil";
import { StSearchForm } from "../../style/home";
import { previousState } from "../../recoil/previous";

type propsType = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  searchedWord: React.MutableRefObject<string>;
  fetchData: (isprevSearchedWord?: string) => Promise<void>;
};

function SearchForm({ word, setWord, searchedWord, fetchData }: propsType) {
  const setSearchedProducts = useSetRecoilState(previousState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    searchedWord.current = e.target.value;
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    setWord("");
  };

  const sessionStorageRemoveItem = () => {
    sessionStorage.clear();
  };

  const handleResetBtnClick = () => {
    setWord("");
    searchedWord.current = "";
    setSearchedProducts([]);
    sessionStorageRemoveItem();
    fetchData();
  };

  return (
    <StSearchForm onSubmit={handleformSubmit}>
      <input
        value={word}
        onChange={handleInputChange}
        type="search"
        placeholder={searchedWord.current}
        required
      />
      <button className="submitBtn" type="submit">
        검색
      </button>
      <button className="resetBtn" type="button" onClick={handleResetBtnClick}>
        리셋
      </button>
    </StSearchForm>
  );
}

export default SearchForm;
