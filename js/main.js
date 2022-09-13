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
