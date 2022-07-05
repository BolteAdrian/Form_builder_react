import { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DeleteInput from "@mui/icons-material/Delete";

function Form({ fields, isEditable, submit, onEdit, onDelete }) {
  const [formFields, setFormFields] = useState({});

  const onInputValueUpdated = (fieldname, value) => {
    setFormFields({
      ...formFields,
      [fieldname]: value,
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    submit(formFields);
  };

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  const HiddenInput = styled("input")({
    display: "none",
  });

  return (
    <div>
      <h1>Formular</h1>
      <form onSubmit={handlerSubmit}>
        {fields &&
          fields.length > 0 &&
          fields.map((field) => (
            <div key={field.name}>
              {field.type === "file" ? (
                <label htmlFor="contained-button-file">
                  <HiddenInput
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              ) : (
                <>
                  <label>{field.label} &nbsp; &nbsp;</label>
                  <Input
                    {...field}
                    value={formFields[field.name]}
                    onChange={(newValue) =>
                      onInputValueUpdated(field.name, newValue)
                    }
                  />
                </>
              )}

              {isEditable ? (
                <>
                  &nbsp;
                  <Button type="button" onClick={() => onEdit(field)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    variant="outlined"
                    startIcon={<DeleteInput />}
                    onClick={() => onDelete(field.id)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </div>
          ))}
        {!isEditable ? <Button type="submit">Submit</Button> : null}
      </form>
    </div>
  );
}

export default Form;
