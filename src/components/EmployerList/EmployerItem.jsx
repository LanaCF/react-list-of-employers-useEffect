import "./EmployerItem.css";
import { useState } from "react";

export const EmployerItem = (props) => {
  const { item, index, setDelEmployer, setEditEmployer } = props;
  const [isToggle, setIsToggle] = useState(true);
  const [isActive, setIsActive] = useState(item.active);
  const [editedFields, setEditedFields] = useState({
    name: item.name,
    surname: item.surname
  });
  

// Delete =================================================

  const delHandler = () => {
    setDelEmployer(item.id);
  }

// Edit =================================================

  const toggleEdit = () => {
    
    setIsToggle(prevToggle => !prevToggle);
    
  };

  const saveChanges = () => {
    setIsToggle(true);

    const updatedEmployer = {
      ...item,
      name: editedFields.name,
      surname: editedFields.surname
    };

    setEditEmployer(updatedEmployer);
  };

// Active =================================================

  const toggleActive = () => {
    setIsActive(prev => !prev);
    const updatedEmployer = { ...item, active: !isActive };
    setEditEmployer(updatedEmployer);
  };

  return (
    <li className={`employer-item ${ isActive ? '' : 'active-textarea' }`}>
      <span className="employer-item__number">{ index + 1 }.</span>
      <div className="employer-item__info-block">
        <textarea
          className={`employer-item__info employer-item__info_name ${ isToggle ? '' : 'employer-item__active' } ${ isActive ? '' : 'active-textarea' }`}
          disabled={isToggle}
          value={editedFields.name}
          onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
        ></textarea>
        <textarea
          className={`employer-item__info employer-item__info_surname ${ isToggle ? '' : 'employer-item__active' } ${ isActive ? '' : 'active-textarea' }`}
          disabled={isToggle}
          value={editedFields.surname}
          onChange={(e) => setEditedFields({ ...editedFields, surname: e.target.value })}
        ></textarea>
      </div>
      <div className="employer-item__action-block">
      <button onClick={isToggle ? toggleEdit : saveChanges} className="employer-item__btn employer-item__btn_edit">
        {isToggle ? 'Edit' : 'Save'}
      </button>
        <button onClick={ delHandler } className="employer-item__btn employer-item__btn_del">Del</button>
      </div>
      <input
        type="checkbox"
        className="employer-item__checkbox"
        checked={isActive}
        onChange={toggleActive}
      />
    </li>
  );
};














// import "./EmployerItem.css";
// import { useState } from "react";

// export const EmployerItem = (props) => {
//   const { item, index, delEmployer, editEmployer } = props;
//   const [isToggle, setIsToggle] = useState(true);
//   const [isActive, setIsActive] = useState(item.active);
//   const [editedFields, setEditedFields] = useState({
//     name: false,
//     surname: false
//   });
  

// // Delete =================================================

//   const delHandler = () => {
//     delEmployer(item.id);
//   }

// // Edit =================================================

//   const toggleEdit = () => {
//     setEditedFields(prevState => ({
//       name: !prevState.name,
//       surname: !prevState.surname
//     }));
//     setIsToggle(prevToggle => !prevToggle);
//     if (!isToggle) {
//       saveChanges();
//     }
//   };

//   const saveChanges = () => {
//     const newName = document.querySelector('.employer-item__info_name').value;
//     const newSurname = document.querySelector('.employer-item__info_surname').value;
    
//     setIsToggle(true);

//     const updatedEmployer = {
//       ...item,
//       name: newName,
//       surname: newSurname,
//     };

//     if (!isToggle) {
//       editEmployer(updatedEmployer);
//     }
//   };

// // Active =================================================

//   const toggleActive = () => {
//     setIsActive(prev => !prev);
//     const updatedEmployer = { ...item, active: !isActive };
//     editEmployer(updatedEmployer);
//   };

//   return (
//     <li className={`employer-item ${ isActive ? '' : 'active-textarea' }`}>
//       <span className="employer-item__number">{ index + 1 }.</span>
//       <div className="employer-item__info-block">
//         <textarea
//           className={`employer-item__info employer-item__info_name ${ isToggle ? '' : 'employer-item__active' } ${ isActive ? '' : 'active-textarea' }`}
//           disabled={!editedFields.name}
//           defaultValue={item.name}
//         ></textarea>
//         <textarea
//           className={`employer-item__info employer-item__info_surname ${ isToggle ? '' : 'employer-item__active' } ${ isActive ? '' : 'active-textarea' }`}
//           disabled={!editedFields.surname}
//           defaultValue={item.surname}
//         ></textarea>
//       </div>
//       <div className="employer-item__action-block">
//       <button onClick={isToggle ? toggleEdit : saveChanges} className="employer-item__btn employer-item__btn_edit">
//         {isToggle ? 'Edit' : 'Save'}
//       </button>
//         <button onClick={ delHandler } className="employer-item__btn employer-item__btn_del">Del</button>
//       </div>
//       <input
//         type="checkbox"
//         className="employer-item__checkbox"
//         checked={isActive}
//         onChange={toggleActive}
//       />
//     </li>
//   );
// };
















// export const EmployerItem = (props) => {
//   const { item, index, delEmployer } = props;
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState(item.name);
//   const [editedSurname, setEditedSurname] = useState(item.surname);

//   const toggleEditing = () => {
//     setIsEditing(!isEditing);
//   };

//   const saveChanges = () => {
//     // Тут ви можете зробити щось, щоб зберегти зміни (наприклад, відправити їх на сервер або оновити стан компонента рівно на стільки, скільки вам потрібно)
//     // В даному прикладі ми лише виведемо в консоль змінені значення
//     console.log(`New name: ${editedName}, new surname: ${editedSurname}`);
//     setIsEditing(false);
//   };

//   return (
//     <li className="employer-item">
//       <span className="employer-item__number">{ index + 1 }.</span>
//       <div className="employer-item__info-block">
//         {isEditing ? (
//           <>
//             <textarea 
//               className="employer-item__info employer-item__info_name" 
//               value={editedName} 
//               onChange={(e) => setEditedName(e.target.value)} 
//             />
//             <textarea 
//               className="employer-item__info employer-item__info_surname" 
//               value={editedSurname} 
//               onChange={(e) => setEditedSurname(e.target.value)} 
//             />
//           </>
//         ) : (
//           <>
//             <span className="employer-item__info employer-item__info_name">{ item.name }</span>
//             <span className="employer-item__info employer-item__info_surname">{ item.surname }</span>
//           </>
//         )}
//       </div>
//       <div className="employer-item__action-block">
//         {isEditing ? (
//           <button className="employer-item__btn employer-item__btn_save" onClick={saveChanges}>Save</button>
//         ) : (
//           <button className="employer-item__btn employer-item__btn_edit" onClick={toggleEditing}>Edit</button>
//         )}
//         <button className="employer-item__btn employer-item__btn_del" onClick={() => delEmployer(item.id)}>Del</button>
//       </div>
//     </li>
//   );
// };