import { MONTHS_IN_YEAR } from './constants';

export const getAnnualPeriodOptions = (from, to) => {
  const options = [];

  for (let i = from; i <= to; i++) {
    options.push({ name: i, value: i * MONTHS_IN_YEAR });
  }

  return options;
};

export const calculateMonthlyPayment = (loanAmount, downPayment, interestRate, periodInMonths) => {
  const interest = interestRate / 100;
  const amount = loanAmount * (1 - downPayment / 100);

  return (amount * interest) / (1 - Math.pow(1 / (1 + interest), periodInMonths));
};
