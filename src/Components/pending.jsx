import { useState, useEffect } from 'react';
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { firestore, storage } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Pending = () => {
  const [tasks, setTasks] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "Files/");

  useEffect(() => {
 
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

    const q = query(collection(firestore, 'queries'))
    onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
      setTasks(tasks);
    });
  }, []);

  const handleCheckDocument = (id) => {
    window.open(`https://firebasestorage.googleapis.com/v0/b/blockchain-f0893.appspot.com/o/Files%2F${id}?alt=media`);
  }
 
  return (
    <div>
      <h1>Pending Patents</h1>
    
      <table border = {2}>
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Approve Status</th>
      <th>Check Document</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map((task) => (
      <tr key={task.id}>
        <td>{task.data.keyword}</td>
        <td>{task.data.descrp}</td>
        <td>{task.data.approve}</td>
        <td>   <Button  variant="info" onClick={() => handleCheckDocument(task.data.id)}>Check Document</Button></td>
      </tr>
    ))}
  </tbody>
</table>
  {/* {imageUrls.map((url) => (
        <div key={url}>
          <button>
            <a href={url} target="_blank" rel="noopener noreferrer">Click to view Document</a>
          </button> 
        </div>
      ))} */}
    </div>
  );
};

export default Pending;
