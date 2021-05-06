// Create function to build plots
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

        // Create trace object for bar plot
        var trace1 = {
            x: sampleValues,
            y: idOTU,
            text: labels,
            type:"bar",
            orientation: "h",
            marker: {
                color: 'rgb(51, 122, 183)'}
        };

        // Create a data array
        var data1 = [trace1];
    
        // Use `layout` to define a title
        var layout1 = {
            title: "Top 10 Bacteria Cultures Found",
        };
    
        // Render the plot to the `bar` div
        Plotly.newPlot("bar", data1, layout1);

        // Create trace object for bubble plot
        var trace2 = {
            x: sampleData.samples[0].otu_ids,
            y: sampleData.samples[0].sample_values,
            mode: "markers",
            text:  sampleData.samples[0].otu_labels,
            marker: {
                size: sampleData.samples[0].sample_values,
                color: sampleData.samples[0].otu_ids
            }
        };
            
        // Create a data array 
        var data2 = [trace2];

        // Use `layout` to define a title and x axis label
        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xaxis:{title: "OTU ID"}
        };
    
        // Render the plot to the `bubble` div
        Plotly.newPlot("bubble", data2, layout2); 

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
