var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Wilson_shaderPrograms, _Wilson_uniforms, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_callbacks, _Wilson_draggableOptions, _Wilson_fullscreenOptions;
const defaultInteractionCallbacks = {
    mousedown: ({ x, y, event }) => { },
    mouseup: ({ x, y, event }) => { },
    mousemove: ({ x, y, xDelta, yDelta, event }) => { },
    mousedrag: ({ x, y, xDelta, yDelta, event }) => { },
    touchstart: ({ x, y, event }) => { },
    touchend: ({ x, y, event }) => { },
    touchmove: ({ x, y, xDelta, yDelta, event }) => { },
    pinch: ({ centerX, centerY, spreadDelta, event }) => { },
    wheel: ({ x, y, scrollDelta, event }) => { },
};
const defaultDraggableCallbacks = {
    mousedown: ({ x, y, event }) => { },
    mouseup: ({ x, y, event }) => { },
    mousemove: ({ x, y, xDelta, yDelta, event }) => { },
    touchstart: ({ x, y, event }) => { },
    touchend: ({ x, y, event }) => { },
    touchmove: ({ x, y, xDelta, yDelta, event }) => { },
};
const defaultDraggableOptions = {
    radius: 10,
    static: false,
    callbacks: {},
};
const defaultFullscreenOptions = {
    letterboxed: false,
    switchFullscreenCallback: () => { },
    useFullscreenButton: false,
};
class Wilson {
    constructor(canvas, options) {
        var _a, _b, _c, _d;
        _Wilson_shaderPrograms.set(this, {});
        _Wilson_uniforms.set(this, {});
        _Wilson_canvasWidth.set(this, void 0);
        _Wilson_canvasHeight.set(this, void 0);
        _Wilson_worldWidth.set(this, void 0);
        _Wilson_worldHeight.set(this, void 0);
        _Wilson_worldCenterX.set(this, void 0);
        _Wilson_worldCenterY.set(this, void 0);
        _Wilson_callbacks.set(this, void 0);
        _Wilson_draggableOptions.set(this, void 0);
        _Wilson_fullscreenOptions.set(this, void 0);
        this.canvas = canvas;
        __classPrivateFieldSet(this, _Wilson_canvasWidth, options.canvasWidth, "f");
        __classPrivateFieldSet(this, _Wilson_canvasHeight, options.canvasHeight, "f");
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        const computedStyle = window.getComputedStyle(this.canvas);
        __classPrivateFieldSet(this, _Wilson_worldWidth, (_a = options.worldWidth) !== null && _a !== void 0 ? _a : 2, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, (_b = options.worldHeight) !== null && _b !== void 0 ? _b : 2, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterX, (_c = options.worldCenterX) !== null && _c !== void 0 ? _c : 0, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, (_d = options.worldCenterY) !== null && _d !== void 0 ? _d : 0, "f");
        __classPrivateFieldSet(this, _Wilson_callbacks, { ...defaultInteractionCallbacks, ...options.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_draggableOptions, { ...defaultDraggableOptions, ...options.draggableOptions }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenOptions, { ...defaultFullscreenOptions, ...options.fullscreenOptions }, "f");
        console.log(__classPrivateFieldGet(this, _Wilson_callbacks, "f"));
    }
}
_Wilson_shaderPrograms = new WeakMap(), _Wilson_uniforms = new WeakMap(), _Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_callbacks = new WeakMap(), _Wilson_draggableOptions = new WeakMap(), _Wilson_fullscreenOptions = new WeakMap();
export default Wilson;
