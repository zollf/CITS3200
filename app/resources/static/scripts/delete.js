// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
