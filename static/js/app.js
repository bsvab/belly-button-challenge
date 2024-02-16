// ------------------------------------------------------------------------------------------------------------------------------------
// Use the D3 library to read in samples.json from the URL
// https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
// ------------------------------------------------------------------------------------------------------------------------------------

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
//\\//\\ NEED A BETTER UNDERSTANDING OF WHAT ^ABOVE LINE^ DOES AND WHY TURNING AROUND AND DOING .JSON IN THE VERY NEXT LINE WITH THE .THEN DOESN'T NEGATE WHATEVER THIS IS DOING

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// initialize the dashboard at start up 
function init() {
  
  // fetch the JSON data, console log it, use data to feed all functions needed upon initialization
  d3.json(url).then(function(data) {
    console.log(data);

    // populate the dropdown menu
    populateDropdownMenu(data.names)
    
    // Set the first sample from the list as the initial selection from the dropdown list
    let first_sample = data.names[0];
    console.log(first_sample);
    
    // define sample data and metadata so they can be passed into plot generating formulas
    let sample_data = data.samples;
    console.log(sample_data);
    let metadata = data.metadata;
    console.log(metadata)

    // generate all initial plots
    generateBarChart(first_sample, sample_data);
    // generateMetadata(first_sample, metadata);
    generateBubbleChart(first_sample, sample_data);
    // generateGaugeChart(first_sample, sample_data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

};

// call the initialize function
init();

// create event listener to render any updates based on drodown menu selection
function updateAllVisuals(sample_data) {
  
  // select the dropdown menu
  let dropdown_list = d3.select("#selDataset");

  // set event listener for dropdown menu change == if change occurs, update all charts
  dropdown_list.on("change", function() {
      let selection = this.value;
      generateBarChart(selection, sample_data);
      // generateMetadata(selection, sample_data);
      generateBubbleChart(selection, sample_data);
      // generateGaugeChart(selection, sample_data);
  });
};

// call the update function
updateAllVisuals();

// get sample names and populate the dropdown list
function populateDropdownMenu(names) {
  
  // select the dropdown menu
  let dropdown_list = d3.select("#selDataset");

  names.forEach(id => {
    dropdown_list.append("option")
          .text(id)
          .property("value", id);
  });
  
};

// ------------------------------------------------------------------------------------------------------------------------------------
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// ------------------------------------------------------------------------------------------------------------------------------------

function generateBarChart(selection, sample_data){
  
  // filter data per dropdown selection
  let selection_data = sample_data.filter(result => result.id == selection);

  // get first index from array
  let id_data = selection_data[0];

  // values, labels, and hovertext for the bar chart
  let sample_values = id_data.sample_values;
  let otu_ids = id_data.otu_ids;
  let otu_labels = id_data.otu_labels;
  console.log(sample_values, otu_ids, otu_labels);

  // identify top ten items to display in descending order
  let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
  let xticks = sample_values.slice(0,10).reverse();
  let labels = otu_labels.slice(0,10).reverse();

  // define trace for the bar chart
  let trace = {
      x: xticks,
      y: yticks,
      text: labels,
      type: "bar",
      orientation: "h"
  };

  // define the layout
  let layout = {
      title: "Top 10 OTUs Present"
  };

  // use Plotly to plot the bar chart
  Plotly.newPlot("bar", [trace], layout)

};

// ++++++++++++++++++++++++++++++++
// changing gears......
// ++++++++++++++++++++++++++++++++

// function generateBoxPlot() {
//     data = [{
//         x: [sample_values],
//         y: [otu_ids],
//         type: "horizontal bar"
//     }];
  
//     Plotly.newPlot("box", data);
//   }
  
//   // Call updatePlotly() when a change takes place to the dropdown menu
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     let dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     let dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     let x = [];
//     let y = [];
  
//     if (dataset === 'dataset1') { // change for correct variables/etc
//       x = [1, 2, 3, 4, 5]; // change for correct data
//       y = [1, 2, 4, 8, 16]; // change for correct data
//     }
  
//     else if (dataset === 'dataset2') { // change for correct variables/etc
//       x = [10, 20, 30, 40, 50]; // change for correct data
//       y = [1, 10, 100, 1000, 10000]; // change for correct data
//     }
  
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }
  
//   generateBoxPlot();


// ------------------------------------------------------------------------------------------------------------------------------------
// Create a bubble chart that displays each sample.
// ------------------------------------------------------------------------------------------------------------------------------------

function generateBubbleChart(selection, sample_data){
  
  // filter data per dropdown selection
  let selection_data = sample_data.filter(result => result.id == selection);

  // get first index from array
  let id_data = selection_data[0];

  // values, labels, and hovertext for the bar chart
  let sample_values = id_data.sample_values;
  let otu_ids = id_data.otu_ids;
  let otu_labels = id_data.otu_labels;
  console.log(sample_values, otu_ids, otu_labels);

  // define trace for the bubble chart
  let trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
  };

  // define the layout
  let layout = {
    title: "Bacteria Per Sample",
    hovermode: "closest",
    xaxis: {title: "OTU ID"},
  };

  // use Plotly to plot the bar chart
  Plotly.newPlot("bubble", [trace], layout)

};

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


