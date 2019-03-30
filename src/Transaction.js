import React from 'react';
import propTypes from 'prop-types';
import { readableFormat } from './utils/date';

const Transaction = ({ amount, date, description, id, type }) => {
  return (
    <div className={`container transaction transaction--${type}`}>
      <div className="transaction__info">
        <h4>{description}</h4>
        <h6>{readableFormat(date)}</h6>
      </div>
      <h4 className="transaction__amount">${amount}</h4>
    </div>
  );
};

export const transactionPropTypes = {
  id: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  amount: propTypes.number.isRequired,
  description: propTypes.string,
};

Transaction.propTypes = {
  ...transactionPropTypes,
  type: propTypes.oneOf(['debit', 'credit']).isRequired,
};

export default Transaction;
