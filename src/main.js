import {BetterDoctorAPI} from './medical-service';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#new-symptom").click(function(){
    $("#symptoms-group").append("<input type='text' name='symptoms' class='form-control' id='symptoms'/>");
  });
  $("#symptoms-form").submit(function(event){
    event.preventDefault();

    let symptoms= $('input[id=symptoms]').map(function(){
      return this.value;
    }).get();

    let betterDoctor = new BetterDoctorAPI();  // create instance of BetterDoctor class
    let returnedDoctorsPromise = betterDoctor.getQualifiedDoctors(symptoms);  // call the instance method and pass in user input

    returnedDoctorsPromise.then(function(response) {
      let body = JSON.parse(response);
        console.log(body);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
