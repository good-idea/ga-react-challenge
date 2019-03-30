import React, { Component } from 'react';
import Profile from './Profile';
import Transactions from './Transactions';
import './App.css';

const endpoints = {
  profile: 'https://bank-of-react-api.herokuapp.com/me',
  debits: 'https://bank-of-react-api.herokuapp.com/debits',
  credits: 'https://bank-of-react-api.herokuapp.com/credits',
};

class App extends Component {
  state = {
    ready: false,
  };

  async componentDidMount() {
    /*
      Fetch profile, debits, and credits
      Promise.all() will call all promises at the same time,
      so we don't need to call them one by one.
    */
    const [profile, debits, credits] = await Promise.all([
      this.fetchProfile(),
      this.fetchDebits(),
      this.fetchCredits(),
    ]);

    this.setState({ profile, credits, debits, ready: true });
  }

  /**
   * These three methods are very similar. How could we make this more DRY?
   */
  fetchProfile = () => {
    return fetch(endpoints.profile).then(response => response.json());
  };

  fetchDebits = () => {
    return fetch(endpoints.debits).then(response => response.json());
  };

  fetchCredits = () => {
    return fetch(endpoints.credits).then(response => response.json());
  };

  /**
   * Notice how this function has two arrows - this means that
   * makeRequestFn is a function that returns another function.
   * In this case, we can call makeRequestFn('credits') to create a function
   * that will make a request to the credits endpoint when called. (same goes with 'debits')
   *
   * How could we apply a similar technique to the 3 fetch methods above?
   *
   * Most of our requests will be POST. `method = 'POST'` in the parameters gives us a default
   * value when nothing else is supplied.
   *
   * So, we can call makeRequest(data) from our Transaction components, or
   * makeRequest(data, "PATCH") from the Profile
   */

  makeRequestFn = category => async (data, method = 'POST') => {
    const endpoint = endpoints[category];
    console.log(endpoint, data);
    if (!endpoint) throw new Error(`There is no endpoint for "${category}"`);
    const result = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    }).then(response => {
      if (response.ok) return response.json();
      console.warn('There was an error with this request:');
      console.warn(response);
      return { error: true };
    });
    /* Return errors to be handled by whatever called this method */
    if (result.error) return { success: false };

    this.setState({
      [category]: result,
    });

    return { success: true };
  };

  render() {
    const { profile, debits, credits, ready } = this.state;
    if (!ready) return <h4>Loading...</h4>;
    return (
      <div className="app-wrapper">
        <h1>Bank of React</h1>
        <Profile profile={profile} />
        <Transactions
          type="credit"
          title="Your Credits"
          transactions={credits}
          /* Note how we are calling makeTransactionFn with an argument */
          makeTransaction={this.makeRequestFn('credits')}
        />
        <Transactions
          type="debit"
          title="Your Debits"
          transactions={debits}
          makeTransaction={this.makeRequestFn('debits')}
        />
      </div>
    );
  }
}

export default App;
