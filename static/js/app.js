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
        demoInfo(data.names[0]);
        gaugeChart(data.names[0]);
    });
}

// Create function to build plots
function buildPlots(id) {
        
    // Read samples.json
    d3.json("samples.json").then (sampleData =>{

        // Create trace object for bar plot
        var trace1 = {
            x: sampleData.samples[0].sample_values.slice(0, 10).reverse(),
            y: (sampleData.samples[0].otu_ids.slice(0, 10)).reverse().map(d => "OTU " + d),
            text: sampleData.samples[0].otu_labels.slice(0, 10),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(51, 122, 183)'
            }
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
            text:  sampleData.samples[0].otu_labels,
            mode: "markers",
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

// Create the function to get demographic data
function demoInfo(id) {
        
    // Read samples.json
    d3.json("samples.json").then((data)=> {

        // Retrieve meta data info by chosen id
        var metaData = data.metadata.filter(meta => meta.id.toString() === id)[0];
    
        // Select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // Empty the demographic info panel
        demographicInfo.html("");

        // Append demographic info to the panel
        Object.entries(metaData).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    

        });

    });
}

// Create function for changing id
function optionChanged(id) {
    buildPlots(id);
    demoInfo(id);
    gaugeChart(id);
}


init();