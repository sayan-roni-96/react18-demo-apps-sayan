import React, { useState } from 'react';

const SmallCalculator = () => {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [result, setResult] = useState('');

  console.log('inputs-->', typeof firstInput, secondInput);

  // regex vallidation for input field for integer/ number
  const firstHandleChange = (e) => {
    //   const value = ev.target.value.replace(/\D/g, '');
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setFirstInput(e.target.value);
    }
  };

  const secondHandleChange = (e) => {
    const regex1 = /^[0-9\b]+$/;
    if (e.target.value === '' || regex1.test(e.target.value)) {
      setSecondInput(e.target.value);
    }
  };

  const plusClick = () => {
    const plusData = parseInt(firstInput) + parseInt(secondInput);
    // console.log('plusData=>', plusData);
    //parseInt use to convert string to number in js
    setResult(plusData);
    setTimeout(() => {
      setFirstInput('');
      setSecondInput('');
      setResult('');
    }, 3000);
  };

  const minusClick = () => {
    const minusData = parseInt(firstInput) - parseInt(secondInput);
    console.log('minusData=>', minusData);
    setResult(minusData);
    setTimeout(() => {
      setFirstInput('');
      setSecondInput('');
      setResult('');
    }, 3000);
  };

  const multipleClick = () => {
    const multipleData = parseInt(firstInput) * parseInt(secondInput);
    console.log('multipleData=>', multipleData);
    setResult(multipleData);
    setTimeout(() => {
      setFirstInput('');
      setSecondInput('');
      setResult('');
    }, 3000);
  };

  const divisionClick = () => {
    const divisionData = parseInt(firstInput) / parseInt(secondInput);
    console.log('divisionData=>', divisionData);
    setResult(divisionData);
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
          onChange={firstHandleChange}
        />
        <input
          className="m-4"
          type="text"
          name="second_input"
          id="second_input"
          value={secondInput}
          onChange={secondHandleChange}
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

          <button
            className="m-4 btn btn-primary"
            style={{ width: 56 }}
            onClick={() => minusClick()}
          >
            <span style={{ fontSize: 25 }}> -</span>
          </button>

          <button className="m-4 btn btn-warning" style={{ width: 56 }}>
            <span style={{ fontSize: 25 }} onClick={() => multipleClick()}>
              x
            </span>
          </button>

          <button className="m-4 btn btn-info" style={{ width: 56 }}>
            <span style={{ fontSize: 25 }} onClick={() => divisionClick()}>
              {' '}
              ÷
            </span>
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
