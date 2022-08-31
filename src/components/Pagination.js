import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputGroup } from "react-bootstrap";

export default function Pagination(props) {
  const { currentPage, totalPages, onPageChange } = props;

  function handleClick(event) {
    const { id } = event.target;
    if (onPageChange) {
      if (id === "first") {
        onPageChange(1);
      } else if (id === "prev") {
        onPageChange(currentPage - 1);
      } else if (id === "next") {
        onPageChange(currentPage + 1);
      } else {
        onPageChange(totalPages);
      }
    }
  }

  return (
    <div className="w-100">
      <div className="d-flex justify-content-between flex-wrap w-auto">
        <InputGroup className="justify-content-center w-auto">
          <Button
            id="first"
            variant="outline-secondary"
            disabled={currentPage <= 1}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faAnglesLeft} className="me-2" />
            First
          </Button>

          <Button
            id="prev"
            variant="outline-secondary"
            disabled={currentPage <= 1}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
            Prev
          </Button>
        </InputGroup>

        <InputGroup className="justify-content-center w-auto">
          <Button
            id="next"
            variant="outline-secondary"
            disabled={currentPage >= totalPages}
            onClick={handleClick}
          >
            Next
            <FontAwesomeIcon icon={faAngleRight} className="ms-2" />
          </Button>

          <Button
            id="last"
            variant="outline-secondary"
            disabled={currentPage >= totalPages}
            onClick={handleClick}
          >
            Last
            <FontAwesomeIcon icon={faAnglesRight} className="ms-2" />
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
