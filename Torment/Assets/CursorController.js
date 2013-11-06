#pragma strict

var ball : GameObject;

function Start () {
	ball = GameObject.Find("Cursor");
}

function Update () {

	if(Input.GetMouseButton(0)) {
		var mouseRay : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		var hit : RaycastHit;
		if(Physics.Raycast(mouseRay, hit)) {
			ball.rigidbody.AddForce( (hit.point - ball.transform.position) * 20 - ball.rigidbody.velocity * 2 );
		}
	}
}