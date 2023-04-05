import { useState, useEffect } from 'react';
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { app, firestore, storage } from "../firebase";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"




const Pending = () => {
  
  const [tasks, setTasks] = useState([])

  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "Files/");
  const data = ref(storage, "quries/");
  const [queries,setQuries]=useState([]);

  
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

 
  }, []);

  useEffect(() => {
    const q = query(collection(firestore, 'queries'))
    onSnapshot(q, (querySnapshot) => {
     
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
       
      })))
    })
  },[])
  console.log(data);
  return (
    <div>
        <h1>Pending Patents</h1>
        {imageUrls.map((url) => {
          console.log(url);
          return <h1><button><a href = {url} target="_blank">Click to view Document</a></button></h1>

    })}

{tasks.map((task) => (
 console.log(task)
))}
                            
    </div>
    
    );
};

export default Pending;
