import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const styles = {
  num:{
      position:"absolute",
      left: "190px",
      top: "120px",
      padding: "10px",
      font: "32px Arial, sans-serif"  
  },
  title:{
    position:"absolute",
      left: "150px",
      top: "287px",
      font: "22px Arial, sans-serif"  
  }
};
export function UsersNum(props) {
  return <div style={{position:'relative'}}>
    <AccountCircleIcon style={{ fontSize: 450 }}/>
    <span style={styles.num}>{props.data}</span>
    <span style={styles.title}>Users Number</span>
  </div>;
}