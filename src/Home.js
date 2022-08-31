import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StarWarSearch from "./components/StarWarSearch";
import { Container } from "react-bootstrap";

export default function Main() {
  const [showHome, setShowHome] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (searchQuery) => {
    showHome && setShowHome(false);
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    showHome && setSearchQuery("");
  }, [showHome]);

  return (
    <>
      <Header showHome={showHome}>
        <SearchBar onSubmit={handleSubmit} />
      </Header>
      {!showHome && (
        <Container>
          <StarWarSearch searchQuery={searchQuery} />
        </Container>
      )}
    </>
  );
}
