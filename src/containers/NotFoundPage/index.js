import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {

  return (
    <div>
      <title>404 - XML</title>
      <main>
        <h1>404 | Header</h1>
        <Link to="/">Back</Link>
      </main>
    </div>
  );
}

export default NotFound;
