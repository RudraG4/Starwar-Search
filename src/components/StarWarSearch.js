import { useEffect, useState } from "react";
import Mask, { Spinner } from "./Mask";
import PaginatedResultSet from "./PaginatedResultSet";
import InfoView from "./InfoView";
import { Container, Col } from "react-bootstrap";

const BASE_URL = "https://swapi.dev/api";

export default function StarWarSearch(props) {
  const { searchQuery, pageSize = 10 } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resultSet, setResultSet] = useState({
    results: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    duration: 0
  });
  const [currentId, setCurrentId] = useState();

  async function search(searchQuery, pageNum) {
    setCurrentId();
    setIsError(false);
    setIsLoading(true);
    const queryStart = Date.now();

    try {
      const response = await fetch(
        `${BASE_URL}/people/?search=${searchQuery}&page=${pageNum}`
      );
      const data = await response.json();
      const results =
        data.results &&
        data.results.map((data, id) => {
          data.id = data.url
            .split("/")
            .reverse()
            .filter((c) => c)[0];
          return data;
        });
      setResultSet((oldData) => {
        return {
          ...oldData,
          results: results,
          total: data.count || 0,
          totalPages: Math.ceil((data.count || 0) / pageSize),
          currentPage: pageNum
        };
      });
    } catch (e) {
      setIsError(true);
    }

    const queryEnd = Date.now();
    setIsLoading(false);
    setResultSet((oldData) => {
      return {
        ...oldData,
        duration: ((queryEnd - queryStart) / 1000).toFixed(2)
      };
    });
  }

  useEffect(() => {
    if (searchQuery) {
      search(searchQuery, 1);
    }
  }, [searchQuery]);

  function handlePageChange(pageNum) {
    search(searchQuery, pageNum);
  }

  function handleOnView(event, data) {
    setCurrentId(data.id);
  }

  return (
    <Container
      className="search-container row position-relative"
      style={{ minHeight: "500px" }}
    >
      {isError ? (
        <Mask message="Something went wrong!!" />
      ) : isLoading ? (
        <Spinner message="Loading...." />
      ) : (
        <>
          <Col lg={8} className="p-3">
            <PaginatedResultSet
              data={resultSet}
              pageSize={10}
              onPageChange={handlePageChange}
              onViewClick={handleOnView}
              onRowClick={handleOnView}
            />
          </Col>
          <Col lg={4} className="p-3">
            {currentId && <InfoView type="people" id={currentId} />}
          </Col>
        </>
      )}
    </Container>
  );
}
