import React from 'react';
// import PropTypes from 'prop-types';
import  {Navbar, Container,Nav, Button} from 'react-bootstrap'

const NavBar=(props)=>{
   const {user}= props
   const onLoggedOut=()=>{
        localStorage.clear();
        window.open('/','_self')
        }
   const isAuth=()=>{
    if (typeof window == 'undefined'){
        return false
    }
    if (localStorage.getItem('token')){
        return localStorage.getItem('token')
    }else{
        return false
    }
   }

    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isAuth() && <Nav.Link href='#home'>Home</Nav.Link> }
                        {isAuth() && <Nav.Link href={`users/${user}`}>{user}</Nav.Link>}
                        {!isAuth() && <Nav.Link href='/'>signin</Nav.Link> }
                        {!isAuth() && <Nav.Link href='/register'>signup</Nav.Link> }
                        {isAuth() && <Button variant='primary' onClick={()=>onLoggedOut()} >Logout</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

// NavBar.propTypes = {
// 	user:PropTypes.string.isRequired
// };

export default NavBar