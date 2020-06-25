function buildBarChart(sample) {
  console.log(sample);
  var curr_rec = sample;
  // Use `d3.json` to fetch the sample data for the bar chart
  d3.json("samples.json").then((data) => {
        samples_rec = data.samples;

        var filtered_recs = samples_rec.filter(sample_object => sample_object.id == sample);
        var selection = filtered_recs[0];
        var otu_ids = selection.otu_ids;
        var sample_values = selection.sample_values;

        var trace_bar = [{
          x: sample_values.slice(0, 10).reverse(),
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        
          type: "bar",
          orientation: "h"
        }];
        Plotly.newPlot("bar", trace_bar);        
  }); 
}; 



function buildBubbleChart(sample) {
  console.log(sample);
  var curr_rec = sample;
  // Use `d3.json` to fetch the sample data for the bar chart
  d3.json("samples.json").then((data) => {
        samples_rec = data.samples;

        var filtered_recs = samples_rec.filter(sample_object => sample_object.id == sample);
        var selection = filtered_recs[0];
        var otu_ids = selection.otu_ids;
        var sample_values = selection.sample_values;
        var otu_labels = selection.otu_labels;

        var trace_bubble = [{
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: `markers`,
          marker: { size: sample_values,
                    color: otu_ids,
                    colorscale: 'Earth'
                  }
        }; 
        var data = [bubble];
        var layout = { title: "Belly Button Bacteria",
      }         
        
          type: "bar",
          orientation: "h"
        }];
        Plotly.newPlot("bar", trace_bubble);        
  }); 
}; 



function dropdown() {
// use d3 to select the corresponding html id element
  var selector = d3.select("#selDataset");
  console.log(selector);

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
      var samplesData = data.names;
      samplesData.forEach((sample) => {
          selector
              .append("option")
              .text(sample)
              .property("value", sample);
      }); //ends the sampleNames.forEach...
      const first_rec = samplesData[0];
      console.log(first_rec);
      buildBarChart(first_rec);

  }); 
};


dropdown();

