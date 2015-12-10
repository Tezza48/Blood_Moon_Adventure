#pragma strict

@ExecuteInEditMode
public class TriggerVolumeEditor extends MonoBehaviour
{
	public var _DrawGizmo : boolean = true;

	function OnDrawGizmos ()
	{
		if (_DrawGizmo)
		{
			Gizmos.color = Color.green;
			Gizmos.DrawSphere(transform.position, 0.1f);
	   		Gizmos.DrawWireCube(transform.position, transform.GetComponent.<Renderer>().bounds.size);
		}
	}
}