import { Ranks } from "@bdsx/rank-perms/src";
import { commandPerm } from "@bdsx/rank-perms/src/command";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { CxxString } from "bdsx/nativetype";
import { RankNameMain } from "..";
import { sendMessage } from "./utils/message";

commandPerm.register("reloadname", "Reload all players name.", "rank-name.command.reloadrankname", CommandPermissionLevel.Operator)
.overload((p, o) => {
    RankNameMain.updatePlayersName();
}, {});

commandPerm.register("setrankname", "Customize rank name.", "rank-name.command.setrankname", CommandPermissionLevel.Operator)
.overload((p, o) => {
    const actor = o.getEntity()?.getNetworkIdentifier().getActor();
    if (actor === null) return;
    const send = new sendMessage(actor);

    if (!Ranks.has(p.rank)) {
        send.error(`Rank not found!`);
        return;
    }
    send.success(`Success to set ${p.rank} name`);
    RankNameMain.setRankName(p.rank, p.value);
}, {
    isrank: command.enum("RankName_rank", "rank"),
    rank: CxxString,
    value: CxxString,
})
.overload((p, o) => {
    const actor = o.getEntity()?.getNetworkIdentifier().getActor();
    if (actor === null) return;
    const send = new sendMessage(actor);

    send.success(`Success to set default name`);
    RankNameMain.setDefaultName(p.value);
}, {
    isrank: command.enum("RankName_default", "default"),
    value: CxxString,
});