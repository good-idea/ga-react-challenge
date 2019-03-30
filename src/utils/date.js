const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Gets a valid date name from a month
 */

export const getMonthName = date => {
  const monthNumber = date.getMonth();
  const month = months[monthNumber];
  if (!month) throw new Error(`"${monthNumber}" is not a valid month!`);
  return month;
};

/**
 * Makes sure we are working with a valid Date object.
 * Some dates are just strings! This function will transform them into proper Date objects.
 */

function getValidDate(date) {
  const isDateObj =
    date &&
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date);

  /* If it is already a Date object, return as is */
  if (isDateObj) return date;
  /* Otherwise, turn it into a Date */
  return new Date(date);
}

/**
 * Transforms a date object into the format "6/15/2019, 12:00pm"
 */

export const readableFormat = input => {
  const date = getValidDate(input);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  return `${month}/${day}/${year}`;
};
