#pragma strict

public var myCamera : Camera;
public var connectedCameras : Camera[];

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player")
	{
		SetThisCameraActive();
	}
}

function SetThisCameraActive()
{
	myCamera.gameObject.SetActive(true);

	for (var cameraCount = 0; cameraCount < connectedCameras.Length; cameraCount++)
	{
		connectedCameras[cameraCount].gameObject.SetActive(false);
	}
}