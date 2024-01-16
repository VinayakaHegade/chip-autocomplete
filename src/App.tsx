import { useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chips, setChips] = useState<string[]>([]);

  function addChip(event: React.KeyboardEvent<HTMLElement>) {
    const inputValue = inputRef?.current?.value.trim();
    if (event.key === "Enter" && inputValue) {
      setChips([...chips, inputRef?.current?.value as string]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function deletChip(chiptoDelete: string) {
    const remainingChips = chips.filter((chip) => chip !== chiptoDelete);
    setChips(remainingChips);
  }

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
                  <p className="chip-text">{chip}</p>
                  <span
                    className="chip-delete"
                    onClick={() => {
                      deletChip(chip);
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
            type="text"
            className="chip-input"
            ref={inputRef}
            onKeyDown={addChip}
          ></input>
        </div>
      </main>
    </div>
  );
}

export default App;
