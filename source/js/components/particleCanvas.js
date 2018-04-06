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
    this.devicePixelRatio      = w.devicePixelRatio;

    // DOM & Canvas object references
    this.$canvas = $('.canvas')[0];
    this.context = this.$canvas.getContext('2d');
    this.left    = 0;
    this.top     = 0;
    this.right   = this.utils.screenSize().width;
    this.bottom  = this.utils.screenSize().height;

    // Set canvas size to fullscreen
    this.$canvas.width  = this.utils.screenSize().width;
    this.$canvas.height = this.utils.screenSize().height;
    this.centerX = this.$canvas.width / 2;
    this.centerY = this.$canvas.height / 2;

    // Environment physics
    this.spring   = 0.05;
    this.bounce   = -1;
    this.gravity  = 0;
    this.speed    = 0.25;
    this.friction = 1;

    // Particle settings
    this.particles         = [];
    this.numOfParticles    = 150;
    this.particleDistance  = 150;
    this.particleOpacity   = 0.5;
    this.particleSpring    = 0.00001;
    this.particleSize      = 3;
    this.particleLineWidth = 1;
    this.particleColors    = [
      // '#E6F4FA', // light blue
      '#D6E9F1' // slightly darker light blue
      // '#BBDAE7' // even more darker light blue
      // '#95C4E8',
      // '#52859F',
      // '#D1D4D9' // grey
    ];

    // Set mouse/touch coordinates to variable
    this.isTouching         = false;
    this.touch              = this.utils.captureTouch(w);
    this.mouse              = this.utils.captureMouse(w);
    this.mouseBallThreshold = 150;
    this.mouseBall          = new Particle(this.mouseBallThreshold, 'transparent');

    // this.utils.setupHelpers(w, this.mouse, this.touch);

    // Start animation
    this._init();

    // console.log('instantiated particle canvas');

  }


  /**
   * Initialize canvas and image
   */
  _init() {
    // Set initial mouse ball position
    this.mouseBall.x = this.centerX;
    this.mouseBall.y = this.centerY;

    // Environment events

    // Kick off main events
    this._upscaleCanvas();
    this._setupListeners();
    this._generateParticles();
    this._animate();

    console.log('initialized particle animation');
  }

  /**
   * Upscale canvas if device pixel ratio doesnt match
   * @see https://www.html5rocks.com/en/tutorials/canvas/hidpi/
   */
  _upscaleCanvas(){
    // console.log('device pixel ratio =', this.devicePixelRatio);

    var _oldWidth  = this.$canvas.width,
        _oldHeight = this.$canvas.height;

    // Upscale canvas element by devicePixelRatio
    this.$canvas.width  *= this.devicePixelRatio;
    this.$canvas.height *= this.devicePixelRatio;

    // Set canvas center
    this.centerX = _oldWidth / 2;
    this.centerY = _oldHeight / 2;

    // Downscale canvas style (CSS) to original size
    this.$canvas.style.width  = _oldWidth + 'px';
    this.$canvas.style.height = _oldHeight + 'px';

    // Scale canvas context to counter manually scaled canvas
    this.context.scale(this.devicePixelRatio, this.devicePixelRatio);

    return false;

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
      document.addEventListener('mousedown', (e) => this._mouseDownCallback(e));
      document.addEventListener('mouseup', (e) => this._mouseUpCallback(e));

    }
  }


  /**
	 * Generate particles
	 */
	_generateParticles() {
    for (let i = 0; i < this.numOfParticles; i++){
      let particle = new Particle(
        this.utils.rand(0, this.particleSize),
        this.particleColors[ this.utils.randInt(0, this.particleColors.length) ]
      );

      particle.x  = this.utils.randInt(1, this.$canvas.width / this.devicePixelRatio);
      particle.y  = this.utils.randInt(1, this.$canvas.height / this.devicePixelRatio);
      particle.vx = this.utils.randInt(-this.speed, this.speed);
      particle.vy = this.utils.randInt(-this.speed, this.speed);
      particle.opacity = this.particleOpacity;

      if (particle.vx === 0){
        particle.vx = this.utils.coinFlip() ? this.speed : -this.speed;
      }

      if (particle.vy === 0){
        particle.vy = this.utils.coinFlip() ? this.speed : -this.speed;
      }

      this.particles.push(particle);
    }
	}


  /**
	 * Motion animation
	 */
  _motion (particle) {

    // Add gravity
    particle.vy += this.gravity;

    // Increment velocity
    particle.x  += particle.vx;
    particle.y  += particle.vy;
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

    var normVec = {
          x: dx / dist,
          y: dy / dist
        },
        velocity = 100,
        repulseFactor = this.utils.clamp((1/min_dist) * (-1 * Math.pow(dist / min_dist, 2) + 1) * min_dist * velocity, 0, 50);

    var pos = {
      x: particle.x + normVec.x * repulseFactor,
      y: particle.y + normVec.y * repulseFactor
    };

    particle.x = pos.x;
    particle.y = pos.y;

    // if (dist < min_dist){
    //   let angle = Math.atan2( dy, dx ),
    //       tx    = this.mouseBall.x + Math.cos(angle) * min_dist,
    //       ty    = this.mouseBall.y + Math.sin(angle) * min_dist;
    //
    //   particle.vx += (tx - particle.x) * this.spring;
    //   particle.vy += (ty - particle.y) * this.spring;
    //
    // }

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
					min_dist = this.particleDistance;

      // If particle is within range of another
			if (dist < min_dist){
				let tx    = particleA.x + dx / dist * min_dist,
						ty    = particleA.y + dy / dist * min_dist,
						ax    = (tx - particleB.x) * this.particleSpring,
						ay    = (ty - particleB.y) * this.particleSpring;

				// Draw connection from particleA
				// to particleB coordinates
        this.context.lineWidth   = this.particleLineWidth / 4;
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
    // this.gravity = 1;
    // this.friction = 0.95;
    this.mouseBall.radius = 0;
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
    // this.friction = 0.99;
    // this.gravity  = 0;
    this.mouseBall.radius = this.mouseBallThreshold;
	}


  /**
	 * Window resize callback
	 */
  _onWindowResize() {
		this.right   = this.$canvas.width  = this.utils.screenSize().width;
		this.bottom  = this.$canvas.height = this.utils.screenSize().height;
    this.centerX = this.$canvas.width / 2;
    this.centerY = this.$canvas.height / 2;
    this._upscaleCanvas();
  }

}
