import React, { useState } from 'react';

const SmallCounter = () => {
  const [contedValue, setContedValue] = useState(0);
  console.log('contedValue-->', contedValue);
  const decrementClick = () => {
    setContedValue(contedValue - 1);
    if (contedValue == 0) {
      setContedValue(0);
    }
  };
  return (
    <div className="container">
      <h2>Counter App</h2>
      <h3 style={{ fontSize: 50 }}>{contedValue}</h3>
      <div className="row row_class" style={{ justifyContent: 'center' }}>
        <div className="col-md-2">
          {' '}
          <button
            className="btn btn-primary"
            onClick={() => setContedValue(contedValue + 1)}
          >
            Increment
          </button>
        </div>
        <div className="col-md-2">
          {' '}
          <button className="btn btn-warning" onClick={() => decrementClick()}>
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallCounter;
