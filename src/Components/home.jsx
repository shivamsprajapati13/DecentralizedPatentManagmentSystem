import React, { useState } from 'react';
import contract from '../Contract';
import { firestore } from '../firebase'
import { addDoc,collection } from "@firebase/firestore"
import { storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


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
  const id = uuidv4();
  

  const getCurrentUserWalletAddress = () => {
    return window.ethereum.selectedAddress;
    console.log(window.ethereum.selectedAddress);
  }

  const handleAddQuery = async () => {
    if (imageUpload == null) return;
      const imageRef = ref(storage, `Files/${imageUpload.name}-${id}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
      const currentUserWalletAddress = await getCurrentUserWalletAddress();
      console.log(currentUserWalletAddress);
    
    await contract.methods
      .addQuery(addQuery, false) 
      .send({ from: window.ethereum.selectedAddress })
      .on("transactionHash", async (hash) => {
        console.log("Transaction hash:", hash);
  
        const query = {
          keyword: addQuery,
          descrp: addDescription,
          approve: "false",
          id: imageUpload.name + "-" + id,
          hashValue: hash,
          OwnerAddress:currentUserWalletAddress,
        };
  
        await addDoc(collection(firestore, "queries"), query);
        alert("Work added Successfully");
      })
      .catch((error) => {
      
        console.error("Error adding query:", error);
      });
  };
  

  // const handleCheckQuery = async () => {
  //   const result = await contract.methods.checkQuery(checkQuery).call();
  //   setQueryExists(result);
  // };

  return (
    <div>
         <Container fluid>
      <Row>
        <Col>
      <Card> <h2 >Add Work</h2>
      <Card.Body> 
        <form onSubmit={(e) => e.preventDefault()}>
        <Form.Label>KeyWord</Form.Label>
        <Form.Control type="text" required placeholder="Enter keyword" value={addQuery} onChange={handleChangeAdd} />
          <br></br>
      
        {/* <label>Enter description</label>
        <input value={addDescription} onChange={handleDescriptionChange} required/> */}
        <InputGroup>
        <InputGroup.Text>Enter Description</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Enter Small Description" value={addDescription} onChange={handleDescriptionChange}/>
      </InputGroup>

{/* 
        <Form.Label>Enter Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Small Description" value={addDescription} onChange={handleDescriptionChange} /> */}
          <br>
          </br>

        <input
        required
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);

        }}
      />
  <Button variant="primary" onClick={handleAddQuery}>
        Add 
      </Button>
  </form>
  </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>
     
     <br>
     </br>
     

      {/* <h2>Check Query</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Query:
          <input type="text" value={checkQuery} onChange={handleChangeCheck} />
        </label>
        <button onClick={handleCheckQuery}>Check</button>
      </form> */}

      {/* {queryExists ? (
        <p>The query "{checkQuery}" exists.</p>
      ) : (
        <p>The query "{checkQuery}" does not exist.</p>
      )} */}
    </div>
  );
}

export default Home;
