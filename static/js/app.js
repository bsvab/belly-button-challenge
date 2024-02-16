// ------------------------------------------------------------------------------------------------------------------------------------
// Use the D3 library to read in samples.json from the URL
// https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
// ------------------------------------------------------------------------------------------------------------------------------------

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
    generateMetadata(first_sample, metadata);
    generateBubbleChart(first_sample, sample_data);
    generateGaugeChart(first_sample, metadata);

    // set event listener for dropdown menu change = if change occurs, update charts
    let dropdown_list = d3.select("#selDataset");  
    dropdown_list.on("change", function() {
      let selection = this.value;
      generateBarChart(selection, sample_data);
      generateMetadata(selection, metadata);
      generateBubbleChart(selection, sample_data);
      generateGaugeChart(selection, metadata);
    });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

};

// call the initialize function
init();

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
// Display each key-value pair from the metadata JSON object somewhere on the page.
// ------------------------------------------------------------------------------------------------------------------------------------

function generateMetadata(selection, metadata) {

  // filter data per dropdown selection
  let selection_data = metadata.filter(result => result.id == selection);
  console.log(selection_data)

  // get the first index from the array
  let values = selection_data[0];

  // clear out metadata if previously populated
  d3.select("#sample-metadata").html("");

  // add each key/value pair in the metadata to the panel
  Object.entries(values).forEach(([key,value]) => {
      console.log(key,value);
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });

};

// ------------------------------------------------------------------------------------------------------------------------------------
// Update all the plots when a new sample is selected.
// ------------------------------------------------------------------------------------------------------------------------------------

// event listener is added within the init function that updates the visuals based on the dropdown menu changing

// ------------------------------------------------------------------------------------------------------------------------------------
// Deploy your app to a free static page hosting service, such as GitHub Pages.
// ------------------------------------------------------------------------------------------------------------------------------------

// deployed using GitHub Pages at ---> https://bsvab.github.io/belly-button-challenge/

// ------------------------------------------------------------------------------------------------------------------------------------
// ADVANCED CHALLENGE ASSIGNMENT (OPTIONAL)
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.
// ------------------------------------------------------------------------------------------------------------------------------------

function generateGaugeChart(selection, metadata) {

  // filter data per dropdown selection
  let selection_data = metadata.filter(result => result.id == selection);
  console.log(selection_data);

  let trace = [{
    domain: {x: [0, 1], y: [0, 1]},
    value: selection_data[0].wfreq,
    title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: {range: [null, 9], tickwidth: 1, tickcolor: "darkblue"},
      bar: {color: "red"},
      bgcolor: "white",
      steps: [
        {range: [0, 1], color: 'rgba(248, 243, 236, 1)'},
        {range: [1, 2], color: 'rgba(244, 241, 229, 1)'},
        {range: [2, 3], color: 'rgba(233, 230, 202, 1)'},
        {range: [3, 4], color: 'rgba(229, 231, 179, 1)'},
        {range: [4, 5], color: 'rgba(213, 228, 157, 1)'},
        {range: [5, 6], color: 'rgba(183, 204, 146, 1)'},
        {range: [6, 7], color: 'rgba(140, 191, 136, 1)'},
        {range: [7, 8], color: 'rgba(138, 187, 143, 1)'},
        {range: [8, 9], color: 'rgba(133, 180, 138, 1)'}
      ]
    }
  }];
  
  let layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 } 
  };

  Plotly.newPlot("gauge", trace, layout);

};

