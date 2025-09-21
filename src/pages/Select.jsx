import React, { useState, useEffect } from "react";
import Alert from "./Alert";

const Select = ({ setSelectedValue, setSelectedValue2 }) => {
  const [color, setColor] = useState("");
  const [side, setSide] = useState("");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 2000);
  };

  useEffect(() => {
    if (color !== "" && side !== "") {
      showAlert("Preferences selected", "success");
    }
  }, [color, side]);

  const handleChange = (event) => {
    setColor(event.target.value);
    setSelectedValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setSide(event.target.value);
    setSelectedValue2(event.target.value);
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="card text-center" id="card2">
        <b className="card-head">Select Your Print Type</b>
        <div className="card-body2">
          <form className="form">
            <div className="form-check1">
              <input type="radio" name="color" value="black and white" onChange={handleChange} />
              <label>Black and White</label>
            </div>
            <div className="form-check2">
              <input type="radio" name="color" value="color" onChange={handleChange} />
              <label>Color</label>
            </div>
            <div className="form-check3">
              <input type="radio" name="side" value="front side only" onChange={handleChange2} />
              <label>Front Side Only</label>
            </div>
            <div className="form-check4">
              <input type="radio" name="side" value="both sides" onChange={handleChange2} />
              <label>Both Sides</label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Select;
