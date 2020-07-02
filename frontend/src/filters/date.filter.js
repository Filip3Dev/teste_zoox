import Moment from 'moment';

function dateformat(value, format = 'DD/MM/YYYY') {
  if (!value) return null;
  const data = Moment(value);
  return Moment(data).format(format);
}

export default dateformat;
