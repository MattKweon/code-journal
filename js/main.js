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

  $ul.prepend(createNewEntry(entryData));
  $viewEntries.className = 'view';
  $viewEntryForm.className = 'view hidden';
}

$form.addEventListener('submit', submitEntry);

function createNewEntry(entry) {
  var newEl = document.createElement('li');
  newEl.setAttribute('class', 'row');
  newEl.setAttribute('data-entry-id', entry.id);
  var newChildEl = document.createElement('div');
  newChildEl.setAttribute('class', 'column-half');
  newEl.appendChild(newChildEl);
  var imgEl = document.createElement('img');
  imgEl.setAttribute('src', entry.imageUrl);
  newChildEl.appendChild(imgEl);
  var anotherChildEl = document.createElement('div');
  anotherChildEl.setAttribute('class', 'column-half');
  newEl.appendChild(anotherChildEl);
  var spaceBetweenClass = document.createElement('div');
  spaceBetweenClass.setAttribute('class', 'space-between');
  anotherChildEl.appendChild(spaceBetweenClass);
  var titleEl = document.createElement('h2');
  titleEl.textContent = entry.title;
  spaceBetweenClass.appendChild(titleEl);
  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fa-regular fa-pen-to-square edit-icon');
  spaceBetweenClass.appendChild(editIcon);
  var notesEl = document.createElement('p');
  notesEl.textContent = entry.notes;
  anotherChildEl.appendChild(notesEl);
  return newEl;
}

var $ul = document.querySelector('ul');

function loadDom(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(createNewEntry(data.entries[i]));
  }
  if (data.view === 'entries') {
    $viewEntries.className = 'view';
    $viewEntryForm.className = 'view hidden';
  }
}
document.addEventListener('DOMContentLoaded', loadDom);

var $a = document.querySelector('a');
var $viewEntries = document.querySelector('[data-view=entries]');
var $viewEntryForm = document.querySelector('[data-view=entry-form]');

function clickDisplayView(event) {
  if (event.target === $a) {
    $viewEntries.className = 'view';
    $viewEntryForm.className = 'view hidden';
    data.view = 'entries';
  } else if (event.target.className === 'new-entry-button') {
    $viewEntries.className = 'view hidden';
    $viewEntryForm.className = 'view';
    data.view = 'entry-form';
  }
}
document.addEventListener('click', clickDisplayView);

function clickEditIcon(event) {
  if (event.target.className === 'edit-icon') {
    $viewEntryForm.className = 'view';
    $viewEntries.className = 'view hidden';
    data.view = 'entry-form';
  }
  var li = Number(event.target.closest('li').getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (li === data.entries[i].id) {
      data.editing = data.entries[i];
    }
  }
}
$ul.addEventListener('click', clickEditIcon);
