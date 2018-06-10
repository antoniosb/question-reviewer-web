import moment from 'moment';
export default (value, format = 'DD/MM/YYYY [às] HH:mm') => {
  return moment(value).format(format)
}
