import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() { 
  const [data, setData] = useState([]);
  const [toggleUser, setToggleUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      const transformedData = transformData(response.data);
      setData(transformedData);
    };
    fetchData();
  }, []);

  const transformData = (responseData) => {
    const userData = responseData.reduce((acc, item) => {
      if (!acc[item.userId]) {
        acc[item.userId] = [];
      }
      acc[item.userId].push(item);
      return acc;
    }, {});
    return Object.entries(userData).map(([userId, tasks]) => ({
      userId,
      tasks,
    }));
  };

  const toggleAccordion = (userId) => {
    setToggleUserId(toggleUser === userId ? null : userId);
  };

  return (
    <div className="App">
     {data.map((user) => (
        <div key={user.userId} className="Accordion">
          <h3
            onClick={() => toggleAccordion(user.userId)}
          >
            User ID: {user.userId}
          </h3>
          {toggleUser === user.userId && (
            <ul>
              {user.tasks.map((task) => (
                <li key={task.id}>
                  <strong>ID:</strong> {task.id} <br />
                  <strong>Title:</strong> {task.title} <br />
                  <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
