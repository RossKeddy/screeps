const roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const repairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, 
        {
            filter: structures => structures.hits < structures.hitsMax && structures.structureType != STRUCTURE_WALL
        });
        
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
            if (repairSite != undefined) {
                if (creep.repair(repairSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairSite);
                    console.log('Creep is repairing: ' + repairSite)
                }
            } else {
                roleBuilder.run(creep);
            }
        }
	}
};

module.exports = roleRepairer;
