import React from "react";

export const Results = (props) => {
  const { results } = props;

  return (
    <div id="results-container" className="results-container">
      {results.map((fb) => {
        const { id, nth, time, fibNum, loading } = fb;
        return (
          <div key={id} className="result-div">
            {loading ? (
              <p>
                Calculating the{" "}
                <span className="bold" id="nth">
                  {nth}
                </span>{" "}
                Fibonacci number...
              </p>
            ) : (
              <>
                <p id="timer">
                  Time: <span className="bold">{time} ms</span>
                </p>
                <p>
                  <span className="bold" id="nth">
                    {nth}
                  </span>{" "}
                  fibonnaci number:{" "}
                  <span className="bold" id="sum">
                    {fibNum}
                  </span>
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
