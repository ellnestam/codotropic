requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }
});


requirejs(['jquery', 'app/viz'], function ($, viz) {

    console.log(viz);

    $(document).ready(function(){
	var sys = arbor.ParticleSystem(1000, 600, 0.5);
	sys.parameters({gravity:true});
	sys.renderer = viz("#viewport");
	
	sys.addEdge('a','b');
	sys.addEdge('d','c');
	sys.addEdge('a','d');
	sys.addEdge('d','e');
	sys.addEdge('d','f');
    });
    

});