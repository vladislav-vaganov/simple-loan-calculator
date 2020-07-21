import React, { PureComponent } from 'react';
import './LoanCalculator.css';
import { CURRENCY, INTEREST_RATE } from './constants';
import { getAnnualPeriodOptions, calculateMonthlyPayment } from './utils';

const annualPeriodOptions = getAnnualPeriodOptions(1, 6);

export class LoanCalculator extends PureComponent {
  constructor(props) {
    super(props);

    const [firstPeriodOption] = annualPeriodOptions;
    const { value: periodInMonths } = firstPeriodOption;

    this.state = {
      loanAmountInput: '0',
      loanAmount: 0,
      downPaymentInput: '0',
      downPayment: 0,
      interestRate: INTEREST_RATE,
      periodInMonths,
    };

    this.onLoanAmountChange = this.getOnInputChange('loanAmount');
    this.onDownPaymentChange = this.getOnInputChange('downPayment');
  }

  getOnInputChange = (propertyName) => (e) => {
    const { value, valueAsNumber, validity } = e.target;

    this.setState({
      [propertyName]: validity.valid ? valueAsNumber : NaN,
      [`${propertyName}Input`]: value,
    });
  };

  onPeriodChange = (e) => {
    const { value } = e.target;
    this.setState({ periodInMonths: value });
  };

  render() {
    const {
      loanAmount,
      loanAmountInput,
      downPayment,
      downPaymentInput,
      interestRate,
      periodInMonths,
    } = this.state;
    const monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      downPayment,
      interestRate,
      periodInMonths
    );

    return (
      <div className="loan-calculator">
        <h1>Loan Calculator</h1>

        <div className="loan-calculator__field">
          <label htmlFor="loanAmount">Loan Amount: </label>
          <input
            name="loanAmount"
            type="number"
            min={0}
            step="any"
            value={loanAmountInput}
            onChange={this.onLoanAmountChange}
            required
          />
          <span> {CURRENCY}</span>
        </div>

        <div className="loan-calculator__field">
          <label htmlFor="downPayment">Down Payment: </label>
          <input
            name="downPayment"
            type="number"
            min={0}
            max={100}
            step="any"
            value={downPaymentInput}
            onChange={this.onDownPaymentChange}
            required
          />
          <span> %</span>
        </div>

        <div className="loan-calculator__field">
          <label htmlFor="interest">Interest Rate: </label>
          <input name="interest" type="number" value={interestRate} readOnly disabled />
          <span> %</span>
        </div>

        <div className="loan-calculator__field">
          <label htmlFor="period">Period: </label>
          <select name="period" value={periodInMonths} onChange={this.onPeriodChange}>
            {annualPeriodOptions.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
          <span> years</span>
        </div>

        <div className="loan-calculator__result">
          <span>Monthly Payment: </span>
          <b>{`${isNaN(monthlyPayment) ? '---' : Math.round(monthlyPayment)} ${CURRENCY}`}</b>
        </div>
      </div>
    );
  }
}
