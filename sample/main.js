(function($){
    var Renderer = function(canvas){
	var canvas = $(canvas).get(0);
	var ctx = canvas.getContext("2d");
	var particleSystem;

    var that = {
	init:function(system){
            particleSystem = system;
            particleSystem.screenSize(canvas.width, canvas.height);
            particleSystem.screenPadding(80);
            that.initMouseHandling();
      },
      
      redraw:function(){
          ctx.fillStyle = "white"
          ctx.fillRect(0,0, canvas.width, canvas.height)
          
          particleSystem.eachEdge(function(edge, pt1, pt2){
              ctx.strokeStyle = "rgba(0,0,0, .333)"
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(pt1.x, pt1.y)
              ctx.lineTo(pt2.x, pt2.y)
              ctx.stroke()
        })

          particleSystem.eachNode(that.drawNode)    			
      },
      
	drawNode : function(node, pt){
	    // console.log(node.name);
	    
	    var layout = [[0, 20], [0, 45], [4, 40], [4, 20], [0, 30]];

            var w = 4;
            ctx.fillStyle = (node.data.alone) ? "orange" : "black"
	    
	    var lineHeight = 4
	    for (var i = 0; i < layout.length; i++) {
		var row = layout[i];
		ctx.fillRect(pt.x + row[0], pt.y + i * lineHeight, row[1], lineHeight);
	    }
        },

	initMouseHandling : function() {
        var dragged = null;

        var handler = {
          clicked:function(e){
            var pos = $(canvas).offset();
              _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
              dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null){
		dragged.node.fixed = true
            }

              $(canvas).bind('mousemove', handler.dragged)
              $(window).bind('mouseup', handler.dropped)

              return false
          },
            dragged:function(e){
		var pos = $(canvas).offset();
		var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

		if (dragged && dragged.node !== null){
		    var p = particleSystem.fromScreen(s)
		    dragged.node.p = p
            }

		return false
          },

          dropped:function(e){
              if (dragged===null || dragged.node===undefined) return
              if (dragged.node !== null) dragged.node.fixed = false
              dragged.node.tempMass = 1000
              dragged = null
              $(canvas).unbind('mousemove', handler.dragged)
              $(window).unbind('mouseup', handler.dropped)
              _mouseP = null
              return false
          }
        }
        
          // start listening
          $(canvas).mousedown(handler.clicked);

      },
      
    }
    return that
  }    

  $(document).ready(function(){
      var sys = arbor.ParticleSystem(1000, 600, 0.5);
      sys.parameters({gravity:true});
      sys.renderer = Renderer("#viewport");

      sys.graft({
	  nodes:{
              f:{alone:true, mass:.25}
        }, 
          edges:{
              a:{ b:{},
		  c:{},
		  d:{},
		  e:{}
		}
          }
      })
     
  })

})(this.jQuery)