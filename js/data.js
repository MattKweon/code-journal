/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// var previousEntryData = localStorage.getItem('journal-local-storage');
// if (previousEntryData.entires !== null) {
//   data = JSON.parse(previousEntryData);
// }

function convertToString(event) {
  var entryList = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', entryList);
}
window.addEventListener('beforeunload', convertToString);
