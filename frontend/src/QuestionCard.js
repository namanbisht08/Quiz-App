import React from "react";

export default function QuestionCard(props) {
  return (
    <div className="container bg-light p-3 mb-2 mt-2 rounded border border-success">
      <span className="badge text-bg-primary" style={{ fontWeight: "bold" }}>
        Question :{" "}
      </span>
      &nbsp;{props.quesprop.question[0]}
      <div className="container mb-2 mt-2">
        <div className="row">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <label class="btn btn-outline-primary" for="btncheck1">
              <span className="badge rounded-pill text-bg-warning mb-2 mt-2">
                a.{" "}
              </span>
              &nbsp;{props.quesprop.question[1]}
            </label>

            <label class="btn btn-outline-primary" for="btncheck2">
              <span className="badge rounded-pill text-bg-warning">b. </span>
              &nbsp;{props.quesprop.question[2]}
            </label>

            <label class="btn btn-outline-primary" for="btncheck3">
              <span className="badge rounded-pill text-bg-warning">c. </span>
              &nbsp;{props.quesprop.question[3]}
            </label>

            <label class="btn btn-outline-primary" for="btncheck4">
              <span className="badge rounded-pill text-bg-warning">d. </span>
              &nbsp;{props.quesprop.question[4]}
            </label>
          </div>
        </div>
      </div>
      <div className="container  mb-2 mt-2">
        <span className="badge rounded-pill text-bg-success">Answer : </span>
        &nbsp;{props.quesprop.question[5]}
      </div>
    </div>
  );
}
