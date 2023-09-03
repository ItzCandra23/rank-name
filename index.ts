import * as path from "path";
import * as fs from "fs";
import { ServerPlayer } from "bdsx/bds/player";
import { RankPerms } from "@bdsx/rank-perms";
import { send } from "./src/utils/message";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { commandPerm } from "@bdsx/rank-perms/src/command";
import { PlayerRank } from "@bdsx/rank-perms/src";

let config: {
    default: string;
    ranks: Record<string, string>;
} = {
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
} catch(err) {}

export namespace RankNameMain {

    export function setDefaultName(value: string): boolean {
        config.default=value;
        return true;
    }

    export function setRankName(rank: string, value: string): boolean {
        if (!RankPerms.hasRank(rank)) return false;
        config.ranks[rank]=value;
        return true;
    }

    export function getDefaultName(): string {
        return config.default;
    }

    export function getRankName(rank: string): string {
        if (!config.ranks.hasOwnProperty(rank)) return config.default;
        return config.ranks[rank];
    }

    export function getPlayerName(player: ServerPlayer): string {
        const rank = PlayerRank.getRank(player);
        const display = RankPerms.getDisplay(rank) ?? rank;
        return getRankName(rank).replace(/{rank}/g, display).replace(/{name}/g, player.getName());
    }

    export function updatePlayersName(): void {
        const players = bedrockServer.serverInstance.getPlayers();
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (!player.isPlayer()) return;
            if (player.getNameTag() === getPlayerName(player)) return;

            player.setNameTag(getPlayerName(player));
        }
    }

    export function save(message: boolean = false): void {
        fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    send.error(`config.json ${err}`);
                    throw err;
                }
                else send.success(`config.json Saved!`);
            }
        });
    }
}

commandPerm.onReloading(() => {
    RankNameMain.updatePlayersName();
});

events.playerJoin.on((ev) => {
    RankNameMain.updatePlayersName();
});

events.serverOpen.on(() => {
    require("./src");
    send.success("Started!");
});

events.serverClose.on(() => {
    RankNameMain.save(true);
});