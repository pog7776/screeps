var storeCreep = require('function.store');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.room.controller.id != creep.memory.home){
            creep.moveTo(Game.getObjectById(creep.memory.home));
            console.log(creep.name + ' current ' + creep.room.controller.id +' home ' + creep.memory.home);
        }
        else if(creep.memory.home == undefined){
            creep.memory.home = '5bbcafbe9099fc012e63b192';
            console.log(creep.name + ' current ' + creep.room.controller.id +' home ' + creep.memory.home);
        }

        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}}, {maxRooms:1});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}, {maxRooms:1});
                }
                creep.memory.store = false;
            }   //Put creep in storage
            else if(!targets.length){
                storeCreep.run(creep);
            }
        }
    }
};

module.exports = roleHarvester;