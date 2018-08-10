export class BetterDoctorAPI{
  getQualifiedDoctors(symptoms, searchName) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptoms}&location=45.5122%2C%20-122.6587%2C100&name=${searchName}&user_location=45.5206%2C-122.6774&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
console.log(url);
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
