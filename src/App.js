import React from "react";
import "./App.css";
import { ordinal_suffix } from "./helpers";
import { reducer } from "./reducer";
import { Results } from "./Results";

function App() {
  const [info, dispatch] = React.useReducer(reducer, {
    err: "",
    num: "",
    computedFibs: [],
  });

  const runWorker = (num, id) => {
    dispatch({ type: "SET_ERROR", err: "" });
    const worker = new window.Worker("./fib-worker.js");

    worker.postMessage({ num });
    worker.onerror = (err) => err;
    worker.onmessage = (e) => {
      const { time, fibNum } = e.data;
      dispatch({
        type: "UPDATE_FIBO",
        id,
        time,
        fibNum,
      });
      worker.terminate();
    };
  };

  return (
    <div>
      <div className="heading-container">
        <h1>Computing the nth Fibonnaci number</h1>
      </div>

      <div className="body-container">
        <p id="error" className="error">
          {info.err}
        </p>

        <div className="input-div">
          <input
            type="number"
            value={info.num}
            className="number-input"
            placeholder="Enter a number"
            onChange={(e) =>
              dispatch({
                type: "SET_NUMBER",
                num: window.Number(e.target.value),
              })
            }
          />

          <button
            id="submit-btn"
            className="btn-submit"
            onClick={() => {
              if (info.num < 2) {
                dispatch({
                  type: "SET_ERROR",
                  err: "Please enter a number greater than 2",
                });
                return;
              }

              const id = info.computedFibs.length;
              dispatch({
                type: "SET_FIBO",
                id,
                loading: true,
                nth: ordinal_suffix(info.num),
              });
              runWorker(info.num, id);
            }}
          >
            Calculate
          </button>
        </div>

        <Results results={info.computedFibs} />
      </div>
    </div>
  );
}

export default App;
