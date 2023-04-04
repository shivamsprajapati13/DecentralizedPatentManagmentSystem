import React, { useState } from 'react';
import contract from '../Contract';
import { firestore } from '../firebase'
import { addDoc,collection } from "@firebase/firestore"

function Admin() {
    const [checkQuery, setCheckQuery] = useState('');
    const [queryExists, setQueryExists] = useState(false);
  
  


    const handleChangeCheck = (event) => {
        setCheckQuery(event.target.value);
      };
      const handleCheckQuery = async () => {
        const result = await contract.methods.checkQuery(checkQuery).call();
        setQueryExists(result);
      };


  return (
    <div><h2>Check Query</h2>
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        Query:
        <input type="text" value={checkQuery} onChange={handleChangeCheck} />
      </label>
      <button onClick={handleCheckQuery}>Check</button>
    </form></div>
  )
}

export default Admin