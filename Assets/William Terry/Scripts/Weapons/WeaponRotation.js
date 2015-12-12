#pragma strict

private var horizRotation: float;
private var verticalRotation : float;
private var _CameraPos : Transform;
private var _CameraFwd : Vector3;

function Update ()
{
	_CameraPos = Camera.main.transform;
	
	horizRotation = Input.GetAxis("Horizontal Rot");
	verticalRotation = Input.GetAxis("Vertical Rot");
	
	var lookPos : Vector3 = new Vector3 (horizRotation, 0, verticalRotation);
	
	_CameraFwd = Vector3.Scale(_CameraPos.forward, new Vector3(1, 0, 1)).normalized;
	
	lookPos = verticalRotation * _CameraFwd + horizRotation * _CameraPos.right;
	
	if (lookPos != Vector3.zero)
	{
		var rotation  : Quaternion = Quaternion.LookRotation(lookPos.normalized);
		
		transform.rotation = Quaternion.Lerp(transform.rotation, rotation, 0.9);
	}
}




// direction vector from camera to player in x and z
// make input of (0, 1) point away from the camera
// input of (1, 0) points right etc

/*

                m_CamForward = Vector3.Scale(m_Cam.forward, new Vector3(1, 0, 1)).normalized;
                m_Move = v*m_CamForward + h*m_Cam.right;
*/