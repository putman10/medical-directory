import {BetterDoctorAPI} from './medical-service';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $("#symptoms-form").submit(function(event){
    event.preventDefault();
    let symptoms = $("#symptoms").val();

});

});
