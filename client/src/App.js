import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setConutry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmloyee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("added");
      getEmployees();
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        getEmployees();
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      getEmployees();
    });
  };

  return (
    <div className="App">
      <div className="container">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setConutry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />

        <button onClick={addEmloyee}>Add Employee</button>
        <button onClick={getEmployees}>Show Employee</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee" key={val.id}>
              <h3>
                Name: <p>{val.name}</p>
              </h3>
              <h3>
                Age: <p>{val.age}</p>
              </h3>
              <h3>
                Country: <p>{val.country}</p>
              </h3>
              <h3>
                Position: <p>{val.position}</p>
              </h3>
              <h3>
                Wage: <p>{val.wage}</p>
              </h3>
              <div>
                <input
                  type="number"
                  placeholder="Edit wage"
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
