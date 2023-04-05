import React, { useState } from 'react';
import contract from '../Contract';
import { firestore } from '../firebase'
import { addDoc,collection } from "@firebase/firestore"
import { storage } from "../firebase";
import { v4 } from "uuid";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";

function Home() {
  const [addQuery, setAddQuery] = useState('');
  const [checkQuery, setCheckQuery] = useState('');
  const [queryExists, setQueryExists] = useState(false);
  const [addDescription, setAddDescription] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const handleChangeAdd = (event) => {

    
    setAddQuery(event.target.value);
  };
  const handleDescriptionChange = event => {
    setAddDescription(event.target.value);
  }

  const handleChangeCheck = (event) => {
    setCheckQuery(event.target.value);
  };
  const imagesListRef = ref(storage, "Files/");

  const handleAddQuery = async () => {
    await contract.methods.addQuery(addQuery).send({ from: window.ethereum.selectedAddress });
    setAddQuery('');
    const query = {
        keyword: addQuery,
        descrp: addDescription,
        status: false,
      };
      if (imageUpload == null) return;
      const imageRef = ref(storage, `Files/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
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
          <input type="text" value={addQuery} onChange={handleChangeAdd}  required/>
        </label>
      
        <label>Enter description</label>
        <input value={addDescription} onChange={handleDescriptionChange} required/>
        <input
        required
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);

        }}
      />
  <button onClick={handleAddQuery}>Add</button>

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
