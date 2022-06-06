var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        console.log('Spawn1 Contains: ' + Game.spawns['Spawn1'].store.getCapacity(RESOURCE_ENERGY) + " Energy...")
        
        // If the hauler isn't full
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            
            console.log('Creep needs energy')

            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });

            // Find the closest energy on the ground
            var sources = creep.room.find(FIND_SOURCES)
                
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)
                
            if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
                
            console.log(creep.memory.name + " is collecting Resources... " + creep.store.getFreeCapacity(RESOURCE_ENERGY))
        } else if (Game.spawns['Spawn1'].store.getFreeCapacity > 0) {
            const spawns = creep.room.find(FIND_MY_SPAWNS)
            
            console.log(creep.memory.name + ' Heading to spawn ... ')
            
            // Find the closest spawn
            const closestSpawn = creep.pos.findClosestByRange(spawns)
            
            if (creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                creep.moveTo(closestSpawn, { visualizePathStyle: { stroke: '#ffaa00' } });
                console.log(creep.memory.name + ' Dropping energy off at Spawn... Remaining: ' + creep.store.getFreeCapacity(RESOURCE_ENERGY))
            }
        } else {
            const storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (storage) => storage.energy < storage.energyCapacity
            });
            
            console.log(creep.memory.name + ' Heading to storage ... ')
            
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } });
                console.log(creep.memory.name + ' Dropping energy off at storage... Remaining: ' + creep.store.getFreeCapacity(RESOURCE_ENERGY))
            }
        }
    }
};

module.exports = roleHauler;
