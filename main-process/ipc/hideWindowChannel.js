"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HideWindowChannel = void 0;
var main_1 = require("../../main");
var HideWindowChannel = /** @class */ (function () {
    function HideWindowChannel() {
    }
    HideWindowChannel.prototype.getName = function () {
        return 'hideWindow';
    };
    HideWindowChannel.prototype.handle = function (event, request) {
        if (!request.responseChannel) {
            request.responseChannel = this.getName() + "_response";
        }
        if (main_1.mainWindow) {
            main_1.mainWindow.hide();
        }
        event.sender.send(request.responseChannel, {});
    };
    return HideWindowChannel;
}());
exports.HideWindowChannel = HideWindowChannel;
