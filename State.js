// The State is a sort of container class which holds all
// of the programs data and functions. It is updated and
// drawn every frame in the main loop (see main.js).


function State() {
	
	// Basic variables
	canvas = document.getElementById('canvas');
	this.context = canvas.getContext('2d');
	this.context.fillStyle = 'white';
	this.context.font = "10px Arial";
	this.width = canvas.width;
	this.height = canvas.height;
	
	// State objects
	this.particles = [];
	this.pastParticles = [];
	
	// Constants
	this.NUM_PARTICLES = 30;
	this.WRAP_CANVAS = false;
	this.TRAIL_LENGTH = 5;
	this.COLLISIONS = false;
	this.RADIUS = 15;
	
	this.collisions = 0;
	
	// Events
	//canvas.addEventListener('click', addParticle(this.particles, event), false);
	// WORK ON THIS - TRYING TO ACCESS THIS.PARTICLES USING CLOSURES IN EVENT LISTENER ON CLICK
	/*canvas.addEventListener('click', function(passedInElement) {
		return function(e) { func(e, passedInElement); };
	} (this.elements[i]), false);
	
	function addParticle(particles, event) {
		particles.push(new Particle(event.x, event.y, 5, Math.random()*10, Math.random()*10, randomColor()));
	}
	*/
	function randomColor() {
		
		var colorCode = "#";
			
		for(var j=0; j < 6; j++) {
			var rNum = Math.random()*16;
			if(rNum > 15)
				colorCode += "0";
			else if(rNum > 14)
				colorCode += "1";
			else if(rNum > 13)
				colorCode += "2";
			else if(rNum > 12)
				colorCode += "3";
			else if(rNum > 11)
				colorCode += "4";
			else if(rNum > 10)
				colorCode += "5";
			else if(rNum > 9)
				colorCode += "6";
			else if(rNum > 8)
				colorCode += "7";
			else if(rNum > 7)
				colorCode += "8";
			else if(rNum > 6)
				colorCode += "9";
			else if(rNum > 5)
				colorCode += "A";
			else if(rNum > 4)
				colorCode += "B";
			else if(rNum > 3)
				colorCode += "C";
			else if(rNum > 2)
				colorCode += "D";
			else if(rNum > 1)
				colorCode += "E";
			else if(rNum >= 0)
				colorCode += "F";
		}
		
		return colorCode;
	};
	
	reset = function() {
		// not this, not in scope, THIS IS WHERE I AM
		alert(this.particles.length);
		
		//init();
	};
	
	dist = function(part1, part2) {
		return Math.sqrt(Math.pow(part2.x-part1.x, 2)+Math.pow(part2.y-part1.y, 2))
	}
	
	
	this.init = function() {
		
		//this.particles.push(new Particle(700, 450, 5, 2, 2));
		for(var i=0; i<this.NUM_PARTICLES; i++) {
			this.particles.push(new Particle(Math.random()*this.width, Math.random()*this.height, this.RADIUS,
				Math.random()*5, Math.random()*5, randomColor()));
			if(Math.random()>.5)
				this.particles[i].xSpeed *= -1;
			if(Math.random()>.5)
				this.particles[i].ySpeed *= -1;
		}
		//this.particles.push(new Particle(100, 100, 5, 1, 0, "blue"));
		//this.particles.push(new Particle(400, 100, 5, -1, 0, "red"));
		//this.particles.push(new Particle(100, 100, 5, 10.39, -6, randomColor()));
		//this.particles.push(new Particle(300, 200, 5, -26.54, 22.27, randomColor()));
		
		$("#number").text("Number of Particles: " + this.particles.length);
		
	};
	
	
	this.update = function() {
		// Get shorthand variables needed.
		//var parts = this.particles;
		var w = this.width;
		var h = this.height;
		for(var i=0; i < this.particles.length; i++) {
			var part = this.particles[i];
			this.pastParticles.push(new Particle(part.x, part.y, part.radius, part.xSpeed, part.ySpeed, part.color));
		}
		if(this.pastParticles.length > this.TRAIL_LENGTH*this.particles.length) {
			this.pastParticles.splice(0, this.particles.length);
		}
		
		// Update particles.
		for(var i=0; i < this.particles.length; i++)
			this.particles[i].update(w, h, this.WRAP_CANVAS, this.TRAIL_LENGTH);
			
		// Check for collisions.
		// For great walkthrough on this physics algorithm:
		//		http://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
		if(this.COLLISIONS) {
			for(var i=0; i < this.particles.length; i++) {
				var part = this.particles[i];
				for(var j=i+1; j < this.particles.length; j++) {
					if(dist(part, this.particles[j]) < part.radius*2) {
						//part.color = "red";
						//this.particles[j].color = "blue";
						
						
						firstNewVelX = (part.xSpeed * (1 - 1) + (2 * 1 * this.particles[j].xSpeed)) / (1 + 1);
						firstNewVelY = (part.ySpeed * (1 - 1) + (2 * 1 * this.particles[j].ySpeed)) / (1 + 1);
						secondNewVelX = (this.particles[j].xSpeed * (1 - 1) + (2 * 1 * part.xSpeed)) / (1 + 1);
						secondNewVelY = (this.particles[j].ySpeed * (1 - 1) + (2 * 1 * part.ySpeed)) / (1 + 1);
						
						part.x += firstNewVelX;
						part.y += firstNewVelY;
						this.particles[j].x += secondNewVelX;
						this.particles[j].y += secondNewVelY;
						
						//alert("x"+part.xSpeed+"y"+part.ySpeed+" x"+this.particles[j].xSpeed+"y"+this.particles[j].ySpeed)
					
						
					}
				}
			}
		}
	};
	
	this.draw = function() {
		// Clear canvas and draw background.
		this.context.clearRect(0,0,this.width,this.height);
		this.context.fillStyle = "black";
		this.context.fillRect(0,0,this.width, this.height);
		
		// Draw border.
		if(!this.WRAP_CANVAS) {
			this.context.fillStyle = "black";
			this.context.fillRect(0,0,this.width, 1);
			this.context.fillRect(0,0,1,this.height);
			this.context.fillRect(this.width-1, 0, 1, this.height);
			this.context.fillRect(0, this.height-1, this.width, 1);
		}
		
		// Get shorthand variables needed.
		//var parts = this.particles;
		//var trail = this.pastParticles;

		// Draw trail.
		for(var i=0; i < this.pastParticles.length/this.particles.length; i++) {
			for(var j=0; j < this.particles.length; j++) {
				this.context.fillStyle = ColorLuminance(this.pastParticles[i*this.particles.length+j].color, 0.5);
				this.pastParticles[i*this.particles.length+j].draw(this.context);
			}
		}
		
		// Draw particles.
		for(var i=0; i < this.particles.length; i++) {
			this.context.fillStyle = this.particles[i].color;
			this.particles[i].draw(this.context);
		}
		
		/* How to display testing data
		this.context.fillStyle = "white";
		this.context.fillText("State  x:" + this.x + " y:" + this.y, 5, 10);
		*/
	};
	
	$(function() {
		$("#reset").click(function() {
			console.log("Simulation reset.");
			reset();
		});
		$("#collisions").click(function() {
			
		});
		$("#wrap").click(function() {
			if(this.WRAP_CANVAS) {
				console.log("Canvas-Wrap turned on.");
				$("#wrap").html("Turn Wrap Off");
				//this.WRAP_CANVAS = true;
			}
			else {
				console.log("Canvas-Wrap turned off.");
				$("#wrap").html("Turn Wrap On");
				//this.WRAP_CANVAS = false;
			}
		});
		$("#color").change(function() {
			console.log("Color value changed: " + $("#color").val())
			
		});
	});
	
}
