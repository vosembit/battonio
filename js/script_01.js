var camera, scene, renderer;
var geometry, material, mesh;

function init_c3d( num ){
    init( num );
    animate();   
}

function init( num ) {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    controls = new THREE.DeviceOrientationControls(camera);

    scene = new THREE.Scene();

    var sides = [
        {
            url: 'img/p' + num + '/px.jpg',
            position: [-512, 0, 0],
            rotation: [0, Math.PI / 2, 0]
					},
        {
            url: 'img/p' + num + '/nx.jpg',
            position: [512, 0, 0],
            rotation: [0, -Math.PI / 2, 0]
					},
        {
            url: 'img/p' + num + '/py.jpg',
            position: [0, 512, 0],
            rotation: [Math.PI / 2, 0, Math.PI]
					},
        {
            url: 'img/p' + num + '/ny.jpg',
            position: [0, -512, 0],
            rotation: [-Math.PI / 2, 0, Math.PI]
					},
        {
            url: 'img/p' + num + '/pz.jpg',
            position: [0, 0, 512],
            rotation: [0, Math.PI, 0]
					},
        {
            url: 'img/p' + num + '/nz.jpg',
            position: [0, 0, -512],
            rotation: [0, 0, 0]
					}
				];

    var cube = new THREE.Object3D();
    scene.add(cube);

    for (var i = 0; i < sides.length; i++) {

        var side = sides[i];

        var element = document.createElement('img');
        element.width = 1026; // 2 pixels extra to close the gap.
        element.src = side.url;

        var object = new THREE.CSS3DObject(element);
        object.position.fromArray(side.position);
        object.rotation.fromArray(side.rotation);
        cube.add(object);

    }

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);

}
