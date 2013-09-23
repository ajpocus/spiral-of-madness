g = null;

$(function () {
  // set the scene size
  var WIDTH = 800,
    HEIGHT = 600;

  // set some camera attributes
  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  // get the DOM element to attach to
  // - assume we've got jQuery to hand
  var $container = $('#container');

  // create a WebGL renderer, camera
  // and a scene
  var renderer = new THREE.WebGLRenderer();
  var camera = new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);

  var scene = new THREE.Scene();
  scene.add(camera);
  camera.position.z = 300;
  camera.position.y = 20;
  
  renderer.setSize(WIDTH, HEIGHT);
  $container.append(renderer.domElement);

  // create an ambient light
  var light = new THREE.AmbientLight(0x404040);

  // set its position
  light.position.x = 0;
  light.position.y = 50;
  light.position.z = 130;

  // add to the scene
  scene.add(light);
  
  // render the current camera coordinates in the corner
  var posText = "x: " + camera.position.x +
    " y: " + camera.position.y +
    " z: " + camera.position.z;
  posText.position = {
    x: camera.position.x + WIDTH/2,
    y: camera.position.y + HEIGHT/2,
    z: camera.position.z + 300
  };
  scene.add(posText);
  
  // generate the first dungeon
  (function generateDungeon() {
    var cubeGeometry = new THREE.CubeGeometry(500, 10, 500);
    var cubeMat = new THREE.MeshBasicMaterial({ color: 0x00CC00, wireframe: true });
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMat);
    
    cubeGeometry.dynamic = true;
    cubeGeometry.vertices.push(new THREE.Vector3(0, -5, -250));
    cubeGeometry.vertices.push(new THREE.Vector3(0, 5, -250));
    cubeGeometry.vertices.push(new THREE.Vector3(0, -5, 250));
    cubeGeometry.vertices.push(new THREE.Vector3(0, 5, 250));
    cubeGeometry.verticesNeedUpdate = true;
    
    cubeGeometry.faces.push(new THREE.Face3(8, 9, 10));
    cubeGeometry.faces.push(new THREE.Face3(9, 10, 11));
    
    cubeGeometry.computeVertexNormals();
    cubeGeometry.computeFaceNormals();
    console.log(cubeGeometry.vertices);
    
    scene.add(cube);
    
    var posText = "x: " + camera.position.x +
      " y: " + camera.position.y +
      " z: " + camera.position.z;
    posText.position = {
      x: camera.position.x + WIDTH/2,
      y: camera.position.y + HEIGHT/2,
      z: camera.position.z + 300
    };
  })();
  
  // draw!
  renderer.render(scene, camera);
  
  var controls = new THREE.FirstPersonControls(camera);
	controls.movementSpeed = 1000;
	controls.lookSpeed = 0.1;
  var clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    
    var delta = clock.getDelta();
    controls.update(delta);
    if (delta % 10 === 0) {
      posText.position = {
        x: camera.position.x + WIDTH/2,
        y: camera.position.y + HEIGHT/2,
        z: camera.position.z + 300
      };
    }
    
    renderer.render(scene, camera);
  })();
});
