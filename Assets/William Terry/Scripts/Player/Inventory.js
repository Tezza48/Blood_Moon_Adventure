#pragma strict

import UnityEngine.UI;

@Header("Contents")
public var ammo : int = 100;
public var health : int = 100;
public var healthMax: int = 100;
public var gun : Gun;
@Header("Referances")
public var ammoDisplay : Text;
public var healthDisplay : Text;

function Start () {
	gun.inventory = this;
	ammoDisplay = GameObject.Find("Ammo UI Display").GetComponent.<Text>();
	healthDisplay = GameObject.Find("Health UI Display").GetComponent.<Text>();
}

function Update () {
	ammoDisplay.text = "Ammo: " + ammo.ToString();
	healthDisplay.text = "Health: " + health.ToString() + " | " + healthMax.ToString();
}