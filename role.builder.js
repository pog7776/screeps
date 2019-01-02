var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

    	var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    	var storage = Game.flags['Storage'].pos;

	    if(creep.memory.building && creep.carry.energy == 0 && !targets.length) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && targets.length) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    //Put creep in storage
	    if(!targets.length){// && creep.carry.energy == creep.carryCapacity){
            creep.memory.building = false;
            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ff5555'}});
            creep.say('💤');
            console.log('Putting ' + creep.name + ' in storage');
        }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else if(targets.length){
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;