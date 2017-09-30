/*
    nyt-project app.js


*/

'use strict';

// ID's as strings should follow the format: "#ID_NAME"
// TODO: Enter the ID for the Search Input Box
const searchBoxId = 'ENTER ID';

// TODO: Enter the ID for "Number of Records" box
const maxRecordBoxId = 'ENTER ID';

// TODO: Enter the ID for the StartYear box
const startYearBoxId = 'ENTER ID';

// TODO: Enter the ID for the EndYear Box
const endYearBoxId = 'ENTER ID';


// According to the NYT API, responses are sent by pages of 10.  So these are the values that will display in the "number of results"
// box
var possibleResults = "10,20,30,40";

// Our app object
var nytApp = {
    // Our baseUrl w/ API KEY
    baseUrl: "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=215420b200cb4a43992d1a36d79072b6",
    // makeApiCall function that physically calls the API.  
    // Because we can only retrieve pages of 10 at a time, we build an array of AJAX calls and send them via $.when
    makeApiCall: function (term, pages, startYear, endYear) {
        // requests will store all the ajax calls we need to make
        var requests = [];
        // Loop through how many pages we need to grab
        for (var i = 0; i < pages; i++) {
            // Builds our URL
            var url = `${nytApp.baseUrl}&q=${term}&page=${ i }`;
            // Adds a new call to the requests to the array
            requests.push(
                $.ajax({
                    url: url,
                    method: "GET",
                }));
        }
        $.when(requests).done(function () {
            /*
            USES THE arguments KEYWORD FOR THE JSON RESPONSE
            */
        });
    },
    prepareApiCall: function() {
        // Gets the number of pages we need to grab.
        var pages = parseInt($(maxRecordBoxId).val()) / 10;
        // Grabs the value from the search box
        var searchTerm = $(searchBoxId).val();
        // Send data to our makeApiCall function
        this.makeApiCall(searchTerm, pages);    
    },
};



$("#submit-form").on("click", function (e) {
    e.preventDefault();
    nytApp.prepareApiCall();
});

$(document).ready(function () {
    // Takes our possibleResults string and turns it into an array.
    var results = possibleResults.split(',');
    // Loops through the array adding the values to our <select></select> element on the DOM.
    results.forEach(function (currentValue) {
        $(maxRecordBoxId).append(`<option value=${currentValue}>${currentValue}</option>`);
    });
});