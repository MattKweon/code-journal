var $imageUrl = document.querySelector('#image-url');
var $imagePlaceholder = document.querySelector('.image-placeholder');

function addPhoto(event) {
  $imagePlaceholder.setAttribute('src', event.target.value);
}
$imageUrl.addEventListener('input', addPhoto);

var $form = document.querySelector('form');

function submitEntry(event) {
  event.preventDefault();
  var title = $form.elements.title.value;
  var imageUrl = $form.elements.url.value;
  var notes = $form.elements.notes.value;
  var entryData = {
    title,
    imageUrl,
    notes,
    id: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryData);
  $imagePlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', submitEntry);

function createNewEntry(entry) {
  var newEl = document.createElement('li');
  newEl.setAttribute('class', 'row');
  var newChildEl = document.createElement('div');
  newChildEl.setAttribute('class', 'column-half');
  newEl.appendChild(newChildEl);
  var imgEl = document.createElement('img');
  imgEl.setAttribute('src', entry.imageUrl);
  newChildEl.appendChild(imgEl);
  var anotherChildEl = document.createElement('div');
  anotherChildEl.setAttribute('class', 'column-half');
  newEl.appendChild(anotherChildEl);
  var titleEl = document.createElement('h2');
  titleEl.textContent = entry.title;
  anotherChildEl.appendChild(titleEl);
  var notesEl = document.createElement('p');
  notesEl.textContent = entry.notes;
  anotherChildEl.appendChild(notesEl);
  return newEl;
}

var $ul = document.querySelector('ul');

function loadDom(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.prepend(createNewEntry(data.entries[i]));
  }
}
document.addEventListener('DOMContentLoaded', loadDom);

var $a = document.querySelector('a');
var $viewEntries = document.querySelector('[data-view=entries]');
var $entryForm = document.querySelector('[data-view=entry-form]');

function entriesDisplayClick(event) {
  $viewEntries.className = 'view';
  $entryForm.className = 'view hidden';
}
$a.addEventListener('click', entriesDisplayClick);
