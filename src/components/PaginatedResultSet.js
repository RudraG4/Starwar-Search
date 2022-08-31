import ResultSet from "./ResultSet";
import Pagination from "./Pagination";

/* ResultSet HOC */
export default function PaginatedResultSet(props) {
  return (
    <ResultSet {...props}>
      {/* Render Props */}
      {(currentPage, totalPages, onPageChange) => {
        return (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        );
      }}
    </ResultSet>
  );
}
