export default function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        callback(response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        callback(error);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
