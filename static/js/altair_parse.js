function parse(div,data) {
    var opt = {"mode": "vega-lite"};
    var spec = JSON.parse(data)
    console.log(data);
    vegaEmbed("#"+div, spec, opt, function(error, result) {
    // result.view is the Vega View, url is the original Vega-Lite specification
    vegaTooltip.vegaLite(result.view, url);
    });
    };