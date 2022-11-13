import { useImperativeHandle, forwardRef, useState } from "react";
import RadioButtonInput from "./RadioButtonInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
//for debouncing input
let debounce = {};

// //format form management
// formId : "id of form" ==> unique id for process in create data function
// type :"text" ==> current component choice [text,select,radio]
// value :"text" ==> can be set for initial value
// label :"text" ==> label form
// hint :"String" ==> message when error = "invalid" (require must be true)
// placeholder :"String" ==> default message when value is empty
// error :"String" ==> testing error message appear fill with 'invalid'
// option : array of object ==> [{id:"" ,name:id_number}] for select and radio
// require :bool ==> (true = mandatory, false = null is okay)
// linked : "string" ==> look at handleLinkedSelect
//                       function, if set in city, add case "city"
//                       in switch case
// disable : bool ==> set it to true  for disabled form, empty it if free to edit
// //

//Refresh page after changing arrParser
const arrParser = (array) => {
  let tempArr = [];
  array.forEach((item) => {
    tempArr.push({
      value: item.value ? item.value : null,
      formId: item.formId,
      require: item.require,
    });
  });
  return tempArr;
};

const ManagementForm = forwardRef(
  ({ data, create, handleLinkedSelect }, ref) => {
    const [form, setForm] = useState(arrParser(data));
    const [validate, setValidate] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useImperativeHandle(ref, () => ({
      validate() {
        setValidate(true);
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          setValidate(false);
        }, 100);
        isValid();
      },
      refresh() {
        setRefresh(true);
        setValidate(false);
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          setRefresh(false);
        }, 100);
        setForm(arrParser(data));
      },
    }));
    const handleForm = (value, index, linked) => {
      let newArr = form;
      newArr[index].value = value;
      setForm(newArr);
      linked && handleLinkedSelect(linked, value);
    };

    const isValid = () => {
      const index = form.findIndex(
        (form) =>
          (form.value === "" || form.value === undefined) &&
          form.require === true
      );
      if (index === -1) create(form);
    };

    const formType = data.map((item, index) => {
      switch (item.type) {
        case "text":
          return (
            <TextInput
              key={index}
              data={{
                value: item.value ? item.value : "",
                label: item.label,
                hint: item.hint,
                placeholder: item.placeholder,
                id: index,
                require: item.require,
                disable: item.disable,
              }}
              handleForm={handleForm}
              validate={validate}
              refresh={refresh}
            />
          );
        case "select":
          return (
            <SelectInput
              key={index}
              data={{
                value: item.value ? item.value : "",
                label: item.label,
                hint: item.hint,
                placeholder: item.placeholder,
                id: index,
                option: item.option,
                linked: item.linked,
                require: item.require,
                disable: item.disable,
              }}
              handleForm={handleForm}
              validate={validate}
              refresh={refresh}
            />
          );
        case "radio":
          return (
            <RadioButtonInput
              key={index}
              data={{
                value: item.value ? item.value : "",
                label: item.label,
                hint: item.hint,
                id: index,
                require: item.require,
                option: item.option,
                disable: item.disable,
              }}
              handleForm={handleForm}
              validate={validate}
              refresh={refresh}
            />
          );

        default:
          return <span></span>; // harus return sesuatu
      }
    });

    return formType;
  }
);

export default ManagementForm;
