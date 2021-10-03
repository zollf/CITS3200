/* eslint-disable @typescript-eslint/no-unused-vars */
async function deleteEntry(route, redirect) {
  const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
  await fetch(route, {
    headers: {
      'X-CSRFToken': csrf,
    },
    mode: 'same-origin',
    method: 'DELETE',
  });

  window.location.assign(redirect);
}

function confirmDeletion(route, redirect) {
  const modal = document.getElementById('modal');
  const yesButton = document.getElementById('modal-yes');
  const noButton = document.getElementById('modal-no');

  modal.style.display = 'block';
  yesButton.onclick = () => deleteEntry(route, redirect);
  noButton.onclick = () => (modal.style.display = 'none');
}
