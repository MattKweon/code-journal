var $imageUrl = document.querySelector('#image-url');
var $imagePlaceholder = document.querySelector('.image-placeholder');

function addPhoto(event) {
  $imagePlaceholder.setAttribute('src', event.target.value);
}
$imageUrl.addEventListener('input', addPhoto);

var $form = document.querySelector('form');

function submitEntry(event) {
  event.preventdefault();

}
$form.addEventListener('submit', submitEntry);
