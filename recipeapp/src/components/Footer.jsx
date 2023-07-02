// import React from 'react'
import * as React from "react";

const Footer = () => {
  return (
    <footer style={{
        backgroundColor:'#232f3d',
        height:'150px'
        }}>
      <div className="footer-content">
        <h5 style={{color: '#ffffff'}}>Recipe App</h5>
        <p class='paragraph'>Copyright @ 2023 Cookies, Inc.</p>
        {/* <button onClick={handleClick}>Click me</button> */}
      </div>
    </footer>
    
  )
}

export default Footer