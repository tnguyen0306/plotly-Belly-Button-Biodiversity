// Initializes the page with a default plot and data
function init() {
    // Grab values from the data json object
    d3.json("samples.json").then(function(data){
    var dataSet = data;
    displayMetaData(940,dataSet);
    
    // Use D3 to select the dropdown menu
    var optionMenu = d3.select("#selDataset");
    data.names.forEach(function(name){
      optionMenu.append("option").text(name);
    });
 })
}

// Function for displaying the chosen data from dropdown menu
function optionChanged(value) {
    var option = value;
    displayMetaData(option,dataSet);
}

// Display data in Demographic Info
function displayMetaData(option,dataSet) {
    var mtdata = dataSet.metadata.filter(row => row.id == option);
    d3.select("#sample-metadata").html(displayObject(mtdata[0]));
}

init();