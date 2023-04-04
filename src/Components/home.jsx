import React, { useState } from 'react';
import contract from '../Contract';
import { firestore } from '../firebase'
import { addDoc,collection } from "@firebase/firestore"


function Home() {
  const [addQuery, setAddQuery] = useState('');
  const [checkQuery, setCheckQuery] = useState('');
  const [queryExists, setQueryExists] = useState(false);
  const [addDescription, setAddDescription] = useState('');


  const handleChangeAdd = (event) => {
    setAddQuery(event.target.value);
  };
  const handleDescriptionChange = event => {
    setAddDescription(event.target.value);
  }

  const handleChangeCheck = (event) => {
    setCheckQuery(event.target.value);
  };

  const handleAddQuery = async () => {
    await contract.methods.addQuery(addQuery).send({ from: window.ethereum.selectedAddress });
    setAddQuery('');
    const query = {
        keyword: addQuery,
        descrp: addDescription,
        status: false,
      };
      await addDoc(collection(firestore, "queries"), query);
                                                     
  };

  const handleCheckQuery = async () => {
    const result = await contract.methods.checkQuery(checkQuery).call();
    setQueryExists(result);
  };

  return (
    <div>
      <h2>Add Query</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Query:
          <input type="text" value={addQuery} onChange={handleChangeAdd} />
        </label>
        <button onClick={handleAddQuery}>Add</button>
        <label>Enter description</label>
        <input value={addDescription} onChange={handleDescriptionChange} />

      </form>

      <h2>Check Query</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Query:
          <input type="text" value={checkQuery} onChange={handleChangeCheck} />
        </label>
        <button onClick={handleCheckQuery}>Check</button>
      </form>

      {queryExists ? (
        <p>The query "{checkQuery}" exists.</p>
      ) : (
        <p>The query "{checkQuery}" does not exist.</p>
      )}
    </div>
  );
}

export default Home;
