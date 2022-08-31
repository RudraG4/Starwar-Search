import { useEffect, useState } from "react";
import Mask, { Spinner } from "./Mask";

const BASE_URL = "https://swapi.dev/api";

export default function InfoView(props) {
  const { id, type } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function queryData(id) {
      setIsError(false);
      setIsLoading(true);
      try {
        if (type === "people") {
          const response = await fetch(`${BASE_URL}/people/${id}`);
          const data = await response.json();
          setData(data);
        }
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
    }

    if (id) {
      queryData(id);
    }
  }, [type, id]);

  return (
    <div className="info-view position-relative info-view">
      {isError ? (
        <Mask message="Something went wrong!!" />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="info-name p-3 border m-0 d-flex align-items-end">
            <h2 className="w-100 m-0">{data.name}</h2>
          </div>
          <div className="p-3 border">
            <div className="row d-flex flex-wrap">
              <div className="d-flex col mb-3">
                <div className="col">Gender:</div>
                <div className="col text-capitalize">{data.gender}</div>
              </div>
              <div className="d-flex col mb-3">
                <div className="col">Birth Year:</div>
                <div className="col text-capitalize">{data.birth_year}</div>
              </div>
            </div>
            <div className="row d-flex flex-wrap">
              <div className="d-flex col mb-3">
                <div className="col">Height:</div>
                <div className="col text-capitalize">{data.height}</div>
              </div>
              <div className="d-flex col mb-3">
                <div className="col">Weight:</div>
                <div className="col text-capitalize">{data.mass}</div>
              </div>
            </div>
            <div className="row d-flex flex-wrap">
              <div className="d-flex col mb-3">
                <div className="col">Hair Color:</div>
                <div className="col text-capitalize">{data.hair_color}</div>
              </div>
              <div className="d-flex col mb-3">
                <div className="col">Skin Color:</div>
                <div className="col text-capitalize">{data.skin_color}</div>
              </div>
            </div>
            <div className="row d-flex flex-wrap">
              <div className="d-flex col mb-3">
                <div className="col">Eye Color:</div>
                <div className="col text-capitalize">{data.eye_color}</div>
              </div>
              <div className="d-flex col mb-3"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
