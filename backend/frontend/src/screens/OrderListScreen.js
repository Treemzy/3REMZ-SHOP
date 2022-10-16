import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";

function OrderListScreen() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
          dispatch(listOrders());
        } else {
          history("/login");
        }
    }, [dispatch, history, userInfo]);

    
    return (
        <div>
            <h1>Orders</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE CREATED</th>
                            <th>TOTAL AMOUNT</th>
                            <th>PAID STATUS</th>
                            <th>DELIVERED STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    <i className="fas fa-check" style={{ color: "green" }}>
                                        {order.paidAt.substring(0,10)}
                                    </i>
                                ) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}
                            </td>

                            <td>
                                {order.isDelivered ? (
                                    <i className="fas fa-check" style={{ color: "green" }}>
                                        {order.deliveredAt.substring(0,10)}
                                    </i>
                                ) : (
                                    <i className="fas fa-times" style={{ color: "red" }}></i>
                                )}
                            </td>


                            <td>
                            <LinkContainer to={`/order/${order._id}/`}>
                                <Button className="btn-sm" variant="dark">
                                DETAILS
                                </Button>
                            </LinkContainer>
                          
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                )}
        </div>
    )
}

export default OrderListScreen
