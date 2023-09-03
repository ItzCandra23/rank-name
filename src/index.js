"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rank_perms_1 = require("@bdsx/rank-perms");
const command_1 = require("@bdsx/rank-perms/src/command");
const command_2 = require("bdsx/bds/command");
const command_3 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const __1 = require("..");
const message_1 = require("./utils/message");
command_1.commandPerm.register("reloadname", "Reload all players name.", "rank-name.command.reloadrankname", command_2.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    __1.RankNameMain.updatePlayersName();
}, {});
command_1.commandPerm.register("setrankname", "Customize rank name.", "rank-name.command.setrankname", command_2.CommandPermissionLevel.Operator)
    .overload((p, o) => {
    var _a;
    const actor = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor();
    if (actor === null)
        return;
    const send = new message_1.send(actor);
    if (!rank_perms_1.RankPerms.hasRank(p.rank)) {
        send.error(`Rank not found!`);
        return;
    }
    send.success(`Success to set §r${p.rank}§a name`);
    __1.RankNameMain.setRankName(p.rank, p.value);
}, {
    isrank: command_3.command.enum("RankName_rank", "rank"),
    rank: nativetype_1.CxxString,
    value: nativetype_1.CxxString,
})
    .overload((p, o) => {
    var _a;
    const actor = (_a = o.getEntity()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor();
    if (actor === null)
        return;
    const send = new message_1.send(actor);
    send.success(`Success to set default name`);
    __1.RankNameMain.setDefaultName(p.value);
}, {
    isrank: command_3.command.enum("RankName_default", "default"),
    value: nativetype_1.CxxString,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2QztBQUM3QywwREFBMkQ7QUFDM0QsOENBQTBEO0FBQzFELDBDQUF1QztBQUN2QyxnREFBNEM7QUFDNUMsMEJBQWtDO0FBQ2xDLDZDQUFzRDtBQUV0RCxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsMEJBQTBCLEVBQUUsa0NBQWtDLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0tBQ2xJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLGdCQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUNyQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFUCxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsK0JBQStCLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0tBQzVILFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7SUFDZixNQUFNLEtBQUssR0FBRyxNQUFBLENBQUMsQ0FBQyxTQUFTLEVBQUUsMENBQUUsb0JBQW9CLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDL0QsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEMsSUFBSSxDQUFDLHNCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUIsT0FBTztLQUNWO0lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUM7SUFDbEQsZ0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxFQUFFO0lBQ0MsTUFBTSxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7SUFDN0MsSUFBSSxFQUFFLHNCQUFTO0lBQ2YsS0FBSyxFQUFFLHNCQUFTO0NBQ25CLENBQUM7S0FDRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0lBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBQSxDQUFDLENBQUMsU0FBUyxFQUFFLDBDQUFFLG9CQUFvQixHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQy9ELElBQUksS0FBSyxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXBDLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUM1QyxnQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsQ0FBQyxFQUFFO0lBQ0MsTUFBTSxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQztJQUNuRCxLQUFLLEVBQUUsc0JBQVM7Q0FDbkIsQ0FBQyxDQUFDIn0=