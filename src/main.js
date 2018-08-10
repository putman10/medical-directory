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
        console.log(body);

        body.data.forEach(function(doctor){
          $("#results").append(doctor.profile.first_name);
        })
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });


  });
});
