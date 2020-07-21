import React, { PureComponent } from 'react';
import './LoanCalculator.css';

const currency = '$';

const periodOptions = [
  { name: 1, value: 12 },
  { name: 2, value: 24 },
  { name: 3, value: 36 },
];

export class LoanCalculator extends PureComponent {
  render() {
    return (
      <div className="loan-calculator">
        <h1>Loan Calculator</h1>
        <div className="loan-calculator__field">
          <label for="loanAmount">Loan Amount: </label>
          <input name="loanAmount" type="number" min={0} required />
          <span> {currency}</span>
        </div>
        <div className="loan-calculator__field">
          <label for="downPayment">Down Payment: </label>
          <input name="downPayment" type="number" min={0} max={100} required />
          <span> %</span>
        </div>
        <div className="loan-calculator__field">
          <label for="interest">Interest Rate: </label>
          <input name="interest" type="number" value="1.5" disabled />
          <span> %</span>
        </div>
        <div className="loan-calculator__field">
          <label for="period">Period: </label>
          <select name="period">
            {periodOptions.map(({ name, value }) => (
              <option value={value}>{name}</option>
            ))}
          </select>
          <span> years</span>
        </div>
        <div className="loan-calculator__field">
          <span>Monthly Payment: </span>
          <b>{`${100} ${currency}`}</b>
        </div>
      </div>
    );
  }
}
