#pragma strict

// Static CONSTANTS
static var SPEED : float = 1;
static var JUMP_SPEED : float = 5;
static var SLOPE_THRESHOLD : float = 0.7;

// Private Variables
private var groundPlane : Plane;
private var onGround = true;

// Public Variables
// --

function Start() {
	groundPlane = Plane(Vector3(0, 1, 0), 0);
}

function Update() {
	// Player rotation towards mouse cursor
	var mouseRay : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hitDist : float;
	
	if(groundPlane.Raycast(mouseRay, hitDist)) {
		var hitPoint : Vector3 = mouseRay.GetPoint(hitDist);
		transform.LookAt(Vector3(hitPoint.x, transform.position.y, hitPoint.z));
	}
	
	// Player movement
	var inputVec = Vector3.Normalize(Vector3(Input.GetAxisRaw("Horizontal"), 0, Input.GetAxisRaw("Vertical"))) * (onGround ? 1 : 0.1);
	
	// Jump key
	var jumpVec = Vector3(0,0,0);
	if( Input.GetButtonDown("Jump") && onGround ){
		jumpVec = Vector3(0, JUMP_SPEED, 0);
		onGround = false;
	}
	
	// Deceleration vector
	var decelPercent = onGround ? 0.1 : 0.01;
	var decelVec = Vector3(rigidbody.velocity.x, 0, rigidbody.velocity.z) * decelPercent * -1;
	
	// Setting player velocity
	rigidbody.AddForce( inputVec * SPEED + decelVec + jumpVec, ForceMode.VelocityChange );

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