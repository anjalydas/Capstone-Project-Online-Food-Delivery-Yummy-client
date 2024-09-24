// Unauthorized.js
import React from 'react';

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Unauthorized Access</h1>
      <p className="mt-4 text-lg">You do not have permission to view this page.</p>
    </div>
  );
}

export default Unauthorized;
