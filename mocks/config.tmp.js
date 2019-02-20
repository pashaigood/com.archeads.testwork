// RENDER

renderer.shadowMapEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

// LIGHT

var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
directionalLight.position.set(0, 0, 150);
directionalLight.castShadow = true;
directionalLight.receiveShadow = true;
directionalLight.shadowDarkness = true;
directionalLight.shadowMapWidth = 4096;
directionalLight.shadowMapHeight = 4096;
directionalLight.shadow.camera.left = -1000;
directionalLight.shadow.camera.right = 1000;
directionalLight.shadow.camera.top = 1000;
directionalLight.shadow.camera.bottom = -1000;

// DAE LOADER

loader.options.convertUpAxis = true;
loader.load('/test-model/model.dae', function colladaReady(collada) {
  var dae = collada.scene;
  dae.scale.x = dae.scale.y = dae.scale.z = 7;
  dae.rotation.z = Math.PI / 2;
  dae.rotation.x = Math.PI * 2;
  dae.castShadow = true;
  dae.receiveShadow = true;
  scene.add(dae);
});
