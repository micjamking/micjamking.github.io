/**
 *  Particle Canvas
 */

import utils, { w, $ } from './../lib/utils';
import Particle from './../lib/particle';

export default class ParticleCanvas {

  constructor(){

    // External utilities
    this.utils                 = new utils();
    this.requestAnimationFrame = w.requestAnimationFrame.bind(w);

    // DOM & Canvas object references
    this.$canvas = $('.canvas')[0];
    this.context = this.$canvas.getContext('2d');
    this.left    = 0;
    this.top     = 0;
    this.right   = this.utils.screenSize().width;
    this.bottom  = this.utils.screenSize().height;

    // Environment physics
    this.spring   = 0.05;
    this.bounce   = -1;
    this.gravity  = 0;
    this.speed    = 0.5;
    this.friction = 1;

    // Particle settings
    this.particles      = [];
    this.numOfParticles = 100;
    this.particleRange  = 0.25;
    this.particleSpring = 0.000011;
    this.particleSpeed  = 0.025;
    this.particleScale  = 1;
    this.particleColors = [
      // '#EFDDB6',
      '#E6F4FA'
    ];

    // Set mouse/touch coordinates to variable
    this.isTouching  = false;
    this.touch       = this.utils.captureTouch(this.$canvas);
    this.mouse       = this.utils.captureMouse(this.$canvas);
    this.mouseBall   = new Particle(50, 'transparent');

    // this.utils.setupHelpers(this.$canvas, this.mouse, this.touch);

    // Start animation
    this._init();

    // console.log('instantiated particle canvas');

  }


  /**
   * Initialize canvas and image
   */
  _init() {
    // Set canvas size to fullscreen
    this.$canvas.width  = this.utils.screenSize().width;
    this.$canvas.height = this.utils.screenSize().height;

    // Set canvas center
    this.centerX = this.$canvas.width / 2;
    this.centerY = this.$canvas.height / 2;

    // Set initial mouse ball position
    this.mouseBall.x = -50;
    this.mouseBall.y = -50;

    // Environment events

    // Kick off main events
    this._setupListeners();
    this._generateParticles();
    this._animate();

    console.log('initialized particle animation');
  }


  /**
	 * Setup event listeners
	 */
  _setupListeners(){
    w.addEventListener('resize', () => this._onWindowResize());

    if (this.utils.allowDeviceOrientation()){

      w.addEventListener('deviceorientation', (e) => this._handleOrientation(e), true);
      // document.addEventListener('touchend', (e) => this._mouseUpCallback(e));
      // document.addEventListener('touchstart', (e) => this._mouseDownCallback(e));

    } else {

      document.addEventListener('mousemove', (e) => this._mouseMoveCallback(e));
      // document.addEventListener('mousedown', (e) => this._mouseDownCallback(e));
      // document.addEventListener('mouseup', (e) => this._mouseUpCallback(e));

    }
  }


  /**
	 * Generate particles
	 */
	_generateParticles() {
    for (let i = 0; i < this.numOfParticles; i++){
      let particle = new Particle(
        this.utils.randInt(1, 4),
        this.particleColors[ this.utils.randInt(0, this.particleColors.length) ]
      );

      particle.x  = this.utils.randInt(1, this.$canvas.width);
      particle.y  = this.utils.randInt(1, this.$canvas.height);
      particle.vx = this.utils.randInt(-2, 2) * this.speed;
      particle.vy = this.utils.randInt(-2, 2) * this.speed;
      particle.angle = this.utils.randInt(0, 90);
      particle.targetX = particle.targetY = 0;

      if (particle.vx === 0){
        particle.vx = 1;
      }

      if (particle.vy === 0){
        particle.vy = 1;
      }

      this.particles.push(particle);
    }
	}


  /**
	 * Motion animation
	 */
  _motion (particle) {

    if ( this.gravity === 1 ){
      particle.targetX = particle.targetY = 0;
    }

    if ( particle.targetX !== 0 && particle.targetY !== 0 ){

      // Get distance to target
      let dx = (particle.targetX - particle.x),
          dy = (particle.targetY - particle.y),

			// Calculate acceleration (distance * spring)
			ax = dx * this.spring,
			ay = dy * this.spring;

      // Calculate velocity (acceleration + distance)
      particle.vx += ax;
      particle.vy += ay;
    }

    // Add gravity
    particle.vy += this.gravity;

    if (Math.abs(particle.vx) > 0.1) {
      particle.vx *= this.friction;
    }

    if (Math.abs(particle.vy) > 0.1) {
      particle.vy *= this.friction;
    }

    particle.x  += particle.vx;
    particle.y  += particle.vy;

    if (Math.abs(particle.vx) < 0.1 && Math.abs(particle.vy) < 0.1) {
      particle.scaleX = particle.scaleY = this.particleScale + Math.sin(particle.angle) * this.particleRange;

      particle.angle += this.particleSpeed;
    }
  }


