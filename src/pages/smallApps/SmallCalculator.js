import React, { useState } from 'react';

const SmallCalculator = () => {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [result, setResult] = useState('');

  console.log('inputs-->', typeof firstInput, secondInput);

  const plusClick = () => {
    const plusData = parseInt(firstInput) + parseInt(secondInput);
    // console.log('plusData=>', plusData);
    setResult(plusData);
    setTimeout(() => {
      setFirstInput('');
      setSecondInput('');
      setResult('');
    }, 3000);
  };

  const resetField = () => {
    setFirstInput('');
    setSecondInput('');
    setResult('');
  };
  console.log('result->', result, typeof result);
  return (
    <div className="container">
      <h2>Calculator App</h2>
      <div>
        <input
          className="m-4"
          type="text"
          name="first_input"
          id="first_input"
          value={firstInput}
          onChange={(e) => setFirstInput(e.target.value)}
        />
        <input
          className="m-4"
          type="text"
          name="second_input"
          id="second_input"
          value={secondInput}
          onChange={(e) => setSecondInput(e.target.value)}
        />
        <span style={{ fontSize: 30 }}>=</span>
        <input
          className="m-4"
          type="text"
          name="second_input"
          id="second_input"
          value={result}
          disabled
        />
      </div>
      <div className="row row_class" style={{ justifyContent: 'center' }}>
        <div className="col">
          <button
            className="m-4 btn btn-success"
            style={{ width: 56 }}
            onClick={() => plusClick()}
          >
            <span style={{ fontSize: 25 }}>+</span>
          </button>

          <button className="m-4 btn btn-primary" style={{ width: 56 }}>
            <span style={{ fontSize: 25 }}> -</span>
          </button>

          <button className="m-4 btn btn-warning" style={{ width: 56 }}>
            <span style={{ fontSize: 25 }}>x</span>
          </button>

          <button className="m-4 btn btn-info" style={{ width: 56 }}>
            <span style={{ fontSize: 25 }}> ÷</span>
          </button>
          <button
            className="m-4 btn btn-danger"
            style={{ width: '14%' }}
            onClick={() => resetField()}
          >
            <span style={{ fontSize: 25 }}> Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallCalculator;
