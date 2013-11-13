#pragma strict

private var player : GameObject;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	transform.position = player.transform.position + Vector3(0, 10, -10);
	transform.LookAt(player.transform.position);
}