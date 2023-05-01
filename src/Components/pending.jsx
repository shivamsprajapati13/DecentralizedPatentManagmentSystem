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
  const [events, setEvents] = useState([]);

  const RemoveStatus = "false";


  useEffect(() => {
    const fetchEvents = async () => {
        console.log("above");
      const patentCount = await contract.methods.getPatentCount().call();
      console.log("Event count:"+patentCount);
      const queryArray = [];

      for (let i = 0; i < patentCount; i++) {
        const approveStatus = await contract.methods.getPatentApprovalStatus(i).call();
        
        console.log("Approve status"+approveStatus);
        
        // const q = query(collection(firestore, 'queries'));
        // onSnapshot(q, (querySnapshot) => {
        //   const tasks = querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     data: doc.data(),
        //   }));
        // });
          
   

        const event = await contract.methods.getPatent(i).call();
        const date = new Date(event[4] * 1000); 
        const formattedDate = date.toString(); 
        queryArray.push({
          id: i,
          owner:event[0],
          keyword: event[1],
          descrp: event[2],
          status:approveStatus.toString(),
          dateTime:formattedDate,
      
        });
  

      }
      console.log(queryArray);

      setEvents(queryArray);
    };

    fetchEvents();
  }, []);


  
  const handleCheckDocument = (id) => {
    window.open(`https://firebasestorage.googleapis.com/v0/b/blockchain-f0893.appspot.com/o/Files%2F${id}?alt=media`);
  }

  const filteredTasks = events.filter(task => {
    return task.keyword.toLowerCase().includes(searchTerm.toLowerCase()) || task.descrp.toLowerCase().includes(searchTerm.toLowerCase()) || task.owner.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getCurrentUserWalletAddress = () => {
    return window.ethereum.selectedAddress;
    console.log(window.ethereum.selectedAddress);
  };

  

  const handleApprove = async (id) => {
    // alert("I am in approve handle");
    const currentUserWalletAddress = await getCurrentUserWalletAddress();
    console.log(currentUserWalletAddress);

    const adminAddress = await contract.methods.admin().call({ from: currentUserWalletAddress });
    console.log(adminAddress);


    if (currentUserWalletAddress.toLowerCase() == adminAddress.toLowerCase()) {
      // console.log("Not admin");
     
      console.log("above call");
      await contract.methods.updatePatentStatus(id,true).send({ from: currentUserWalletAddress }).on("transactionHash", async (hash) => {
      console.log("Below call");
   
      alert("Approved Successful");
      });
    } else {
      // console.error("Only admin can approve queries.");
      alert("Only admin can approve queries")
    }
  };


  const handleNotApprove = async (id) => {
    // alert("I am in not approve handle");
    const currentUserWalletAddress = await getCurrentUserWalletAddress();
    console.log(currentUserWalletAddress);

    const adminAddress = await contract.methods.admin().call({ from: currentUserWalletAddress });
    console.log(adminAddress);


    if (currentUserWalletAddress.toLowerCase() == adminAddress.toLowerCase()) {
      console.log("above call");
      await contract.methods.updatePatentStatus(id,false).send({ from: currentUserWalletAddress }).on("transactionHash", async (hash) => {
        console.log("Below call");
        alert("Appoved Removed Successful");
      });
    }      
    else {
      // console.error("Only admin can approve queries.");
      alert("Only admin can approve queries")
    }
  };

  const getOwner = async (patentId) => {
    const patent = await contract.methods.getPatent(patentId).call();
    return patent[0];
  }
  

  const handleDeletePatent = async (id) => {
    // alert("I am in Handle Delete Patent");
    const currentUserWalletAddress = await getCurrentUserWalletAddress();
    console.log(currentUserWalletAddress);
    
    const owner = await getOwner(id);
    console.log(owner);
    
    if (currentUserWalletAddress.toLowerCase() == owner.toLowerCase()) {
      console.log("above call");
      await contract.methods.removePatent(id).send({ from: currentUserWalletAddress }).on("transactionHash", async (hash) => {
        console.log("Below call");

        alert("Deleted Successful");
      });
    }
    else{
      alert("Only Owner can delete his work")
    }    
  
  };




  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Card >
             
              <Card.Title style={{textAlign:"center", paddingTop:"10px", fontSize:"1.7em"}}>Search Work</Card.Title>
             
              <Card.Body>
                <div className="search-bar">
                  {/* <input type="text" placeholder="Search by keyword..." onChange={(e) => setSearchTerm(e.target.value)} /> */}
                  <Form.Control type="text" placeholder="Search by Keyword, Description or Owner Address" onChange={(e) => setSearchTerm(e.target.value)} />
                  <br></br>
                         </div>

                <Table striped bordered hover responsive>
                  <thead style={{backgroundColor:"#333", color:"white"}}>
                    <tr>
                      <th style={{textAlign:"center"}}>Keyword</th>
                      <th style={{textAlign:"center"}}>Description</th>
                      <th style={{textAlign:"center"}}>Check Document</th>
                      <th style={{textAlign:"center"}}>Status</th>
                      <th style={{textAlign:"center"}}>Block No.</th>
                      <th style={{textAlign:"center"}}>Block Time Creation</th>
                      <th style={{textAlign:"center"}}>Owner Address</th>
                      <th style={{textAlign:"center"}}>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                  {filteredTasks.map((event) => (
            <tr key={event.id}>
              <td>{(event.keyword)}</td>
              <td>{event.descrp} </td>
              <td>
                <Button variant="info" onClick={() => handleCheckDocument(event.id)}>Check Document</Button>
              </td>
              <td> {event.status == "true" ? (<h5><Badge bg = "success">Accepted</Badge></h5> ): (<h5><Badge bg = "danger">Pending</Badge></h5>) }</td>
              <td>{event.id}</td>
              <td>{event.dateTime}</td>
              <td>{event.owner}</td>
              <td>  {event.status == "false"?(<Button variant="success" onClick={() => handleApprove(event.id)}>
                            Approve
                          </Button>):(<Button variant="danger" onClick={() => handleNotApprove(event.id)}>
                            Remove
                          </Button>)}

                                          
              </td>
              </tr>))}                              
                  </tbody>
                </Table>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  
    </div>
  );
};

export default Pending;
