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

// Create function to create gauge chart
function gaugeChart(id) {

    // Retrieve meta data info by chosen id
    var metaData = data.metadata.filter(meta => meta.id.toString() === id)[0];

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metaData[wfreq],
          title: { text: "Belly Button Washing Frequency"},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: "#f4f8f8" },
              { range: [1, 2], color: "#e9f2f2" },
              { range: [2, 3], color: "#d4e5e5" },
              { range: [3, 4], color: "#bed9d8" },
              { range: [4, 5], color: "#a8cccc" },
              { range: [5, 6], color: "#92bfc0" },
              { range: [6, 7], color: "#7bb3b3" },
              { range: [7, 8], color: "#64a5a6" },
              { range: [8, 9], color: "#4b9a9a" }
            ],
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      
      Plotly.newPlot('gauge', data, layout);

}


// Create function for changing id
function optionChanged(id) {
    gaugeChart(id);
}


init();