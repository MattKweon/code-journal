/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function convertToString(event) {
  var entryList = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', entryList);
}
window.addEventListener('beforeunload', convertToString);
