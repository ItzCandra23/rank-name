import * as path from "path";
import * as fs from "fs";
import { ServerPlayer } from "bdsx/bds/player";
import { Permissions } from "@bdsx/rank-perms";
import { Ranks } from "@bdsx/rank-perms/src";
import { send } from "./src/utils/message";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";

let config: {
    default: string;
    ranks: Record<string, string>;
} = {
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
} catch(err) {}

export namespace RankNameMain {

    export function setDefaultName(value: string): boolean {
        config.default=value;
        return true;
    }

    export function setRankName(rank: string, value: string): boolean {
        if (!Ranks.has(rank)) return false;
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
        const rank = Permissions.getRank(player);
        const display = Ranks.getDisplay(rank) ?? rank;
        return getRankName(rank).replace(/%rank%/g, display).replace(/%name%/g, player.getName());
    }

    export function updatePlayersName(): void {
        for (const player of bedrockServer.serverInstance.getPlayers()) {
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