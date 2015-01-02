'use strict';

angular.module('core').service('skrollr', ['$document', '$q', '$rootScope', '$window', 'ENV',
    function($document, $q, $rootScope, $window, ENV){
        var defer = $q.defer();

        function onScriptLoad() {
            // Load client in the browser
            $rootScope.$apply(function() {
            	// Don't initialise the plugin if we are on a mobile browser
                if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                	var s = $window.skrollr.init({
                        forceHeight: false
                    });
                	defer.resolve(s);
                }
            });
        }

        // Create a script tag with skrollr as the source
        // and call our onScriptLoad callback when it
        // has been loaded

        var scriptTag = $document[0].createElement('script');
        scriptTag.type = 'text/javascript'; 
        scriptTag.async = true;
        scriptTag.src = ENV.skrollrDir;

        scriptTag.onreadystatechange = function () {
            if (this.readyState === 'complete') onScriptLoad();
        };

        scriptTag.onload = onScriptLoad;

        var s = $document[0].getElementsByTagName('body')[0];
        s.appendChild(scriptTag);

        return {
            skrollr: function() { return defer.promise; }
        };

    }
 ]);