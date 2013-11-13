#pragma strict

static var SPEED : float = 8;

var groundPlane : Plane;

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
	rigidbody.velocity = Vector3.Normalize(inputVec) * SPEED;
}