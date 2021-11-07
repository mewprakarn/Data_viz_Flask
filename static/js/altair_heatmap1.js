(function(vegaEmbed) {
    var spec = data;
    var embedOpt = {"mode": "vega-lite"};

    function showError(el, error){
        el.innerHTML = ('<div class="error" style="color:red;">'
                        + '<p>JavaScript Error: ' + error.message + '</p>'
                        + "<p>This usually means there's a typo in your chart specification. "
                        + "See the javascript console for the full traceback.</p>"
                        + '</div>');
        throw error;
    }
    const el = document.getElementById('heatmap_1');
    vegaEmbed("#heatmap_1", spec, embedOpt)
      .catch(error => showError(el, error));
  })(vegaEmbed);

