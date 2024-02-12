export function deleteLocalStorageItem(key) {
  localStorage.removeItem(key);
}

export function deleteCookie(name) {
  console.log(document);
  console.log("in cookie del");
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
