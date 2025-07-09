import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserPlus, FaHome, FaEnvelope, FaInfoCircle, FaSearch, FaSignInAlt } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    
    return (
        <Navbar expand="lg" className="navbar-custom" sticky="top">
            <Container fluid>
                {/* Brand Logo with Registration Icon */}
                <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center">
                    <FaUserPlus className="me-2 brand-icon" />
                    <span className="brand-text">Customer Registration</span>
                </Navbar.Brand>
                
                {/* Mobile Toggle Button */}
                <Navbar.Toggle aria-controls="navbarScroll" className="navbar-toggler-custom">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                
                {/* Collapsible Menu */}
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto ms-lg-3">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">
                            <FaHome className="me-1" /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register" className="nav-link-custom">
                            <FaUserPlus className="me-1" /> Register
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="nav-link-custom">
                            <FaEnvelope className="me-1" /> Contact
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link-custom">
                            <FaInfoCircle className="me-1" /> About
                        </Nav.Link>
                    </Nav>
                    
                    {/* Right-aligned elements */}
                    <div className="d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
                        <Form className="d-flex search-form me-lg-3 mb-2 mb-lg-0 w-100">
                            <div className="input-group">
                                <Form.Control
                                    type="search"
                                    placeholder="Search customers..."
                                    className="search-input"
                                    aria-label="Search"
                                />
                                <Button variant="primary" className="search-btn">
                                    <FaSearch />
                                </Button>
                            </div>
                        </Form>
                        
                        <Button
                            variant="outline-light"
                            className="login-btn d-flex align-items-center"
                            onClick={() => navigate("/login")}
                        >
                            <FaSignInAlt className="me-1" /> Login
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;