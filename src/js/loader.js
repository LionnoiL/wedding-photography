export function showLoader(button) {
  button.classList.add('running');
}

export function hideLoader(button) {
  button.classList.remove('running');
}
