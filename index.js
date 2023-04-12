"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankNameMain = void 0;
const path = require("path");
const fs = require("fs");
const rank_perms_1 = require("@bdsx/rank-perms");
const src_1 = require("@bdsx/rank-perms/src");
const message_1 = require("./src/utils/message");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const command_1 = require("@bdsx/rank-perms/src/command");
let config = {
    default: "§7[ §r%rank% §r§7]§r §a%name%",
    ranks: {
        Guest: "§7[ §r%rank% §r§7]§r §a%name%",
        Admin: "§7[ §r%rank% §r§7]§r §d%name%",
        Owner: "§7[ §r%rank% §r§7]§r §c%name%",
    },
};
const configPath = path.join(__dirname, "config.json");
try {
    config = require(configPath);
}
catch (err) { }
var RankNameMain;
(function (RankNameMain) {
    function setDefaultName(value) {
        config.default = value;
        return true;
    }
    RankNameMain.setDefaultName = setDefaultName;
    function setRankName(rank, value) {
        if (!src_1.Ranks.has(rank))
            return false;
        config.ranks[rank] = value;
        return true;
    }
    RankNameMain.setRankName = setRankName;
    function getDefaultName() {
        return config.default;
    }
    RankNameMain.getDefaultName = getDefaultName;
    function getRankName(rank) {
        if (!config.ranks.hasOwnProperty(rank))
            return config.default;
        return config.ranks[rank];
    }
    RankNameMain.getRankName = getRankName;
    function getPlayerName(player) {
        var _a;
        const rank = rank_perms_1.Permissions.getRank(player);
        const display = (_a = src_1.Ranks.getDisplay(rank)) !== null && _a !== void 0 ? _a : rank;
        return getRankName(rank).replace(/%rank%/g, display).replace(/%name%/g, player.getName());
    }
    RankNameMain.getPlayerName = getPlayerName;
    function updatePlayersName() {
        for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
            if (!player.isPlayer())
                return;
            if (player.getNameTag() === getPlayerName(player))
                return;
            player.setNameTag(getPlayerName(player));
        }
    }
    RankNameMain.updatePlayersName = updatePlayersName;
    function save(message = false) {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    message_1.send.error(`config.json ${err}`);
                    throw err;
                }
                else
                    message_1.send.success(`config.json Saved!`);
            }
        });
    }
    RankNameMain.save = save;
})(RankNameMain = exports.RankNameMain || (exports.RankNameMain = {}));
command_1.commandPerm.onReloading(() => {
    RankNameMain.updatePlayersName();
});
event_1.events.playerJoin.on((ev) => {
    RankNameMain.updatePlayersName();
});
event_1.events.serverOpen.on(() => {
    require("./src");
    message_1.send.success("Started!");
});
event_1.events.serverClose.on(() => {
    RankNameMain.save(true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBRXpCLGlEQUErQztBQUMvQyw4Q0FBNkM7QUFDN0MsaURBQTJDO0FBQzNDLHNDQUFvQztBQUNwQyw0Q0FBOEM7QUFDOUMsMERBQTJEO0FBRTNELElBQUksTUFBTSxHQUdOO0lBQ0EsT0FBTyxFQUFFLCtCQUErQjtJQUN4QyxLQUFLLEVBQUU7UUFDSCxLQUFLLEVBQUUsK0JBQStCO1FBQ3RDLEtBQUssRUFBRSwrQkFBK0I7UUFDdEMsS0FBSyxFQUFFLCtCQUErQjtLQUN6QztDQUNKLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJO0lBQ0EsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNoQztBQUFDLE9BQU0sR0FBRyxFQUFFLEdBQUU7QUFFZixJQUFpQixZQUFZLENBZ0Q1QjtBQWhERCxXQUFpQixZQUFZO0lBRXpCLFNBQWdCLGNBQWMsQ0FBQyxLQUFhO1FBQ3hDLE1BQU0sQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFIZSwyQkFBYyxpQkFHN0IsQ0FBQTtJQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNuRCxJQUFJLENBQUMsV0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFDLEtBQUssQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBSmUsd0JBQVcsY0FJMUIsQ0FBQTtJQUVELFNBQWdCLGNBQWM7UUFDMUIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFD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