#pragma strict

import UnityStandardAssets.Characters.ThirdPerson;
@Header("SFX")
public var gunshotSFX : AudioClip;
public var clickSFX : AudioClip;
@Header("Shooting Stuff")
public var barrelPoint : Transform;
@Header("Referances")
public var _lineRenderer : LineRenderer;
public var inventory : Inventory;

private var lineRenderPoints : Vector3[] = new Vector3[2];
private var cooldownShoot : float;
private var cooldownShootMax : float = 1;

function Start () {
	_lineRenderer = GetComponent.<LineRenderer>();
	_lineRenderer.SetVertexCount(2);
}

function Update () {
	if ((Input.GetButtonDown("Fire1") || Input.GetAxis("Fire1") == 1) && cooldownShoot < Time.time)
	{
		Shoot();
		cooldownShoot = Time.time + cooldownShootMax;
	}
	
	var laser:RaycastHit;
	var layers:int = 1 << 8;
	layers = ~layers;
	
	lineRenderPoints[0] = barrelPoint.position;
	
	if ( Physics.Raycast(barrelPoint.position, barrelPoint.forward, laser, 100, layers))
	{
		lineRenderPoints[1] = laser.point;
	} else {
		lineRenderPoints[1] = barrelPoint.position + (barrelPoint.forward * 100);
	}
	
	_lineRenderer.SetPosition(0,lineRenderPoints[0]);
	_lineRenderer.SetPosition(1,lineRenderPoints[1]);
}

function Shoot()
{
	if (inventory.ammo > 0)
	{
		var fwd = barrelPoint.TransformDirection (Vector3.forward);
		
		var gunRay : RaycastHit;
		
		var layers:int = 1 << 8;
		layers = ~layers;
		
		if (Physics.Raycast (barrelPoint.position, fwd, gunRay, 100, layers)) {
			if(gunRay.collider.tag == "Enemy")
			{
				gunRay.collider.GetComponent.<AICharacterControl>().Die();
			}
		}
		PlaySFX(gunshotSFX);
		inventory.ammo--;
	}
	else
	{
		PlaySFX(clickSFX);
	}	
}
function PlaySFX (clip : AudioClip)
{
	GetComponent.<AudioSource>().clip = clip;
	GetComponent.<AudioSource>().Play();
}