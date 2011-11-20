/*
 * State of Design
 * http://www.anunstablegrid.com/
 *
 * Copyright 2011, Collin Hover
 *
 * Date: Mon March 1 16:43:00 CST 2011
 */
 
var SOD = {};

(function () {
	//======================================================================
	//
	//	GLOBAL
	//
	//======================================================================
	
	SOD.stageX = 0;
	SOD.stageY = 0;
	SOD.frameRate = 30;
	SOD.frameRate_min = 10;
	SOD.updateDelay = 1000 / SOD.frameRate;
	SOD.updating = false;
	SOD.updating_physics2d = false;
	
	SOD.stats_enabled = true;
	SOD.stats_visible = false;
	
	SOD.requiredScripts = ['js/ckh/base/Box2DLoader.js', 'js/lib/canto-0.15.js'];
	
	SOD.version = '2011 March';
	
	// sounds properties
	SOD.sounds_enabled = true;
	SOD.updating_sound = false;
	SOD.sounds = {};
	SOD.sounds.updateDelay = SOD.updateDelay;
	SOD.sounds.duration_delta = 1 / SOD.frameRate;
	SOD.sounds.volume_init = 0;
	SOD.sounds.volume_base = 0.5;
	SOD.sounds.volume = SOD.sounds.volume_init;
	SOD.sounds.volume_init_fade_duration = 10000;
	SOD.sounds.bg = {};
	SOD.sounds.bg.url = "sounds/wonderful_time_tiny_tim.mp3";
	SOD.sounds.bg.duration = 18.899;
	
	// colors properties		
	SOD.colors = {	w: [255, 255, 255, 1],
					bl: [0, 0, 0, 1],
					c: [0, 255, 255, 1], 
					m: [255, 0, 255, 1], 
					y: [255, 255, 0, 1], 
					k: [0, 0, 0, 1],
					r: [255, 0, 0, 1],
					g: [0, 255, 0, 1],
					b: [0, 0, 255, 1],
					cs1_purple1: [153, 0, 255, 1],
					cs1_purple2: [102, 0, 255, 1],
					cs1_blue1: [0, 102, 255, 1],
					cs1_blue2: [0, 153, 255, 1],
					cs1_blue3: [0, 204, 255, 1],
					cs1_bluegreen: [0, 255, 204, 1],
					cs1_green1: [0, 255, 102, 1],
					cs1_green2: [53, 255, 102, 1],
					cs1_greenyellow: [102, 255, 0, 1],
					cs1_yellow: [204, 255, 0, 1],
					cs1_yellowred: [255, 204, 0, 1],
					cs1_orange: [255, 102, 0, 1],
					cs1_magenta: [255, 0, 102, 1],
					cs1_red: [255, 0, 204, 1]};
	SOD.colors.list = [SOD.colors.cs1_purple1, SOD.colors.cs1_blue2, SOD.colors.cs1_bluegreen, SOD.colors.cs1_green2, SOD.colors.cs1_yellow, SOD.colors.cs1_yellowred, SOD.colors.cs1_magenta, SOD.colors.cs1_red];
	
	// main properties
	SOD.m_p = {};
	SOD.m_p.minPageWidth = 900;
	SOD.m_p.minPageHeight = 600;
	SOD.m_p.loadCompleteDelayTime = 200;
	SOD.m_p.loadCompleteFadeTimeOut = 500;
	SOD.m_p.loadCompleteFadeTimeIn = 300;
	
	// physics 2D
	SOD.m_p.p2D = {};
	SOD.m_p.p2D.stepDelay = 10;
	SOD.m_p.p2D.stepDTMax = 1 / 25;
	SOD.m_p.p2D.stepDTMin = 1 / 75;
	SOD.m_p.p2D.iterationsPerStep = 1;
	SOD.m_p.p2D.worldWidth = 10000.0;
	SOD.m_p.p2D.worldHeight = 10000.0;
	SOD.m_p.p2D.gravityX = 0;
	SOD.m_p.p2D.gravityY = 600;
	SOD.m_p.p2D.wallThickness = 5;
	SOD.m_p.p2D.wall_restitution = 0.2;
	SOD.m_p.p2D.walls_size = 400;
	SOD.m_p.p2D.walls_rotation_speed = 0.02;
	SOD.m_p.p2D.draw_enabled = false;
	
	// mouse joint defaults
	SOD.m_p.mj = {};
	SOD.m_p.mj.force = 10000;
	SOD.m_p.mj.frequency = 10;
	SOD.m_p.mj.damping = 0;
	SOD.m_p.mj.userMouseRadius = 30;
	SOD.m_p.mj.userConnectRadius = 50;
	
	// head
	SOD.m_p.head = {};
	SOD.m_p.head.points = 10;
	SOD.m_p.head.r_x = 90;
	SOD.m_p.head.r_y = 80;
	SOD.m_p.head.color_offset = 0.25;
	SOD.m_p.head.physics = {};
	SOD.m_p.head.physics.friction = 0.5;
	SOD.m_p.head.physics.restitution = 0.6;
	SOD.m_p.head.physics.density = 1;
	SOD.m_p.head.physics.rotation_delta = 0.05;
	SOD.m_p.head.physics.rotation_base = 0;
	
	// head features
	SOD.m_p.head.features = {};
	
	// head mouth
	SOD.m_p.head.features.mouth = {};
	SOD.m_p.head.features.mouth.r_x = SOD.m_p.head.r_x * 0.45;
	SOD.m_p.head.features.mouth.r_y = SOD.m_p.head.r_y * 0.02;
	SOD.m_p.head.features.mouth.points = 6;
	SOD.m_p.head.features.mouth.offset_x = SOD.m_p.head.r_x * 0;
	SOD.m_p.head.features.mouth.offset_y = SOD.m_p.head.r_y * 0.56;
	SOD.m_p.head.features.mouth.event = {};
	SOD.m_p.head.features.mouth.event.r_x = SOD.m_p.head.r_x * 0.62;
	SOD.m_p.head.features.mouth.event.r_y = SOD.m_p.head.r_y * 0.31;
	SOD.m_p.head.features.mouth.event.points = 6;
	SOD.m_p.head.features.mouth.event.offset_x = SOD.m_p.head.r_x * 0;
	SOD.m_p.head.features.mouth.event.offset_y = SOD.m_p.head.r_y * 0.56;
	
	// head eyes
	SOD.m_p.head.features.eyes_event_point_pcts = [{x:0, y:0}, {x:(1/8), y:(1/8)}, {x:(2/8), y:(0.5/8)}, {x:(3/8), y:(3/8)}, {x:(4/8), y:(4/8)}, {x:(5/8), y:(5/8)}, {x:(6/8), y:(6/8)}, {x:(7/8), y:(7/8)}];
	SOD.m_p.head.features.eyes = [{r_x: SOD.m_p.head.r_x * 0.11, r_y: SOD.m_p.head.r_y * 0.17, points:8, offset_x: SOD.m_p.head.r_x * -0.60, offset_y: SOD.m_p.head.r_y * 0.21}, {r_x: SOD.m_p.head.r_x * 0.11, r_y: SOD.m_p.head.r_y * 0.17, points:8, offset_x: SOD.m_p.head.r_x * 0.60, offset_y: SOD.m_p.head.r_y * 0.21}];
	SOD.m_p.head.features.eyes.event = [{r_x: SOD.m_p.head.r_x * 0.11, r_y: SOD.m_p.head.r_y * 0.1, points:SOD.m_p.head.features.eyes_event_point_pcts, offset_x: SOD.m_p.head.r_x * -0.60, offset_y: SOD.m_p.head.r_y * 0.21}, {r_x: SOD.m_p.head.r_x * 0.11, r_y: SOD.m_p.head.r_y * 0.1, points:SOD.m_p.head.features.eyes_event_point_pcts, offset_x: SOD.m_p.head.r_x * 0.60, offset_y: SOD.m_p.head.r_y * 0.21}];
	
	// head event
	SOD.m_p.head.event = {};
	SOD.m_p.head.event.random_threshold = 0.01;
	SOD.m_p.head.event.velocity_threshold = 600;
	SOD.m_p.head.event.force_min = 0;
	SOD.m_p.head.event.force_max = 1;
	SOD.m_p.head.event.duration_min = 500;
	SOD.m_p.head.event.duration_max = 2000;
	SOD.m_p.head.event.steps = 6;
	SOD.m_p.head.event.cooldown = SOD.m_p.head.event.duration_max;
	SOD.m_p.head.event.pixels_min = 1;
	SOD.m_p.head.event.pixels_max = 50;
	SOD.m_p.head.event.pixels_size = 8;
	SOD.m_p.head.event.pixels_spawn_radius_x = Math.min(SOD.m_p.head.features.mouth.event.r_x, SOD.m_p.head.features.mouth.event.r_y) - SOD.m_p.head.event.pixels_size * 2;
	SOD.m_p.head.event.pixels_spawn_radius_y = SOD.m_p.head.event.pixels_spawn_radius_x;
	SOD.m_p.head.event.pixels_offset_x = 0;
	SOD.m_p.head.event.pixels_offset_y = 0.56;
	SOD.m_p.head.event.pixels_colors = SOD.colors.list;
	SOD.m_p.head.event.pixels_color_alpha = 1;
	SOD.m_p.head.event.pixels_color_index = 0;
	SOD.m_p.head.event.pixels_color_index_delta = SOD.m_p.head.event.pixels_colors.length / SOD.m_p.head.event.pixels_max;
	
	// head shadow
	SOD.m_p.head.shadow = {};
	SOD.m_p.head.shadow.width_pct = 2;
	SOD.m_p.head.shadow.height = 2;
	SOD.m_p.head.shadow.flicker_delta_base = 30;
	SOD.m_p.head.shadow.flicker_delta = SOD.m_p.head.shadow.flicker_delta_base;
	
	//======================================================================
	//
	//	UTILS
	//
	//======================================================================
	
	// loads a series of scripts via jQuery's getScript
	SOD.loadScripts = function (loadInfo) {
		var nextScript = loadInfo.scripts.shift();
		
		// load next script if exists
		if (typeof nextScript !== "undefined") {
			jQuery.getScript(nextScript, function () {
				loadInfo.completed++;
				// update callback if exists
				if (typeof loadInfo.updateCallback !== "undefined") {
					loadInfo.pct = loadInfo.completed / loadInfo.total;
					loadInfo.updateCallback(loadInfo.pct);
				}
				SOD.loadScripts(loadInfo);
			});
		}
		// else do final callback
		else {
			if (typeof loadInfo.finalCallback !== "undefined") {
				loadInfo.finalCallback();
			}
		}
	};
	
	//======================================================================
	//
	//	GETTERS / SETTERS
	//
	//======================================================================
	
	// page size
	SOD.pageWidth = function () {
		return Math.max(SOD.m_p.minPageWidth, window.innerWidth);
	};
	SOD.pageHeight = function () {
		return Math.max(SOD.m_p.minPageHeight, window.innerHeight);
	};
	
	//======================================================================
	//
	//	RESIZE
	//
	//======================================================================
	
	// resizes page
	SOD.resize_page = function () {
		document.body.innerWidth = this.pageWidth();
		document.body.innerHeight = this.pageHeight();
	};
	
	// resize canvas
	SOD.resize_stage = function () {
		if (typeof SOD.stage !== "undefined") {
			// set new stage size
			SOD.stageCanvas.width = SOD.pageWidth();
			SOD.stageCanvas.height = SOD.pageHeight();
		}
	};
	 
	// on window resize handler
	SOD.on_resize = function (e) {
		// resize page
		SOD.resize_page();
	
		// resize canvas
		SOD.resize_stage();
		
		// redraw
		SOD.draw();
		
		// reposition credits
		SOD.credits.width(150);
		SOD.credits.css({	"display":"block",
							"position":"absolute",
							"left":Math.max(0, SOD.pageWidth() - SOD.credits.width() - 10) + "px",
							"top":Math.max(0, SOD.pageHeight() - SOD.credits.height() - 10) + "px"
							});
	};
	
	//======================================================================
	//
	//	STAGE
	//
	//======================================================================
	
	// erases stage
	SOD.clearStage = function () {
		SOD.stage.clearRect(0, 0, SOD.pageWidth(), SOD.pageHeight());
	};
	
	//======================================================================
	//
	//	DRAW
	//
	//======================================================================
	
	// update
	SOD.update = function () {
		// stats
		if (SOD.stats_enabled === true) {
			SOD.stats.update();
		}
		
		// draw
		SOD.draw();
		
		// set timeout if to continue drawing
		if (SOD.updating === true) {
			clearTimeout(SOD.updateTimeoutId);
			SOD.updateTimeoutId = setTimeout(function () { SOD.update(); }, SOD.updateDelay);
		}
	};
	
	// default draw function
	SOD.draw = function () {
		// clear stage
		SOD.clearStage();
		
		// draw physics
		if(SOD.m_p.p2D.draw_enabled === true && typeof SOD.physics2D !== 'undefined') {
			SOD.physics2D.draw();
		}
		
		// draw head
		if(typeof SOD.head !== 'undefined') {
			SOD.head.update();
		}
	};
	
	// calculate regular polygon points
	SOD.get_regular_polygon_points = function (poly_info, add_half_stage_size) {
		var vertices, twopi = Math.PI * 2, center_pos, i;
		
		// verify poly info
		// points
		if (typeof poly_info.points === 'undefined') {
			poly_info.points = 10;
		}
		if (typeof poly_info.points.length === 'undefined') {
			var points_pcts = [];
			for(i = 0; i < poly_info.points; i++) {
				points_pcts[i] = {x:(i / poly_info.points), y:(i / poly_info.points)};
			}
			poly_info.points = points_pcts;
		}
		
		// init vertices
		vertices = Array(poly_info.points.length * 2);
		
		// radius
		if (typeof poly_info.r_x === 'undefined') {
			poly_info.r_x = 100;
		}
		if (typeof poly_info.r_y === 'undefined') {
			poly_info.r_y = 100;
		}
		
		// offset
		if (typeof poly_info.offset_x === 'undefined') {
			poly_info.offset_x = 0;
		}
		if (typeof poly_info.offset_y === 'undefined') {
			poly_info.offset_y = 0;
		}
		
		// position
		if (typeof poly_info.position === 'undefined') {
			center_pos = new b2Vec2(0, 0);
		}
		else {
			center_pos = new b2Vec2(poly_info.position.x, poly_info.position.y);
		}
		if (add_half_stage_size === true) {
			center_pos.x = center_pos.x + SOD.pageWidth() * 0.5;
			center_pos.y = center_pos.y + SOD.pageHeight() * 0.5;
		}
		
		// rotation matrix
		if (typeof poly_info.rotation_matrix === 'undefined') {
			poly_info.rotation_matrix = new b2Mat22();
		}
		
		// create each vertex on regular polygon
		for (i = 0; i < poly_info.points.length; i++) {
			var radian_x = twopi * poly_info.points[i].x;
			var radian_y = twopi * poly_info.points[i].y;
			var rad_cos = Math.cos(radian_x);
			var rad_sin = Math.sin(radian_y);
			var v_local = new b2Vec2(poly_info.r_x * rad_cos + poly_info.offset_x, poly_info.r_y * rad_sin + poly_info.offset_y);
			var v_rotated = b2Math.AddVV(center_pos, b2Math.b2MulMV(poly_info.rotation_matrix, v_local));
			vertices[i * 2] = v_rotated.x;
			vertices[i * 2 + 1] = v_rotated.y;
		}
		
		return vertices;
	};
	
	
	//======================================================================
	//
	//	SOUNDS
	//
	//======================================================================
	
	SOD.update_sound = function () {
		// if sound enabled
		if (SOD.sounds_enabled === true) {
			// check background loop
			if (SOD.sounds.bg.audio.currentTime + (SOD.sounds.duration_delta * 1) >= SOD.sounds.bg.duration || SOD.sounds.bg.audio.ended === true) {
				
				// swap audio files
				if(SOD.sounds.bg.audio === SOD.sounds.bg.audio_loop1) {
					SOD.sounds.bg.audio = SOD.sounds.bg.audio_loop2;
				}
				else {
					SOD.sounds.bg.audio = SOD.sounds.bg.audio_loop1;
				}
				
				// play audio
				SOD.sounds.bg.audio.play();
			}
			
			// set volume of all currently playing audio
			SOD.sounds.bg.audio.volume = SOD.sounds.volume;
			
			// set timeout if to continue updating
			if (SOD.updating_sound === true) {
				clearTimeout(SOD.sounds.updateTimeoutId);
				SOD.sounds.updateTimeoutId = setTimeout(function () { SOD.update_sound(); }, SOD.sounds.updateDelay);
			}
		}
	};
	
	// shifts volume over time
	SOD.volume_change = function (volume_target, duration) {
		// store target volume
		SOD.sounds.volume_update_target = volume_target;
		
		// if volume currently updating
		if (SOD.sounds.volume_updating === true) {
			clearTimeout(SOD.sounds.volume_update_timeoutId);
		}
		
		// if audio volume does not equal target volume
		if (SOD.sounds.volume !== SOD.sounds.volume_update_target) {
			
			// set timeout to update sound volume
			SOD.sounds.volume_updating = true;
			
			// set duration
			SOD.sounds.volume_update_duration = duration;
			
			// set time
			SOD.sounds.volume_update_time = 0;
			
			// set update delay
			SOD.sounds.volume_update_delay = SOD.sounds.volume_update_duration / SOD.frameRate;
			
			// set volume delta
			SOD.sounds.volume_update_delta = (SOD.sounds.volume_update_target - SOD.sounds.volume) / SOD.frameRate;
			
			// start updating
			SOD.volume_update();
		}
	};
	
	// update volume
	SOD.volume_update = function () {
		// increase volume
		SOD.sounds.volume = Math.round((SOD.sounds.volume + SOD.sounds.volume_update_delta) * 1000) / 1000;
		
		// increase time
		SOD.sounds.volume_update_time = SOD.sounds.volume_update_time + SOD.sounds.volume_update_delay;
		
		// check time
		if (SOD.sounds.volume_update_time >= SOD.sounds.volume_update_duration) {
			SOD.sounds.volume_updating = false;
			SOD.sounds.volume = SOD.sounds.volume_update_target;
		}
		
		// set timeout if should continue updating
		if (SOD.sounds.volume_updating === true) {
			clearTimeout(SOD.sounds.volume_update_timeoutId);
			SOD.sounds.volume_update_timeoutId = setTimeout(function () { SOD.volume_update(); }, SOD.sounds.volume_update_delay);
		}
	};
	
	
	//======================================================================
	//
	//	MATH
	//
	//======================================================================
	
	/* 
	*	checks if value is number
	*/
	SOD.isNumber = function (value) {
		return typeof value === 'number' && isFinite(value);
	};
	
	//======================================================================
	//
	//	PHYSICS 2D
	//
	//======================================================================
	
	// init physics 2D setup
	SOD.initPhysics2D = function () {
		// init physics 2D object
		SOD.physics2D = SOD.createPhysics2DEngine();
	};
	
	// create physics 2D world and return
	SOD.createPhysics2DEngine = function () {
		
		var p2D = {};
		SOD = SOD;
		p2D.stepping = false;
		p2D.updating_self = false;
		p2D.stepDelay = SOD.m_p.p2D.stepDelay;
		p2D.stepDTMin = SOD.m_p.p2D.stepDTMin;
		p2D.stepDTMax = SOD.m_p.p2D.stepDTMax;
		p2D.stepDT = p2D.stepDTMin;
		p2D.iterationsPerStep = SOD.m_p.p2D.iterationsPerStep;
		p2D.worldWidth = SOD.m_p.p2D.worldWidth;
		p2D.worldHeight = SOD.m_p.p2D.worldHeight;
		p2D.gravityX = SOD.m_p.p2D.gravityX;
		p2D.gravityY = SOD.m_p.p2D.gravityY;
		p2D.wallThickness = SOD.m_p.p2D.wallThickness;
		p2D.wall_restitution = SOD.m_p.p2D.wall_restitution;
		
		// init backend visual properties
		p2D.backendVisualInfo = {};
		var bevi = p2D.backendVisualInfo;
		bevi.shapePaint = {fillStyle: "rgba(0, 255, 255, 0.1)", lineWidth: 1, strokeStyle: "rgba(0, 255, 255, 1)"};
		bevi.jointPaint = {lineWidth: 1, strokeStyle: "rgba(0, 0, 255, 1)"};
	
		// init worldAABB
		p2D.worldAABB = new b2AABB();
		p2D.worldAABB.minVertex.Set(-p2D.worldWidth * 0.5, -p2D.worldHeight * 0.5);
		p2D.worldAABB.maxVertex.Set(p2D.worldWidth * 0.5, p2D.worldHeight * 0.5);
		
		// init world
		p2D.gravity = new b2Vec2(p2D.gravityX, p2D.gravityY);
		p2D.doSleep = true;
		p2D.world = new b2World(p2D.worldAABB, p2D.gravity, p2D.doSleep);
		
		// init mouse connections list
		p2D.mouse_connections = [];
		
		// init mouse connectable list
		p2D.mouse_connectable = [];
		
		// init functions
		// starts physics 2D world
		p2D.start = function (updateSelf) {
			// add resize listener
			jQuery(window).bind('resize', p2D.resize);
			
			// start stepping
			p2D.stepping = true;
			p2D.updating_self = (typeof updateSelf !== 'undefined') ? updateSelf : false;
			p2D.step();	
		};
		
		// stops/pauses physics 2D world
		p2D.stop = function () {
			// remove resize listener
			jQuery(window).unbind('resize', p2D.resize);
				
			// stop stepping
			p2D.stepping = false;
			p2D.updating_self = false;
		};
		
		// steps physics 2D world
		p2D.step = function () {
			var timeStep = p2D.stepDT, iterations = p2D.iterationsPerStep, i;
			
			// step world
			p2D.world.Step(timeStep, iterations);
			
			// update time step based on fps
			if (SOD.stats_enabled === true) {
				p2D.stepDT = SOD.m_p.p2D.stepDTMin + (SOD.m_p.p2D.stepDTMax - SOD.m_p.p2D.stepDTMin) * (1 - Math.min(1, (Math.max(0, SOD.stats.fps - SOD.frameRate_min) / (SOD.frameRate - SOD.frameRate_min))));
			}
			
			// set interval for next step, if needed
			if (p2D.updating_self === true) {
				clearTimeout(p2D.stepTimeoutId);
				p2D.stepTimeoutId = setTimeout(function () { p2D.step(); }, p2D.stepDelay);
			}
		};
		
		// resize
		p2D.resize = function () {
			
		};
		
		// creates basic environment
		p2D.setBasicEnvironment = function () {
			// walls
			p2D.setWalls();
		};
		
		// creates walls for physics 2D world based on page size
		p2D.setWalls = function () {
			var world = p2D.world, walls_by_rotation, i;
			
			// wall create function
			var createWall = function (world, x, y, width, height) {
				var boxSd = new b2BoxDef(), boxBd = new b2BodyDef();
				// wall shape
				boxSd.restitution = 0;
				boxSd.friction = 1;
				boxSd.extents.Set(width, height);
				// wall body
				boxBd.AddShape(boxSd);
				boxBd.position.Set(x,y);
				// create and return
				return world.CreateBody(boxBd);
			};
			
			// destroy all current
			p2D.destroyWalls();			
						
			// store walls
			walls_by_rotation = [Math.PI * 1.5, Math.PI * 0.5, Math.PI, 0];
						
			// create walls
			p2D.walls = [];
			for (i = 0; i < walls_by_rotation.length; i++) {
				p2D.walls[i] = createWall(world, SOD.m_p.p2D.walls_size * 0.5, 0, p2D.wallThickness, SOD.m_p.p2D.walls_size * 0.5 + p2D.wallThickness);
			}
			
			// update walls
			p2D.updateWalls(0, 0, walls_by_rotation);
		};
		
		// updates all walls in physics 2D world
		p2D.updateWalls = function (position_delta, rotation_delta, absolute_rotations_by_wall) {
			var wall, wall_pos, wall_rot, set_absolute_rotation = false, i;
			
			// get if position change passed
			if (typeof position_delta === 'undefined') {
				position_delta = 0;
			}
			
			// get if rotations change passed
			if (typeof rotation_delta === 'undefined') {
				rotation_delta = 0;
			}
			
			// get if absolute rotations passed
			if (typeof absolute_rotations_by_wall !== 'undefined') {
				set_absolute_rotation = true;
			}
			
			// update position and rotation of walls
			for (i = 0; i < p2D.walls.length; i++) {
				wall = p2D.walls[i];
				if (set_absolute_rotation) {
					wall_rot = absolute_rotations_by_wall[i];
				}
				else {
					wall_rot = wall.m_rotation;
				}
				wall_rot = (wall_rot + rotation_delta) % (Math.PI * 2);
				
				wall_pos = wall.m_position;
				wall_pos.x = position_delta + SOD.m_p.p2D.walls_size * 0.5 * Math.cos(wall_rot);
				wall_pos.y = position_delta + SOD.m_p.p2D.walls_size * 0.5 * Math.sin(wall_rot);
				
				wall.SetCenterPosition(wall_pos, wall_rot);
			}
		};
		
		// destroys all walls in physics 2D world
		p2D.destroyWalls = function () {
			var world = p2D.world, i;
			
			if(typeof p2D.walls !== "undefined") {
				for(i = p2D.walls.length - 1; i >= 0; i--) {
					world.DestroyBody(p2D.walls.splice(i, 1)[0]);
				}
			}
		};
		
		// draws interpreted physics data
		p2D.draw = function () {
			// draw backend
			p2D.drawBE();
		};
		
		// draws backend
		p2D.drawBE = function () {
			var bevi = p2D.backendVisualInfo, j, b, s;
			
			// draw mouse joints
			p2D.drawMouseJoints();
			
			// draw joints
			for (j = p2D.world.m_jointList; j !== null; j = j.m_next) {
				p2D.drawJointBE(j, true, true);
				
				SOD.stage.stroke(bevi.jointStroke);
			}
			
			// draw bodies
			for (b = p2D.world.m_bodyList; b; b = b.m_next) {
				for (s = b.GetShapeList(); s !== null; s = s.GetNext()) {
					p2D.drawShapeBE(s);
				}
			}
		};
		
		// draws mouse connection
		p2D.drawMouseJoints = function () {
			var bevi = p2D.backendVisualInfo, mcList = p2D.mouse_connections, i, b;
			for(i = 0; i < mcList.length; i++) {
				p2D.drawJointBE(mcList[i], true, true);
				SOD.stage.stroke(bevi.jointStroke);
			}
		};
		
		// draws backend joint
		p2D.drawJointBE = function (joint, beginPath, endPath, drawAsCurve, nextJointForCurve, prevJointForCurve) {
			var sMidW = SOD.pageWidth() * 0.5, sMidH = SOD.pageHeight() * 0.5, i;
			
			// if constant volume (collection of distance joints), recursive
			if (joint.m_type === b2Joint.e_constantVolumeJoint) {
				for(i = 0; i < joint.distanceJoints.length; i++) {
					if (p2D.cvjDrawCurved) {
						nextJointForCurve = (i === joint.distanceJoints.length - 1) ? joint.distanceJoints[0] : joint.distanceJoints[i + 1];
						prevJointForCurve = (i === 0) ? joint.distanceJoints[joint.distanceJoints.length - 1] : joint.distanceJoints[i - 1];
					}
					p2D.drawJointBE(joint.distanceJoints[i], ((i === 0) ? true : false), ((i === joint.distanceJoints.length - 1) ? true : false), p2D.cvjDrawCurved, nextJointForCurve, prevJointForCurve);
				}
			}
			// else draw joint
			else {
				var b1 = joint.m_body1, b2 = joint.m_body2, p1 = joint.GetAnchor1(), p2 = joint.GetAnchor2(), 
					bp1x = sMidW + b1.m_position.x, bp1y = sMidH + b1.m_position.y, 
					bp2x = sMidW + b2.m_position.x, bp2y = sMidH + b2.m_position.y,
					jp1x = sMidW + p1.x, jp1y = sMidH + p1.y,
					jp2x = sMidW + p2.x, jp2y = sMidH + p2.y,
					p3, jp3x, jp3y, p0, jp0x, jp0y, p3p1DX, p3p1DY, p0p2DX, p0p2DY, cpMod, cp1x, cp1y, cp2x, cp2y;
					
				if (beginPath === true) {
					SOD.stage.beginPath();
				}
				
				// create path
				if (joint.m_type === b2Joint.e_distanceJoint) {
					if (beginPath === true) {
						SOD.stage.moveTo(jp1x, jp1y);
					}
					if (drawAsCurve && typeof nextJointForCurve !== "undefined" && typeof prevJointForCurve !== "undefined") {
						p3 = nextJointForCurve.GetAnchor2();
						jp3x = sMidW + p3.x;
						jp3y = sMidH + p3.y;
						p0 = prevJointForCurve.GetAnchor1();
						jp0x = sMidW + p0.x;
						jp0y = sMidH + p0.y;
						p3p1DX = jp1x - jp3x;
						p3p1DY = jp1y - jp3y; 
						p0p2DX = jp2x - jp0x;
						p0p2DY = jp2y - jp0y;
						cpMod = 0.25;
						cp1x = jp1x + p0p2DX * cpMod;
						cp1y = jp1y + p0p2DY * cpMod;
						cp2x = jp2x + p3p1DX * cpMod;
						cp2y = jp2y + p3p1DY * cpMod;
						
						SOD.stage.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, jp2x, jp2y);
					}
					else {
						SOD.stage.lineTo(jp2x, jp2y);
					}
				}
				else {
					if (b1 === this.world.m_groundBody) {
						if (beginPath === true) {
							SOD.stage.moveTo(jp1x, jp1y);
						}
						SOD.stage.lineTo(bp2x, bp2y);
					}
					else if (b2 === this.world.m_groundBody) {
						if (beginPath === true) {
							SOD.stage.moveTo(jp1x, jp1y);
						}
						SOD.stage.lineTo(bp1x, bp1y);
					}
					else {
						if (beginPath === true) {
							SOD.stage.moveTo(bp1x, bp1y);
						}
						SOD.stage.lineTo(jp1x, jp1y);
						SOD.stage.lineTo(bp2x, bp2y);
						SOD.stage.lineTo(jp2x, jp2y);
					}
				}
				
				if (endPath === true) {
					SOD.stage.closePath();
				}
			}
		};
		
		// draws backend shape
		p2D.drawShapeBE = function (shape) {
			var bevi = p2D.backendVisualInfo, sMidW = SOD.pageWidth() * 0.5, sMidH = SOD.pageHeight() * 0.5, i;
			
			// begin shape path
			SOD.stage.beginPath();
			
			// draw by shape
			if (shape.m_type === b2Shape.e_circleShape) {
				SOD.stage.ellipse(sMidW + shape.m_position.x, sMidH + shape.m_position.y, shape.m_radius, shape.m_radius);
		
				// draw rotation / radius
				SOD.stage.moveTo(sMidW + shape.m_position.x, sMidH + shape.m_position.y);
				var ax = shape.m_R.col1;
				var pos2 = new b2Vec2(sMidW + shape.m_position.x + shape.m_radius * ax.x, sMidH + shape.m_position.y + shape.m_radius * ax.y);
				SOD.stage.lineTo(pos2.x, pos2.y);
			}
			else if (shape.m_type === b2Shape.e_polyShape) {
				var tV = b2Math.AddVV(shape.m_position, b2Math.b2MulMV(shape.m_R, shape.m_vertices[0]));
				SOD.stage.moveTo(sMidW + tV.x, sMidH + tV.y);
				for (i = 0; i < shape.m_vertexCount; i++) {
					var v = b2Math.AddVV(shape.m_position, b2Math.b2MulMV(shape.m_R, shape.m_vertices[i]));
					SOD.stage.lineTo(sMidW + v.x, sMidH + v.y);
				}
				SOD.stage.lineTo(sMidW + tV.x, sMidH + tV.y);
			}
			
			// end shape path
			SOD.stage.paint(bevi.shapePaint).closePath();
		};
		
		// physics mouse joint create
		p2D.createMouseJoint = function (id, mousePos, itarget, maxForceMod, frequency, damping) {
			var world = p2D.world;
			var mjd = new b2MouseJointDef();
			var mjdMaxForceMod = (typeof maxForceMod !== "undefined") ? maxForceMod : p2D.mouseForce;
			mjd.body1 = world.GetGroundBody();
			mjd.body2 = itarget;
			mjd.target.SetV(itarget.GetCenterPosition()); //mousePos
			mjd.maxForce = mjdMaxForceMod * itarget.GetMass();
			mjd.frequencyHz = (typeof frequency !== "undefined") ? frequency : 10.0;
			mjd.dampingRatio = (typeof damping !== "undefined") ? damping : 1.0;
			
			var newMJ = world.CreateJoint(mjd);
			newMJ.SetTarget(mousePos);
			newMJ.p2DBodyRef = itarget;
			newMJ.id = id;
			
			return newMJ;
		};
		
		// physics mouse joint destroy
		p2D.destroyMouseJoint = function (mjRef) {
			p2D.world.DestroyJoint(mjRef);
		};
		
		// create walls
		p2D.setBasicEnvironment();
		
		return p2D;
	};
	
	//======================================================================
	//
	//	MAIN OBJECT
	//
	//======================================================================
	
	SOD.init_head = function () {
		var radians_per_vertex, radian, i;
		
		SOD.head = {};
		SOD.head.speed = 0;
		SOD.head.speed_pct = (SOD.head.speed / SOD.m_p.head.speed_max);
		SOD.head.direction = 0;
		SOD.head.position = new b2Vec2(0, 0);
		
		// init physics
		SOD.head.physics = {};
		
		// primary object
		var objSd = new b2PolyDef(), objBd = new b2BodyDef();
		// shape
		objSd.density = SOD.m_p.head.physics.density;
		objSd.restitution = SOD.m_p.head.physics.restitution;
		objSd.friction = SOD.m_p.head.physics.friction;
		
		objSd.vertices = [];
		objSd.vertexCount = SOD.m_p.head.points;
		radians_per_vertex = (Math.PI * 2) / objSd.vertexCount;
		
		// approximate ellipse shape based on num points and radii
		for (i = 0; i < objSd.vertexCount; i++) {
			radian = radians_per_vertex * i;
			objSd.vertices[i] = new b2Vec2(SOD.m_p.head.r_x * Math.cos(radian), SOD.m_p.head.r_y * Math.sin(radian));
		}
		
		// body
		objBd.AddShape(objSd);
		objBd.position.Set(SOD.head.position.x, SOD.head.position.y);
		
		SOD.head.physics.obj = {};
		SOD.head.physics.obj.body = SOD.physics2D.world.CreateBody(objBd);
		SOD.head.physics.obj.shape = SOD.head.physics.obj.body.m_shapeList;
		
		// add to mouse connectable list
		SOD.physics2D.mouse_connectable.push(SOD.head.physics.obj);
		
		// pixels list (for event)
		SOD.head.physics.pixels = [];
		
		// physics create pixel and return
		SOD.head.physics.create_pixel = function (world, x, y, radius, density, friction, restitution) {
			var boxSd = new b2BoxDef(), boxBd = new b2BodyDef(), pixel, pixel_color, pixel_color_index;
			// shape
			boxSd.density = (typeof density !== "undefined") ? density : 0.1;
			boxSd.friction = (typeof friction !== "undefined") ? friction : 0;
			boxSd.restitution = (typeof restitution !== "undefined") ? restitution : 0.2;
			boxSd.extents.Set(radius, radius);
			
			// body
			boxBd.AddShape(boxSd);
			boxBd.position.Set(x,y);
			
			// create
			pixel = world.CreateBody(boxBd);
			
			// store size
			pixel.m_draw_size = radius;
			
			// update color properties
			SOD.m_p.head.event.pixels_color_index = SOD.m_p.head.event.pixels_color_index + SOD.m_p.head.event.pixels_color_index_delta;
			if (SOD.m_p.head.event.pixels_color_index >= SOD.m_p.head.event.pixels_colors.length || SOD.m_p.head.event.pixels_color_index <= 0) {
				SOD.m_p.head.event.pixels_color_index_delta = -SOD.m_p.head.event.pixels_color_index_delta;
				SOD.m_p.head.event.pixels_color_index = SOD.m_p.head.event.pixels_color_index + SOD.m_p.head.event.pixels_color_index_delta;
			}
			
			// assign color
			pixel_color = SOD.m_p.head.event.pixels_colors[Math.floor(SOD.m_p.head.event.pixels_color_index)];
			pixel.m_draw_color = "rgba(" + String(pixel_color[0]) + "," + String(pixel_color[1]) + "," + String(pixel_color[2]) + "," + String(SOD.m_p.head.event.pixels_color_alpha) + ")";
			
			// add to list of pixels
			SOD.head.physics.pixels[SOD.head.physics.pixels.length] = pixel;
			
			return pixel;
		};
		
		// destroy pixel
		SOD.head.physics.destroy_pixel = function (pixel) {
			var i;
			
			// find pixel in list
			for (i = SOD.head.physics.pixels.length - 1; i >= 0; i--) {
				if (SOD.head.physics.pixels[i] === pixel) {
					// remove from list
					SOD.head.physics.pixels.splice(i, 1);
					break;
				}
			}
			
			// destroy in world
			pixel.GetWorld().DestroyBody(pixel);
		};
		
		// update pixels
		SOD.head.physics.update_pixels = function () {
			var s_c_x = SOD.pageWidth() * 0.5, s_c_y = SOD.pageHeight() * 0.5, pixel, pixel_c, i;
			
			// for each pixel
			for (i = SOD.head.physics.pixels.length - 1; i >= 0; i--) {
				pixel = SOD.head.physics.pixels[i];
				pixel_c = pixel.GetCenterPosition();
				
				if (pixel_c.y - SOD.m_p.head.event.pixels_size >= s_c_y || pixel_c.x + SOD.m_p.head.event.pixels_size <= -s_c_x || pixel_c.y - SOD.m_p.head.event.pixels_size >= s_c_x || pixel_c.y + SOD.m_p.head.event.pixels_size <= -s_c_y) {
					// destroy
					SOD.head.physics.destroy_pixel(pixel);
				}
			}
		};
		
		// update physics function
		SOD.head.physics.update = function () {
			var p2D = SOD.physics2D, head_rotation_delta = 0, head_updated_rotation = SOD.head.physics.obj.body.m_rotation % (Math.PI * 2), mouse_connection, head_mouse_connected, po_velocity, event_triggered = false, i;
			
			// update walls
			p2D.updateWalls(0, SOD.m_p.p2D.walls_rotation_speed);
			
			// shift head always towards correct rotation if not rotating
			if (head_updated_rotation !== SOD.m_p.head.physics.rotation_base && Math.abs(SOD.head.physics.obj.body.m_rotation_last - head_updated_rotation) <= SOD.m_p.head.physics.rotation_delta) {
				
				if (Math.abs(head_updated_rotation) <= SOD.m_p.head.physics.rotation_delta) {
					head_updated_rotation = SOD.m_p.head.physics.rotation_base;
				}
				else {
					if (head_updated_rotation <= Math.PI + SOD.m_p.head.physics.rotation_base && head_updated_rotation > SOD.m_p.head.physics.rotation_base || head_updated_rotation < -Math.PI + SOD.m_p.head.physics.rotation_base) {
						head_rotation_delta = -SOD.m_p.head.physics.rotation_delta;
					} 
					else if (head_updated_rotation >= -Math.PI + SOD.m_p.head.physics.rotation_base && head_updated_rotation < SOD.m_p.head.physics.rotation_base || head_updated_rotation > Math.PI + SOD.m_p.head.physics.rotation_base) {
						head_rotation_delta = SOD.m_p.head.physics.rotation_delta;
					}
					head_updated_rotation = head_updated_rotation + head_rotation_delta;
				}
			}
			
			// set rotation
			SOD.head.physics.obj.body.SetCenterPosition(SOD.head.physics.obj.body.m_position, head_updated_rotation);
			
			// store this rotation
			SOD.head.physics.obj.body.m_rotation_last = SOD.head.physics.obj.body.m_rotation;
			
			// if event is not already in progress
			if (SOD.head.event.in_progress !== true) {
				
				// get velocity
				po_velocity = SOD.head.physics.obj.body.m_linearVelocity;
					
				// check if is above threshold
				if (Math.abs(po_velocity.x) >= SOD.m_p.head.event.velocity_threshold || Math.abs(po_velocity.y) >= SOD.m_p.head.event.velocity_threshold) {
					event_triggered = true;
					SOD.head.event.force = Math.random() * (SOD.m_p.head.event.force_max - SOD.m_p.head.event.force_min) + SOD.m_p.head.event.force_min;
				}
				
				// random chance to trigger event
				if (event_triggered === false && Math.random() <= SOD.m_p.head.event.random_threshold) {
					event_triggered = true;
					SOD.head.event.force = Math.random() * (SOD.m_p.head.event.force_max - SOD.m_p.head.event.force_min) + SOD.m_p.head.event.force_min;
				}
				
				// if event triggered
				if (event_triggered) {
					// set in progress
					SOD.head.event.in_progress = true;
					
					// start cooldown, duration based on force
					SOD.head.event.cooldown = setTimeout(function () {
						// clear timeout
						clearTimeout(SOD.head.event.cooldown);
						// set not in progress
						SOD.head.event.in_progress = false;
					}, Math.round(SOD.m_p.head.event.duration_min + (SOD.m_p.head.event.duration_max - SOD.m_p.head.event.duration_min) * SOD.head.event.force));
				}
			}
			
			// update pixels
			SOD.head.physics.update_pixels();
		};
		
		// init event object
		SOD.head.event = {};
		SOD.head.event.in_progress = false;
		SOD.head.event.force = 0;
		SOD.head.event.position = new b2Vec2(0, 0);
		
		// update event function
		SOD.head.event.update = function () {
			var p2D = SOD.physics2D, event_force_part, physObj, po_rot_cos, po_rot_sin, po_local_bb, num_pixels, pixel, p_x, p_y, e_offset_x, e_offset_y, i;
			
			// get physics object information
			physObj = SOD.head.physics.obj;
			SOD.m_p.head.position = physObj.body.m_position;
			SOD.m_p.head.rotation = SOD.head.physics.obj.body.m_rotation;
			SOD.m_p.head.rotation_matrix = SOD.head.physics.obj.shape.m_R;
			po_rot_cos = Math.cos(SOD.m_p.head.rotation + Math.PI * 0.5);
			po_rot_sin = Math.sin(SOD.m_p.head.rotation + Math.PI * 0.5);
			
			// get offsets
			e_offset_x = SOD.m_p.head.r_x * po_rot_cos * SOD.m_p.head.event.pixels_offset_x + SOD.m_p.head.r_y * po_rot_cos * SOD.m_p.head.event.pixels_offset_y;
			e_offset_y = SOD.m_p.head.r_y * po_rot_sin * SOD.m_p.head.event.pixels_offset_y + SOD.m_p.head.r_x * po_rot_sin * SOD.m_p.head.event.pixels_offset_x;
			
			// store event position
			SOD.head.event.position.Set(SOD.m_p.head.position.x + e_offset_x, SOD.m_p.head.position.y + e_offset_y);
			
			// if is in progress
			if (SOD.head.event.in_progress) {
						
				// store event force of current round
				event_force_part = (SOD.head.event.force / SOD.m_p.head.event.steps);
				
				// decrease event force in steps
				SOD.head.event.force = SOD.head.event.force - event_force_part;
				
				// set num pixels by force
				num_pixels = Math.round(SOD.m_p.head.event.pixels_min + (SOD.m_p.head.event.pixels_max - SOD.m_p.head.event.pixels_min) * event_force_part);
				
				// get bounding box
				po_local_bb = SOD.head.physics.obj.shape.m_localOBB;
				
				// create num pixels and add to pixels list
				for (i = 0; i < num_pixels; i++) {
					// get initial position
					p_x = SOD.head.event.position.x + Math.random() * (2 * SOD.m_p.head.event.pixels_spawn_radius_x) - SOD.m_p.head.event.pixels_spawn_radius_x;
					p_y = SOD.head.event.position.y + Math.random() * (2 * SOD.m_p.head.event.pixels_spawn_radius_y) - SOD.m_p.head.event.pixels_spawn_radius_y;
					
					// create
					pixel = SOD.head.physics.create_pixel(p2D.world, p_x, p_y, SOD.m_p.head.event.pixels_size);
				}
			}
		};
		
		// functions
		// update
		SOD.head.update = function () {
			// physics update
			SOD.head.physics.update();
			
			// event update
			SOD.head.event.update();
			
			// visual side
			SOD.head.visual_update();
		};
		
		// visual
		SOD.head.visual_update = function () {
			var s = SOD.stage, p2D = SOD.physics2D, c_p = new b2Vec2(SOD.pageWidth() * 0.5, SOD.pageHeight() * 0.5), physObj = SOD.head.physics.obj, head_p = SOD.m_p.head, mouth_p, eyes_p, head_base_color, head_eye_color, head_mouth_color, head_poly, mouth_poly, eye_poly, walls_rotation_base, wi_width, wi_height, wi_color_offset, wi_color, i;
			
			// if event in progress
			if (SOD.head.event.in_progress === true) {
				eyes_p = head_p.features.eyes.event;
				mouth_p = head_p.features.mouth.event;
			}
			else {
				eyes_p = head_p.features.eyes;
				mouth_p = head_p.features.mouth;
			}
			
			// get base rotation from 4th wall (right)
			walls_rotation_base = p2D.walls[3].m_rotation - SOD.m_p.p2D.walls_rotation_speed;
			
			// get inner properties
			wi_width = SOD.m_p.p2D.walls_size - SOD.physics2D.wallThickness * 1.75;
			wi_height = SOD.m_p.p2D.walls_size - SOD.physics2D.wallThickness * 1.75;
			wi_r = (SOD.m_p.p2D.walls_size + SOD.physics2D.wallThickness * 5.75) * 0.5;
			
			// create inner color
			wi_color_offset = 0.1;
			wi_color = s.createRadialGradient(c_p.x - wi_width * wi_color_offset, c_p.y - wi_height * wi_color_offset, 0, c_p.x - wi_width * wi_color_offset, c_p.y - wi_height * wi_color_offset, wi_r + wi_r * wi_color_offset,  0.4, "rgba(144, 143, 138, 1)", 1, "rgba(100, 101, 96, 1)");
			
			// draw walled area
			s.beginPath().rect(c_p.x, c_p.y, wi_width, wi_height, 0, walls_rotation_base).closePath().fill("fillStyle", wi_color);
			
			// create head color
			head_base_color = s.createRadialGradient(c_p.x  + head_p.position.x - head_p.r_x * head_p.color_offset, c_p.y + head_p.position.y - head_p.r_y * head_p.color_offset, 0, c_p.x + head_p.position.x - head_p.r_x * head_p.color_offset, c_p.y + head_p.position.y - head_p.r_y * head_p.color_offset, Math.max(head_p.r_x, head_p.r_y) + Math.max(head_p.r_x, head_p.r_y) * head_p.color_offset, 0.5, "rgba(254, 253, 248, 1)", 0.7, "rgba(241, 237, 234, 1)", 1, "rgba(150, 151, 146, 1)");
			
			// draw head base
			head_poly = SOD.get_regular_polygon_points(head_p, true);
			s.beginPath().polygon.apply(s, head_poly).closePath().fill("fillStyle", head_base_color);
			
			// draw eyes
			for (i = 0; i < eyes_p.length; i++) {
				// position
				eyes_p[i].position = new b2Vec2(head_p.position.x, head_p.position.y);
				
				// rotation matrix
				eyes_p[i].rotation_matrix = head_p.rotation_matrix;
				
				// color
				var eye_pos_x = eyes_p[i].offset_x - eyes_p[i].r_x * head_p.color_offset;
				var eye_pos_y = eyes_p[i].offset_y - eyes_p[i].r_y * head_p.color_offset;
				var eye_pos_local = new b2Vec2(eye_pos_x, eye_pos_y);
				var eye_pos_rotated = b2Math.AddVV(c_p, b2Math.AddVV(eyes_p[i].position, b2Math.b2MulMV(eyes_p[i].rotation_matrix, eye_pos_local)));
				head_eye_color = s.createRadialGradient(eye_pos_rotated.x, eye_pos_rotated.y, 0, eye_pos_rotated.x, eye_pos_rotated.y, Math.max(eyes_p[i].r_x, eyes_p[i].r_y) + Math.max(eyes_p[i].r_x, eyes_p[i].r_y) * head_p.color_offset, 0.3, "rgba(64, 63, 58, 1)", 1, "rgba(0, 0, 0, 1)");
				
				// draw
				eye_poly = SOD.get_regular_polygon_points(eyes_p[i], true);
				s.beginPath().polygon.apply(s, eye_poly).closePath().fill("fillStyle", head_eye_color);
			}
			
			
			// draw mouth
			// position
			mouth_p.position = new b2Vec2(head_p.position.x, head_p.position.y);
			
			// rotation matrix
			mouth_p.rotation_matrix = head_p.rotation_matrix;
			
			var mouth_pos_x = mouth_p.offset_x - mouth_p.r_x * head_p.color_offset;
			var mouth_pos_y = mouth_p.offset_y - mouth_p.r_y * head_p.color_offset;
			var mouth_pos_local = new b2Vec2(mouth_pos_x, mouth_pos_y);
			var mouth_pos_rotated = b2Math.AddVV(c_p, b2Math.AddVV(mouth_p.position, b2Math.b2MulMV(mouth_p.rotation_matrix, mouth_pos_local)));
			
			// color
			head_mouth_color = s.createRadialGradient(mouth_pos_rotated.x, mouth_pos_rotated.y, 0, mouth_pos_rotated.x, mouth_pos_rotated.y, Math.max(mouth_p.r_x, mouth_p.r_y) + Math.max(mouth_p.r_x, mouth_p.r_y) * head_p.color_offset, 0.5, "rgba(0, 0, 0, 1)", 1,"rgba(64, 63, 58, 1)");
			
			// draw
			mouth_poly = SOD.get_regular_polygon_points(mouth_p, true);
			s.beginPath().polygon.apply(s, mouth_poly).closePath().fill("fillStyle", head_mouth_color);
			
			// draw pixels
			// for each pixel
			for (i = SOD.head.physics.pixels.length - 1; i >= 0; i--) {
				var pixel = SOD.head.physics.pixels[i];
				var pixel_c = pixel.GetCenterPosition();
				var pixel_rot = pixel.GetRotation();
				
				// draw rect
				s.beginPath().rect(c_p.x + pixel_c.x, c_p.y + pixel_c.y, pixel.m_draw_size * 2, pixel.m_draw_size * 2, 0, pixel_rot).closePath().fill("fillStyle", pixel.m_draw_color);
			}
		};
	};
	
	//======================================================================
	//
	//	MOUSE
	//
	//======================================================================
	
	// initialize mouse interactivity
	SOD.init_mouse = function () {
		SOD.addMousePhysicsInteraction();
	};
	
	// physics mouse interaction // add
	SOD.addMousePhysicsInteraction = function () {
		// mouse up / down
		jQuery(SOD.stageCanvas).bind('mousedown touchstart', SOD.mouse_down).bind('mouseup touchend', SOD.mouse_up);
		jQuery(SOD.container).bind('mouseleave', SOD.mouse_leave);
	};
	
	// physics mouse interaction // remove
	SOD.removeMousePhysicsInteraction = function () {	
		// mouse up / down
		jQuery(SOD.stageCanvas).unbind('mousedown touchstart', SOD.mouse_down).unbind('mouseup touchend', SOD.mouse_up);
		jQuery(SOD.container).unbind('mouseleave', SOD.mouse_leave);
	};
	
	// physics mouse down
	SOD.mouse_down = function (event, id) {
		var oEvent = event.originalEvent, i, t;
		
		// get if is touch event
		if (typeof oEvent !== "undefined" && typeof oEvent.touches !== "undefined" && typeof oEvent.changedTouches !== "undefined"){
			// prevent default behavior
			oEvent.preventDefault();
			
			// for each finger involved in the event
			var fingers = oEvent.changedTouches;
			for(i = 0; i < fingers.length; i++) {
				var touch = fingers[i];
				var touchId = 0;
				
				// find id
				for(t = 0; t < oEvent.touches.length; t++) {
					if (touch === oEvent.touches[t]) {
						touchId = t;
						break;
					}
				}
				
				// send as individual mouse down event
				SOD.mouse_down(touch, touchId);
			}
		}
		// else is mouse down
		else {
			var p2D = SOD.physics2D, mcList = p2D.mouse_connections, sMidW = SOD.pageWidth() * 0.5, sMidH = SOD.pageHeight() * 0.5, mousePos = new b2Vec2(event.pageX - sMidW, event.pageY - sMidH), phys_obj_info, bd, dx, dy, dist, radius, dist_min, mouse_target, new_mouse_connection, b, s;
			
			// check id
			if (typeof id === "undefined") {
				id = -1;
			}
			
			// find all mouse connectable physics objects that have an effective radius that contains mouse click point + userMouseRadius
			for (b = 0; b < p2D.mouse_connectable.length; b++) {
				phys_obj_info = p2D.mouse_connectable[b];
				bd = phys_obj_info.body;
				
				// if not static or frozen
				if(bd.IsStatic() == false && bd.IsFrozen() == false) {
					// get all shapes
					for (s = bd.GetShapeList(); s !== null; s = s.GetNext()) {
						dx = s.m_position.x - mousePos.x;
						dy = s.m_position.y - mousePos.y;
						dist = b2Math.Length(dx, dy);
						radius = 0;
						
						// check by type
						if (s.m_type === b2Shape.e_polyShape) {
							if(s.TestPoint(mousePos)) {
								mouse_target = bd;
								break;
							}
						}
						else if (s.m_type === b2Shape.e_circleShape) {
							radius = s.m_radius;
							
							// dist check
							if (dist <= radius + SOD.m_p.mj.userMouseRadius) {
								// if mouse is inside object
								if(s.TestPoint(mousePos)) {
									mouse_target = bd;
									break;
								}
								else if (typeof dist_min === 'undefined' || dist < dist_min) {
									mouse_target = bd;
									dist_min = dist;
								}
							}
						}
					}
				}
			}
			
			// if mouse_target was found
			if (typeof mouse_target !== "undefined") {
				// init new mouse connection
				new_mouse_connection = p2D.createMouseJoint(id, mousePos, mouse_target, SOD.m_p.mj.force, SOD.m_p.mj.frequency, SOD.m_p.mj.damping);
				
				// store new mouse connection in global list
				mcList[mcList.length] = new_mouse_connection;
			}
			
			// set mouse move listener if needed
			if (mcList.length === 1) {
				jQuery(window).bind('mousemove touchmove', SOD.mouse_move);
			}
		}
		
		return false;
	};
	
	// physics mouse leave
	SOD.mouse_leave = function (event) {
		// if correct target
		if (event.target !== event.currentTarget) {
			SOD.mouse_up(event);
		}
		else {
			return false;
		}
	};
	
	// physics mouse down
	SOD.mouse_up = function (event, id) {
		var oEvent = event.originalEvent, i, t;
		
		// get if is touch event
		if (typeof oEvent !== "undefined" && typeof oEvent.touches !== "undefined" && typeof oEvent.changedTouches !== "undefined"){
			// prevent default behavior
			oEvent.preventDefault();
			
			// for each finger involved in the event
			var fingers = oEvent.changedTouches;
			for(i = 0; i < fingers.length; i++) {
				var touch = fingers[i];
				var touchId = 0;
				
				// find id
				for(t = 0; t < oEvent.touches.length; t++) {
					if (touch === oEvent.touches[t]) {
						touchId = t;
						break;
					}
				}
				
				// send as individual mouse up event
				SOD.mouse_up(touch, touchId);
			}
		}
		// else is mouse up
		else {
			var p2D = SOD.physics2D, mcList = p2D.mouse_connections, mouse_connection;
			
			// check id
			if (typeof id === "undefined") {
				id = -1;
			}
			
			// clear all connections with id matching id argument
			for(i = mcList.length - 1; i >= 0; i--) {
				if (mcList[i].id === id) {
					mouse_connection = mcList.splice(i, 1)[0];
					p2D.destroyMouseJoint(mouse_connection);
				}
			}
			
			// if mouse connections list is empty, remove mouse move listener
			if (mcList.length === 0) {
				jQuery(window).unbind('mousemove touchmove', SOD.mouse_move);
			}
		}
		
		return false;
	};
	
	// physics mouse move
	SOD.mouse_move = function (event, id) {
		var oEvent = event.originalEvent, i, t;
		
		// get if is touch event
		if (typeof oEvent !== "undefined" && typeof oEvent.touches !== "undefined" && typeof oEvent.changedTouches !== "undefined"){
			// prevent default behavior
			oEvent.preventDefault();
			
			// for each finger involved in the event
			var fingers = oEvent.changedTouches;
			for(i = 0; i < fingers.length; i++) {
				var touch = fingers[i];
				var touchId = 0;
				
				// find id
				for(t = 0; t < oEvent.touches.length; t++) {
					if (touch === oEvent.touches[t]) {
						touchId = t;
						break;
					}
				}
				
				// send as individual mouse up event
				SOD.mouse_move(touch, touchId);
			}
		}
		// else is mouse move
		else {
			var p2D = SOD.physics2D, mcList = p2D.mouse_connections, sMidW = SOD.pageWidth() * 0.5, sMidH = SOD.pageHeight() * 0.5, mousePos = new b2Vec2(event.pageX - sMidW, event.pageY - sMidH), mouse_connection;
			
			// check id
			if (typeof id === "undefined") {
				id = -1;
			}
			
			// update all connections with id matching id argument
			for(i = 0; i < mcList.length; i++) {
				mouse_connection = mcList[i];
				
				// if mouse connection id matches id of move
				if (mouse_connection.id === id) {
					
					// update each mouse joint of matching connection
					mouse_connection.SetTarget(mousePos);
				}
			}
		}
		
		return false;
	};
	
	//======================================================================
	//
	//	LOADING
	//
	//======================================================================
	
	SOD.setLoadPct = function (loadPct) {
		var area, cvIndex, cvNew, cvPIndex, cvPrev, relIndex, nPct, pPct, sbW, sbH, sbNumAW, sbNumAH, sbAW, sbAH, numAreasToFill, area, color_vals, color_alpha, statusFill, areaW, areaH, sMidW, sMidH;
		
		// check load pct
		if(SOD.isNumber(loadPct) !== true) {
			loadPct = 0;
		}
		
		// if stage
		if(typeof SOD.stage !== "undefined") {
			sMidW = SOD.pageWidth() * 0.5;
			sMidH = SOD.pageHeight() * 0.5;
			
			sbW = 100;
			sbH = 20;
			sbNumAW = 10;
			sbNumAH = 1;
			sbAW = sbW / sbNumAW;
			sbAH = sbH / sbNumAH;
			numAreasToFill = Math.round(Math.random() * (sbNumAW * sbNumAH));
			
			area = {x: (sMidW - sbW) + Math.round(Math.random() * (sbNumAW - 1)) * (loadPct * sbAW), y: (sMidH - sbH) + Math.round(Math.random() * (sbNumAH - 1)) * (loadPct * sbAH)};
			cvIndex = Math.ceil(loadPct * (SOD.colors.list.length - 1));
			
			if(cvIndex > 0) {
				cvNew = SOD.colors.list[cvIndex];
				cvPIndex = cvIndex - 1;
				cvPrev = SOD.colors.list[cvPIndex];
				relIndex = loadPct * (SOD.colors.list.length - 1);
				nPct = 1 - (cvIndex - relIndex);
				pPct = 1 - (relIndex - cvPIndex);
				color_vals = [Math.round(cvNew[0] * nPct + cvPrev[0] * pPct), Math.round(cvNew[1] * nPct + cvPrev[1] * pPct), Math.round(cvNew[2] * nPct + cvPrev[2] * pPct), 1];
			}
			else {
				color_vals = SOD.colors.list[cvIndex];
			}
			color_alpha = 0.8;
			statusFill = {fillStyle: "rgba(" + color_vals[0] + "," + color_vals[1] + "," + color_vals[2] + "," + color_alpha + ")"};
			areaW = loadPct * (Math.random() * sbW);
			areaH = sbH;
			
			// draw rect
			SOD.stage.fillRect(area.x, area.y, areaW, areaH, statusFill);
		}
	};
	
	//======================================================================
	//
	//	INIT
	//
	//======================================================================
	
	// sounds
	SOD.init_sounds = function () {
		// load background loop
		SOD.sounds.bg.audio_loop1 = new Audio(SOD.sounds.bg.url);
		
		// load background loop again, for correct looping
		SOD.sounds.bg.audio_loop2 = new Audio(SOD.sounds.bg.url);
		
		// set audio loop 1 as current primary audio
		SOD.sounds.bg.audio = SOD.sounds.bg.audio_loop1;
		
		// start fading sound in
		SOD.volume_change(SOD.sounds.volume_base, SOD.sounds.volume_init_fade_duration);
		
		// start updating sounds
		SOD.updating_sound = true;
		SOD.update_sound();
		
		// start playing background
		SOD.sounds.bg.audio.play();
	};
	
	// stats
	SOD.initStats = function (statsContainer) {
		SOD.stats = {
			init: function (statsContainer) {
				var t;
				
				// set properties
			    SOD.stats.t = new Date().getTime() / 1000.0;
			    SOD.stats.n = 0;
			    SOD.stats.fps = 0.0;
			    
			    // if container passed
			    if (typeof statsContainer !== "undefined") {
				    // create div element for stats
				    SOD.stats.display = document.createElement("div");
					SOD.stats.display.id = "stats";
					SOD.stats.display.style.position = 'absolute';
					SOD.stats.display.style.left = "0px";
					SOD.stats.display.style.top = "0px";
					
					// add stats to statsContainer
					statsContainer.append(SOD.stats.display);
				}
			},
			update: function () {
		        SOD.stats.n = SOD.stats.n + 1;
		        if (SOD.stats.n === 10) {
		            SOD.stats.n = 0;
		            t = new Date().getTime() / 1000.0;
		            SOD.stats.fps = Math.round(10.0 / (t - SOD.stats.t));
		            SOD.stats.t = t;
		            if (typeof SOD.stats.display !== "undefined") {SOD.stats.display.innerHTML = "FPS: " + SOD.stats.fps + ", # pixels: " + ((SOD.head && SOD.head.physics.pixels) ? SOD.head.physics.pixels.length : 0) + ", p2D DT: " + Math.round(SOD.physics2D.stepDT * 10000) / 10000;
		            }
		         }
		    }
		};
		
		// start stats
		SOD.stats.init(statsContainer);
	};
	
	// sets up engine
	SOD.initEngine = function () {
		// init stage container
		SOD.stageContainer = document.createElement("div");
		SOD.stageContainer.id = "stage_container";
		SOD.stageContainer.style.position = 'absolute';
		SOD.stageContainer.style.left = "0px";
		SOD.stageContainer.style.top = "0px";
		
		// add parts to display
		SOD.interactives_container.append(SOD.stageContainer);
		
		// init stage canvas
		SOD.stageCanvas = document.createElement("canvas");
		SOD.stageCanvas.id = "stage_canvas";
		SOD.stageCanvas.style.position = 'absolute';
		SOD.stageCanvas.style.left = "0px";
		SOD.stageCanvas.style.top = "0px";
		SOD.stageCanvas.width = SOD.pageWidth();
		SOD.stageCanvas.height = SOD.pageHeight();
		
		// add stage canvas
		SOD.stageContainer.appendChild(SOD.stageCanvas);
		
		// get canto canvas abtraction
		SOD.stage = canto(SOD.stageCanvas);
	};
	
	// internal init
	SOD.init_internal = function () {
		// when stage loads
		if (typeof SOD.stage !== "undefined") {
			// init physics
			SOD.initPhysics2D();
			
			// start physics
			SOD.physics2D.start(true);
			
			// init head
			SOD.init_head();
			
			// init sounds
			if (SOD.sounds_enabled) {
				SOD.init_sounds();
			}
			
			// init mouse
			SOD.init_mouse();
			
			// start updating
			SOD.updating = true;
			SOD.update();
			
			// add resize listener
			jQuery(window).resize(function (event) {
				SOD.on_resize(event);
			});
			
			// resize once
			SOD.on_resize();
		}
		
		// fade stage in
		jQuery(SOD.stageCanvas).fadeTo(SOD.m_p.loadCompleteFadeTimeIn, 1);
	};
	
	// initialize function
	SOD.init = function () {
		// store main container ref
		SOD.container = jQuery("#container");
		
		// store interactives container ref
		SOD.interactives_container = jQuery("#interactives_container");
		
		// store credits
		SOD.credits = jQuery("#credits");
		
		// update document title to reflect version
		document.title = document.title + ", " + SOD.version;
		
		// check container
		if (typeof SOD.container !== "undefined" && typeof SOD.interactives_container !== "undefined") {
			// store load complete functions
			var mainLoadCallback = function () {
				
				// fade stage out
				jQuery(SOD.stageCanvas).delay(SOD.m_p.loadCompleteDelayTime).fadeTo(SOD.m_p.loadCompleteFadeTimeOut, 0, function () { SOD.init_internal(); });
			};
			var initLoadCallback = function () {
				var mainLoadQueue = Box2DLoader.getScriptsToLoad('js/lib/box2d', 'js/lib');
				var mainLoadInfo = {scripts: mainLoadQueue, updateCallback: SOD.setLoadPct, finalCallback: mainLoadCallback, total: mainLoadQueue.length, completed: 0, pct: 0};
				// init engine
				SOD.initEngine();
				
				// init stats
				if (SOD.stats_enabled) {
					var statsContainer = (SOD.stats_visible === true) ? SOD.container : undefined;
					SOD.initStats(statsContainer);
				}
				
				// resize stage
				SOD.resize_stage();
				
				// load main scripts
				SOD.loadScripts(mainLoadInfo);
			};
			
			// load all required scripts
			var initLoadInfo = {scripts: SOD.requiredScripts, finalCallback: initLoadCallback, total: SOD.requiredScripts.length, completed: 0, pct: 0};
			SOD.loadScripts(initLoadInfo);
		}
	};
}());