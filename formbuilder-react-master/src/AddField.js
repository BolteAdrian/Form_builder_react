import { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

const options = [
  "text",
  "textarea",
  "date",
  "password",
  "email",
  "tel",
  "file",
  "time",
  "datetime",
];

function AddField({ createField, editField }) {
  //definim proprietatile (fara ele vom primi eroare pt undefined)
  const [inputField, setInputField] = useState({
    label: editField ? editField.label : "",
    name: editField ? editField.name : "",
    type: editField ? editField.type : "text",
  });

  //adaugam noile campuri editate
  useEffect(() => {
    if (editField) {
      setInputField({
        label: editField.label,
        name: editField.name,
        type: editField.type,
      });
    }
  }, [editField]);

  //cand modificam datele se vor modifica si un setinput
  const onInputFieldUpdated = (event) => {
    const { name, value } = event.target;
    setInputField({ ...inputField, [name]: value });
  };

  //trimitem datele cu field-ul creat in app si resetam fieldurile
  const addOrEditField = (event) => {
    event.preventDefault();
    createField(inputField);
    setInputField({
      label: "",
      name: "",
      type: "text",
    });
  };

  return (
    <div>
      <h1>Creeaza formular</h1>
      <form onSubmit={addOrEditField}>
        <label>Label : </label>
        <Input
          type="text"
          name="label"
          value={inputField.label}
          onChange={onInputFieldUpdated}
          required
        />
        <br></br>
        <label>Name : </label>
        <Input
          type="text"
          name="name"
          value={inputField.name}
          onChange={onInputFieldUpdated}
          required
        />
        <br></br>
        <br></br>
        <label>Type : </label>
        <Select
          name="type"
          value={inputField.type}
          onChange={onInputFieldUpdated}
          required
        >
          {options.map((element) => (
            <MenuItem key={element} value={element}>
              {element}
            </MenuItem>
          ))}
        </Select>
        <br></br>
        <br></br>
        <Button startIcon={<AddIcon />} variant="outlined" type="submit">
          {editField ? "Edit field" : "Add field"}
        </Button>
      </form>
    </div>
  );
}
export default AddField;
