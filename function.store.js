var storeCreep = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var storage = Game.flags['Storage'].pos;
        
        if(creep.pos != storage){
	        creep.moveTo(storage, {visualizePathStyle: {stroke: '#ff5555'}});
	        creep.say('💤');
	        console.log('Putting ' + creep.name + ' in storage');
	    }           
    }
};
module.exports = storeCreep;