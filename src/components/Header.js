export default function Header(props) {
  return (
    <header
      className={`flex-center animate ${
        props.showHome ? "height-100" : "height-auto"
      }`}
    >
      <div
        className={`w-100 gap-3 p-3 flex-center justify-content-between ${
          props.showHome ? "flex-column" : "flex-row"
        }`}
      >
        <div className="col">
          <img
            src="./starwars-logo-100.png"
            alt="Star Wars Logo"
            style={{
              marginRight: "1rem",
              maxHeight: props.showHome ? "auto" : "50px"
            }}
          />
        </div>
        <div className="col-sm-8 d-flex justify-content-center flex-grow-1 ">
          {props.children}
        </div>
        <div className="col"></div>
      </div>
    </header>
  );
}
