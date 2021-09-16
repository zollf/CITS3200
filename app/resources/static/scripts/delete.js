// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function deleteEntry(route) {
  const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const redirect = document.querySelector('[name=redirect]').value;
  await fetch(route, {
    headers: {
      'X-CSRFToken': csrf,
    },
    mode: 'same-origin',
    method: 'DELETE',
  });

  window.location.assign(redirect);
}
