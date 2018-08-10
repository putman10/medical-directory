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

    let symptoms= $('input[name=symptoms]').map(function(){
      return this.value;
    }).get();

    let betterDoctor = new BetterDoctorAPI();
    let returnedDoctorsPromise = betterDoctor.getQualifiedDoctors(symptoms);

    returnedDoctorsPromise.then(function(response) {
      let body = JSON.parse(response);
      let counter = 0;
      body.data.forEach(function(doctor){
        $("#results").append("<div class='col-md-6 doctor-box'id=doctor" + counter + "></div>");
        $("#doctor" + counter).append(doctor.profile.first_name);
        $("#doctor" + counter).append(doctor.profile.last_name);
        counter ++;
      })

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });


  });
});
