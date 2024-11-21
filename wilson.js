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
var _Wilson_instances, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_useP3ColorSpace, _Wilson_callbacks, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_fullscreenLetterboxed, _Wilson_switchFullscreenCallback, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_currentlyDragging, _Wilson_lastWorldX, _Wilson_lastWorldY, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMousemove, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_onWheel, _Wilson_initInteraction, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_initFullscreen;
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
/*
    gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

    #shaderPrograms: Record<ShaderProgramId, WebGLProgram> = {};
    #uniforms: Record<ShaderProgramId, Record<string, WebGLUniformLocation>> = {};



    ctx: CanvasRenderingContext2D;
*/
class Wilson {
    constructor(canvas, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        _Wilson_instances.add(this);
        _Wilson_canvasWidth.set(this, void 0);
        _Wilson_canvasHeight.set(this, void 0);
        _Wilson_worldWidth.set(this, void 0);
        _Wilson_worldHeight.set(this, void 0);
        _Wilson_worldCenterX.set(this, void 0);
        _Wilson_worldCenterY.set(this, void 0);
        _Wilson_useP3ColorSpace.set(this, void 0);
        _Wilson_callbacks.set(this, void 0);
        _Wilson_draggablesRadius.set(this, void 0);
        _Wilson_draggablesStatic.set(this, void 0);
        _Wilson_draggableCallbacks.set(this, void 0);
        _Wilson_draggablesContainerWidth.set(this, void 0);
        _Wilson_draggablesContainerHeight.set(this, void 0);
        _Wilson_draggablesContainerRestrictedWidth.set(this, void 0);
        _Wilson_draggablesContainerRestrictedHeight.set(this, void 0);
        _Wilson_fullscreenLetterboxed.set(this, void 0);
        _Wilson_switchFullscreenCallback.set(this, void 0);
        _Wilson_fullscreenUseButton.set(this, void 0);
        _Wilson_fullscreenEnterFullscreenButtonIconPath.set(this, void 0);
        _Wilson_fullscreenExitFullscreenButtonIconPath.set(this, void 0);
        _Wilson_appletContainer.set(this, void 0);
        _Wilson_canvasContainer.set(this, void 0);
        _Wilson_draggablesContainer.set(this, void 0);
        _Wilson_fullscreenContainer.set(this, void 0);
        _Wilson_fullscreenContainerLocation.set(this, void 0);
        _Wilson_currentlyDragging.set(this, false);
        _Wilson_lastWorldX.set(this, 0);
        _Wilson_lastWorldY.set(this, 0);
        this.canvas = canvas;
        __classPrivateFieldSet(this, _Wilson_canvasWidth, options.canvasWidth, "f");
        __classPrivateFieldSet(this, _Wilson_canvasHeight, options.canvasHeight, "f");
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        __classPrivateFieldSet(this, _Wilson_worldWidth, (_a = options.worldWidth) !== null && _a !== void 0 ? _a : 2, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, (_b = options.worldHeight) !== null && _b !== void 0 ? _b : 2, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterX, (_c = options.worldCenterX) !== null && _c !== void 0 ? _c : 0, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, (_d = options.worldCenterY) !== null && _d !== void 0 ? _d : 0, "f");
        __classPrivateFieldSet(this, _Wilson_useP3ColorSpace, (_e = options.useP3ColorSpace) !== null && _e !== void 0 ? _e : true, "f");
        __classPrivateFieldSet(this, _Wilson_callbacks, { ...defaultInteractionCallbacks, ...options.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesRadius, (_g = (_f = options.draggableOptions) === null || _f === void 0 ? void 0 : _f.radius) !== null && _g !== void 0 ? _g : 10, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesStatic, (_j = (_h = options.draggableOptions) === null || _h === void 0 ? void 0 : _h.static) !== null && _j !== void 0 ? _j : false, "f");
        __classPrivateFieldSet(this, _Wilson_draggableCallbacks, { ...defaultDraggableCallbacks, ...(_k = options.draggableOptions) === null || _k === void 0 ? void 0 : _k.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenLetterboxed, (_m = (_l = options.fullscreenOptions) === null || _l === void 0 ? void 0 : _l.letterboxed) !== null && _m !== void 0 ? _m : false, "f");
        __classPrivateFieldSet(this, _Wilson_switchFullscreenCallback, (_p = (_o = options.fullscreenOptions) === null || _o === void 0 ? void 0 : _o.switchFullscreenCallback) !== null && _p !== void 0 ? _p : (() => { }), "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenUseButton, (_r = (_q = options.fullscreenOptions) === null || _q === void 0 ? void 0 : _q.useFullscreenButton) !== null && _r !== void 0 ? _r : false, "f");
        if ((_s = options.fullscreenOptions) === null || _s === void 0 ? void 0 : _s.useFullscreenButton) {
            __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, (_t = options.fullscreenOptions) === null || _t === void 0 ? void 0 : _t.enterFullscreenButtonIconPath, "f");
            __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, (_u = options.fullscreenOptions) === null || _u === void 0 ? void 0 : _u.exitFullscreenButtonIconPath, "f");
        }
        // const colorSpace = (this.#useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
        // 	? "display-p3"
        // 	: "srgb";
        // const ctx = this.canvas.getContext("2d", { colorSpace });
        // if (!ctx)
        // {
        // 	throw new Error(`[Wilson] Could not get 2d context for canvas: ${ctx}`);
        // }
        // this.ctx = ctx;
        // Initialize the container structure.
        __classPrivateFieldSet(this, _Wilson_appletContainer, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_appletContainer, "f").classList.add("WILSON_applet-container");
        __classPrivateFieldGet(this, _Wilson_appletContainer, "f").classList.add("WILSON_center-content");
        this.canvas.parentElement && this.canvas.parentElement.insertBefore(__classPrivateFieldGet(this, _Wilson_appletContainer, "f"), this.canvas);
        __classPrivateFieldSet(this, _Wilson_canvasContainer, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").classList.add("WILSON_canvas-container");
        __classPrivateFieldGet(this, _Wilson_appletContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_canvasContainer, "f"));
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(this.canvas);
        __classPrivateFieldSet(this, _Wilson_draggablesContainer, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").classList.add("WILSON_draggables-container");
        __classPrivateFieldGet(this, _Wilson_appletContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_draggablesContainer, "f"));
        const computedStyle = getComputedStyle(this.canvas);
        const width = this.canvas.clientWidth
            - parseFloat(computedStyle.paddingLeft)
            - parseFloat(computedStyle.paddingRight);
        const height = this.canvas.clientHeight
            - parseFloat(computedStyle.paddingTop)
            - parseFloat(computedStyle.paddingBottom);
        __classPrivateFieldSet(this, _Wilson_draggablesContainerWidth, width + 2 * __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_draggablesContainerHeight, height + 2 * __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), "f");
        __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").style.width = `${__classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f")}px`;
        __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").style.height = `${__classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f")}px`;
        __classPrivateFieldSet(this, _Wilson_draggablesContainerRestrictedWidth, width, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesContainerRestrictedHeight, height, "f");
        __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").style.marginTop =
            (parseFloat(computedStyle.borderTopWidth)
                + parseFloat(computedStyle.paddingTop)
                - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")) + "px";
        __classPrivateFieldSet(this, _Wilson_fullscreenContainer, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.add("WILSON_fullscreen-container");
        __classPrivateFieldGet(this, _Wilson_appletContainer, "f").parentElement && __classPrivateFieldGet(this, _Wilson_appletContainer, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"), __classPrivateFieldGet(this, _Wilson_appletContainer, "f"));
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_appletContainer, "f"));
        __classPrivateFieldSet(this, _Wilson_fullscreenContainerLocation, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").parentElement &&
            __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f"), __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
        __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
        for (const canvas of [this.canvas, __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f")]) {
            canvas.addEventListener("gesturestart", e => e.preventDefault());
            canvas.addEventListener("gesturechange", e => e.preventDefault());
            canvas.addEventListener("gestureend", e => e.preventDefault());
            canvas.addEventListener("click", e => e.preventDefault());
        }
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initInteraction).call(this);
        // this.#initFullscreen();
        console.log(`[Wilson] Initialized a ${__classPrivateFieldGet(this, _Wilson_canvasWidth, "f")}x${__classPrivateFieldGet(this, _Wilson_canvasHeight, "f")} canvas`
            + (this.canvas.id ? ` with ID ${this.canvas.id}` : ""));
    }
}
_Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_useP3ColorSpace = new WeakMap(), _Wilson_callbacks = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_fullscreenLetterboxed = new WeakMap(), _Wilson_switchFullscreenCallback = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_lastWorldX = new WeakMap(), _Wilson_lastWorldY = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_onMousedown = function _Wilson_onMousedown(e) { }, _Wilson_onMouseup = function _Wilson_onMouseup(e) { }, _Wilson_onMousemove = function _Wilson_onMousemove(e) { }, _Wilson_onTouchstart = function _Wilson_onTouchstart(e) { }, _Wilson_onTouchend = function _Wilson_onTouchend(e) { }, _Wilson_onTouchmove = function _Wilson_onTouchmove(e) { }, _Wilson_onWheel = function _Wilson_onWheel(e) { }, _Wilson_initInteraction = function _Wilson_initInteraction() {
    for (const canvas of [this.canvas, __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f")]) {
        canvas.addEventListener("mousedown", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onMousedown).call(this, e));
        canvas.addEventListener("mouseup", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onMouseup).call(this, e));
        canvas.addEventListener("mousemove", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onMousemove).call(this, e));
        canvas.addEventListener("touchstart", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onTouchstart).call(this, e));
        canvas.addEventListener("touchend", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onTouchend).call(this, e));
        canvas.addEventListener("touchmove", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onTouchmove).call(this, e));
        canvas.addEventListener("wheel", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onWheel).call(this, e));
        canvas.addEventListener("mouseleave", (e) => {
            if (__classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
                __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
                if (__classPrivateFieldGet(this, _Wilson_callbacks, "f").mouseup) {
                    __classPrivateFieldGet(this, _Wilson_callbacks, "f").mouseup({
                        x: __classPrivateFieldGet(this, _Wilson_lastWorldX, "f"),
                        y: __classPrivateFieldGet(this, _Wilson_lastWorldY, "f"),
                        event: e
                    });
                }
            }
        });
    }
}, _Wilson_draggableOnMousedown = function _Wilson_draggableOnMousedown(e) { }, _Wilson_draggableOnMouseup = function _Wilson_draggableOnMouseup(e) { }, _Wilson_draggableOnMousemove = function _Wilson_draggableOnMousemove(e) { }, _Wilson_draggableOnTouchstart = function _Wilson_draggableOnTouchstart(e) { }, _Wilson_draggableOnTouchend = function _Wilson_draggableOnTouchend(e) { }, _Wilson_draggableOnTouchmove = function _Wilson_draggableOnTouchmove(e) { }, _Wilson_initFullscreen = function _Wilson_initFullscreen() {
    if (__classPrivateFieldGet(this, _Wilson_fullscreenUseButton, "f") && __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, "f")) {
        const enterFullscreenButton = document.createElement("div");
        enterFullscreenButton.classList.add("WILSON_enter-fullscreen-button");
        this.canvas.parentElement && this.canvas.parentElement.appendChild(enterFullscreenButton);
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, "f");
        enterFullscreenButton.appendChild(img);
        enterFullscreenButton.addEventListener("click", () => {
            this.enterFullscreen();
        });
    }
};
export {};
