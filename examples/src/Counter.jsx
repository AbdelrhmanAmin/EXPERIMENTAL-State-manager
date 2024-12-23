import { connect, useDispatch, useSelector } from "@Redux-like/react";

const Counter = () => {
  const count = useSelector((state) => state.present.count);
  const dispatch = useDispatch();
  const increment = () => dispatch({ type: "INCREMENT", amount: 1 });
  const decrement = () => dispatch({ type: "DECREMENT", amount: 1 });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "start",
        marginRight: "40px",
        paddingRight: "40px",
        borderRight: "1px solid #ccc",
        height: "100vh",
      }}
    >
      <strong style={{ fontSize: "36px", marginBottom: "30px" }}>
        Count: {count}
      </strong>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            marginRight: "10px",
          }}
          onClick={() => increment()}
        >
          Increment
        </button>
        <button onClick={() => count > 0 && decrement()}>Decrement</button>
      </div>
    </div>
  );
};


export default Counter
