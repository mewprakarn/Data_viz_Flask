// set the dimensions and margins of the graph
var growth_change_container = document.getElementById('d3_growth_change'),
    // growth_change_width = 550,
    // growth_change_height = 230,
    growth_change_width       = 550,
    growth_change_height      = 200,
    growth_change_margin = {top: 10, right: 30, bottom: 10, left: 50};


//Read the data
d3.csv("static/data/pivot_post_change_rate.csv", 
    // When reading the csv, I must format variables: created_month
    function(d){
        return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook: d.facebook, ig:d.instagram, twitter: d.twitter, youtube: d.youtube,all_platforms: d.all_platforms}
    },
    function(data) {bar_growth(data,"all_platforms")})

function bar_growth(data, selectedGroup){
    // append the svg object to the body of the page       
    var growth_change_svg = d3.select("#d3_growth_change")
        .append("svg")
            .attr("width", growth_change_width + growth_change_margin.left + growth_change_margin.right)
            .attr("height", growth_change_height + growth_change_margin.top + growth_change_margin.bottom)
        .append("g")
        .attr("transform","translate(" + growth_change_margin.left + "," + growth_change_margin.top + ")");
    // add X axis    
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) {return d.date;})) // Get min/max date
        .range([0,growth_change_width]);

    growth_change_svg.append("g")
        .attr("id", "x_bar_axis")
        .attr("transform","translate(0,"+(growth_change_height)/2+")")
        // .call(d3.axisBottom(x).tickFormat("d3.timeFormat("%b%y")").tickSizeOuter(0));
        .call(d3.axisBottom(x).tickFormat("").tickSizeOuter(0)
        .tickSizeInner(0));
        
    var formatPercent = d3.format(".1%");
    // add y1 axis
    var y = d3.scaleLinear()
        .domain([-0.2,0.2])
        .range([(growth_change_height),0]);

    growth_change_svg.append("g")
        .attr("id", "y_bar_axis")
        .call(d3.axisLeft(y).tickFormat(formatPercent).tickValues([-0.2,-0.1,0.0,0.1,0.2])
        .tickSizeOuter(0)
        .tickSizeInner(0))
        .call(g => g.select(".domain").remove())
        ;
    // Add Bar Chart 
    var bar = growth_change_svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar_growth")
        .attr("x", function (d) {return x(+d.date)-10;})
        .attr("y", function(d) {if(d[selectedGroup]<0){return 100} else {return y(+d[selectedGroup])}})
        .attr("width", 20)
        .attr("height",function(d) {if(d[selectedGroup]<0){return y(+d[selectedGroup])-100} else {return 100-y(+d[selectedGroup])} })
        // .attr("height", function(d) { return growth_change_height - y(d[selectedGroup]); })
        .style("fill", function(d){ if(d[selectedGroup]<0){return "#ff6961"} else {return "#69b3a2"}});
    
    // Add Bar Labels
    growth_change_svg.selectAll(".text")       
        .data(data)
        .enter()
        .append("text")
        .attr('class','x_label')  
            .text(function(d) {return formatPercent(d[selectedGroup]);})
                .attr("x", function (d) {return x(+d.date);})
                .attr("y", function(d) {if(d[selectedGroup]<0){return  y(+d[selectedGroup]) } else {return y(+d[selectedGroup])}})
                .attr("font-family" , "sans-serif")
                .attr("font-size" , "12px")
                .attr("fill" , "black")
                .attr("text-anchor", "middle")
                .attr("dy",function(d)  {if(d[selectedGroup]<0) {return  "1em" } else {return "-0.3em"}});

}

// A function that update the chart
function update_bar(data,selectedGroup) {
    // Create New Data with the selection
    var dataFilter1 = data.map(function(d) {return {date: d.date, selectedGroup:+d[selectedGroup]}})

    // Select SVG
    var growth_change_svg = d3.select("#d3_growth_change")
    var bar = growth_change_svg.selectAll(".bar_growth")
    var formatPercent = d3.format(".1%");
    // Update y1 axis
    var y = d3.scaleLinear()
        .domain([-0.2,0.2])
        .range([(growth_change_height),0]);

    // Update X axis    
    var x = d3.scaleTime()
        .domain(d3.extent(dataFilter1, function(d) {return d.date;})) // Get min/max date
        .range([0,growth_change_width]);

    // Give these new data to update bar
    bar.data(dataFilter1)
        .transition()
        .duration(800)
        .attr("y", function(d) {if(d.selectedGroup<0){return 100} else {return y(+d.selectedGroup)}})
        .attr("height",function(d) {if(d.selectedGroup<0){return y(+d.selectedGroup)-100} else {return 100-y(+d.selectedGroup)} })
        .style("fill", function(d){ if(d.selectedGroup<0){return "#ff6961"} else {return "#69b3a2"}});
        
    growth_change_svg.selectAll(".x_label")
        .transition()
        .style('opacity',0);       
    // Update Bar Labels
    growth_change_svg.selectAll(".text")         
        .data(dataFilter1)
        .enter()
        .append("text")
        .attr("class", "x_label")
            .text(function(d) {return formatPercent(d.selectedGroup);})
                .attr("x", function (d) {return x(+d.date);})
                .attr("y", function(d) {if(d.selectedGroup<0){return  y(+d.selectedGroup)+20 } else {return y(+d.selectedGroup)}})
                .attr("font-family" , "sans-serif")
                .attr("font-size" , "12px")
                .attr("fill" , "black")
                .attr("text-anchor", "middle")
                .attr("dy",function(d)  {if(d.selectedGroup<0) {return  "1em" } else {return "-0.5em"}});

}  

// // When the button is changed, run the updateChart function
// d3.selectAll(".btn").on("click", function(d) {
//         // recover the option that has been chosen
//         var selectedOption = d3.select(this).property("value")
//     // Bar Growth Update 
//         // run the updateChart function with this selected option
//         d3.csv("data/pivot_post_change_rate.csv",
//         // When reading the csv, I must format variables: created_month
//         function(d){
//             return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
//         },
//         function(data) { update_bar(data,selectedOption)}
//         );
//     }).on("blur", function(d) {
//             // recover the option that has been chosen
//             var selectedOption = d3.select(this).property("value")
//     // Bar Growth Update 
//             // run the updateChart function with this selected option
//             d3.csv("data/pivot_post_change_rate.csv",
//             // When reading the csv, I must format variables: created_month
//             function(d){
//                 return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
//             },
//             function(data) { update_bar(data,"all_platforms")}
//             );
// })