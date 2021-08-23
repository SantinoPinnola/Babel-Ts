import moment from 'moment';

export const formatMessages = (data) => {
  const { email, msg } = data;
  return {
    email,
    msg,
    time: moment().format('MM/DD/YYYY h:mm a'),
  };
};
