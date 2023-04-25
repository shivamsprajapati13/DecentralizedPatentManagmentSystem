
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  if(window.location.pathname=="/"){
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/pending">Pending</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <br />
      

   
    </>
  );
          }
          if(window.location.pathname=="/pending"){
            return (
              <>
                <Navbar bg="dark" variant="dark">
                  <Container>
                    <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link> &nbsp;&nbsp;&nbsp;
                    <Navbar.Brand href="/pending">Pending</Navbar.Brand>
                      {/* <Nav.Link href="#features">Features</Nav.Link>
                      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                  </Container>
                </Navbar>
                <br />
                
          
             
              </>
            );
                    }
}

export default ColorSchemesExample;