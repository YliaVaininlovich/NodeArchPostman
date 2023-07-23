const requestForm = document.querySelector('#request-form form');
const requestUrl = document.querySelector('#request-form #url');
const requestMethod = document.querySelector('#request-form #method');
const requestParams = document.querySelector('#request-form #params');
const requestHeaders = document.querySelector('#request-form #headers');
const requestBody = document.querySelector('#request-form #body');

const responseStatus = document.querySelector('#response #status');
const responseHeaders = document.querySelector('#response #headers');
const responseBody = document.querySelector('#response #body');

const requestLinks = document.querySelectorAll('#requests a');
requestLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    requestUrl.value = link.dataset.url;
  });
});

requestForm.addEventListener('submit', event => {
  event.preventDefault();

  const url = requestUrl.value;
  const method = requestMethod.value;
  const params = requestParams.value;
  const headers = requestHeaders.value;
  const body = requestBody.value;

  const options = {
    method,
    headers: JSON.parse(headers),
    body,
    params: new URLSearchParams(params),
  };

  fetch(`/api/request?url=${url}`, options)
    .then(response => {
      responseStatus.textContent = response.status;
      responseHeaders.textContent = JSON.stringify(response.headers, null, 2);

      if (response.headers.get('content-type').startsWith('text/') || response.headers.get('content-type').startsWith('application/json')) {
        return response.text();
      } else if (response.headers.get('content-type').startsWith('image/')) {
        responseBody.innerHTML = `<img src="${url}" alt="Image response">`;
      } else {
        responseBody.textContent = 'Unsupported content type';
      }
    })
    .then(body => {
      if (body) {
        responseBody.textContent = body;
      }
    })
    .catch(error => {
      responseStatus.textContent = 'Error';
      responseBody.textContent = error.message;
    });
});