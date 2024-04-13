import { useState } from "react";

function Home() {
  const array = ["hello", "hi", "my", "code", "happy", "nice"];

  const [word, setWord] = useState<string>("");
  const [searchedItem, setSearchedItem] = useState<string[]>(array);

  const searched = array.filter((item) => item.toLowerCase().includes(word));

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleformSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searched.length === 0) return alert("검색 결과가 없습니다");
    setSearchedItem(searched);
    setWord("");
  };

  const handleResetBtnOnClick = () => {
    setSearchedItem(array);
  };

  return (
    <>
      <form onSubmit={handleformSubmit}>
        <input value={word} onChange={handleInputOnChange} required />
        <button type="submit">검색</button>
        <button type="button" onClick={handleResetBtnOnClick}>
          리셋
        </button>
      </form>
      <ul>
        {searchedItem.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default Home;
