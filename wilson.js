var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Wilson_instances, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_canvasAspectRatio, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_onResizeCanvasCallback, _Wilson_useP3ColorSpace, _Wilson_callbacks, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_fullscreenOldScroll, _Wilson_fullscreenFillScreen, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_metaThemeColorElement, _Wilson_oldMetaThemeColor, _Wilson_onResizeWindow, _Wilson_handleKeydownEvent, _Wilson_onResizeCanvas, _Wilson_currentlyDragging, _Wilson_lastWorldX, _Wilson_lastWorldY, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMousemove, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_onWheel, _Wilson_initInteraction, _Wilson_draggableElements, _Wilson_draggableDefaultId, _Wilson_currentMouseDraggableId, _Wilson_documentDraggableMousemoveListener, _Wilson_documentDraggableMouseupListener, _Wilson_initDraggables, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_updateDraggablesContainerSize, _Wilson_initFullscreen, _Wilson_preventGestures, _Wilson_canvasOldWidth, _Wilson_canvasOldWidthStyle, _Wilson_canvasOldHeightStyle, _Wilson_enterFullscreen, _Wilson_exitFullscreen, _WilsonGPU_instances, _WilsonGPU_shaderPrograms, _WilsonGPU_uniforms, _WilsonGPU_loadShaderInternal, _WilsonGPU_numShaders;
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
class Wilson {
    get canvasWidth() {
        return __classPrivateFieldGet(this, _Wilson_canvasWidth, "f");
    }
    get canvasHeight() {
        return __classPrivateFieldGet(this, _Wilson_canvasHeight, "f");
    }
    get useP3ColorSpace() {
        return __classPrivateFieldGet(this, _Wilson_useP3ColorSpace, "f");
    }
    constructor(canvas, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        _Wilson_instances.add(this);
        _Wilson_canvasWidth.set(this, void 0);
        _Wilson_canvasHeight.set(this, void 0);
        _Wilson_canvasAspectRatio.set(this, void 0);
        _Wilson_worldWidth.set(this, void 0);
        _Wilson_worldHeight.set(this, void 0);
        _Wilson_worldCenterX.set(this, void 0);
        _Wilson_worldCenterY.set(this, void 0);
        _Wilson_onResizeCanvasCallback.set(this, void 0);
        _Wilson_useP3ColorSpace.set(this, void 0);
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
        _Wilson_onResizeWindow.set(this, () => {
            if (this.currentlyFullscreen && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
                // Resize the canvas to fill the screen but keep the same total number of pixels.
                const windowAspectRatio = window.innerWidth / window.innerHeight;
                const width = Math.round(Math.sqrt(__classPrivateFieldGet(this, _Wilson_canvasWidth, "f") * __classPrivateFieldGet(this, _Wilson_canvasHeight, "f") * windowAspectRatio));
                this.resizeCanvas({ width });
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
            }
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this);
        });
        _Wilson_handleKeydownEvent.set(this, (e) => {
            if (e.key === "Escape" && this.currentlyFullscreen) {
                this.exitFullscreen();
            }
        });
        _Wilson_currentlyDragging.set(this, false);
        _Wilson_lastWorldX.set(this, 0);
        _Wilson_lastWorldY.set(this, 0);
        _Wilson_draggableElements.set(this, {});
        _Wilson_draggableDefaultId.set(this, 0);
        _Wilson_currentMouseDraggableId.set(this, void 0);
        _Wilson_documentDraggableMousemoveListener.set(this, (e) => {
            if (__classPrivateFieldGet(this, _Wilson_currentMouseDraggableId, "f") !== undefined) {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMousemove).call(this, e, __classPrivateFieldGet(this, _Wilson_currentMouseDraggableId, "f"));
            }
        });
        _Wilson_documentDraggableMouseupListener.set(this, (e) => {
            if (__classPrivateFieldGet(this, _Wilson_currentMouseDraggableId, "f") !== undefined) {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMouseup).call(this, e, __classPrivateFieldGet(this, _Wilson_currentMouseDraggableId, "f"));
            }
        });
        _Wilson_preventGestures.set(this, (e) => {
            e.preventDefault();
        });
        _Wilson_canvasOldWidth.set(this, 0);
        _Wilson_canvasOldWidthStyle.set(this, "");
        _Wilson_canvasOldHeightStyle.set(this, "");
        this.canvas = canvas;
        const computedStyle = getComputedStyle(canvas);
        __classPrivateFieldSet(this, _Wilson_canvasAspectRatio, parseFloat(computedStyle.width) / parseFloat(computedStyle.height), "f");
        if ("canvasWidth" in options) {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(options.canvasWidth), "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(options.canvasWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(options.canvasHeight * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(options.canvasHeight), "f");
        }
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        if (options.worldWidth !== undefined && options.worldHeight !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldWidth, options.worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, options.worldHeight, "f");
        }
        else if (options.worldHeight !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldHeight, options.worldHeight, "f");
            __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_worldHeight, "f") * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"), "f");
        }
        else if (options.worldWidth !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldWidth, options.worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"), "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_worldWidth, Math.max(2, 2 * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, Math.max(2, 2 / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
        }
        __classPrivateFieldSet(this, _Wilson_worldCenterX, (_a = options.worldCenterX) !== null && _a !== void 0 ? _a : 0, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, (_b = options.worldCenterY) !== null && _b !== void 0 ? _b : 0, "f");
        __classPrivateFieldSet(this, _Wilson_onResizeCanvasCallback, (_c = options === null || options === void 0 ? void 0 : options.onResizeCanvas) !== null && _c !== void 0 ? _c : (() => { }), "f");
        __classPrivateFieldSet(this, _Wilson_useP3ColorSpace, (_d = options.useP3ColorSpace) !== null && _d !== void 0 ? _d : true, "f");
        __classPrivateFieldSet(this, _Wilson_callbacks, { ...defaultInteractionCallbacks, ...options.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesRadius, (_f = (_e = options.draggableOptions) === null || _e === void 0 ? void 0 : _e.radius) !== null && _f !== void 0 ? _f : 12, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesStatic, (_h = (_g = options.draggableOptions) === null || _g === void 0 ? void 0 : _g.static) !== null && _h !== void 0 ? _h : false, "f");
        __classPrivateFieldSet(this, _Wilson_draggableCallbacks, { ...defaultDraggableCallbacks, ...(_j = options.draggableOptions) === null || _j === void 0 ? void 0 : _j.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, (_l = (_k = options.fullscreenOptions) === null || _k === void 0 ? void 0 : _k.fillScreen) !== null && _l !== void 0 ? _l : false, "f");
        this.animateFullscreen = (_o = (_m = options.fullscreenOptions) === null || _m === void 0 ? void 0 : _m.animate) !== null && _o !== void 0 ? _o : true;
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
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initDraggables).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initFullscreen).call(this);
        window.addEventListener("resize", __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f"));
        document.documentElement.addEventListener("keydown", __classPrivateFieldGet(this, _Wilson_handleKeydownEvent, "f"));
        console.log(`[Wilson] Initialized a ${__classPrivateFieldGet(this, _Wilson_canvasWidth, "f")}x${__classPrivateFieldGet(this, _Wilson_canvasHeight, "f")} canvas`
            + (this.canvas.id ? ` with ID ${this.canvas.id}` : ""));
    }
    destroy() {
        window.removeEventListener("resize", __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f"));
        document.documentElement.removeEventListener("keydown", __classPrivateFieldGet(this, _Wilson_handleKeydownEvent, "f"));
        document.documentElement.removeEventListener("mousemove", __classPrivateFieldGet(this, _Wilson_documentDraggableMousemoveListener, "f"));
        document.documentElement.removeEventListener("mouseup", __classPrivateFieldGet(this, _Wilson_documentDraggableMouseupListener, "f"));
        document.removeEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
        document.removeEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
        document.removeEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
        __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").parentElement
            && __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").parentElement.insertBefore(this.canvas, __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f"));
        __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").remove();
    }
    resizeCanvas(dimensions) {
        const aspectRatio = (this.currentlyFullscreen && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f"))
            ? window.innerWidth / window.innerHeight
            : __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        if ("width" in dimensions) {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(dimensions.width), "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(dimensions.width / aspectRatio), "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(dimensions.height * aspectRatio), "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(dimensions.height), "f");
        }
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
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
    removeDraggable(id) {
        __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].element.remove();
        delete __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id];
    }
    setDraggablePosition({ id, x, y }) {
        __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x = x;
        __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y = y;
        const element = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].element;
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    }
    enterFullscreen() {
        // @ts-ignore
        if (document.startViewTransition && this.animateFullscreen) {
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
        if (document.startViewTransition && this.animateFullscreen) {
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
            (col / __classPrivateFieldGet(this, _Wilson_canvasWidth, "f") - .5) * __classPrivateFieldGet(this, _Wilson_worldWidth, "f")
                + __classPrivateFieldGet(this, _Wilson_worldCenterX, "f"),
            (.5 - row / __classPrivateFieldGet(this, _Wilson_canvasHeight, "f")) * __classPrivateFieldGet(this, _Wilson_worldHeight, "f")
                + __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")
        ];
    }
    interpolateWorldToCanvas([x, y]) {
        return [
            Math.floor((.5 - (y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f"))
                * __classPrivateFieldGet(this, _Wilson_canvasHeight, "f")),
            Math.floor(((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)
                * __classPrivateFieldGet(this, _Wilson_canvasWidth, "f"))
        ];
    }
}
_Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_canvasAspectRatio = new WeakMap(), _Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_onResizeCanvasCallback = new WeakMap(), _Wilson_useP3ColorSpace = new WeakMap(), _Wilson_callbacks = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_fullscreenOldScroll = new WeakMap(), _Wilson_fullscreenFillScreen = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_metaThemeColorElement = new WeakMap(), _Wilson_oldMetaThemeColor = new WeakMap(), _Wilson_onResizeWindow = new WeakMap(), _Wilson_handleKeydownEvent = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_lastWorldX = new WeakMap(), _Wilson_lastWorldY = new WeakMap(), _Wilson_draggableElements = new WeakMap(), _Wilson_draggableDefaultId = new WeakMap(), _Wilson_currentMouseDraggableId = new WeakMap(), _Wilson_documentDraggableMousemoveListener = new WeakMap(), _Wilson_documentDraggableMouseupListener = new WeakMap(), _Wilson_preventGestures = new WeakMap(), _Wilson_canvasOldWidth = new WeakMap(), _Wilson_canvasOldWidthStyle = new WeakMap(), _Wilson_canvasOldHeightStyle = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_onResizeCanvas = function _Wilson_onResizeCanvas() {
    requestAnimationFrame(() => __classPrivateFieldGet(this, _Wilson_onResizeCanvasCallback, "f").call(this));
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
}, _Wilson_initDraggables = function _Wilson_initDraggables() {
    document.documentElement.addEventListener("mousemove", __classPrivateFieldGet(this, _Wilson_documentDraggableMousemoveListener, "f"));
    document.documentElement.addEventListener("mouseup", __classPrivateFieldGet(this, _Wilson_documentDraggableMouseupListener, "f"));
}, _Wilson_draggableOnMousedown = function _Wilson_draggableOnMousedown(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentMouseDraggableId, id, "f");
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = true;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").mousedown({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
            y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
            event: e,
        });
    });
}, _Wilson_draggableOnMouseup = function _Wilson_draggableOnMouseup(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentMouseDraggableId, undefined, "f");
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = false;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").mouseup({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
            y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
            event: e,
        });
    });
}, _Wilson_draggableOnMousemove = function _Wilson_draggableOnMousemove(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
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
    requestAnimationFrame(() => {
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
    });
}, _Wilson_draggableOnTouchstart = function _Wilson_draggableOnTouchstart(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = true;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").touchstart({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
            y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
            event: e,
        });
    });
}, _Wilson_draggableOnTouchend = function _Wilson_draggableOnTouchend(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].currentlyDragging = false;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").touchend({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x,
            y: __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y,
            event: e,
        });
    });
}, _Wilson_draggableOnTouchmove = function _Wilson_draggableOnTouchmove(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
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
    requestAnimationFrame(() => {
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
    });
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
    const rect = __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").getBoundingClientRect();
    for (const id in __classPrivateFieldGet(this, _Wilson_draggableElements, "f")) {
        const x = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x;
        const y = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y;
        const element = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].element;
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    }
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
}, _Wilson_enterFullscreen = function _Wilson_enterFullscreen() {
    this.currentlyFullscreen = true;
    __classPrivateFieldSet(this, _Wilson_fullscreenOldScroll, window.scrollY, "f");
    if (__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f")) {
        __classPrivateFieldSet(this, _Wilson_oldMetaThemeColor, __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").getAttribute("content"), "f");
    }
    __classPrivateFieldSet(this, _Wilson_canvasOldWidth, __classPrivateFieldGet(this, _Wilson_canvasWidth, "f"), "f");
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
    document.addEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    document.addEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    document.addEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
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
        this.canvas.style.width = `min(100vw, calc(100vh * ${__classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")}))`;
        this.canvas.style.height = `min(100vh, calc(100vw / ${__classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")}))`;
    }
    __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
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
    document.removeEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    document.removeEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    document.removeEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    this.resizeCanvas({ width: __classPrivateFieldGet(this, _Wilson_canvasOldWidth, "f") });
    this.canvas.style.width = __classPrivateFieldGet(this, _Wilson_canvasOldWidthStyle, "f");
    this.canvas.style.height = __classPrivateFieldGet(this, _Wilson_canvasOldHeightStyle, "f");
    __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
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
const uniformFunctions = {
    int: "uniform1i",
    float: "uniform1f",
    vec2: "uniform2fv",
    vec3: "uniform3fv",
    vec4: "uniform4fv",
    mat2: "uniformMatrix2fv",
    mat3: "uniformMatrix3fv",
    mat4: "uniformMatrix4fv",
};
export class WilsonGPU extends Wilson {
    constructor(canvas, options) {
        super(canvas, options);
        _WilsonGPU_instances.add(this);
        _WilsonGPU_shaderPrograms.set(this, {});
        _WilsonGPU_uniforms.set(this, {});
        _WilsonGPU_numShaders.set(this, 0);
        const gl = canvas.getContext("webgl2");
        if (gl) {
            this.gl = gl;
        }
        else {
            const gl = canvas.getContext("webgl");
            if (gl) {
                this.gl = gl;
            }
            else {
                throw new Error("[Wilson] WebGL is not supported on this device.");
            }
        }
        if ("drawingBufferColorSpace" in this.gl && this.useP3ColorSpace) {
            this.gl.drawingBufferColorSpace = "display-p3";
        }
    }
    loadShader({ id = __classPrivateFieldGet(this, _WilsonGPU_numShaders, "f").toString(), source }) {
        const vertexShaderSource = /* glsl*/ `
			attribute vec3 position;
			varying vec2 uv;

			void main(void)
			{
				gl_Position = vec4(position, 1.0);

				//Interpolate quad coordinates in the fragment shader.
				uv = position.xy;
			}
		`;
        const vertexShader = __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_loadShaderInternal).call(this, this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragShader = __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_loadShaderInternal).call(this, this.gl.FRAGMENT_SHADER, source);
        const shaderProgram = this.gl.createProgram();
        if (!shaderProgram) {
            throw new Error(`[Wilson] Couldn't create shader program. Full shader source: ${source}`);
        }
        __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id] = shaderProgram;
        this.gl.attachShader(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], vertexShader);
        this.gl.attachShader(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], fragShader);
        this.gl.linkProgram(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            throw new Error(`[Wilson] Couldn't link shader program: ${this.gl.getProgramInfoLog(shaderProgram)}. Full shader source: ${source}`);
        }
        this.useProgram(id);
        const positionBuffer = this.gl.createBuffer();
        if (!positionBuffer) {
            throw new Error(`[Wilson] Couldn't create position buffer. Full shader source: ${source}`);
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        const quad = [
            -1, -1, 0,
            -1, 1, 0,
            1, -1, 0,
            1, 1, 0
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(quad), this.gl.STATIC_DRAW);
        const positionAttribute = this.gl.getAttribLocation(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], "position");
        if (positionAttribute === -1) {
            throw new Error(`[Wilson] Couldn't get position attribute. Full shader source: ${source}`);
        }
        this.gl.enableVertexAttribArray(positionAttribute);
        this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
    }
    useProgram(id) {
        this.gl.useProgram(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
    }
    resizeCanvas(dimensions) {
        super.resizeCanvas(dimensions);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
    }
}
_WilsonGPU_shaderPrograms = new WeakMap(), _WilsonGPU_uniforms = new WeakMap(), _WilsonGPU_numShaders = new WeakMap(), _WilsonGPU_instances = new WeakSet(), _WilsonGPU_loadShaderInternal = function _WilsonGPU_loadShaderInternal(type, source) {
    const shader = this.gl.createShader(type);
    if (!shader) {
        throw new Error(`[Wilson] Couldn't create shader: ${shader}`);
    }
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        throw new Error(`[Wilson] Couldn't load shader: ${this.gl.getShaderInfoLog(shader)}. Full shader source: ${source}`);
    }
    return shader;
};
