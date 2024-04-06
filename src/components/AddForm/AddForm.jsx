import { useState } from "react";
import "./AddForm.css";

export const AddForm = (props) => {
  const { setAddEmployer } = props;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const isButtonDisabled = !name || !surname;

  const addHandler = () => {
    const employer = {
      name,
      surname,
      active: true
    };
    setAddEmployer(employer);
    setName('');
    setSurname('');    
  }

  return (
    <div className="employer-add-form">
      <input
        onChange={ e => setName(e.target.value) }
        value={ name }
        type="text" 
        className="employer-add-form__input" 
        placeholder="Name"
      />

      <input
        onChange={ e => setSurname(e.target.value) }
        value={ surname }
        type="text" 
        className="employer-add-form__input" 
        placeholder="Surname"
      />
      <button
        onClick={ addHandler } 
        className="employer-add-form__btn"
        disabled={isButtonDisabled}
      >
        Add
      </button>
    </div>
  );
};
