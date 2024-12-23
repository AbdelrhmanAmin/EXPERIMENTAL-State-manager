import { useEffect } from "react";
import { useDispatch, useSelector } from "@Redux-like/react";

const TimeTraveler = () => {
  const history = useSelector((state) => state.log);
  // const store = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // @Todo this is not working?
    console.log({ history });
  }, [history]);
  return (
    <div>
      <strong style={{ fontSize: "36px" }}>Time Traveler</strong>
      <hr />
      <ul style={{ paddingInlineStart: "0px" }}>
        {Object.entries(history).map(([, entry], i) => (
          <li key={i} style={{ marginBlockEnd: "10px" }}>
            <strong>
              {entry.action} at {new Date(entry.timestamp).toLocaleTimeString()}
            </strong>{" "}
            <button
              onClick={() =>
                dispatch({ type: "TRAVEL", timestamp: entry.timestamp })
              }
            >
              UNDO
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <button onClick={() => dispatch({ type: "RETURN" })}>
        Return to present
      </button>
    </div>
  );
};

export default TimeTraveler;
