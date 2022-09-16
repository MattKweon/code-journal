/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntry = localStorage.getItem('journal-local-storage');

if (previousEntry !== null) {
  data = JSON.parse(previousEntry);
}

function convertToString(event) {
  var entryList = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', entryList);
}

window.addEventListener('beforeunload', convertToString);
