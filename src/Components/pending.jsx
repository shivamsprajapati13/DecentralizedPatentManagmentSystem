import { useState, useEffect } from 'react';
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import contract from '../Contract';

const Pending = () => {
  const [tasks, setTasks] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const imagesListRef = ref(storage, "Files/");

  useEffect(() => {
    // Get download URLs for all images in "Files" folder
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

    // Subscribe to "queries" collection in Firestore
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

  const filteredTasks = tasks.filter(task => {
    return task.data.keyword.toLowerCase().includes(searchTerm.toLowerCase());
  
  });

      const getCurrentUserWalletAddress = () => {
        return window.ethereum.selectedAddress;
        console.log(window.ethereum.selectedAddress);
      };
  
      // const adminWalletAddress = () => {
      //   return contract.methods.getAdmin().send();
      //   // return window.ethereum.selectedAddress;
      //   console.log(contract.methods.getAdmin().send());
      // };

  const handleApprove = async (id) => {
    // alert("I am in approve handle");
    const currentUserWalletAddress = await getCurrentUserWalletAddress();
    console.log(currentUserWalletAddress);
    
    const adminAddress = await contract.methods.getAdmin().call({from: currentUserWalletAddress});
    console.log(adminAddress);


    if (currentUserWalletAddress.toLowerCase() == adminAddress.toLowerCase()) {
      // console.log("Not admin");
      const taskRef = doc(firestore, "queries", id);
      console.log("above call");
       await contract.methods.approveQuery(id).send({ from: currentUserWalletAddress });

      console.log("Below call");
      await updateDoc(taskRef, { approve: "Approved" });
      alert("Approved Successful");
    }else {
      // console.error("Only admin can approve queries.");
      alert("Only admin can approve queries")
    }
  
    
  };


  const handleNotApprove = async (id) => {
    // alert("I am in approve handle");
    const currentUserWalletAddress = await getCurrentUserWalletAddress();
    console.log(currentUserWalletAddress);
    
    const adminAddress = await contract.methods.getAdmin().call({from: currentUserWalletAddress});
    console.log(adminAddress);


    if (currentUserWalletAddress.toLowerCase() == adminAddress.toLowerCase()) {
      // console.log("Not admin");
      const taskRef = doc(firestore, "queries", id);
      console.log("above call");
       await contract.methods.approveQuery(id).send({ from: currentUserWalletAddress });

      console.log("Below call");
      await updateDoc(taskRef, { approve: "NotApprove" });
      alert("Appoved Removed Successful");
    }else {
      // console.error("Only admin can approve queries.");
      alert("Only admin can approve queries")
    }
  
    
  };


  return (
    <div>
       <Container fluid>
      <Row> 
        <Col>
        <Card >
        <Card.Title>Search Work</Card.Title>
        <Card.Body>
      <div className="search-bar">
        {/* <input type="text" placeholder="Search by keyword..." onChange={(e) => setSearchTerm(e.target.value)} /> */}
        <Form.Control type="text" placeholder="Search by keyword..." onChange={(e) => setSearchTerm(e.target.value)} />
        <br></br>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Description</th>
            <th>Approve Status</th>
            <th>Check Document</th>
   
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.data.keyword}</td>
              <td>{task.data.descrp}</td>
              <td> {task.data.approve === "Approved" ? (
                
      <Button variant="danger" onClick={() => handleNotApprove(task.id)}>
      Not Approve
    </Button>
    ) : (
      <Button variant="success" onClick={() => handleApprove(task.id)}>
        Approved
      </Button>
    )}              </td>
    <td>
    <Button variant="info" onClick={() => handleCheckDocument(task.data.id)}>Check Document</Button>
    </td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    
      </Card.Body>
      </Card>
 </Col>
 </Row>
    </Container>
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
