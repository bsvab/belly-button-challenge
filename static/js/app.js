// ------------------------------------------------------------------------------------------------------------------------------------
// Use the D3 library to read in samples.json from the URL
// https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
// ------------------------------------------------------------------------------------------------------------------------------------

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//\\//\\ psueudocode comments from Patricia...
//\\//\\ initializing function first
//\\//\\ grab dropdown in init and assign to variable
//\\//\\ use dropdown value and assign to variable the first time you pull it
//\\//\\ use promise to grab samples names

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
//\\//\\ NEED A BETTER UNDERSTANDING OF WHAT ^ABOVE LINE^ DOES AND WHY TURNING AROUND AND DOING .JSON IN THE VERY NEXT LINE WITH THE .THEN DOESN'T NEGATE WHATEVER THIS IS DOING

// Fetch the JSON data, console log it, define variables from it
d3.json(url).then(function(data) {
    console.log(data);
    
    // values for the bar chart
    let sample_values = data.map(function() {
        //...
    });

    // labels for the bar chart
    let otu_ids = Object.values(data.names);

    // hovertext for the chart
    let otu_labels = //...

});

// ------------------------------------------------------------------------------------------------------------------------------------
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// ------------------------------------------------------------------------------------------------------------------------------------

let trace1 = {
    x: sample_values,
    y: otu_labels,
    type: 'horizontal bar'
};

let layout1 = {
    //...
};

let bar_chart_data = [trace1]

// render plot to div tag 'bar'
Plotly.newPlot("bar", bar_chart_data, layout1)

// ++++++++++++++++++++++++++++++++
// changing gears......
// ++++++++++++++++++++++++++++++++

function generateBoxPlot() {
    data = [{
        x: [sample_values],
        y: [otu_ids],
        type: "horizontal bar"
    }];
  
    Plotly.newPlot("box", data);
  }
  
  // Call updatePlotly() when a change takes place to the dropdown menu
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    let x = [];
    let y = [];
  
    if (dataset === 'dataset1') { // change for correct variables/etc
      x = [1, 2, 3, 4, 5]; // change for correct data
      y = [1, 2, 4, 8, 16]; // change for correct data
    }
  
    else if (dataset === 'dataset2') { // change for correct variables/etc
      x = [10, 20, 30, 40, 50]; // change for correct data
      y = [1, 10, 100, 1000, 10000]; // change for correct data
    }
  
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  generateBoxPlot();


// ------------------------------------------------------------------------------------------------------------------------------------
// Create a bubble chart that displays each sample.
// ------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------
// Display the sample metadata, i.e., an individual's demographic information.
// ------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------
// Display each key-value pair from the metadata JSON object somewhere on the page.
// ------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------
// Update all the plots when a new sample is selected.
// ------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------
// Deploy your app to a free static page hosting service, such as GitHub Pages.
// ------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------
// ADVANCED CHALLENGE ASSIGNMENT (OPTIONAL)
// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.
// ------------------------------------------------------------------------------------------------------------------------------------


