const myInput = document.querySelector('#datetime-picker');
const fp = flatpickr(myInput, {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
});
fp();
