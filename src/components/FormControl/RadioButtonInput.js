/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Label, FormGroup, Input, Row } from "reactstrap";

const RadioButtonInput = ({ data, handleForm, validate, refresh }) => {
  const [input, setInput] = useState(data.value);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (!validate) return;
    if (input !== "") return;
    data.require && setInputError("invalid");
  }, [validate, data.require, input]);

  useEffect(() => {
    setInput(data.value);
    handleForm(data.value, data.id, data.linked);
  }, [data.value, data.id, data.linked]);

  function isMandatory(index) {
    input === index && setInput(-1);
  }

  function handleChange(value) {
    setInput(value);
    handleForm(value, data.id);
  }

  return (
    <>
      <FormGroup>
        <Label
          className="form-control-label"
          htmlFor="exampleFormControlSelect3"
        >
          Clear
        </Label>
        <Row>
          <div style={{ display: "flex" }}>
            {data.option.map((item, index) => {
              return (
                <div
                  className="custom-control custom-radio mb-3"
                  key={index}
                  style={{ marginLeft: "20px" }}
                >
                  <Input
                    className="custom-control-input"
                    id={index}
                    type="radio"
                    value={input}
                    checked={input === item.id}
                    onChange={() => handleChange(item.id)}
                    onClick={() =>
                      !data.require && input === item.id && isMandatory(item.id)
                    }
                    disabled={data.disable}
                  />
                  <Label
                    for={index}
                    className="custom-control-label"
                    htmlFor={index}
                  >
                    {item.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </Row>
      </FormGroup>
    </>
  );
};

export default RadioButtonInput;
