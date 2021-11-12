// Create "div" for each chart
// d3.select("body")
//   .append("div")
//     .attr("class", "Facebook");
// d3.select("body")    
//   .append("div")
//     .attr("class", "Instagram");
// d3.select("body")   
//   .append("div")
//     .attr("class", "Twitter");
// d3.select("body")
//   .append("div")
//     .attr("class", "Youtube");
// d3.select("body")
//     .append("div")
//     .attr("class", "Legend");
// set the dimensions and margins of the graph
var growth_change_container = document.getElementById('d3_growth_change'),
    // growth_change_width = 550,
    // growth_change_height = 230,
    cat_pie_width       = 150,
    cat_pie_height      = 350,
    cat_pie_margin = {top: 10, right: 30, bottom: 10, left: 50};





// function of data conversion
var dataConversion = function (d) {
                                    return {
                                      category : d.category,
                                      nFBid : +d.facebook_id_cor,
                                      nIGid : +d.instagram_id,
                                      nTTid : +d.twitter_id_cor,
                                      nYTid : +d.youtube_id
                                    };
}

// data load
d3.csv("static/data/dfCatID.csv", dataConversion, function (data) {
        // var dataset = data;
        var category = data.map (function (d) {return d.category});
        var nFBid = data.map (function (d) {return +d.nFBid});
        var nIGid = data.map (function (d) {return +d.nIGid});
        var nTTid = data.map (function (d) {return +d.nTTid});
        var nYTid = data.map (function (d) {return +d.nYTid});        

        var w = 150;
        var h = 150;

        var outerRadius = w/2;
        var innerRadius = w/4;

        var arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
        
        var pie = d3.pie().sort(null);

        var color = d3.scaleOrdinal()
                      .domain(category)
                      .range(d3.schemeCategory20b);

// Facebook Pie
        var svgFB = d3.select("#facebook_pie")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);
        
        var arcsFB = svgFB.selectAll("g.arc")
                          .data(pie(nFBid))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
        
        arcsFB.append("path")
                .attr("fill", function(d,i) {
                            return color(i);
              })
                .attr("d", arc);

        arcsFB.append("text")
              .attr("transform", function(d) {
                                return "translate(" + arc.centroid(d) + ")";
              })
              .attr("text-anchor", "middle")
              .text(function(d) {
                    return d.value;
        });

// Instagram Pie
            var svgIG = d3.select("#ig_pie")
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h);

            var arcsIG = svgIG.selectAll("g.arc")
                              .data(pie(nIGid))
                              .enter()
                              .append("g")
                              .attr("class", "arc")
                              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

            arcsIG.append("path")
                  .attr("fill", function(d,i) {
                          return color(i);
                  })
                  .attr("d", arc);

            arcsIG.append("text")
                  .attr("transform", function(d) {
                      return "translate(" + arc.centroid(d) + ")";
                  })
                  .attr("text-anchor", "middle")
                  .text(function(d) {
                          return d.value;
            });

// Twitter Pie
            var svgTT = d3.select("#twitter_pie")
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h);

            var arcsTT = svgTT.selectAll("g.arc")
                          .data(pie(nTTid))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

            arcsTT.append("path")
                  .attr("fill", function(d,i) {
                          return color(i);
                  })
                  .attr("d", arc);

            arcsTT.append("text")
                  .attr("transform", function(d) {
                          return "translate(" + arc.centroid(d) + ")";
                  })
                  .attr("text-anchor", "middle")
                  .text(function(d) {
                  return d.value;
            });

// Youtube Pie
            var svgYT = d3.select("#youtube_pie")
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h);

            var arcsYT = svgYT.selectAll("g.arc")
                              .data(pie(nYTid))
                              .enter()
                              .append("g")
                              .attr("class", "arc")
                              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

            arcsYT.append("path")
                  .attr("fill", function(d,i) {
                          return color(i);
                  })
                  .attr("d", arc);

            arcsYT.append("text")
                  .attr("transform", function(d) {
                          return "translate(" + arc.centroid(d) + ")";
                  })
                  .attr("text-anchor", "middle")
                  .text(function(d) {
                        return d.value;
                  });

// Legend
            var svgLegend = d3.select("#legend_pie")
                              .append("svg")
                                .attr("width", cat_pie_width)
                                .attr("height", cat_pie_height);

            var mark = svgLegend.selectAll("mark")
                                .data(category)
                                .enter()
                                .append("circle")
                                  .attr("cx", 10)
                                  .attr("cy", function(d,i) {return 20 + i*20})
                                  .attr("r", 6)
                                  .style("fill", function(d,i) {return color(i)})
        
           var label = svgLegend.selectAll("label")
                              .data(category)
                              .enter()
                              .append("text")
                                .attr("x", 20)
                                .attr("y", function(d,i) {return 20 + i*20})
                              .text(function(d) {return d})
                                .attr("text-anchor", "left")
                                .style("alignment-baseline", "middle")
                                .style("fill","white")
                                .style("font-size","12px")

});