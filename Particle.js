function Particle(x, y, radius, xSpeed, ySpeed, color) {
	
	// Basic data
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.color = color;
	
	this.lastColId;
	
	// Trail data
	
	this.update = function(w, h, WRAP, LENGTH) {
		// Get shorthand variables needed.
		var rad = this.radius;
		
		
		// Update location.
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		
		// Check boundary collision.
		if(WRAP) {
			if(this.xSpeed > 0 && this.x-rad >= w)
				this.x = 0-rad;
			else if(this.xSpeed < 0 && this.x+rad <= 0)
				this.x = w+rad;
			else if(this.ySpeed > 0 && this.y-rad >= h)
				this.y = 0-rad;
			else if(this.ySpeed < 0 && this.y+rad <= 0)
				this.y = h+rad;
		}
		else {
			if(this.xSpeed > 0 && this.x+rad >= w ||
					this.xSpeed < 0 && this.x-rad <= 0)
				this.xSpeed = this.xSpeed * -1;
			else if(this.ySpeed > 0 && this.y+rad >= h ||
					this.ySpeed < 0 && this.y-rad <= 0)
				this.ySpeed *= -1;
		}
		
		
			
			
	};
	
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
	};
}
