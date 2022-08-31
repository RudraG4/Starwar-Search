export default function Mask(props) {
  return (
    <div className="mask flex-grow-1 flex-column">
      {props.children}
      {props.message && <div>{props.message}</div>}
    </div>
  );
}

export function Spinner(props) {
  return (
    <Mask message={props.message}>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">{props.message}</span>
      </div>
    </Mask>
  );
}
