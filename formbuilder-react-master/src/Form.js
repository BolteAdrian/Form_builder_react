import { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DeleteInput from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const InputCSS = {
  fontSize: '21px',
  '&.MuiInputBase-root': {
    borderColor: 'white',
    color: 'white',
  }
}

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
                  <Button
                    startIcon={<FileUploadIcon />}
                    component="span"
                  ></Button>
                </label>
              ) : (
                <>
                  <label>{field.label} &nbsp; &nbsp;</label>
                  <Input
                    sx={{
                      ...InputCSS,
                      }}
                    {...field}
                    value={formFields[field.name] || ""}
                    onChange={(event) =>
                      onInputValueUpdated(field.name, event.target.value)
                    }
                  />
                </>
              )}

              {isEditable ? (
                <>
                  &nbsp;
                  <Button
                    startIcon={<EditIcon />}
                    type="button"
                    onClick={() => onEdit(field)}
                  ></Button>
                  <Button
                    startIcon={<DeleteInput />}
                    onClick={() => onDelete(field.id)}
                  ></Button>
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
