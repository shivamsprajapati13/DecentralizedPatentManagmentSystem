import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { doc, onSnapshot, collection, query, where,} from "firebase/firestore";

const Pending = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, "queries"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log("Data", querySnapshot.docs.map(d => doc.data()));
    });
  }, [])


//   useEffect(() => {
//     console.log("In use effect");
//     const fetchData = async () => {
//         console.log("In fetch Data");
//       const result = await firestore.collection('queries').get();

//         console.log(result);

//       console.log("above result");
//         console.log(result);
//       const newData = result.docs.map((doc) => ({
//         id: doc.id,
//         keyword: doc.data().keyword,
//         descrp: doc.data().descrp,
//         status: doc.data().status,
//     }));
//       console.log("Hello");
   
//     };
 
//     console.log("hsivma");
          
//     fetchData();
//   }, []);

  return (
    <div>
        <h1>Pending Patents</h1>
      {/* {data.map((item) => (
        
        <div key={item.id}>
          <p>Keywords: {item.keyword}</p>
          <p>Description: {item.descrp}</p>
          <p>Status: {item.status}</p>
          
        </div>
      ))} */}
    </div>
  );
};

export default Pending;
