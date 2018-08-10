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
        $("#doctor" + counter).append("<p class='address'>" + doctor.practices["0"].visit_address.street + "<br>" + doctor.practices["0"].visit_address.city + ", " + doctor.practices["0"].visit_address.state + " " + doctor.practices["0"].visit_address.zip + "</p>");
        $("#doctor" + counter).append("<p class='phone'>" + doctor.practices["0"].phones["0"].number + "</p>");
        if(doctor.practices["0"].accepts_new_patients == true) {
          $("#doctor" + counter).append("<p class='new-patients'>Accepting New Patients: Yes</p>");
        } else {
          $("#doctor" + counter).append("<p class='new-patients'>Accepting New Patients: Not at this time</p>");
        }
        $("#doctor" + counter).append("<p class='description'>" + doctor.specialties["0"].description + "</p>");
        $("#doctor" + counter).append("<p class='gender'>" + doctor.profile.gender + "</p>");
        $("#doctor" + counter).append("<p class='type'>" + doctor.specialties["0"].actor + "</p>");
        $("#doctor" + counter).append("<p class='category'>" + doctor.specialties["0"].category + "</p>");
        $("#doctor" + counter).append("<div class='languages' id='language" + counter + "'><p class='bold'>Languages:</p></div>");
        for (let i = 0; i < doctor.profile.languages.length; i++) {
          $("#language" + counter).append("<p>" + doctor.profile.languages[i].name + "</p>");
        }
        $("#doctor" + counter).append("<div class='licenses' id='licenses" + counter + "'><p class='bold'>Licenses:</p></div>");
        for (let x = 0; x < doctor.licenses.length; x++) {
          $("#licenses" + counter).append("<p>" + doctor.licenses[x].number + ' ' + doctor.licenses[x].state + "</p>");
        }

        counter ++;
      });

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });


  });
});
