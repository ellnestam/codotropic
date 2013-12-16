requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }
});


requirejs(['jquery', 'arbor', 'app/viz'], function ($, arbor, viz) {

    console.log(arbor);
    console.log($);
    console.log(viz);

    $(document).ready(function(){
	var sys = arbor.ParticleSystem(1000, 600, 0.5);
	sys.parameters({gravity:true});
	sys.renderer = viz("#viewport", arbor);
	
	sys.addEdge('a','b');
	sys.addEdge('d','c');
	sys.addEdge('a','d');
	sys.addEdge('d','e');
	sys.addEdge('d','f');
    });
    

});