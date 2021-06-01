var performance_html =
{
    /**
     * This function is the starting point of this script called
     * by popup.js. It calls all function to collect relevant
     * performance data of current DOM and returns all results
     * within an data object.
     */
    analyze_website: function  ()
    {
        var data =
        {
            "dom":
            {
                "dom_elements": this.count_dom_elements(),
                "js_files": this.count_loaded_javascript_files(),
                "js_blocks": this.count_javascript_blocks(),
                "css_files": this.count_loaded_css_files()
            },
            "performance": this.get_performance(),
            "memory": this.get_memory_usage()
        }

        return JSON.stringify(data);
    },




    /**
     * Counts the number of DOM nodes in current document.
     */
    count_dom_elements: function  ()
    {
        return document.getElementsByTagName('*').length;
    },




    /**
     * Counts the number of loaded JS files within <script> tags.
     */
    count_loaded_javascript_files: function  ()
    {
        var scripts = document.getElementsByTagName('script');
        var counter = 0;

        for (var i=0; i<scripts.length; i++)
        {
            if (scripts[i].src != '')
            {
                counter++;
            }
        }

        return counter;
    },




    /**
     * Counts inline Javascript blocks.
     */
    count_javascript_blocks: function ()
    {
        var scripts = document.getElementsByTagName('script');
        var counter = 0;

        for (var i=0; i<scripts.length; i++)
        {
            if (scripts[i].src == '')
            {
                counter++;
            }
        }

        return counter;
    },




    /**
     * Counts the loaded CSS files within <link> tags
     */
    count_loaded_css_files: function ()
    {
        var files = document.getElementsByTagName('link');
        var counter = 0;

        for (var i=0; i<files.length; i++)
        {
            if (files[i].hasOwnProperty('href') && files[i].href.indexOf('.css') != -1)
            {
                counter++;
            }
        }

        return counter;
    },




    /**
     * This function collects some performance values using the performance
     * timing API.
     */
    get_performance: function ()
    {
        var data = window.performance.timing;

        var dns_lookup          = (data.domainLookupEnd - data.domainLookupStart) + ' ms';
        var connection          = (data.connectEnd - data.connectStart) + ' ms';
        var time_to_first_byte  = ((data.responseStart - data.fetchStart) / 1000).toFixed(2) + ' s';
        var dom_ready           = ((data.domInteractive - data.fetchStart) / 1000).toFixed(2) + ' s';
        var dom_complete        = ((data.domComplete - data.fetchStart) / 1000).toFixed(2) + ' s';

        var performance =
        {
            'dns_lookup': dns_lookup,
            'connection': connection,
            'time_to_first_byte': time_to_first_byte,
            'dom_ready': dom_ready,
            'dom_complete': dom_complete
        };

        return performance;
    },




    /**
     * This function collects and returns data for memory usage by Javascript.
     */
    get_memory_usage: function ()
    {
        // All memory that is allocated to Javascript
        var total_js_heap_size = window.performance.memory.totalJSHeapSize;

        // Amount of this allocated memory that is used for storing variables and objects
        var used_js_head_size = window.performance.memory.usedJSHeapSize;

        var memory =
        {
            'used_js_heap_size': (used_js_head_size / 1024 / 1024).toFixed(2) + ' MB',
            'total_js_heap_size': (total_js_heap_size / 1024 / 1024).toFixed(2) + ' MB'
        };

        return memory;
    }
};







/*
 secureConnectionStart:         0
 redirectStart:                 0
 redirectEnd:                   0
 navigationStart:               1387650511278
 fetchStart:                    1387650511278
 domainLookupStart:             1387650511281
 domainLookupEnd:               1387650511313
 connectStart:                  1387650511313
 connectEnd:                    1387650511350
 requestStart:                  1387650511350
 responseStart:                 1387650512794
 unloadEventStart:              1387650512795
 unloadEventEnd:                1387650512796
 domLoading:                    1387650512823
 responseEnd:                   1387650512894
 domInteractive:                1387650513333
 domContentLoadedEventStart:    1387650513334
 domContentLoadedEventEnd:      1387650513334
 domComplete:                   1387650514542
 loadEventStart:                1387650514542
 loadEventEnd:                  1387650514629
 */