#pragma strict

static var SPEED : float = 8;
static var JUMPSPEED : float = 6;
static var SLOPE_THRESHOLD : float = 0.7;

var groundPlane : Plane;
private var onGround = true;

function Start () {
	groundPlane = Plane(Vector3(0, 1, 0), 0);
}

function Update () {
	// Player rotation towards mouse cursor
	var mouseRay : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hitDist : float;
	
	if(groundPlane.Raycast(mouseRay, hitDist)) {
		var hitPoint : Vector3 = mouseRay.GetPoint(hitDist);
		transform.LookAt(Vector3(hitPoint.x, transform.position.y, hitPoint.z));
	}
	
	// Player movement
	var inputVec = Vector3(Input.GetAxisRaw("Horizontal"), 0, Input.GetAxisRaw("Vertical"));
	
	// Jump key
	var jumpVec = Vector3(0,0,0);
	if( Input.GetButtonDown("Jump") && onGround ){
		jumpVec = Vector3(0, JUMPSPEED, 0);
		onGround = false;
	}
	
	// Setting player velocity
	rigidbody.velocity = Vector3(0, rigidbody.velocity.y, 0) + Vector3.Normalize(inputVec) * SPEED + jumpVec;
}

// Override collision stuff here
function OnCollisionEnter(collision : Collision) {
	// Check if any of the contact points are within the slope threshold
	for (var contact : ContactPoint in collision.contacts){
		if( contact.normal.y >= SLOPE_THRESHOLD ){
			onGround = true;
		}
	}
	
}