import {BetterDoctorAPI} from './medical-service';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#new-symptom").click(function(event){
    event.preventDefault();
    $("#symptoms-group").append("<input type='text' name='symptoms' class='form-control'/>");
  });
  $("#symptoms-form").submit(function(event){
    event.preventDefault();
    $("#results").text("");
    let symptoms= $('input[name=symptoms]').map(function(){
      return this.value;
    }).get();

    let betterDoctor = new BetterDoctorAPI();
    let returnedDoctorsPromise = betterDoctor.getQualifiedDoctors(symptoms);

    returnedDoctorsPromise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      let counter = 0;
      body.data.forEach(function(doctor){
        $("#results").append("<div class='col-md-3 doctor-box'id=doctor" + counter + "></div>");
        $("#doctor" + counter).append("<img src='" + doctor.profile.image_url + "' alt='doctorimage' >");
        $("#doctor" + counter).append("<h3 class='name'>" + doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title + "</h3>");
        $("#doctor" + counter).append("<div id='language" + counter + "'></div>");
        for (let i = 0; i < doctor.profile.languages.length; i++) {
          $("#language" + counter).append("<p>" + doctor.profile.languages[i].name + "</p>");
        }
        $("#doctor" + counter).append("<p class='gender'>" + doctor.profile.gender + "</p>");
        $("#doctor" + counter).append("<p class='type'>" + doctor.specialties["0"].actor + "</p>");
        $("#doctor" + counter).append("<p class='category'>" + doctor.specialties["0"].category + "</p>");
        $("#doctor" + counter).append("<div id='licenses" + counter + "'></div>");
        for (let x = 0; x < doctor.licenses.length; x++) {
          $("#licenses" + counter).append("<p>" + doctor.licenses[x].number + ' ' + doctor.licenses[x].state + "</p>");
        }
        $("#doctor" + counter).append("<p class='description'>" + doctor.specialties["0"].description + "</p>");

        counter ++;
      });

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });


  });
});
