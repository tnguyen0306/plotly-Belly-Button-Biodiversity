function buildPlots(id) {
        
    // Read samples.json
    d3.json("samples.json").then (sampleData =>{

        // Retrieve top 10 sample values
        var sampleValues =  sampleData.samples[0].sample_values.slice(0,10).reverse();
        
        // Retrieve only top 10 otu ids for the plot OTU and reversing it. 
        var topOTU = (sampleData.samples[0].otu_ids.slice(0, 10)).reverse();

        // Retrieve otu id's to the desired form for the plot
        var idOTU = topOTU.map(d => "OTU " + d);

        // Retrieve top 10 labels for the plot
        var labels = sampleData.samples[0].otu_labels.slice(0,10);
    });
}
  

// Create function for changing id
function optionChanged(id) {
    buildPlots(id);
    demoInfo(id);
}
    
// Create function for initial data rendering
function init() {
    
    // Select dropdown menu 
    var dropdown = d3.select("#selDataset");
    
    // Read data 
    d3.json("samples.json").then((data)=> {
    
        // Retrieve id data to the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
    
        // Call functions to display
        buildPlots(data.names[0]);

    });
}

init();
