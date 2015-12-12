using System;
using UnityEngine;

namespace UnityStandardAssets.Characters.ThirdPerson
{
    [RequireComponent(typeof (NavMeshAgent))]
    [RequireComponent(typeof (ThirdPersonCharacter))]
    public class AICharacterControl : MonoBehaviour
    {
        public NavMeshAgent agent { get; private set; } // the navmesh agent required for the path finding
        public ThirdPersonCharacter character { get; private set; } // the character we are controlling
        public Transform target; // target to aim for
		public GameObject ragdoll;
		[Header("Will's Variables")]
		public float mininumDistance = 4;
		private bool aggro = false;
		private float aggroDistance = 10;

        // Use this for initialization
        private void Start()
        {
            // get the components on the object we need ( should not be null due to require component so no need to check )
            agent = GetComponentInChildren<NavMeshAgent>();
            character = GetComponent<ThirdPersonCharacter>();

	        agent.updateRotation = false;
	        agent.updatePosition = true;
        }


        // Update is called once per frame
        private void Update()
        {
			// only aggro if player is visible and not far away
			// RaycastHit ray;
			if (!aggro)
			{
				Vector3 direction = (target.transform.position - transform.position).normalized;
				if (Physics.Raycast(transform.position, direction, aggroDistance))
					aggro = true;
			}
			if (target != null && aggro) {
				agent.SetDestination (target.position);

				Vector3 velocity = agent.desiredVelocity;

				if (Vector3.Distance (transform.position, target.transform.position) < mininumDistance) {
					// use the values to move the character
					target = null;
				}

				character.Move (velocity, false, false);
			} else {
				// We still need to call the character's move function, but we send zeroed input as the move param.
				character.Move (Vector3.zero, false, false);
			}
        }


        public void SetTarget(Transform target)
        {
            this.target = target;
        }

		public void Die ()
		{
			ragdoll.SetActive (true);
			ragdoll.transform.parent = null;
			gameObject.SetActive (false);
		}
    }
}
