import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../utils/config';
import { withRouter,Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
        <Menu.Item key="product">
      <Link to="/addproduct">Manage Products</Link>
    </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);