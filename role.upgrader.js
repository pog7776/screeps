var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.room != creep.memory.home){
            creep.moveTo(creep.memory.home);
            console.log(creep.name + 'room' + creep.room +'home' + creep.memory.home);
        }
        else{
            creep.memory.home = creep.room.controller.id;
        }

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');//🔄
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrade');//⚡
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}}, {maxRooms:1});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}}, {maxRooms:1});
            }
        }
    }
};

module.exports = roleUpgrader;