  /**
	 * Detection against top/right/bottom/left boundaries
	 */
  _boundaryDetection (particle) {
    if (particle.x + particle.radius > this.right){
      particle.x = this.right - particle.radius;
      particle.vx *= this.bounce;
    } else if (particle.x - particle.radius < this.left) {
      particle.x = this.left + particle.radius;
      particle.vx *= this.bounce;
    }

    if (particle.y + particle.radius > this.bottom){
      particle.y = this.bottom - particle.radius;
      particle.vy *= this.bounce;
    } else if (particle.y - particle.radius < this.top) {
      particle.y = this.top + particle.radius;
      particle.vy *= this.bounce;
    }
  }


  /**
   * Collision detection between mouse and particles
   *
   * @param {Object} particle - Instance 2D Ball context
   */
  _mouseCollision (particle) {
    let dx   = particle.x - this.mouseBall.x,
        dy   = particle.y - this.mouseBall.y,
        dist = Math.sqrt( ( dx * dx ) + ( dy * dy ) ),
        min_dist = particle.radius + this.mouseBall.radius;

    if (dist < min_dist){
      let angle = Math.atan2( dy, dx ),
          tx    = this.mouseBall.x + Math.cos(angle) * min_dist,
          ty    = this.mouseBall.y + Math.sin(angle) * min_dist;

      particle.targetX = particle.x;
      particle.targetY = particle.y;

      particle.vx += (tx - particle.x) * this.spring;
      particle.vy += (ty - particle.y) * this.spring;

    }

    return particle;
  }


  /**
	 * Collision detection between particles
	 */
  _collisionCheck(particleA, i){
    for (let j = i + 1; j < this.numOfParticles; j++){
			let particleB = this.particles[j],
					dx   = particleB.x - particleA.x,
					dy   = particleB.y - particleA.y,
					dist = Math.sqrt( ( dx * dx ) + ( dy * dy ) ),
					min_dist = 150;

      // If particle is within range of another
			if (dist < min_dist){
				let tx    = particleA.x + dx / dist * min_dist,
						ty    = particleA.y + dy / dist * min_dist,
						ax    = (tx - particleB.x) * this.particleSpring,
						ay    = (ty - particleB.y) * this.particleSpring;

				// Draw connection from particleA
				// to particleB coordinates
        this.context.strokeStyle = particleA.color;
				this.context.beginPath();
				this.context.moveTo(particleA.x, particleA.y);
				this.context.lineTo(particleB.x, particleB.y);
				this.context.stroke();

				particleA.vx -= ax;
				particleA.vy -= ay;
				particleB.vx += ax;
				particleB.vy += ay;

			}
		}
	}


  /**
	 * Animation loop
	 */
  _animate() {

    // Call request animation frame recursively
    this.requestAnimationFrame(this._animate.bind(this), this.$canvas);

		// Clear canvas every frame
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

    // Animate stuff...
    if (this.particles){
      for (let i = 0; i < this.particles.length; i++){
        let particle = this.particles[i];

        this._motion(particle, i);
        this._boundaryDetection(particle, i);
        this._mouseCollision(particle, i);
        this._collisionCheck(particle, i);

        particle.draw(this.context);
      }
    }

    this.mouseBall.draw(this.context);

  }


	/**
	 * Handle Device Orientation
	 *  - Tilt 90º > 0º to increase gravity on mobile
	 */
	_handleOrientation (event) {

		var x = event.gamma;
		var y = event.beta;

		if (x > 90) { x = 90 }
		if (x < 45) { x = 45 }

		if (y > 90) { y = 90 }
		if (y < 0) { y = 0 }

		var rangeX = (90 - Math.floor( Math.abs(x) ) ) / 45;
		var rangeY = (90 - Math.floor( Math.abs(y) ) ) / 90;

		// Do stuff with the new orientation data
		if (Math.floor( rangeY * 10 ) > 0) {
			this.gravity = rangeY;
		}

    if (Math.floor( rangeX * 10 ) > 0) {
			this.speed = rangeX;
		}

	}


	/**
	 * Mouse move callback
	 *
	 * @param {Event} e - Event Object
	 *
	 */
	_mouseMoveCallback(){
    // Set mouseBall to mouse coordinates
    this.mouseBall.x = this.mouse.x;
    this.mouseBall.y = this.mouse.y;
	}


	/**
	 * Mouse Down callback:
	 * - Increment particles on press and hold
	 *
	 * @param {Event} e - Event Object
	 *
	 */
	_mouseDownCallback(){
    this.isTouching = true;
    this.gravity = 1;
    this.friction = 0.95;
	}


	/**
	 * Mouse Up callback:
	 * - Reset particle count on press release
	 *
	 * @param {Event} e - Event Object
	 *
	 */
	_mouseUpCallback(){
    this.isTouching = false;
    this.friction = 0.99;
    this.gravity  = 0;
	}


  /**
	 * Window resize callback
	 */
  _onWindowResize() {
		this.right   = this.$canvas.width  = this.utils.screenSize().width;
		this.bottom  = this.$canvas.height = this.utils.screenSize().height;
    this.centerX = this.$canvas.width / 2;
    this.centerY = this.$canvas.height / 2;
  }

}
