
import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

const Filters = ({search, setSearch}) => {

  const Step = 1;
  const Min = 0;
  const Max = 500;

  const [values, setValues] = useState([10, 100]);

  console.log(search)

  function handleMouseUp () {
    

  }

  return (
    <div className="container">
      <span>Prix entre : </span> 
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "45%",
          maxWidth: "300px",
        }}
      >
        <Range
          values={values}
          step= {Step}
          min= {Min}
          max= {Max}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseUp={handleMouseUp} 
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ececec", "rgb(44, 177, 186)", "#ececec"],
                    min: Min,
                    max: Max
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "17px",
                width: "17px",
                borderRadius: "100%",
                backgroundColor: isDragged ? "#017b86" : "rgb(44, 177, 186)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-25px",
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                  padding: "1px 4px 1px 4px",
                  borderRadius: "4px",
                  backgroundColor: "rgb(44, 177, 186)",
                  width: "max-content",
                  padding: "4px 5px"
                }}
              >
                {values[index].toFixed(0)} €
              </div>
            
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Filters;