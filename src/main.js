import {GeocoderAPI} from './geocoder';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $(".bike-zip").submit(function(event){
    event.preventDefault();
    let zip = $("#zip").val();
    $('#results').text("");

});

});
