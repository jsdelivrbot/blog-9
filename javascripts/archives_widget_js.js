function paras(s){
	var o = {};
	if(s.indexOf('?') == -1) return {};
	var vs = s.split('?')[1].split('&');
	for(var i=0;i<vs.length;i++){
		if(vs[i].indexOf('=') != -1){
			var k = vs[i].split('=');
			eval('o.'+k[0]+'="'+k[1]+'"');
		}
	}
	return o;
}

var archives_obj = paras(document.getElementById('archives_widget_js').src);
var _url = 'http://' + document.domain + '/';
//var _url = 'http://www.grayciel.com/';

if(archives_obj.num){
	document.write('<div id="blogger_archives_list">Loading...</div><script type="text/javascript" src="' + _url +'feeds/posts/default?max-results=' + archives_obj.num + '&amp;alt=json-in-script&amp;callback=loadarchives"><\/script>');
}
else{
	document.write('<div id="blogger_archives_list">Loading...</div><script type="text/javascript" src="' + _url + 'feeds/posts/default?max-results=9999&amp;alt=json-in-script&amp;callback=loadarchives"><\/script>');
}

function expendArchFunc(index){
	var thisbox = document.getElementById('arch_ul_' + index);
	if(thisbox.style.display == 'none'){
		thisbox.style.display = 'block'
	}
	else{
		thisbox.style.display = 'none';
	}
}
function loadarchives(resp){
	var items = resp.feed.entry;
	var a = (items[0].published.$t).substring(0,7);
	var b, str;
	str = '<p>total posts:' + items.length + '</p>';
	str += '<h3><a href="' + _url + a.replace('-','_') + '_01_archive.html">' + a + '</a><span class="expend_archives" onclick="expendArchFunc(0)">+</span></h3><ul id="arch_ul_0">';
	
	for(var i = 0; i < items.length; i++){
		b = (items[i].published.$t).substring(0,7);
		if(b != a){
			str += '</ul><h3><a href="' + _url + b.replace('-','_') + '_01_archive.html">' + b + '</a><span class="expend_archives" onclick="expendArchFunc(' + i + ')">+</span></h3><ul style="display:none" id="arch_ul_' + i + '">';
			a = b;
		}
		//console.info(i + ',' + items[i].link[4]);
		str += '<li><a href="' + items[i].link[4].href + '">' + items[i].title['$t'] + '</a><span>' + items[i].published.$t.substring(5,10) + '</span></li>';
		
	}
	str +='</ul><p style="display:none">by</p>';
	document.getElementById('blogger_archives_list').innerHTML = str;
}
