import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Chart from 'react-google-charts';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                summary: action.payload,
                loading: false,
            }
        case 'FETCH_FAIL':
        default:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
            return state;
    }
}

const DashboardScreen = () => {

    const {state} = useContext(Store);
    const {userInfo} = state;

    const [{loading, summary, error}, dispatch] = useReducer(reducer, {
        login: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`/api/order/sumary`, {
                    headers: {Authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({
                    type: 'FETACH_SUCCESS',
                    payload: data,
                })
                
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        };     
        fetchData();
    },[userInfo]);

  return (
    <div>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <h1>Dashboard</h1>
        {loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {summary.users && summary.users[0]
                                ? summary.users[0].numUsers
                                : 0 }
                            </Card.Title>
                            <Card.Text>Users</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {summary.orders && summary.users[0]
                                ? summary.orders[0].numOrders
                                : 0 }
                            </Card.Title>
                            <Card.Text>Orders</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {summary.orders && summary.users[0]
                                ? summary.orders[0].totalSales.toFixed(2)
                                : 0 }
                            </Card.Title>
                            <Card.Text>Orders</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className='my-3'>
                <h2>Sales</h2>
                {summary.dailyOrders.lenght === 0 ? (
                    <MessageBox>No Sale</MessageBox>
                ) : (
                    <Chart
                     width="100%"
                     height="400px"
                     chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
                    >

                    </Chart>
                )}
            </div>
            <div className='my-3'>
                <h2>Categories</h2>
                {summary.productCategories.lenght === 0 ? (
                <MessageBox>No Category</MessageBox> 
                ) : (
                    <Chart
                        width="100%"
                        height="400px"
                        chartType='PieChart'
                        loader={<div>Loading Chart...</div>}
                        data={[
                            ['Category', 'Products'],
                            ...summary.productCategories.map((x) => [x._id, x.count])
                        ]}
                    ></Chart>
                )   
            }
            </div>
            </>
        )}
    </div>
  )
}

export default DashboardScreen;