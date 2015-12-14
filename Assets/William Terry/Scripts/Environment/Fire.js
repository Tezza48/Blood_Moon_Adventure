#pragma strict

public var damage : int = 1;
public var _light : Light;

private var rand : Random = new Random();

function OnTriggerStay (other : Collider)
{
	if (other.tag == "Player")
	{
		other.GetComponent.<Inventory>().Damage(damage * Time.deltaTime);
	}
}

function Update ()
{
	_light.intensity = rand.Range(0.5, 4);
	_light.range = rand.Range(1.5, 3);
}