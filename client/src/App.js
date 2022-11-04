
import { BrowserRouter, Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScree from './screens/CartScree';
import SigningScreen from './screens/SigningScreen';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  }

  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-contaniner'>
      <ToastContainer position='bottom-center' limit={1} />
      <header >
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Patagonia</Navbar.Brand>
            </LinkContainer>
            <Nav className='me-auto'>
              <Link to='/cart' className='nav-link'>
                Cart
                {cart.cartItem.length > 0 && (
                  <Badge pill bg='danger'>
                    {cart.cartItem.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider/>
                  <Link className='dropdown-item'
                    to="#signout"
                    onClick={signoutHandler}
                  >
                  Sign Out
                  </Link>
                </NavDropdown>
              ):(
                <Link className="nav-link" to="/signin">
                Sign In
                </Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main className='mt-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScree />} />
            <Route path='/signin' element={<SigningScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;