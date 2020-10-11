import React from 'react';
import { Menu } from 'antd';
// import axios from 'axios';
// import { USER_SERVER } from '../../../utils/config';
import { withRouter,Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user)

  // const logoutHandler = () => {
  //   axios.get(`${USER_SERVER}/logout`).then(response => {
  //     if (response.status === 200) {
  //       props.history.push("/login");
  //     } else {
  //       alert('Log Out Failed')
  //     }
  //   });
  // };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
       <Menu.Item key="mail">
      <Link to="/">Home</Link>
    </Menu.Item>

    <Menu.Item key="card">
      <Link to="/products">Products</Link>
    </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>

    <Menu.Item key="mail">
      <Link to="/">Home</Link>
    </Menu.Item>

    <Menu.Item key="card">
      <Link to="/products">Products</Link>
    </Menu.Item>

    <Menu.Item key="product">
      <Link to="/addproduct">New Item</Link>
    </Menu.Item>

    <Menu.Item key="customer">
      <Link to="/addcustomer">NewCustomer</Link>
    </Menu.Item>

    <Menu.Item key="bill">
      <Link to="/bill">NewBill</Link>
    </Menu.Item>
    <Menu.Item key="refund">
      <Link to="/refund">Refund</Link>
    </Menu.Item>

    <Menu.Item key="transaction">
      <Link to="/transaction">Transactions</Link>
    </Menu.Item>


        
       
      </Menu>
    )
  }
}

export default withRouter(LeftMenu);