import React, {useState, useContext, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import CartScree from './screens/CartScree';
import SigningScreen from './screens/SigningScreen';
import ShippingAdressScreen from './screens/ShippingAdressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScree from './screens/ProfileScree';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('ShippingAdress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
    
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
    <div className={
      sidebarIsOpen 
      ? 'd-flex flex-column site-container active-cont'
      : 'd-flex flex-column site-container'
    }>
      <ToastContainer position='bottom-center' limit={1} />
      <header >
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button 
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className='fas fa-bars'></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>Patagonia</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <SearchBox />
            <Nav className='me-auto w-100 justify-content-end' >
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
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div className={
        sidebarIsOpen
        ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
        : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
      }>
        <Nav className='flex-column text-white w-100 p-2'>
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {
            categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer 
                  to={`/searchcategory=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))
          }
        </Nav>
      </div>
      <main className='mt-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScree />} />
            <Route path='/search' element={<SearchScreen />} />
            <Route path='/signin' element={<SigningScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route path='/profile' 
            element={
              <ProtectedRoute>
                <ProfileScree />
              </ProtectedRoute>
            }/>  
            <Route path='/shipping' element={<ShippingAdressScreen />} />
            <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' 
              element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
              } />
            <Route path='/orderhistory' element={
            <ProtectedRoute>
              <OrderHistoryScreen />
            </ProtectedRoute>
            } />
            {/* Admin Routes */}
            <Route path='/admin/dashboard' element={<AdminRoute><DashboardScreen/></AdminRoute>} />
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
