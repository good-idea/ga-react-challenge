import React from 'react';
import propTypes from 'prop-types';

const { useState } = React;

/**
 * This component uses React Hooks.
 * Hooks allow us to manage state and side effects without using Class components.
 * We'll go over this later in class!
 */
const NewTransaction = props => {
  const { makeTransaction, type } = props;
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  /**
   * Event Handlers
   */

  const openForm = () => {
    setOpen(true);
  };

  const handleAmountChange = e => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const reset = () => {
    setOpen(false);
    setAmount('');
    setDescription('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { success } = await makeTransaction({
      description,
      amount: parseFloat(amount),
    });
    if (success) {
      alert('Success!');
      setOpen(false);
    } else {
      setError(true);
    }
  };

  /**
   * Render
   */

  if (isOpen === false) {
    return <button onClick={openForm}>New {type}</button>;
  }

  if (hasError) {
    return (
      <p className="errorMessage">
        Sorry, there was an error with this transaction. Maybe you should switch
        to a more reliable bank!
      </p>
    );
  }

  const formClassName = isLoading ? 'form--disabled' : '';
  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <label>
        <h5>Description</h5>
        <input
          type="text"
          name="description"
          id="description"
          required
          maxLength="50"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <label>
        <h5>Amount</h5>
        <input
          type="number"
          name="amount"
          id="amount"
          required
          min="0.01"
          step="0.01"
          value={amount}
          onChange={handleAmountChange}
        />
      </label>
      <button type="submit" className="primary">
        Submit
      </button>
      <button type="button" onClick={reset} className="secondary">
        Cancel
      </button>
    </form>
  );
};

NewTransaction.propTypes = {
  type: propTypes.oneOf(['debit', 'credit']),
  makeTransaction: propTypes.func.isRequired,
};
export default NewTransaction;
