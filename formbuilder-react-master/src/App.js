import "./App.css";
import Form from "./Form";
import AddField from "./AddField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import DeleteInput from "@mui/icons-material/Delete";
import { createNewField, editField, deleteField } from "./Backend";
import { FORM_BUILDER_URL } from "./Config";

function App() {
  const [fields, setField] = useState([]);
  const [currentField, setCurrentField] = useState(null);

  //adauga valorile din addfield in fields
  const createField = async (value) => {
    const oldFields = [...fields]; //adaugam campurile deja existente
    const found = oldFields.findIndex((field) => field.name === value.name); //cautam sa vedem daca nu exista deja acel camp

    //daca acel field nu exista deja atunci se va adauga
    if (found < 0) {
      const responseData = await createNewField(value);
      oldFields.push(responseData);
      setField(oldFields);
    } else {
      const dbIndex = oldFields[found].id;
      oldFields[found] = { ...value, id: dbIndex };
      await editField(dbIndex, value);
      setField(oldFields);
      setCurrentField(null);
    }
  };

  const onEditFieldPressed = (field) => {
    setCurrentField(field);
  };

  //sterge un element si apoi reincarca
  const onDelete = async (id) => {
    await deleteField(id);
    await loadData();
  };

  //sterge toate elementele
  const deleteBulk = async (id) => {
    for (const field of fields) {
      await deleteField(field.id);
    }
    await loadData();
  };

  //adaugam valorile salvate in mockapi in fields
  //pentru a face await pe un fetch ne trebuie functie async
  const loadData = async () => {
    try {
      const serverResponse = await fetch(FORM_BUILDER_URL); //raspunsul este un obiect complex cu mai multe proprietati
      const responseBody = await serverResponse.json(); //pentru a primi doar proprietatile din body in format json
      if (responseBody && Array.isArray(responseBody)) {
        setField(responseBody);
      }
    } catch (err) {
      setField([]);
    }
  };

  //la fiecare modificare in baza de date se va face refresh
  useEffect(() => {
    loadData();
  }, []);

  //urmarim valorile actuale din fields in consola
  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <div className="App">
      <header className="App-header">
        <AddField editField={currentField} createField={createField} />
        <Form
          isEditable={"true"}
          onEdit={onEditFieldPressed}
          onDelete={onDelete}
          fields={fields}
        />
        <br></br>
        <Button
          variant="outlined"
          startIcon={<DeleteInput />}
          onClick={deleteBulk}
        >
          Delete all
        </Button>
      </header>
    </div>
  );
}

export default App;
