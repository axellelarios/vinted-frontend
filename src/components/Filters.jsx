
import { Range, getTrackBackground } from "react-range";

const Filters = ({price, setPrice}) => {

  const Step = 1;
  const Min = 0;
  const Max = 500;

  const values = price;

  const handleChangeRange = (values) => {
    price = values
    setPrice(price);
  };

  return (
    <div className="container">
       <div className="filters-wrapper">
          <div className="filters-left">
            <span>Prix entre : </span> 
            <div
              className="filter-main"
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
                onChange={(values) => {handleChangeRange(values);}}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
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
        <div className="filters-right">
            
        </div>
      </div>
    </div>
  );
};

export default Filters;