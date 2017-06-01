// YIANNI GA
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-XX', 'auto');
ga('send', 'pageview');

// QLIK GA
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-163089-12'],['_setDomainName', '.qlik.com'],['_addIgnoredRef', 'qlikview.com'],['_addIgnoredRef', 'qlik.com'],['_gat._anonymizeIp']);
if (/[?&]c=/.test(location.search)) { _gaq.push(['_setCampNameKey',"c"],['_setCampSourceKey',"s"],['_setCampMediumKey',"m"],['_setCampTermKey',"k"]); }
_gaq.push(function () { var twoQ, twoQResults, cleanPageview, pageTracker = _gat._getTrackerByName();
try {
twoQ = /(^.*&q=.*)&q=[^&]*(.*)/; twoQResults = twoQ.exec(location.search);
if (twoQResults) {
pageTracker._trackPageview(location.pathname + twoQResults[1] + twoQResults[2]);
} else if (/ |%20/.test(location.href)) {
cleanPageview = location.href.replace(location.protocol+"//"+location.hostname,'').replace(/ |%20/g,"-");
pageTracker._trackPageview(cleanPageview);
} else {
pageTracker._trackPageview();
}
} catch (e) { pageTracker._trackPageview(); }
});
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();