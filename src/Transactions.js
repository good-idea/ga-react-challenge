import React from 'react';
import propTypes from 'prop-types';
import Transaction, { transactionPropTypes } from './Transaction';
import NewTransaction from './NewTransaction';

const isValidTransaction = transaction => {
  return Boolean(
    transaction.id && transaction.description && transaction.amount
  );
};

const Transactions = props => {
  const { type, title, transactions, makeTransaction } = props;
  return (
    <div>
      <h3 className="container__header">{title}</h3>
      <div className="transactions">
        {/* Filter out any invalid transaction data */}
        {transactions.filter(isValidTransaction).map(credit => (
          <Transaction key={credit.id} type={type} {...credit} />
        ))}
      </div>
      {makeTransaction && (
        <NewTransaction makeTransaction={makeTransaction} type={type} />
      )}
    </div>
  );
};

Transactions.propTypes = {
  type: propTypes.oneOf(['debit', 'credit']).isRequired,
  transactions: propTypes.arrayOf(propTypes.shape(transactionPropTypes)),
  makeTransaction: propTypes.func.isRequired,
};

export default Transactions;
