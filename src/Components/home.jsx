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

  

  const getCurrentUserWalletAddress = () => {
    return window.ethereum.selectedAddress;
    console.log(window.ethereum.selectedAddress);
  }

  const handleAddQuery = async () => {
      const currentUserWalletAddress = await getCurrentUserWalletAddress();
      console.log(currentUserWalletAddress);

      const idpdf = await contract.methods.getPatentCount().call();
    
    await contract.methods
      .createPatent(addQuery,addDescription) 
      .send({ from: window.ethereum.selectedAddress })
      .on("transactionHash", async (hash) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `Files/${idpdf}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });

        const query = {
          hashValue:hash,
          id: idpdf,
        };

        await addDoc(collection(firestore, "queries"), query);
        console.log("Transaction hash:", hash);
        alert("Work added Successfully");
      })
      .catch((error) => {
      
        console.error("Error adding query:", error);
      });
  };
  

  

  return (
    <div>
         <Container >
      <Row>
        <Col>
      <Card> <h2 style={{textAlign:"center", paddingTop:"10px", fontSize:"1.7em"}}>Add Work</h2>
      <Card.Body> 
        <form onSubmit={(e) => e.preventDefault()}>
        <Form.Label style={{fontWeight:"600"}}>KeyWord</Form.Label>
        <Form.Control type="text" required placeholder="Enter keyword" value={addQuery} onChange={handleChangeAdd} />
          <br></br>
      
        <InputGroup>
        <InputGroup.Text style={{fontWeight:"600"}}>Enter Description</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Enter Small Description" value={addDescription} onChange={handleDescriptionChange}/>
      </InputGroup>

          <br>
          </br>

        <input
         style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '7vh',
        }}
        required
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);

        }}
      />
  <Button variant="primary" onClick={handleAddQuery} style={{padding:"10px",width:"10%"}}>
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
