"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("@bdsx/rank-perms/src");
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
    const send = new message_1.sendMessage(actor);
    if (!src_1.Ranks.has(p.rank)) {
        send.error(`Rank not found!`);
        return;
    }
    send.success(`Success to set ${p.rank} name`);
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
    const send = new message_1.sendMessage(actor);
    send.success(`Success to set default name`);
    __1.RankNameMain.setDefaultName(p.value);
}, {
    isrank: command_3.command.enum("RankName_default", "default"),
    value: nativetype_1.CxxString,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QywwREFBMkQ7QUFDM0QsOENBQTBEO0FBQzFELDBDQUF1QztBQUN2QyxnREFBNEM7QUFDNUMsMEJBQWtDO0FBQ2xDLDZDQUE4QztBQUU5QyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsMEJBQTBCLEVBQUUsa0NBQWtDLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0tBQ2xJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUNmLGdCQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUNyQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFUCxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsK0JBQStCLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO0tBQzVILFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7SUFDZixNQUFNLEtBQUssR0FBRyxNQUFBLENBQUMsQ0FBQyxTQUFTLEVBQUUsMENBQUUsb0JBQW9CLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDL0QsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxxQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXBDLElBQUksQ0FBQyxXQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUIsT0FBTztLQUNWO0lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUM7SUFDOUMsZ0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxFQUFFO0lBQ0MsTUFBTSxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7SUFDN0MsSUFBSSxFQUFFLHNCQUFTO0lBQ2YsS0FBSyxFQUFFLHNCQUFTO0NBQ25CLENBQUM7S0FDRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0lBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBQSxDQUFDLENBQUMsU0FBUyxFQUFFLDBDQUFFLG9CQUFvQixHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQy9ELElBQUksS0FBSyxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUkscUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDNUMsZ0JBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUMsRUFBRTtJQUNDLE1BQU0sRUFBRSxpQkFBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUM7SUFDbkQsS0FBSyxFQUFFLHNCQUFTO0NBQ25CLENBQUMsQ0FBQyJ9