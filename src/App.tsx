import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Film, top100Films } from "./constants";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Film[]>([]);
  const [dropdownItems, setDropdownItems] = useState<Film[]>([]);
  // const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const [selectedItem, setSelectedItem] = useState<Film | null>(null);
  // const [highlightedChip, setHighlightedChip] = useState<string | null>(null);

  // function addChip(event: React.KeyboardEvent<HTMLElement>) {
  //   const chipValue = inputValue.trim();
  //   if (event.key === "Enter" && inputValue) {
  //     setChips([...chips, chipValue]);
  //     setInputValue("");
  //   }
  // }

  useEffect(() => {
    setDropdownItems(top100Films);
  }, [top100Films]);

  // const handleClick = (e: any) => {
  //   console.log(e);
  //   if (
  //     inputRef.current &&
  //     !inputRef.current.contains(e.target) &&
  //     e.target.className !== "dropdown-item"
  //   ) {
  //     setInputIsFocused(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, []);

  function deleteChip(chiptoDelete: Film) {
    const remainingChips = chips.filter((chip) => chip !== chiptoDelete);
    setChips(remainingChips);
    setDropdownItems([...dropdownItems, chiptoDelete]);
  }

  // function handleInputFocus() {
  //   setInputIsFocused(true);
  // }

  // function handleInputBlur(event: any) {
  //   console.log(event);
  //   setInputIsFocused(false);
  // }

  function handleItemClick(film: Film) {
    //  setSelectedItem(film);
    // console.log(film);
    setChips((prevChips) => {
      const newcChips = [...prevChips, film];
      // console.log(newcChips);
      return newcChips;
    }); // Add the selected film to the chips
    setInputValue(""); // Clear the input value

    // Remove the selected film from the dropdown items
    setDropdownItems((prevItems) => {
      return prevItems.filter((item) => item.title !== film.title);
    });
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    setInputValue(value);
    setDropdownItems(
      top100Films.filter((film) =>
        film.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  // function handleBackspacePress() {
  //   if (selectedItem && inputValue === "") {
  //     setHighlightedChip(selectedItem.title);
  //   }
  // }

  // function handleChipDelete(chiptoDelete: Film) {
  //   deleteChip(chiptoDelete);
  //   // setDropdownItems([...dropdownItems, { title: chiptoDelete.title, year: 0 }]);
  // }

  return (
    <div className="app">
      <header>
        <h1 className="app-heading">Pick Movies</h1>
      </header>
      <main>
        <div className="chip-container">
          {chips.length > 0 &&
            chips.map((chip, index) => {
              return (
                <div className="chip" key={index}>
                  <p className="chip-text">{chip.title}</p>
                  <span
                    className="chip-delete"
                    onClick={() => {
                      deleteChip(chip);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 1.005C4.15 1.005 1 4.155 1 8.005C1 11.855 4.15 15.005 8 15.005C11.85 15.005 15 11.855 15 8.005C15 4.155 11.85 1.005 8 1.005ZM10.7 11.505L8 8.80501L5.3 11.505L4.5 10.705L7.2 8.005L4.5 5.30501L5.3 4.505L8 7.205L10.7 4.505L11.5 5.30501L8.8 8.005L11.5 10.705L10.7 11.505Z"
                        fill="#2A2A2A"
                      />
                    </svg>
                  </span>
                </div>
              );
            })}

          <input
            // ref={inputRef}
            type="text"
            className="chip-input"
            value={inputValue}
            // onChange={(event) => setInputValue(event.target.value)}
            onChange={handleSearchQueryChange}
            // onKeyDown={addChip}
            // onFocus={handleInputFocus}
          ></input>
        </div>
        { dropdownItems.length > 0 && (
          <div className="dropdown">
            {dropdownItems.map((film, index) => {
              return (
                <div
                  className="dropdown-item"
                  key={index}
                  onClick={() => {
                    handleItemClick(film);
                  }}
                >
                  {film.title}
                </div>
              );
            })}
          </div>
        )}

        {/* {selectedItem && (
          <div className="selected-item">
            <p className="selected-item-text">{selectedItem.title}</p>
            <span
              className="selected-item-delete"
              onClick={() => {
                handleChipDelete(selectedItem.title);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 1.005C4.15 1.005 1 4.155 1 8.005C1 11.855 4.15 15.005 8 15.005C11.85 15.005 15 11.855 15 8.005C15 4.155 11.85 1.005 8 1.005ZM10.7 11.505L8 8.80501L5.3 11.505L4.5 10.705L7.2 8.005L4.5 5.30501L5.3 4.505L8 7.205L10.7 4.505L11.5 5.30501L8.8 8.005L11.5 10.705L10.7 11.505Z"
                  fill="#2A2A2A"
                />
              </svg>
            </span>
          </div>
        )} */}
      </main>
    </div>
  );
}

export default App;
