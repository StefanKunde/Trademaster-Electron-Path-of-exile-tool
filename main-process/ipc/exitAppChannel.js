"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitAppChannel = void 0;
var main_1 = require("../../main");
var ExitAppChannel = /** @class */ (function () {
    function ExitAppChannel() {
    }
    ExitAppChannel.prototype.getName = function () {
        return 'exitApp';
    };
    ExitAppChannel.prototype.handle = function (event, request) {
        if (!request.responseChannel) {
            request.responseChannel = this.getName() + "_response";
        }
        if (main_1.mainWindow) {
            main_1.mainWindow.close();
        }
        // We dont need to send back when closing.
        // event.sender.send(request.responseChannel, {});
    };
    return ExitAppChannel;
}());
exports.ExitAppChannel = ExitAppChannel;
