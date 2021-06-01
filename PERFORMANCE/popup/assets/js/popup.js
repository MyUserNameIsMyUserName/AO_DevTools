// Google Analytics Tracking =================================================================

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-45190281-5']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Add event tracking to G+ profile link
document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById('profile_link').addEventListener('click', function()
    {
        _gaq.push(['_trackEvent', 'Links', 'Clicked', 'Author']);
    });
});

// ===========================================================================================

var panel_translations =
{
    'dom':          'DOM Structure and Elements',
    'performance':  'Website Speed',
    'memory':       'Javascript Memory Usage'
}

var data_translations =
{
    'dom_elements':         'DOM Elements',
    'js_files':             'Javascript Files',
    'js_blocks':            'Javascript Blocks',
    'css_files':            'CSS Files',
    'dns_lookup':           'DNS Lookup Time',
    'connection':           'Network Connection Time',
    'time_to_first_byte':   'Time to First Byte',
    'dom_ready':            'Document Ready',
    'dom_complete':         'Document Complete',
    'total_js_heap_size':   'Allocated Memory',
    'used_js_heap_size':    'Used Memory'
};

chrome.tabs.executeScript(null, {'code': 'performance_html.analyze_website()'}, function (result)
{
    if (result != undefined)
    {
        init_extension(JSON.parse(result));
    }
    else
    {
        //alert('Error: Could not get document object of current tab!');
    }
});

function init_extension (data)
{
    var panels = '';

    for (var topic in data)
    {
        var rows = '';

        for (var key in data[topic])
        {
            if (data[topic].hasOwnProperty(key))
            {
                rows += Mustache.render(template_row, {'key': data_translations[key], 'value': data[topic][key]});
            }
        }

        panels += Mustache.render(template_panel, {'heading': panel_translations[topic], 'content': rows});
    }

    document.getElementById('content').innerHTML = panels;


    // A little GA tracking for extension usage
    chrome.tabs.query({'currentWindow':true, 'active':true}, function(tabs)
    {
        var url = tabs[0].url;
        var domain = url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];

        _gaq.push(['_trackEvent', 'Extension-Usage', 'URL', url]);
        _gaq.push(['_trackEvent', 'Extension-Usage', 'Domain', domain]);
    });
}