var $imageUrl = document.querySelector('#image-url');
var $imagePlaceholder = document.querySelector('.image-placeholder');
var $pNoEntry = document.querySelector('p.no-entry');

if (data.entries.length !== 0) {
  $pNoEntry.className = 'no-entry hidden';
}

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
  if (data.editing === null) {
    var entryData = {
      title,
      imageUrl,
      notes,
      id: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entryData);
    $ul.prepend(createNewEntry(entryData));
  } else {
    var entryDataEdit = {
      title,
      imageUrl,
      notes,
      id: data.editing.id
    };
    var entriesNode = document.querySelectorAll('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.id === data.entries[i].id) {
        for (var key in data.entries[i]) {
          data.entries[i][key] = entryDataEdit[key];
        }
      }
      for (var j = 0; j < entriesNode.length; j++) {
        if (Number(entriesNode[j].getAttribute('data-entry-id')) === entryDataEdit.id) {
          entriesNode[j].replaceWith(createNewEntry(entryDataEdit));
        }
      }
    }
  }
  $form.reset();
  $imagePlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
  $pNoEntry.className = 'no-entry hidden';
  $viewEntries.className = 'view';
  $viewEntryForm.className = 'view hidden';
  data.editing = null;
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
var $newHeading = document.querySelector('.new-heading');
var $editHeading = document.querySelector('.edit-heading');
var $deleteButton = document.querySelector('.delete-button');
var $emptySpace = document.querySelector('.empty-space');
var $confirmButton = document.querySelector('.confirm-button');

function clickDisplayView(event) {
  if (event.target === $a) {
    $viewEntries.className = 'view';
    $viewEntryForm.className = 'view hidden';
    data.view = 'entries';
    data.editing = null;
  } else if (event.target.className === 'new-entry-button') {
    $viewEntries.className = 'view hidden';
    $viewEntryForm.className = 'view';
    data.view = 'entry-form';
    data.editing = null;
    $form.elements.title.value = null;
    $form.elements.url.value = null;
    $form.elements.notes.value = null;
    $newHeading.className = 'new-heading';
    $editHeading.className = 'edit-heading hidden';
    $deleteButton.className = 'delete-button hidden';
    $emptySpace.className = 'empty-space';
    $imagePlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');

  }
}
document.addEventListener('click', clickDisplayView);

function clickEditIcon(event) {
  if (event.target.matches('.edit-icon')) {
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
  $form.elements.title.value = data.editing.title;
  $form.elements.url.value = data.editing.imageUrl;
  $form.elements.notes.value = data.editing.notes;
  $imagePlaceholder.setAttribute('src', data.editing.imageUrl);
  $newHeading.className = 'new-heading hidden';
  $editHeading.className = 'edit-heading';
  $deleteButton.className = 'delete-button';
  $emptySpace.className = 'empty-space hidden';
}

$ul.addEventListener('click', clickEditIcon);

var $modal = document.querySelector('.modal');
var $cancelButton = document.querySelector('.cancel-button');

function deleteButtonClick(event) {
  $modal.className = 'modal';
}
$deleteButton.addEventListener('click', deleteButtonClick);

function cancelButtonClick(event) {
  $modal.className = 'modal hidden';
}
$cancelButton.addEventListener('click', cancelButtonClick);

function confirmDeleteButton(event) {
  event.preventDefault();
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].id === data.editing.id) {
      data.entries.splice(i, 1);
    }
  }
  var entriesNode = document.querySelectorAll('li');
  for (var j = 0; j < entriesNode.length; j++) {
    if (Number(entriesNode[j].getAttribute('data-entry-id')) === data.editing.id) {
      entriesNode[j].remove();
    }
  }
  $viewEntries.className = 'view';
  $viewEntryForm.className = 'view hidden';
  $modal.className = 'view hidden';
}
$confirmButton.addEventListener('click', confirmDeleteButton);
