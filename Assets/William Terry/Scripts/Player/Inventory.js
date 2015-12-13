#pragma strict

@Header("Contents")
public var ammo : int = 100;
public var health : int = 100;
public var healthMax: int = 100;
public var gun : Gun;
@Header("Referances")
public var ammoDisplay : UnityEngine.UI.Text;
public var healthDisplay : UnityEngine.UI.Text;

function Start () {
	gun.inventory = this;
	ammoDisplay = GameObject.Find("Ammo UI Display").GetComponent.<UnityEngine.UI.Text>();
	healthDisplay = GameObject.Find("Health UI Display").GetComponent.<UnityEngine.UI.Text>();
}

function Update () {
	ammoDisplay.text = "Ammo: " + ammo.ToString();
	healthDisplay.text = "Health: " + health.ToString() + " | " + healthMax.ToString();
}