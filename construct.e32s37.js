var e32s37Construction = {

    /** @param {ConstructionSite} constructionSite **/
    run: function(ConstructionSite) {
        /*
        * Road to Sources
        *
        */
        const terrain = Game.map.getRoomTerrain("E32S37");
        
        const sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        
        for (var j = 0; j < sources.length; j++)
        {
            var path = Game.spawns['Spawn1'].pos.findPathTo(sources[j].pos, {ignoreCreeps: true, swampCost: 1, ignoreDestructibleStructures: false, maxOps: 200});
            
            for (var i = 0; i < path.length; i++) 
            {
                // Make sure we're not building on non-walkable objects
                switch(terrain.get(path[i].x,path[i].y))
                {
                    case 1:
                        console.log("fuck walls $$$$$$$$$$$$")
                        break;
                    case 2:
                        Game.spawns['Spawn1'].room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                        break;
                    case 0:
                        Game.spawns['Spawn1'].room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                        break;
                    default:
                        break;
                }
            }
        }
        /*
        * Road to controller
        *
        */
        var path = Game.spawns['Spawn1'].pos.findPathTo(Game.spawns['Spawn1'].room.controller.pos, {ignoreCreeps: true, swampCost: 1, ignoreDestructibleStructures: true, maxOps: 200});
        
        

        for (var i = 0; i < path.length; i++) 
        {
            // Make sure we're not building on non-walkable objects
            switch(terrain.get(path[i].x,path[i].y))
            {
                case 1:
                    console.log("fuck walls $$$$$$$$$$$$")
                    break;
                case 2:
                    Game.spawns['Spawn1'].room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                    break;
                case 0:
                    Game.spawns['Spawn1'].room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                    break;
                default:
                    break;
            }
            
            /*/ Make sure we're not building on non-walkable objects
            switch(terrain.get(path[i].x + 1,path[i].y + 1))
            {
                case TERRAIN_MASK_WALL:
                    console.log("fuck walls")
                    break;
                case 2:
                    Game.spawns['Spawn1'].room.createConstructionSite(path[i].x + 1,path[i].y, STRUCTURE_ROAD);
                    break;
                case 0:
                    Game.spawns['Spawn1'].room.createConstructionSite(path[i].x + 1,path[i].y, STRUCTURE_ROAD);
                    break;
                default:
                    break;
            }*/
        }
        
         /*
        * Cover Swamp
        *
        */
        var spawns = Game.spawns['Spawn1'].pos
            
        for (var i = -4; i < 6; i++) 
        {
            console.log('x,y' + terrain.get(spawns.x+i,spawns.y+i))
            // Make sure we're not building on non-walkable objects
            switch(terrain.get(spawns.x+i,spawns.y+i))
            {
                case 2:
                    Game.spawns['Spawn1'].room.createConstructionSite(spawns.x + i,spawns.y + i, STRUCTURE_ROAD);
                    break;
                default:
                    break;
            }
        }
	}
};

module.exports = e32s37Construction;
