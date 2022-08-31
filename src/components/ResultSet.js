import { useState } from "react";
import Mask from "./Mask";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ResultSet(props) {
  let {
    total = 0,
    totalPages = 0,
    currentPage = 1,
    pageSize = 10,
    duration = 0
  } = props.data;

  const [results, setResults] = useState(props.data.results || []);

  function handleOnViewClick(event) {
    const id = event.currentTarget.parentElement.dataset["id"];
    let rowData = results.filter((row) => row["id"] === id)[0];
    if (props.onViewClick) {
      props.onViewClick(event, { id, data: rowData });
    }
  }

  function handleOnRowClick(event) {
    const id = event.currentTarget.dataset["id"];
    let rowData = {};
    setResults((oldResults) => {
      return oldResults.map((row) => {
        if (row["id"] === id) {
          rowData = row;
          row["selected"] = true;
        } else {
          row["selected"] = false;
        }
        return row;
      });
    });
    if (props.onRowClick) {
      props.onRowClick(event, { id, data: rowData });
    }
  }

  return (
    <div className="search-results col">
      <div className="d-flex flex-column flex-grow-1 position-relative w-100">
        <div className="result-stats">
          {currentPage === 1
            ? `About ${total} results (${duration} seconds)`
            : `Page ${currentPage} of about ${total} results (${duration} seconds)`}
        </div>
        {!total ? (
          <Mask message="No data found" />
        ) : (
          <ul className="list-group mt-3 mb-3 w-100">
            {results.map((data, id) => {
              return (
                <li
                  key={id}
                  data-id={data.id}
                  className={`list-group-item ${data.selected ? "active" : ""}`}
                  onClick={handleOnRowClick}
                >
                  <div className="col-1 text-center">
                    {(currentPage - 1) * pageSize + (id + 1)}
                  </div>
                  <div className="flex-grow-1">{data.name}</div>
                  <div
                    className="list-group-item-action"
                    onClick={handleOnViewClick}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {props.children &&
        props.children(currentPage, totalPages, props.onPageChange)}
    </div>
  );
}
