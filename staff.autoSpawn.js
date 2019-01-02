/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('staff.autoSpawn');
 * mod.thing == 'a thing'; // true
 */
var autoSpawn = {
    run: function(creep) {

    //clear name memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


//harvesters---------------------------------------------------------------------------------------
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        if(harvesters.length < 2 && !Game.spawns['Spawn1'].spawning) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'harvester'}});        
        }

//upgraders---------------------------------------------------------------------------------------
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);

        if(upgraders.length < 5 && !Game.spawns['Spawn1'].spawning) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'upgrader'}});        
        }

//builders---------------------------------------------------------------------------------------
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);

        if(builders.length < 2 && !Game.spawns['Spawn1'].spawning) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'builder'}});        
        }


            //announce spawning
    //**move to own "spawnner" script
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                    {align: 'left', opacity: 0.8});
        }
        else{
            Game.spawns['Spawn1'].room.visual.text(
                'Harvesters: ' + harvesters.length + ', ' + 'Upgraders: ' + upgraders.length + ', ' + 'Builders: ' + builders.length,
                Game.spawns['Spawn1'].pos.x -8, 
                Game.spawns['Spawn1'].pos.y, 
                    {font: 0.4, align: 'left', opacity: 1});
        }
    }
}

module.exports = autoSpawn;