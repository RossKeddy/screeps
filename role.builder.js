const roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        
        //const closestBuild = creep.pos.findClosestByRange(constructionSite)
        // Find energy on the ground
        const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: resource => resource.resourceType == RESOURCE_ENERGY
        })

        // Find the closest energy on the ground
        const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

        // Try to pickup the energy. If it's not in range
        if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE && creep.store.getUsedCapacity(RESOURCE_ENERGY) != creep.store.getCapacity) {
            creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        
        
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == creep.store.getCapacity(RESOURCE_ENERGY))
        {
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                    console.log('Creep is building: ' + constructionSite)
                }
            } else {
                roleUpgrader.run(creep);
            }
        }
	}
};

module.exports = roleBuilder;
