require(["viz", "jquery/jquery"], function(viz, $) {

    console.log(viz);
    
    jQuery(document).ready(function(){
	var sys = arbor.ParticleSystem(1000, 600, 0.5);
	sys.parameters({gravity:true});
	sys.renderer = viz.Renderer("#viewport");
	
	sys.addEdge('a','b');
	sys.addEdge('d','c');
	sys.addEdge('a','d');
	sys.addEdge('d','e');
	sys.addEdge('d','f');
    });
   

});