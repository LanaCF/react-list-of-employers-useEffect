import { useEffect, useState } from "react";
import { AddForm } from "./components/AddForm";
import { EmployerList } from "./components/EmployerList";

const App = () => {
  const [empList, setEmpList] = useState([]);
  const [addEmployer, setAddEmployer] = useState([]);
  const [delEmployer, setDelEmployer] = useState();
  const [editEmployer, setEditEmployer] = useState();

  useEffect (() => {
   fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/employerList')
      .then(response => response.json())
      .then(json => setEmpList(json))
      .catch(error => console.error('Помилка при взаємодії з сервером:', error));
  };

  // ADD ===================================================

  useEffect (() => {
    if (addEmployer.length === 0) return;

    const employer = { ...addEmployer[0] };
    
    if (empList.length === 0) {
        employer.id = 1;
    } else {
        employer.id = getId(empList);
    }
    
    fetch('http://localhost:3000/employerList', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(addEmployer)
    })
    .then(response => {
        fetchData();
    })
    .catch(error => console.error('Error interacting with server:', error));      
  }, [addEmployer]);

  // DEL ===================================================

  useEffect (() => {
    if (!delEmployer) return;

    fetch(`http://localhost:3000/employerList/${delEmployer}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
    })
    .then(response => {
      if (response.ok) {
          setEmpList(prevEmpList => prevEmpList.filter(employer => employer.id !== delEmployer));
      } else {
          console.error('Помилка при видаленні працівника:', response.statusText);
      }
    })
    .then(() => fetchData())
    .catch(error => console.error('Помилка при взаємодії з сервером:', error));
   }, [delEmployer]);

  // EDIT ===================================================

  useEffect (() => {
    if (!editEmployer) return;

    fetch(`http://localhost:3000/employerList/${editEmployer.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(editEmployer)
    })
    .then(response => {
      console.log('Працівника успішно оновлено');
      fetchData();
    })
    .catch(error => console.error('Помилка при взаємодії з сервером:', error));
  }, [editEmployer]);

  console.log('New', empList);

  return (
    <div className="container">
      <h1>Employer list app</h1>
      
      <div className="employer-list-app">

        <AddForm setAddEmployer={ setAddEmployer } />

        <div className="employer-list-block">
          <p className="employer-list-count">
            Employers count: <span>{ empList.length }</span>
          </p>

          <EmployerList 
            data={ empList } 
            setDelEmployer={ setDelEmployer } 
            setEditEmployer={ setEditEmployer }
          />
        </div>
      </div>
    </div>
  );
}

function getId(dataArr) {
  const lastId = dataArr[dataArr.length - 1].id;
  return lastId + 1;
}

export default App;





















// import { useEffect, useState } from "react";
// import { AddForm } from "./components/AddForm";
// import { EmployerList } from "./components/EmployerList";

// const App = () => {
//   const [empList, setEmpList] = useState([]);

//   useEffect (() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     fetch('http://localhost:3000/employerList')
//       .then(response => response.json())
//       .then(json => setEmpList(json))
//       .catch(error => console.error('Помилка при взаємодії з сервером:', error));
//   };

//   const addEmployer = (employer) => {
//     if (empList.length === 0) {
//       employer.id = 1;
//     } else {
//       employer.id = getId(empList);
//     }
    
//     console.log('Sending request to add employer:', employer);
  
//     fetch('http://localhost:3000/employerList', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(employer)
//     })
//     .then(response => {
//       console.log('Response from server after adding employer:', response);
//       fetchData();
//     })
//     .then(() => {
//       console.log('Updated employee list after adding:', empList);
//     })
//     .catch(error => console.error('Error interacting with server:', error));      
//   }

//   const delEmployer = (id) => {
//     fetch(`http://localhost:3000/employerList/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'content-type': 'application/json;charset=utf-8'
//         },
//     })
//     .then(response => {
//       setEmpList(empList.filter(employer => employer.id !== id));
//     })
//     .then(() => fetchData()) // Викликаємо fetchData() після оновлення стану
//     .catch(error => console.error('Помилка при взаємодії з сервером:', error));      
//   }

//   const editEmployer = (editedEmployer) => {
//     fetch(`http://localhost:3000/employerList/${editedEmployer.id}`, {
//       method: 'PUT',
//       headers: {
//         'content-type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(editedEmployer)
//     })
//     .then(response => {
//       console.log('Працівника успішно оновлено');
//       fetchData();
//     })
//     .catch(error => console.error('Помилка при взаємодії з сервером:', error));

//     // setEmpList(prevEmpList => {
//     //   const updatedList = prevEmpList.map(employer => {
//     //     if (employer.id === editedEmployer.id) {
//     //       return editedEmployer;
//     //     }
//     //     return employer;
//     //   });

//     //   console.log('Edit', updatedList);

//     //   return updatedList;
//     // });
//   }

//   console.log('New', empList);

//   return (
//     <div className="container">
//       <h1>Employer list app</h1>
      
//       <div className="employer-list-app">

//         <AddForm addEmployer={ addEmployer } />

//         <div className="employer-list-block">
//           <p className="employer-list-count">
//             Employers count: <span>{ empList.length }</span>
//           </p>

//           <EmployerList 
//             data={ empList } 
//             delEmployer={ delEmployer } 
//             editEmployer={ editEmployer }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// function getId(dataArr) {
//   const lastId = dataArr[dataArr.length - 1].id;
//   return lastId + 1;
// }