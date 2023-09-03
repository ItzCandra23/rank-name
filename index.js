"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankNameMain = void 0;
const path = require("path");
const fs = require("fs");
const rank_perms_1 = require("@bdsx/rank-perms");
const message_1 = require("./src/utils/message");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const command_1 = require("@bdsx/rank-perms/src/command");
const src_1 = require("@bdsx/rank-perms/src");
let config = {
    default: "§7[ §r{rank} §r§7]§r §a{name}",
    ranks: {
        Guest: "§7[ §r{rank} §r§7]§r §a{name}",
        Admin: "§7[ §r{rank} §r§7]§r §d{name}",
        Owner: "§7[ §r{rank} §r§7]§r §c{name}",
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
        if (!rank_perms_1.RankPerms.hasRank(rank))
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
        const rank = src_1.PlayerRank.getRank(player);
        const display = (_a = rank_perms_1.RankPerms.getDisplay(rank)) !== null && _a !== void 0 ? _a : rank;
        return getRankName(rank).replace(/{rank}/g, display).replace(/{name}/g, player.getName());
    }
    RankNameMain.getPlayerName = getPlayerName;
    function updatePlayersName() {
        const players = launcher_1.bedrockServer.serverInstance.getPlayers();
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBRXpCLGlEQUE2QztBQUM3QyxpREFBMkM7QUFDM0Msc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QywwREFBMkQ7QUFDM0QsOENBQWtEO0FBRWxELElBQUksTUFBTSxHQUdOO0lBQ0EsT0FBTyxFQUFFLCtCQUErQjtJQUN4QyxLQUFLLEVBQUU7UUFDSCxLQUFLLEVBQUUsK0JBQStCO1FBQ3RDLEtBQUssRUFBRSwrQkFBK0I7UUFDdEMsS0FBSyxFQUFFLCtCQUErQjtLQUN6QztDQUNKLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUV2RCxJQUFJO0lBQ0EsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztDQUNoQztBQUFDLE9BQU0sR0FBRyxFQUFFLEdBQUU7QUFFZixJQUFpQixZQUFZLENBa0Q1QjtBQWxERCxXQUFpQixZQUFZO0lBRXpCLFNBQWdCLGNBQWMsQ0FBQyxLQUFhO1FBQ3hDLE1BQU0sQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFIZSwyQkFBYyxpQkFHN0IsQ0FBQTtJQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNuRCxJQUFJLENBQUMsc0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBQyxLQUFLLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUplLHdCQUFXLGNBSTFCLENBQUE7SUFFRCxTQUFnQixjQUFjO1FBQzFCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FB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