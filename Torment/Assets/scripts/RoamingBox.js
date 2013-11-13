#pragma strict

function Start () {

}

function Update () {
	rigidbody.velocity = Vector3(-0.5,rigidbody.velocity.y,0);
	rigidbody.angularVelocity = Vector3(0,-12,0);
}