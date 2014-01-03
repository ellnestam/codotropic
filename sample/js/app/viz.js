define([], function() {

    return function(ctx, particleSystem, $, canvas, d) {

	var that = {
	    data : d,
	    
	    init : function(){
		particleSystem.screenSize(canvas.width, canvas.height);
		particleSystem.screenPadding(80);
		that.initMouseHandling();
	    },
	    
	    redraw : function() {
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
	    
	    findNodeInfo : function(data, name) {
		for (var i = 0; data.length; i++) {
		    var info = data[i];
		    if (info.file === name) {
			return info.info.lines;
		    }
		}
		return [[0, 4]];
	    },

	    drawNode : function(node, pt){
		var layout = that.findNodeInfo(that.data.edges, node.name);
		
		ctx.fillStyle = (node.data.alone) ? "orange" : "black"
		
		var lineHeight = 2;
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
		    
		    dragged : function(e){
			var pos = $(canvas).offset();
			var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
			
			if (dragged && dragged.node !== null){
			    var p = particleSystem.fromScreen(s)
			    dragged.node.p = p
			}
			
			return false;
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
		$(canvas).mousedown(handler.clicked);	    
	    },
	}
	return that;
    }
});