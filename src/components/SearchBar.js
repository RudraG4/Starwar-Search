import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.onSubmit && query) {
      props.onSubmit(query);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="input-group"
      style={{ maxWidth: "500px", width: "75%" }}
    >
      <FormControl
        type="text"
        name="search"
        id="search"
        placeholder="Search People"
        onChange={handleChange}
      />
      <Button type="submit" className="btn-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </Form>
  );
}
