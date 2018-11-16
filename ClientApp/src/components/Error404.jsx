import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function Error404(){
  return (
    <div className="error404">
      <h1>Error 404</h1>
      <h2>Sorry! This page doesn't exist.</h2>
      <Link to='/'><Button bsStyle="primary">Back To Home</Button></Link>
      <style>{`
        .error404 {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Error404;
