// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//


window.onload = function() {
  var camera, scene, renderer;
  objects = [];
  var coins = ["BTC", "ETH", "ETC", "DAO", "LSK", "FCT", "XMR", "REP", "XRP", "ZEC", "XEM", "LTC", "DASH", "BCH"];
  var rates = ["433880", "31640", "1294.6", "316.40", "673.60", "2112.5", "10866", "2050.5", "20.735", "21027", "25.477", "5963.6", "36211", "52891"]

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 3000;
    scene = new THREE.Scene();
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
    document.getElementById( 'container' ).appendChild( renderer.domElement );

    for (var i = 0; i < coins.length; i++) {
      // create element
      var element = document.createElement('div');
      element.className = 'element';
      element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.25 + 0.25 ) + ')';

      var number = document.createElement( 'div' );
      number.className = 'number';
      number.textContent = rates[i] + " JPY";
      element.appendChild( number );

      var symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = coins[i];
      element.appendChild( symbol );

      /*
      var details = document.createElement( 'div' );
      details.className = 'details';
      details.innerHTML = "hello";
      element.appendChild( details );
      */

      var object = new THREE.CSS3DObject( element );
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = -2000;

      objects.push(object)
      scene.add(object);
    }

    for (var i = 0; i < objects.length; i++) {
      do {
        var base_pos = new THREE.Vector3(Math.random() * 1200 - 600, Math.random() * 800 - 400, -5000 - i * 500);
      } while(Math.abs(base_pos.y) < 150 || Math.abs(base_pos.x) < 150)
      objects[i].base_pos = base_pos;
      objects[i].position.x = base_pos.x;
      objects[i].position.y = base_pos.y;
      objects[i].position.z = base_pos.z + 5000;
      objects[i].element.style.opacity = 1.0;
    }
  }

  function update_objects() {
    for ( var i = 0; i < objects.length; i++ ) {
      objects[i].position.z += 30;
      objects[i].element.style.opacity = parseFloat(objects[i].element.style.opacity) + 0.01;
      if ( objects[i].position.z > 2800 ) {
        objects[i].position.z = objects[i].base_pos.z;
        objects[i].element.style.opacity = 0.0;
      }
    }
  }

  function animate() {
    requestAnimationFrame( animate );
    TWEEN.update();
    update_objects();
    renderer.render( scene, camera );
  }

  /* event handler */
  document.getElementById("send").addEventListener("click", function(e) {
    formWidth = 600;
    formHeight = 350;
    form = document.getElementById("form");
    form.style.width = formWidth + "px";
    form.style.height = formHeight + "px";
    form.style.left = (window.innerWidth - formWidth) / 2 + "px";
    form.style.top = (window.innerHeight - formHeight) / 2 + "px";
    form.style.display = "block";

    e.stopPropagation();
    e.preventDefault();
    return 0;
  });

  document.getElementById("cancel").addEventListener("click", function(e) {
    form = document.getElementById("form");
    form.style.display = "none";
  });

  document.getElementById("complete").addEventListener("click", function(e) {
    form = document.getElementById("form");
    form.style.display = "none";
  });
}
