/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Label, FormGroup, Input, FormFeedback } from "reactstrap";

const TextInput = ({ data, handleForm, validate, refresh }) => {
  const [input, setInput] = useState(data.value);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (!validate) return;
    if (input !== "") return;
    data.require && setInputError("invalid");
  }, [validate, input, data.require]);

  useEffect(() => {
    setInput(data.value);
    handleForm(data.value, data.id, data.linked);
  }, [data.value, data.id, data.linked]);

  return (
    <>
      <FormGroup>
        <Label className="form-control-label" for={data.label + data.id}>
          {data.label}
          {data.require && <span className="text-danger">*</span>}
        </Label>
        <Input
          id={data.label + data.id}
          type="text"
          placeholder={data.placeholder}
          value={input}
          invalid={data.require && inputError === "invalid"}
          onChange={(e) => {
            const val = e.target.value;
            if (val !== "") setInputError("");
            setInput(val);
            handleForm(val, data.id);
          }}
          disabled={data.disable}
        />

        <FormFeedback>{data.hint}</FormFeedback>
      </FormGroup>
    </>
  );
};

export default TextInput;
