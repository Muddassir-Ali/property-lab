export function logout() {
  sessionStorage.removeItem("propertyLabToken");
  sessionStorage.removeItem("propertyLabUser");

  window.location.href = "/login";
}