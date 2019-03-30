import React from 'react';
import { getMonthName } from './utils/date';

const Profile = ({ profile }) => {
  const { name, email, city, memberSince } = profile;
  const sinceDate = new Date(memberSince);
  const sinceYear = sinceDate.getFullYear();
  const sinceMonth = getMonthName(sinceDate);

  /**
   * TODO: Using the NewTransaction component as a guide,
   * allow users to update their email address
   */

  return (
    <header className="container profile">
      <h3>
        <span role="img" aria-label="waving hand">
          👋
        </span>
        Hi, {name}!
      </h3>
      <ul className="profile__details">
        <li>{email}</li>
        <li>
          Member since {sinceMonth} {sinceYear}
        </li>
        <li>{city}</li>
      </ul>
    </header>
  );
};

export default Profile;
