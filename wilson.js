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
var _Wilson_instances, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_onResizeCanvasUser, _Wilson_callbacks, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_fullscreenOldScroll, _Wilson_fullscreenFillScreen, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_metaThemeColorElement, _Wilson_oldMetaThemeColor, _Wilson_onResizeWindow, _Wilson_handleKeydownEvent, _Wilson_onResizeCanvas, _Wilson_currentlyDragging, _Wilson_lastWorldX, _Wilson_lastWorldY, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMousemove, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_onWheel, _Wilson_initInteraction, _Wilson_draggableElements, _Wilson_draggableDefaultId, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_updateDraggablesContainerSize, _Wilson_initFullscreen, _Wilson_preventGestures, _Wilson_canvasOldWidth, _Wilson_canvasOldWidthStyle, _Wilson_canvasOldHeightStyle, _Wilson_enterFullscreen, _Wilson_exitFullscreen;
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
    mousedown: ({ id, x, y, event }) => { },
    mouseup: ({ id, x, y, event }) => { },
    mousedrag: ({ id, x, y, xDelta, yDelta, event }) => { },
    touchstart: ({ id, x, y, event }) => { },
    touchend: ({ id, x, y, event }) => { },
    touchmove: ({ id, x, y, xDelta, yDelta, event }) => { },
};
/*
    gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

    #shaderPrograms: Record<ShaderProgramId, WebGLProgram> = {};
    #uniforms: Record<ShaderProgramId, Record<string, WebGLUniformLocation>> = {};



    ctx: CanvasRenderingContext2D;
*/
class Wilson {
    constructor(canvas, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        _Wilson_instances.add(this);
        _Wilson_worldWidth.set(this, void 0);
        _Wilson_worldHeight.set(this, void 0);
        _Wilson_worldCenterX.set(this, void 0);
        _Wilson_worldCenterY.set(this, void 0);
        _Wilson_onResizeCanvasUser.set(this, void 0);
        _Wilson_callbacks.set(this, void 0);
        _Wilson_draggablesRadius.set(this, void 0);
        _Wilson_draggablesStatic.set(this, void 0);
        _Wilson_draggableCallbacks.set(this, void 0);
        _Wilson_draggablesContainerWidth.set(this, 0);
        _Wilson_draggablesContainerHeight.set(this, 0);
        _Wilson_draggablesContainerRestrictedWidth.set(this, 0);
        _Wilson_draggablesContainerRestrictedHeight.set(this, 0);
        this.currentlyFullscreen = false;
        _Wilson_fullscreenOldScroll.set(this, 0);
        _Wilson_fullscreenFillScreen.set(this, void 0);
        _Wilson_fullscreenUseButton.set(this, void 0);
        _Wilson_fullscreenEnterFullscreenButtonIconPath.set(this, void 0);
        _Wilson_fullscreenExitFullscreenButtonIconPath.set(this, void 0);
        _Wilson_appletContainer.set(this, void 0);
        _Wilson_canvasContainer.set(this, void 0);
        _Wilson_draggablesContainer.set(this, void 0);
        _Wilson_fullscreenContainer.set(this, void 0);
        _Wilson_fullscreenContainerLocation.set(this, void 0);
        _Wilson_metaThemeColorElement.set(this, document.querySelector("meta[name='theme-color']"));
        _Wilson_oldMetaThemeColor.set(this, null);
        _Wilson_currentlyDragging.set(this, false);
        _Wilson_lastWorldX.set(this, 0);
        _Wilson_lastWorldY.set(this, 0);
        _Wilson_draggableElements.set(this, {});
        _Wilson_draggableDefaultId.set(this, 0);
        _Wilson_canvasOldWidth.set(this, 0);
        _Wilson_canvasOldWidthStyle.set(this, "");
        _Wilson_canvasOldHeightStyle.set(this, "");
        this.canvas = canvas;
        const computedStyle = getComputedStyle(canvas);
        this.canvasAspectRatio = parseFloat(computedStyle.width) / parseFloat(computedStyle.height);
        if ("canvasWidth" in options) {
            this.canvasWidth = Math.round(options.canvasWidth);
            this.canvasHeight = Math.round(options.canvasWidth / this.canvasAspectRatio);
        }
        else {
            this.canvasWidth = Math.round(options.canvasHeight * this.canvasAspectRatio);
            this.canvasHeight = Math.round(options.canvasHeight);
        }
        this.canvas.setAttribute("width", this.canvasWidth.toString());
        this.canvas.setAttribute("height", this.canvasHeight.toString());
        __classPrivateFieldSet(this, _Wilson_worldWidth, (_a = options.worldWidth) !== null && _a !== void 0 ? _a : 2, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, (_b = options.worldHeight) !== null && _b !== void 0 ? _b : 2, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterX, (_c = options.worldCenterX) !== null && _c !== void 0 ? _c : 0, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, (_d = options.worldCenterY) !== null && _d !== void 0 ? _d : 0, "f");
        __classPrivateFieldSet(this, _Wilson_onResizeCanvasUser, (_e = options === null || options === void 0 ? void 0 : options.onResizeCanvas) !== null && _e !== void 0 ? _e : (() => { }), "f");
        this.useP3ColorSpace = (_f = options.useP3ColorSpace) !== null && _f !== void 0 ? _f : true;
        __classPrivateFieldSet(this, _Wilson_callbacks, { ...defaultInteractionCallbacks, ...options.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesRadius, (_h = (_g = options.draggableOptions) === null || _g === void 0 ? void 0 : _g.radius) !== null && _h !== void 0 ? _h : 12, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesStatic, (_k = (_j = options.draggableOptions) === null || _j === void 0 ? void 0 : _j.static) !== null && _k !== void 0 ? _k : false, "f");
        __classPrivateFieldSet(this, _Wilson_draggableCallbacks, { ...defaultDraggableCallbacks, ...(_l = options.draggableOptions) === null || _l === void 0 ? void 0 : _l.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, (_o = (_m = options.fullscreenOptions) === null || _m === void 0 ? void 0 : _m.fillScreen) !== null && _o !== void 0 ? _o : false, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenUseButton, (_q = (_p = options.fullscreenOptions) === null || _p === void 0 ? void 0 : _p.useFullscreenButton) !== null && _q !== void 0 ? _q : false, "f");
        if ((_r = options.fullscreenOptions) === null || _r === void 0 ? void 0 : _r.useFullscreenButton) {
            __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, (_s = options.fullscreenOptions) === null || _s === void 0 ? void 0 : _s.enterFullscreenButtonIconPath, "f");
            __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, (_t = options.fullscreenOptions) === null || _t === void 0 ? void 0 : _t.exitFullscreenButtonIconPath, "f");
        }
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
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this);
        __classPrivateFieldSet(this, _Wilson_fullscreenContainer, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.add("WILSON_fullscreen-container");
        __classPrivateFieldGet(this, _Wilson_appletContainer, "f").parentElement && __classPrivateFieldGet(this, _Wilson_appletContainer, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"), __classPrivateFieldGet(this, _Wilson_appletContainer, "f"));
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_appletContainer, "f"));
        __classPrivateFieldSet(this, _Wilson_fullscreenContainerLocation, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").parentElement &&
            __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").parentElement.insertBefore(__classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f"), __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
        __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
        if (!__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f")) {
            __classPrivateFieldSet(this, _Wilson_metaThemeColorElement, document.createElement("meta"), "f");
            __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").setAttribute("name", "theme-color");
            document.head.appendChild(__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f"));
        }
        for (const canvas of [this.canvas, __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f")]) {
            canvas.addEventListener("gesturestart", e => e.preventDefault());
            canvas.addEventListener("gesturechange", e => e.preventDefault());
            canvas.addEventListener("gestureend", e => e.preventDefault());
            canvas.addEventListener("click", e => e.preventDefault());
        }
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initInteraction).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initFullscreen).call(this);
        window.addEventListener("resize", () => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeWindow).call(this));
        document.documentElement.addEventListener("keydown", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_handleKeydownEvent).call(this, e));
        console.log(`[Wilson] Initialized a ${this.canvasWidth}x${this.canvasHeight} canvas`
            + (this.canvas.id ? ` with ID ${this.canvas.id}` : ""));
    }
    resizeCanvas(dimensions) {
        const aspectRatio = (this.currentlyFullscreen && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f"))
            ? window.innerWidth / window.innerHeight
            : this.canvasAspectRatio;
        if ("width" in dimensions) {
            this.canvasWidth = Math.round(dimensions.width);
            this.canvasHeight = Math.round(dimensions.width / aspectRatio);
        }
        else {
            this.canvasWidth = Math.round(dimensions.height * aspectRatio);
            this.canvasHeight = Math.round(dimensions.height);
        }
        this.canvas.setAttribute("width", this.canvasWidth.toString());
        this.canvas.setAttribute("height", this.canvasHeight.toString());
    }
    addDraggable({ x, y, id }) {
        var _a;
        //First convert to page coordinates.
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const useableId = id !== null && id !== void 0 ? id : `WILSON_draggable-${__classPrivateFieldGet(this, _Wilson_draggableDefaultId, "f")}`;
        __classPrivateFieldSet(this, _Wilson_draggableDefaultId, (_a = __classPrivateFieldGet(this, _Wilson_draggableDefaultId, "f"), _a++, _a), "f");
        const element = document.createElement("div");
        element.classList.add("WILSON_draggable");
        element.id = useableId;
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
        element.addEventListener("mousedown", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMousedown).call(this, e, useableId));
        element.addEventListener("mouseup", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMouseup).call(this, e, useableId));
        element.addEventListener("mousemove", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMousemove).call(this, e, useableId));
        element.addEventListener("touchstart", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnTouchstart).call(this, e, useableId));
        element.addEventListener("touchend", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnTouchend).call(this, e, useableId));
        element.addEventListener("touchmove", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnTouchmove).call(this, e, useableId));
        __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").appendChild(element);
        __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[useableId] = {
            element: element,
            x: x,
            y: y,
            currentlyDragging: false,
        };
        return element;
    }
    enterFullscreen() {
        // @ts-ignore
        if (document.startViewTransition) {
            if (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
                __classPrivateFieldGet(this, _Wilson_appletContainer, "f").style.setProperty("view-transition-name", "WILSON_applet-container");
            }
            // @ts-ignore
            document.startViewTransition(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this));
        }
        else {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this);
        }
    }
    exitFullscreen() {
        // @ts-ignore
        if (document.startViewTransition) {
            if (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
                __classPrivateFieldGet(this, _Wilson_appletContainer, "f").style.setProperty("view-transition-name", "WILSON_applet-container");
            }
            // @ts-ignore
            document.startViewTransition(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this));
        }
        else {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this);
        }
    }
    interpolateCanvasToWorld([row, col]) {
        return [
            (col / this.canvasWidth - .5) * __classPrivateFieldGet(this, _Wilson_worldWidth, "f")
                + __classPrivateFieldGet(this, _Wilson_worldCenterX, "f"),
            (.5 - row / this.canvasHeight) * __classPrivateFieldGet(this, _Wilson_worldHeight, "f")
                + __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")
        ];
    }
    interpolateWorldToCanvas([x, y]) {
        return [
            Math.floor((.5 - (y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f"))
                * this.canvasHeight),
            Math.floor(((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)
                * this.canvasWidth)
        ];
    }
}
_Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_onResizeCanvasUser = new WeakMap(), _Wilson_callbacks = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_fullscreenOldScroll = new WeakMap(), _Wilson_fullscreenFillScreen = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_metaThemeColorElement = new WeakMap(), _Wilson_oldMetaThemeColor = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_lastWorldX = new WeakMap(), _Wilson_lastWorldY = new WeakMap(), _Wilson_draggableElements = new WeakMap(), _Wilson_draggableDefaultId = new WeakMap(), _Wilson_canvasOldWidth = new WeakMap(), _Wilson_canvasOldWidthStyle = new WeakMap(), _Wilson_canvasOldHeightStyle = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_onResizeWindow = function _Wilson_onResizeWindow() {
    if (this.currentlyFullscreen && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        // Resize the canvas to fill the screen but keep the same total number of pixels.
        const windowAspectRatio = window.innerWidth / window.innerHeight;
        const width = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight * windowAspectRatio));
        this.resizeCanvas({ width });
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
    }
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this);
}, _Wilson_handleKeydownEvent = function _Wilson_handleKeydownEvent(e) {
    if (e.key === "Escape" && this.currentlyFullscreen) {
        this.exitFullscreen();
    }
}, _Wilson_onResizeCanvas = function _Wilson_onResizeCanvas() {
    requestAnimationFrame(() => __classPrivateFieldGet(this, _Wilson_onResizeCanvasUser, "f").call(this));
}, _Wilson_onMousedown = function _Wilson_onMousedown(e) { }, _Wilson_onMouseup = function _Wilson_onMouseup(e) { }, _Wilson_onMousemove = function _Wilson_onMousemove(e) { }, _Wilson_onTouchstart = function _Wilson_onTouchstart(e) { }, _Wilson_onTouchend = function _Wilson_onTouchend(e) { }, _Wilson_onTouchmove = function _Wilson_onTouchmove(e) { }, _Wilson_onWheel = function _Wilson_onWheel(e) { }, _Wilson_initInteraction = function _Wilson_initInteraction() {
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
}, _Wilson_draggableOnMousedown = function _Wilson_draggableOnMousedown(e, id) {
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = true;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").mousedown({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
        y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
        event: e,
    });
}, _Wilson_draggableOnMouseup = function _Wilson_draggableOnMouseup(e, id) {
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = false;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").mouseup({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
        y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
        event: e,
    });
}, _Wilson_draggableOnMousemove = function _Wilson_draggableOnMousemove(e, id) {
    e.preventDefault();
    if (!__classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging) {
        return;
    }
    const rect = __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").getBoundingClientRect();
    const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), e.clientY - rect.top), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
    const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), e.clientX - rect.left), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    const x = ((col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") / 2)
        / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f")) * __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
    const y = (-(row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") / 2)
        / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f")) * __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").mousedrag({
        id,
        x,
        y,
        xDelta: x - __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
        yDelta: y - __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
        event: e,
    });
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x = x;
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y = y;
}, _Wilson_draggableOnTouchstart = function _Wilson_draggableOnTouchstart(e, id) {
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = true;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").touchstart({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
        y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
        event: e,
    });
}, _Wilson_draggableOnTouchend = function _Wilson_draggableOnTouchend(e, id) {
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = false;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").touchend({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
        y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
        event: e,
    });
}, _Wilson_draggableOnTouchmove = function _Wilson_draggableOnTouchmove(e, id) {
    e.preventDefault();
    if (!__classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging) {
        return;
    }
    const rect = __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").getBoundingClientRect();
    const worldCoordinates = Array.from(e.touches).map(touch => {
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), touch.clientY - rect.top), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), touch.clientX - rect.left), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const x = ((col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") / 2)
            / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f")) * __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        const y = (-(row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") / 2)
            / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f")) * __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        return [x, y, row, col];
    });
    const distancesFromDraggableCenter = worldCoordinates.map(coordinate => {
        return (coordinate[0] - __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x) ** 2
            + (coordinate[1] - __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y) ** 2;
    });
    let minIndex = 0;
    let minDistance = distancesFromDraggableCenter[0];
    for (let i = 1; i < distancesFromDraggableCenter.length; i++) {
        if (distancesFromDraggableCenter[i] < minDistance) {
            minIndex = i;
            minDistance = distancesFromDraggableCenter[i];
        }
    }
    const [x, y, row, col] = worldCoordinates[minIndex];
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").touchmove({
        id,
        x,
        y,
        xDelta: x - __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
        yDelta: y - __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
        event: e,
    });
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x = x;
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y = y;
}, _Wilson_updateDraggablesContainerSize = function _Wilson_updateDraggablesContainerSize() {
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
}, _Wilson_initFullscreen = function _Wilson_initFullscreen() {
    if (__classPrivateFieldGet(this, _Wilson_fullscreenUseButton, "f")) {
        const enterFullscreenButton = document.createElement("div");
        enterFullscreenButton.classList.add("WILSON_enter-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(enterFullscreenButton);
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, "f");
        enterFullscreenButton.appendChild(img);
        enterFullscreenButton.addEventListener("click", () => {
            this.enterFullscreen();
        });
        const exitFullscreenButton = document.createElement("div");
        exitFullscreenButton.classList.add("WILSON_exit-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(exitFullscreenButton);
        const img2 = document.createElement("img");
        img2.src = __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, "f");
        exitFullscreenButton.appendChild(img2);
        exitFullscreenButton.addEventListener("click", () => {
            this.exitFullscreen();
        });
    }
}, _Wilson_preventGestures = function _Wilson_preventGestures(e) {
    e.preventDefault();
}, _Wilson_enterFullscreen = function _Wilson_enterFullscreen() {
    this.currentlyFullscreen = true;
    __classPrivateFieldSet(this, _Wilson_fullscreenOldScroll, window.scrollY, "f");
    if (__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f")) {
        __classPrivateFieldSet(this, _Wilson_oldMetaThemeColor, __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").getAttribute("content"), "f");
    }
    __classPrivateFieldSet(this, _Wilson_canvasOldWidth, this.canvasWidth, "f");
    __classPrivateFieldSet(this, _Wilson_canvasOldWidthStyle, this.canvas.style.width, "f");
    __classPrivateFieldSet(this, _Wilson_canvasOldHeightStyle, this.canvas.style.height, "f");
    document.body.appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
    this.canvas.classList.add("WILSON_fullscreen");
    __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").classList.add("WILSON_fullscreen");
    __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.add("WILSON_fullscreen");
    document.documentElement.style.overflowY = "hidden";
    document.body.style.overflowY = "hidden";
    document.body.style.width = "100vw";
    document.body.style.height = "100%";
    document.documentElement.style.userSelect = "none";
    document.addEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_preventGestures));
    document.addEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_preventGestures));
    document.addEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_preventGestures));
    if (__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f")) {
        __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").setAttribute("content", "#000000");
    }
    if (__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.add("WILSON_true-fullscreen");
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100%";
        window.scroll(0, 0);
    }
    else {
        this.canvas.style.width = `min(100vw, calc(100vh * ${this.canvasAspectRatio}))`;
        this.canvas.style.height = `min(100vh, calc(100vw / ${this.canvasAspectRatio}))`;
    }
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeWindow).call(this);
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
    requestAnimationFrame(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this));
}, _Wilson_exitFullscreen = function _Wilson_exitFullscreen() {
    var _a;
    this.currentlyFullscreen = false;
    if (__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f")) {
        __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").setAttribute("content", (_a = __classPrivateFieldGet(this, _Wilson_oldMetaThemeColor, "f")) !== null && _a !== void 0 ? _a : "");
    }
    __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
    this.canvas.classList.remove("WILSON_fullscreen");
    __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").classList.remove("WILSON_fullscreen");
    __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.remove("WILSON_fullscreen");
    document.documentElement.style.overflowY = "scroll";
    document.body.style.overflowY = "visible";
    document.body.style.width = "";
    document.body.style.height = "";
    document.documentElement.style.userSelect = "auto";
    document.removeEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_preventGestures));
    document.removeEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_preventGestures));
    document.removeEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_preventGestures));
    this.resizeCanvas({ width: __classPrivateFieldGet(this, _Wilson_canvasOldWidth, "f") });
    this.canvas.style.width = __classPrivateFieldGet(this, _Wilson_canvasOldWidthStyle, "f");
    this.canvas.style.height = __classPrivateFieldGet(this, _Wilson_canvasOldHeightStyle, "f");
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeWindow).call(this);
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
    window.scrollTo(0, __classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f"));
    setTimeout(() => window.scrollTo(0, __classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f")), 10);
};
export class WilsonCPU extends Wilson {
    constructor(canvas, options) {
        super(canvas, options);
        const colorSpace = (this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
            ? "display-p3"
            : "srgb";
        const ctx = this.canvas.getContext("2d", { colorSpace });
        if (!ctx) {
            throw new Error(`[Wilson] Could not get 2d context for canvas: ${ctx}`);
        }
        this.ctx = ctx;
        this.ctx = canvas.getContext("2d");
    }
    drawFrame(image) {
        this.ctx.putImageData(new ImageData(image, this.canvasWidth, this.canvasHeight), 0, 0);
    }
    downloadFrame(filename) {
        this.canvas.toBlob((blob) => {
            if (!blob) {
                console.error(`[Wilson] Could not create a blob from a canvas with ID ${this.canvas.id}`);
                return;
            }
            const link = document.createElement("a");
            link.download = filename;
            link.href = window.URL.createObjectURL(blob);
            link.click();
            link.remove();
        });
    }
}
