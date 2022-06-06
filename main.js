const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');

const ce32s37Construction = require('construct.e32s37');

ce32s37Construction.run();

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    console.log('********************\n' + '\nHarvesters: ' + harvesters.length + '\nUpgraders: ' + upgraders.length + '\nHaulers: ' + haulers.length + '\nBuilders: ' + repairers.length + '\nRepairers: ' + repairers.length + '\n\n********************');    
    
    if(harvesters.length < 5) 
    {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE], newName, 
            {memory: {role: 'harvester'}});
    } else if (upgraders.length < 7) 
    {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    } else if (haulers.length < 2) 
    {
        var newName = 'Hauler' + Game.time;
        console.log('Spawning new hauler: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'hauler'}});
    }  else if (builders.length < 5) 
    {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    } else if (repairers.length < 2) 
    {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'repairer'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            continue
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            continue
        }
        else if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
            continue
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            continue
        }
        else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
            continue
        }
    }
}
