"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendTradeMessageChannel = void 0;
var electron_1 = require("electron");
var robotjs = require("robotjs");
var electron_overlay_window_1 = require("electron-overlay-window");
var SendTradeMessageChannel = /** @class */ (function () {
    function SendTradeMessageChannel() {
    }
    SendTradeMessageChannel.prototype.getName = function () {
        return 'sendTradeMessage';
    };
    SendTradeMessageChannel.prototype.handle = function (event, request) {
        if (!request.responseChannel) {
            request.responseChannel = this.getName() + "_response";
        }
        electron_1.clipboard.writeText(request.params[0]);
        // Action here!
        electron_overlay_window_1.overlayWindow.focusTarget();
        robotjs.keyTap('enter');
        robotjs.keyTap("v", "control");
        robotjs.keyTap('enter');
        event.sender.send(request.responseChannel, {});
    };
    return SendTradeMessageChannel;
}());
exports.SendTradeMessageChannel = SendTradeMessageChannel;
