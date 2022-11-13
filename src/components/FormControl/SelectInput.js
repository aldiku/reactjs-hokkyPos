/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Label, FormGroup, Input, FormFeedback } from "reactstrap";

const SelectInput = ({ data, handleForm, validate, refresh }) => {
  const [input, setInput] = useState(data.value);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (!validate) return;
    if (input !== "") return;
    setInputError("invalid");
  }, [validate, input]);

  useEffect(() => {
    setInput(data.value);
    handleForm(data.value, data.id, data.linked);
  }, [data.value, data.linked, data.id]);

  return (
    <>
      <FormGroup>
        <Label className="form-control-label" for={data.label + data.id}>
          {data.label} <span className="text-danger">*</span>
        </Label>
        <Input
          id={data.label + data.id}
          type="select"
          value={input}
          invalid={inputError === "invalid"}
          onChange={(e) => {
            const val = e.target.value;
            if (val !== "") setInputError("");
            setInput(val);
            handleForm(val, data.id, data.linked);
          }}
          disabled={data.disable}
        >
          <option value="">{data.placeholder}</option>
          {data.option.map((item, index) => {
            return (
              <option key={index} value={item.id ? item.id : item.name}>
                {item.name}
              </option>
            );
          })}
        </Input>
        <FormFeedback>{data.hint}</FormFeedback>
      </FormGroup>
    </>
  );
};

export default SelectInput;
