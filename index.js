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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBRXpCLGlEQUErQztBQUMvQyw4Q0FBNkM7QUFDN0MsaURBQTJDO0FBQzNDLHNDQUFvQztBQUNwQyw0Q0FBOEM7QUFFOUMsSUFBSSxNQUFNLEdBR047SUFDQSxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDLEtBQUssRUFBRTtRQUNILEtBQUssRUFBRSwrQkFBK0I7UUFDdEMsS0FBSyxFQUFFLCtCQUErQjtRQUN0QyxLQUFLLEVBQUUsK0JBQStCO0tBQ3pDO0NBQ0osQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRXZELElBQUk7SUFDQSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0NBQ2hDO0FBQUMsT0FBTSxHQUFHLEVBQUUsR0FBRTtBQUVmLElBQWlCLFlBQVksQ0FnRDVCO0FBaERELFdBQWlCLFlBQVk7SUFFekIsU0FBZ0IsY0FBYyxDQUFDLEtBQWE7UUFDeEMsTUFBTSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUhlLDJCQUFjLGlCQUc3QixDQUFBO0lBRUQsU0FBZ0IsV0FBVyxDQUFDLElBQVksRUFBRSxLQUFhO1FBQ25ELElBQUksQ0FBQyxXQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFKZSx3QkFBVyxjQUkxQixDQUFBO0lBRUQsU0FBZ0IsY0FBYztRQUMxQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJ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