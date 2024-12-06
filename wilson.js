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
var _Wilson_instances, _Wilson_destroyed, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_canvasAspectRatio, _Wilson_onResizeCanvasCallback, _Wilson_useP3ColorSpace, _Wilson_interactionCallbacks, _Wilson_interactionUseForPanAndZoom, _Wilson_interactionOnPanAndZoom, _Wilson_numPreviousVelocities, _Wilson_lastPanVelocityX, _Wilson_lastPanVelocityY, _Wilson_lastZoomVelocity, _Wilson_lastPanVelocitiesX, _Wilson_lastPanVelocitiesY, _Wilson_lastZoomVelocities, _Wilson_panVelocityX, _Wilson_panVelocityY, _Wilson_zoomVelocity, _Wilson_panFriction, _Wilson_zoomFriction, _Wilson_panVelocityThreshhold, _Wilson_zoomVelocityThreshold, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_fullscreenOldScroll, _Wilson_fullscreenFillScreen, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButton, _Wilson_fullscreenExitFullscreenButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_metaThemeColorElement, _Wilson_oldMetaThemeColor, _Wilson_onResizeWindow, _Wilson_handleKeydownEvent, _Wilson_onResizeCanvas, _Wilson_zeroVelocities, _Wilson_setZoomVelocity, _Wilson_setPanVelocity, _Wilson_currentlyDragging, _Wilson_currentlyPinching, _Wilson_lastInteractionRow, _Wilson_lastInteractionCol, _Wilson_lastInteractionRow2, _Wilson_lastInteractionCol2, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMousemove, _Wilson_updateFromPinching, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_zoomFixedPoint, _Wilson_zoomCanvas, _Wilson_onWheel, _Wilson_lastPanAndZoomTimestamp, _Wilson_updatePanAndZoomVelocity, _Wilson_initInteraction, _Wilson_draggableElements, _Wilson_draggableDefaultId, _Wilson_currentMouseDraggableId, _Wilson_documentDraggableMousemoveListener, _Wilson_documentDraggableMouseupListener, _Wilson_initDraggables, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_updateDraggablesContainerSize, _Wilson_updateDraggablesLocation, _Wilson_initFullscreen, _Wilson_preventGestures, _Wilson_canvasOldWidth, _Wilson_canvasOldWidthStyle, _Wilson_canvasOldHeightStyle, _Wilson_oldWorldWidth, _Wilson_oldWorldHeight, _Wilson_enterFullscreen, _Wilson_exitFullscreen, _Wilson_interpolatePageToWorld, _WilsonGPU_instances, _WilsonGPU_shaderPrograms, _WilsonGPU_uniforms, _WilsonGPU_loadShaderInternal, _WilsonGPU_numShaders, _WilsonGPU_currentShaderId, _WilsonGPU_framebuffers, _WilsonGPU_textures;
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
    ongrab: () => { },
    ondrag: () => { },
    onrelease: () => { },
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        _Wilson_instances.add(this);
        _Wilson_destroyed.set(this, false);
        _Wilson_canvasWidth.set(this, void 0);
        _Wilson_canvasHeight.set(this, void 0);
        _Wilson_canvasAspectRatio.set(this, void 0);
        _Wilson_onResizeCanvasCallback.set(this, void 0);
        _Wilson_useP3ColorSpace.set(this, void 0);
        _Wilson_interactionCallbacks.set(this, void 0);
        _Wilson_interactionUseForPanAndZoom.set(this, void 0);
        _Wilson_interactionOnPanAndZoom.set(this, () => { });
        _Wilson_numPreviousVelocities.set(this, 8);
        _Wilson_lastPanVelocityX.set(this, 0);
        _Wilson_lastPanVelocityY.set(this, 0);
        _Wilson_lastZoomVelocity.set(this, 0);
        _Wilson_lastPanVelocitiesX.set(this, []);
        _Wilson_lastPanVelocitiesY.set(this, []);
        _Wilson_lastZoomVelocities.set(this, []);
        _Wilson_panVelocityX.set(this, 0);
        _Wilson_panVelocityY.set(this, 0);
        _Wilson_zoomVelocity.set(this, 0);
        _Wilson_panFriction.set(this, void 0);
        _Wilson_zoomFriction.set(this, void 0);
        _Wilson_panVelocityThreshhold.set(this, 0.005);
        _Wilson_zoomVelocityThreshold.set(this, 0.001);
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
        _Wilson_fullscreenEnterFullscreenButton.set(this, null);
        _Wilson_fullscreenExitFullscreenButton.set(this, null);
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
                const aspectRatioChange = windowAspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
                this.worldWidth = Math.max(__classPrivateFieldGet(this, _Wilson_oldWorldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_oldWorldWidth, "f"));
                this.worldHeight = Math.max(__classPrivateFieldGet(this, _Wilson_oldWorldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_oldWorldHeight, "f"));
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
        _Wilson_currentlyPinching.set(this, false);
        _Wilson_lastInteractionRow.set(this, 0);
        _Wilson_lastInteractionCol.set(this, 0);
        _Wilson_lastInteractionRow2.set(this, 0);
        _Wilson_lastInteractionCol2.set(this, 0);
        _Wilson_zoomFixedPoint.set(this, [0, 0]);
        _Wilson_lastPanAndZoomTimestamp.set(this, -1);
        _Wilson_updatePanAndZoomVelocity.set(this, (timestamp) => {
            __classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f").shift();
            __classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f").push(__classPrivateFieldGet(this, _Wilson_lastZoomVelocity, "f"));
            __classPrivateFieldSet(this, _Wilson_lastZoomVelocity, 0, "f");
            const timeElapsed = timestamp - __classPrivateFieldGet(this, _Wilson_lastPanAndZoomTimestamp, "f");
            __classPrivateFieldSet(this, _Wilson_lastPanAndZoomTimestamp, timestamp, "f");
            if (timeElapsed < 1000) {
                if (__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f")) {
                    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zoomCanvas).call(this, 1 + __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") * 0.005);
                    __classPrivateFieldSet(this, _Wilson_zoomVelocity, __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") * Math.pow(__classPrivateFieldGet(this, _Wilson_zoomFriction, "f"), timeElapsed / (1000 / 60)), "f");
                    if (Math.abs(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f")) < __classPrivateFieldGet(this, _Wilson_zoomVelocityThreshold, "f")) {
                        __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
                    }
                }
            }
            if (!__classPrivateFieldGet(this, _Wilson_destroyed, "f")) {
                requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_updatePanAndZoomVelocity, "f"));
            }
        });
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
        _Wilson_oldWorldWidth.set(this, 0);
        _Wilson_oldWorldHeight.set(this, 0);
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
            this.worldWidth = options.worldWidth;
            this.worldHeight = options.worldHeight;
        }
        else if (options.worldHeight !== undefined) {
            this.worldHeight = options.worldHeight;
            this.worldWidth = this.worldHeight * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        }
        else if (options.worldWidth !== undefined) {
            this.worldWidth = options.worldWidth;
            this.worldHeight = this.worldWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        }
        else {
            this.worldWidth = Math.max(2, 2 * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"));
            this.worldHeight = Math.max(2, 2 / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"));
        }
        this.worldCenterX = (_a = options.worldCenterX) !== null && _a !== void 0 ? _a : 0;
        this.worldCenterY = (_b = options.worldCenterY) !== null && _b !== void 0 ? _b : 0;
        __classPrivateFieldSet(this, _Wilson_onResizeCanvasCallback, (_c = options === null || options === void 0 ? void 0 : options.onResizeCanvas) !== null && _c !== void 0 ? _c : (() => { }), "f");
        __classPrivateFieldSet(this, _Wilson_useP3ColorSpace, (_d = options.useP3ColorSpace) !== null && _d !== void 0 ? _d : true, "f");
        __classPrivateFieldSet(this, _Wilson_interactionCallbacks, { ...defaultInteractionCallbacks, ...(_e = options.interactionOptions) === null || _e === void 0 ? void 0 : _e.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_interactionUseForPanAndZoom, (_g = (_f = options.interactionOptions) === null || _f === void 0 ? void 0 : _f.useForPanAndZoom) !== null && _g !== void 0 ? _g : false, "f");
        __classPrivateFieldSet(this, _Wilson_panFriction, 0.93, "f");
        __classPrivateFieldSet(this, _Wilson_zoomFriction, 0.85, "f");
        if ((_h = options.interactionOptions) === null || _h === void 0 ? void 0 : _h.useForPanAndZoom) {
            __classPrivateFieldSet(this, _Wilson_interactionOnPanAndZoom, (_k = (_j = options.interactionOptions) === null || _j === void 0 ? void 0 : _j.onPanAndZoom) !== null && _k !== void 0 ? _k : (() => { }), "f");
            __classPrivateFieldSet(this, _Wilson_panFriction, (_m = (_l = options.interactionOptions) === null || _l === void 0 ? void 0 : _l.panFriction) !== null && _m !== void 0 ? _m : __classPrivateFieldGet(this, _Wilson_panFriction, "f"), "f");
            __classPrivateFieldSet(this, _Wilson_zoomFriction, (_p = (_o = options.interactionOptions) === null || _o === void 0 ? void 0 : _o.zoomFriction) !== null && _p !== void 0 ? _p : __classPrivateFieldGet(this, _Wilson_zoomFriction, "f"), "f");
            __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesX, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
            __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesY, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
            __classPrivateFieldSet(this, _Wilson_lastZoomVelocities, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
        }
        __classPrivateFieldSet(this, _Wilson_draggablesRadius, (_r = (_q = options.draggableOptions) === null || _q === void 0 ? void 0 : _q.radius) !== null && _r !== void 0 ? _r : 12, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesStatic, (_t = (_s = options.draggableOptions) === null || _s === void 0 ? void 0 : _s.static) !== null && _t !== void 0 ? _t : false, "f");
        __classPrivateFieldSet(this, _Wilson_draggableCallbacks, { ...defaultDraggableCallbacks, ...(_u = options.draggableOptions) === null || _u === void 0 ? void 0 : _u.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, (_w = (_v = options.fullscreenOptions) === null || _v === void 0 ? void 0 : _v.fillScreen) !== null && _w !== void 0 ? _w : false, "f");
        this.animateFullscreen = (_y = (_x = options.fullscreenOptions) === null || _x === void 0 ? void 0 : _x.animate) !== null && _y !== void 0 ? _y : true;
        __classPrivateFieldSet(this, _Wilson_fullscreenUseButton, (_0 = (_z = options.fullscreenOptions) === null || _z === void 0 ? void 0 : _z.useFullscreenButton) !== null && _0 !== void 0 ? _0 : false, "f");
        if ((_1 = options.fullscreenOptions) === null || _1 === void 0 ? void 0 : _1.useFullscreenButton) {
            __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, (_2 = options.fullscreenOptions) === null || _2 === void 0 ? void 0 : _2.enterFullscreenButtonIconPath, "f");
            __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, (_3 = options.fullscreenOptions) === null || _3 === void 0 ? void 0 : _3.exitFullscreenButtonIconPath, "f");
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
        if ((_4 = options.draggableOptions) === null || _4 === void 0 ? void 0 : _4.draggables) {
            for (const draggable of options.draggableOptions.draggables) {
                this.addDraggable(draggable);
            }
        }
        console.log(`[Wilson] Initialized a ${__classPrivateFieldGet(this, _Wilson_canvasWidth, "f")}x${__classPrivateFieldGet(this, _Wilson_canvasHeight, "f")} canvas`
            + (this.canvas.id ? ` with ID ${this.canvas.id}` : ""));
    }
    destroy() {
        __classPrivateFieldSet(this, _Wilson_destroyed, true, "f");
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
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - this.worldCenterY) / this.worldHeight + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - this.worldCenterX) / this.worldWidth + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
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
            element,
            x,
            y,
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
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - this.worldCenterY) / this.worldHeight + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - this.worldCenterX) / this.worldWidth + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    }
    enterFullscreen() {
        // @ts-ignore
        if (document.startViewTransition && this.animateFullscreen) {
            document.body.querySelectorAll(".WILSON_enter-fullscreen-button, .WILSON_exit-fullscreen-button")
                .forEach(button => button.style.removeProperty("view-transition-name"));
            document.body.querySelectorAll(".WILSON_applet-container")
                .forEach(container => container.style.removeProperty("view-transition-name"));
            document.body.querySelectorAll(".WILSON_draggable")
                .forEach(container => container.style.removeProperty("view-transition-name"));
            if (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
                if (__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").style.setProperty("view-transition-name", "WILSON_fullscreen-button");
                }
                if (__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").style.setProperty("view-transition-name", "WILSON_fullscreen-button");
                }
                __classPrivateFieldGet(this, _Wilson_appletContainer, "f").style.setProperty("view-transition-name", "WILSON_applet-container");
                for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggableElements, "f"))) {
                    data.element.style.setProperty("view-transition-name", `WILSON_draggable-${id}`);
                }
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
            (col / __classPrivateFieldGet(this, _Wilson_canvasWidth, "f") - .5) * this.worldWidth
                + this.worldCenterX,
            (.5 - row / __classPrivateFieldGet(this, _Wilson_canvasHeight, "f")) * this.worldHeight
                + this.worldCenterY
        ];
    }
    interpolateWorldToCanvas([x, y]) {
        return [
            Math.floor((.5 - (y - this.worldCenterY) / this.worldHeight)
                * __classPrivateFieldGet(this, _Wilson_canvasHeight, "f")),
            Math.floor(((x - this.worldCenterX) / this.worldWidth + .5)
                * __classPrivateFieldGet(this, _Wilson_canvasWidth, "f"))
        ];
    }
}
_Wilson_destroyed = new WeakMap(), _Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_canvasAspectRatio = new WeakMap(), _Wilson_onResizeCanvasCallback = new WeakMap(), _Wilson_useP3ColorSpace = new WeakMap(), _Wilson_interactionCallbacks = new WeakMap(), _Wilson_interactionUseForPanAndZoom = new WeakMap(), _Wilson_interactionOnPanAndZoom = new WeakMap(), _Wilson_numPreviousVelocities = new WeakMap(), _Wilson_lastPanVelocityX = new WeakMap(), _Wilson_lastPanVelocityY = new WeakMap(), _Wilson_lastZoomVelocity = new WeakMap(), _Wilson_lastPanVelocitiesX = new WeakMap(), _Wilson_lastPanVelocitiesY = new WeakMap(), _Wilson_lastZoomVelocities = new WeakMap(), _Wilson_panVelocityX = new WeakMap(), _Wilson_panVelocityY = new WeakMap(), _Wilson_zoomVelocity = new WeakMap(), _Wilson_panFriction = new WeakMap(), _Wilson_zoomFriction = new WeakMap(), _Wilson_panVelocityThreshhold = new WeakMap(), _Wilson_zoomVelocityThreshold = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_fullscreenOldScroll = new WeakMap(), _Wilson_fullscreenFillScreen = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButton = new WeakMap(), _Wilson_fullscreenExitFullscreenButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_metaThemeColorElement = new WeakMap(), _Wilson_oldMetaThemeColor = new WeakMap(), _Wilson_onResizeWindow = new WeakMap(), _Wilson_handleKeydownEvent = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_currentlyPinching = new WeakMap(), _Wilson_lastInteractionRow = new WeakMap(), _Wilson_lastInteractionCol = new WeakMap(), _Wilson_lastInteractionRow2 = new WeakMap(), _Wilson_lastInteractionCol2 = new WeakMap(), _Wilson_zoomFixedPoint = new WeakMap(), _Wilson_lastPanAndZoomTimestamp = new WeakMap(), _Wilson_updatePanAndZoomVelocity = new WeakMap(), _Wilson_draggableElements = new WeakMap(), _Wilson_draggableDefaultId = new WeakMap(), _Wilson_currentMouseDraggableId = new WeakMap(), _Wilson_documentDraggableMousemoveListener = new WeakMap(), _Wilson_documentDraggableMouseupListener = new WeakMap(), _Wilson_preventGestures = new WeakMap(), _Wilson_canvasOldWidth = new WeakMap(), _Wilson_canvasOldWidthStyle = new WeakMap(), _Wilson_canvasOldHeightStyle = new WeakMap(), _Wilson_oldWorldWidth = new WeakMap(), _Wilson_oldWorldHeight = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_onResizeCanvas = function _Wilson_onResizeCanvas() {
    requestAnimationFrame(() => __classPrivateFieldGet(this, _Wilson_onResizeCanvasCallback, "f").call(this));
}, _Wilson_zeroVelocities = function _Wilson_zeroVelocities() {
    __classPrivateFieldSet(this, _Wilson_panVelocityX, 0, "f");
    __classPrivateFieldSet(this, _Wilson_panVelocityY, 0, "f");
    __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastPanVelocityX, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastPanVelocityY, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastZoomVelocity, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesX, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
    __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesY, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
    __classPrivateFieldSet(this, _Wilson_lastZoomVelocities, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
}, _Wilson_setZoomVelocity = function _Wilson_setZoomVelocity() {
    __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
    for (let i = 0; i < __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f"); i++) {
        __classPrivateFieldSet(this, _Wilson_zoomVelocity, __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") + __classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f")[i], "f");
    }
    __classPrivateFieldSet(this, _Wilson_zoomVelocity, __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") / __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f"), "f");
    if (Math.abs(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f")) < __classPrivateFieldGet(this, _Wilson_zoomVelocityThreshold, "f")) {
        __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
    }
}, _Wilson_setPanVelocity = function _Wilson_setPanVelocity() {
    __classPrivateFieldSet(this, _Wilson_panVelocityX, 0, "f");
    __classPrivateFieldSet(this, _Wilson_panVelocityY, 0, "f");
    for (let i = 0; i < __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f"); i++) {
        __classPrivateFieldSet(this, _Wilson_panVelocityX, __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") + __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesX, "f")[i], "f");
        __classPrivateFieldSet(this, _Wilson_panVelocityY, __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") + __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesY, "f")[i], "f");
    }
    __classPrivateFieldSet(this, _Wilson_panVelocityX, __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") / __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f"), "f");
    __classPrivateFieldSet(this, _Wilson_panVelocityY, __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") / __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f"), "f");
}, _Wilson_onMousedown = function _Wilson_onMousedown(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, true, "f");
    if (__classPrivateFieldGet(this, _Wilson_interactionUseForPanAndZoom, "f")) {
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zeroVelocities).call(this);
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mousedown({ x, y, event: e });
}, _Wilson_onMouseup = function _Wilson_onMouseup(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains('WILSON_draggable')) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseup({ x, y, event: e });
}, _Wilson_onMousemove = function _Wilson_onMousemove(e) {
    e.preventDefault();
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    const [lastX, lastY] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        __classPrivateFieldGet(this, _Wilson_lastInteractionRow, "f"),
        __classPrivateFieldGet(this, _Wilson_lastInteractionCol, "f")
    ]);
    const callback = __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")
        ? __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mousedrag
        : __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mousemove;
    if (__classPrivateFieldGet(this, _Wilson_interactionUseForPanAndZoom, "f") && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
        this.worldCenterX -= x - lastX;
        this.worldCenterY -= y - lastY;
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
        __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
    }
    callback({ x, y, xDelta: x - lastX, yDelta: y - lastY, event: e });
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
}, _Wilson_updateFromPinching = function _Wilson_updateFromPinching({ touch1, touch2, lastTouch1, lastTouch2 }) {
    __classPrivateFieldSet(this, _Wilson_zoomFixedPoint, [
        (touch1[0] + touch2[0]) / 2,
        (touch1[1] + touch2[1]) / 2
    ], "f");
    const distance = Math.sqrt((touch1[0] - touch2[0]) ** 2
        + (touch1[1] - touch2[1]) ** 2);
    const lastDistance = Math.sqrt((lastTouch1[0] - lastTouch2[0]) ** 2
        + (lastTouch1[1] - lastTouch2[1]) ** 2);
    const centerProportion = [
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - this.worldCenterX) / this.worldWidth,
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - this.worldCenterY) / this.worldHeight
    ];
    const scale = lastDistance / distance;
    this.worldWidth *= scale;
    this.worldHeight *= scale;
    __classPrivateFieldSet(this, _Wilson_lastZoomVelocity, (scale - 1) * 200, "f");
    const newFixedPointX = centerProportion[0] * this.worldWidth;
    const newFixedPointY = centerProportion[1] * this.worldHeight;
    this.worldCenterX = __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - newFixedPointX;
    this.worldCenterY = __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - newFixedPointY;
}, _Wilson_onTouchstart = function _Wilson_onTouchstart(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains('WILSON_draggable')) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, true, "f");
    if (__classPrivateFieldGet(this, _Wilson_interactionUseForPanAndZoom, "f")) {
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zeroVelocities).call(this);
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.touches[0].clientY, e.touches[0].clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.touches[0].clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.touches[0].clientX, "f");
    if (e.touches.length > 1) {
        __classPrivateFieldSet(this, _Wilson_currentlyPinching, true, "f");
        __classPrivateFieldSet(this, _Wilson_lastInteractionRow2, e.touches[1].clientY, "f");
        __classPrivateFieldSet(this, _Wilson_lastInteractionCol2, e.touches[1].clientX, "f");
    }
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").touchstart({ x, y, event: e });
}, _Wilson_onTouchend = function _Wilson_onTouchend(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains('WILSON_draggable')) {
        return;
    }
    e.preventDefault();
    if (e.touches.length === 0) {
        __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        e.touches[0].clientY,
        e.touches[0].clientX
    ]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.touches[0].clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.touches[0].clientX, "f");
    if (e.touches.length > 1) {
        __classPrivateFieldSet(this, _Wilson_lastInteractionRow2, e.touches[1].clientY, "f");
        __classPrivateFieldSet(this, _Wilson_lastInteractionCol2, e.touches[1].clientX, "f");
    }
    else {
        if (__classPrivateFieldGet(this, _Wilson_currentlyPinching, "f")) {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setZoomVelocity).call(this);
        }
        __classPrivateFieldSet(this, _Wilson_currentlyPinching, false, "f");
    }
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").touchend({ x, y, event: e });
}, _Wilson_onTouchmove = function _Wilson_onTouchmove(e) {
    e.preventDefault();
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        e.touches[0].clientY,
        e.touches[0].clientX
    ]);
    const [lastX, lastY] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        __classPrivateFieldGet(this, _Wilson_lastInteractionRow, "f"),
        __classPrivateFieldGet(this, _Wilson_lastInteractionCol, "f")
    ]);
    if (__classPrivateFieldGet(this, _Wilson_interactionUseForPanAndZoom, "f") && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
        if (e.touches.length > 1) {
            const touch2 = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
                e.touches[1].clientY,
                e.touches[1].clientX
            ]);
            const lastTouch2 = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
                __classPrivateFieldGet(this, _Wilson_lastInteractionRow2, "f"),
                __classPrivateFieldGet(this, _Wilson_lastInteractionCol2, "f")
            ]);
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateFromPinching).call(this, {
                touch1: [x, y],
                touch2,
                lastTouch1: [lastX, lastY],
                lastTouch2,
            });
            this.worldCenterX -= (x + touch2[0]) / 2 - (lastX + lastTouch2[0]) / 2;
            this.worldCenterY -= (y + touch2[1]) / 2 - (lastY + lastTouch2[1]) / 2;
            ;
            __classPrivateFieldSet(this, _Wilson_lastInteractionRow2, e.touches[1].clientY, "f"),
                __classPrivateFieldSet(this, _Wilson_lastInteractionCol2, e.touches[1].clientX, "f");
        }
        else {
            this.worldCenterX -= x - lastX;
            this.worldCenterY -= y - lastY;
        }
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
        __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
    }
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").touchmove({
        x,
        y,
        xDelta: x - lastX,
        yDelta: y - lastY,
        event: e
    });
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.touches[0].clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.touches[0].clientX, "f");
}, _Wilson_zoomCanvas = function _Wilson_zoomCanvas(scale) {
    const centerProportion = [
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - this.worldCenterX) / this.worldWidth,
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - this.worldCenterY) / this.worldHeight
    ];
    this.worldWidth *= scale;
    this.worldHeight *= scale;
    const newFixedPointX = centerProportion[0] * this.worldWidth;
    const newFixedPointY = centerProportion[1] * this.worldHeight;
    this.worldCenterX = __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - newFixedPointX;
    this.worldCenterY = __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - newFixedPointY;
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
    __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
}, _Wilson_onWheel = function _Wilson_onWheel(e) {
    e.preventDefault();
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    if (__classPrivateFieldGet(this, _Wilson_interactionUseForPanAndZoom, "f")) {
        __classPrivateFieldSet(this, _Wilson_zoomFixedPoint, [x, y], "f");
        if (Math.abs(e.deltaY) < 25) {
            const scale = 1 + e.deltaY * 0.005;
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zoomCanvas).call(this, scale);
        }
        else {
            __classPrivateFieldSet(this, _Wilson_zoomVelocity, Math.sign(e.deltaY) * 10, "f");
        }
    }
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").wheel({
        x,
        y,
        scrollDelta: e.deltaY,
        event: e
    });
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
}, _Wilson_initInteraction = function _Wilson_initInteraction() {
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
                if (__classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseup) {
                    const [x, y] = this.interpolateCanvasToWorld([
                        __classPrivateFieldGet(this, _Wilson_lastInteractionRow, "f"),
                        __classPrivateFieldGet(this, _Wilson_lastInteractionCol, "f")
                    ]);
                    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseup({ x, y, event: e });
                }
            }
        });
    }
    if (__classPrivateFieldGet(this, _Wilson_interactionUseForPanAndZoom, "f")) {
        requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_updatePanAndZoomVelocity, "f"));
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
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ongrab({
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
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").onrelease({
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
        / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f")) * this.worldWidth + this.worldCenterX;
    const y = (-(row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") / 2)
        / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f")) * this.worldHeight + this.worldCenterY;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ondrag({
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
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ongrab({
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
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").onrelease({
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
            / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f")) * this.worldWidth + this.worldCenterX;
        const y = (-(row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") / 2)
            / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f")) * this.worldHeight + this.worldCenterY;
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
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ondrag({
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
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
}, _Wilson_updateDraggablesLocation = function _Wilson_updateDraggablesLocation() {
    for (const id in __classPrivateFieldGet(this, _Wilson_draggableElements, "f")) {
        const x = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].x;
        const y = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].y;
        const element = __classPrivateFieldGet(this, _Wilson_draggableElements, "f")[id].element;
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - this.worldCenterY) / this.worldHeight + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - this.worldCenterX) / this.worldWidth + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    }
}, _Wilson_initFullscreen = function _Wilson_initFullscreen() {
    if (__classPrivateFieldGet(this, _Wilson_fullscreenUseButton, "f")) {
        __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").classList.add("WILSON_enter-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f"));
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").appendChild(img);
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").addEventListener("click", () => {
            this.enterFullscreen();
        });
        __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").classList.add("WILSON_exit-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f"));
        const img2 = document.createElement("img");
        img2.src = __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").appendChild(img2);
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").addEventListener("click", () => {
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
    __classPrivateFieldSet(this, _Wilson_oldWorldWidth, this.worldWidth, "f");
    __classPrivateFieldSet(this, _Wilson_oldWorldHeight, this.worldHeight, "f");
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
    this.worldWidth = __classPrivateFieldGet(this, _Wilson_oldWorldWidth, "f");
    this.worldHeight = __classPrivateFieldGet(this, _Wilson_oldWorldHeight, "f");
    __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
    window.scrollTo(0, __classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f"));
    setTimeout(() => window.scrollTo(0, __classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f")), 10);
}, _Wilson_interpolatePageToWorld = function _Wilson_interpolatePageToWorld([row, col]) {
    const rect = this.canvas.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(this.canvas);
    const extraTop = parseFloat(computedStyle.paddingTop)
        + parseFloat(computedStyle.borderTopWidth);
    const extraBottom = parseFloat(computedStyle.paddingBottom)
        + parseFloat(computedStyle.borderBottomWidth);
    const extraLeft = parseFloat(computedStyle.paddingLeft)
        + parseFloat(computedStyle.borderLeftWidth);
    const extraRight = parseFloat(computedStyle.paddingRight)
        + parseFloat(computedStyle.borderRightWidth);
    const canvasPageWidth = rect.width - extraLeft - extraRight;
    const canvasPageHeight = rect.height - extraTop - extraBottom;
    const canvasRow = (row - rect.top - extraTop) * (this.canvasHeight / canvasPageHeight);
    const canvasCol = (col - rect.left - extraLeft) * (this.canvasWidth / canvasPageWidth);
    return this.interpolateCanvasToWorld([canvasRow, canvasCol]);
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
    int: (gl, location, value) => gl.uniform1i(location, value),
    float: (gl, location, value) => gl.uniform1f(location, value),
    vec2: (gl, location, value) => gl.uniform2fv(location, value),
    vec3: (gl, location, value) => gl.uniform3fv(location, value),
    vec4: (gl, location, value) => gl.uniform4fv(location, value),
    mat2: (gl, location, value) => gl.uniformMatrix2fv(location, false, value),
    mat3: (gl, location, value) => gl.uniformMatrix3fv(location, false, value),
    mat4: (gl, location, value) => gl.uniformMatrix4fv(location, false, value),
};
export class WilsonGPU extends Wilson {
    constructor(canvas, options) {
        var _a;
        super(canvas, options);
        _WilsonGPU_instances.add(this);
        _WilsonGPU_shaderPrograms.set(this, {});
        _WilsonGPU_uniforms.set(this, {});
        _WilsonGPU_numShaders.set(this, 0);
        _WilsonGPU_currentShaderId.set(this, "0");
        _WilsonGPU_framebuffers.set(this, {});
        _WilsonGPU_textures.set(this, {});
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
                throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
            }
        }
        if ("drawingBufferColorSpace" in this.gl && this.useP3ColorSpace) {
            this.gl.drawingBufferColorSpace = "display-p3";
        }
        if ("shader" in options) {
            this.loadShader({
                source: options.shader,
                uniforms: options.uniforms,
            });
        }
        else if ("shaders" in options) {
            for (const [id, source] of Object.entries(options.shaders)) {
                this.loadShader({
                    id,
                    source,
                    uniforms: (_a = options.uniforms) === null || _a === void 0 ? void 0 : _a[id],
                });
            }
        }
        else {
            throw new Error("[Wilson] Must provide either a single shader or multiple shaders.");
        }
    }
    drawFrame() {
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    loadShader({ id = __classPrivateFieldGet(this, _WilsonGPU_numShaders, "f").toString(), source, uniforms = {} }) {
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
        __classPrivateFieldSet(this, _WilsonGPU_currentShaderId, id, "f");
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
        // Initialize the uniforms.
        __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[id] = {};
        for (const [name, data] of Object.entries(uniforms)) {
            const location = this.gl.getUniformLocation(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], name);
            if (location === null) {
                throw new Error(`[Wilson] Couldn't get uniform location for ${name}. Full shader source: ${source}`);
            }
            const [type, value] = data;
            __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[id][name] = { location, type };
            this.setUniform({ name, value });
        }
    }
    setUniform({ name, value, shaderId = __classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f") }) {
        this.useProgram(shaderId);
        const { location, type } = __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shaderId][name];
        const uniformFunction = uniformFunctions[type];
        uniformFunction(this.gl, location, value);
        this.useProgram(__classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f"));
    }
    useProgram(id) {
        this.gl.useProgram(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
    }
    createFramebufferTexturePair({ id, textureType }) {
        if (__classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id] !== undefined || __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id] !== undefined) {
            throw new Error(`[Wilson] Tried to create a framebuffer texture pair for shader program ${id}, but one already exists.`);
        }
        const framebuffer = this.gl.createFramebuffer();
        if (!framebuffer) {
            throw new Error(`[Wilson] Couldn't create a framebuffer for shader program ${id}.`);
        }
        const texture = this.gl.createTexture();
        if (!texture) {
            throw new Error(`[Wilson] Couldn't create a texture for shader program ${id}.`);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.canvasWidth, this.canvasHeight, 0, this.gl.RGBA, textureType === "unsignedByte" ? this.gl.UNSIGNED_BYTE : this.gl.FLOAT, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id] = framebuffer;
        __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id] = texture;
    }
    useFramebuffer(id) {
        if (id === null) {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            return;
        }
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id]);
    }
    useTexture(id) {
        if (id === null) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            return;
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id]);
    }
    readPixels() {
        const pixels = new Uint8Array(this.canvasWidth * this.canvasHeight * 4);
        this.gl.readPixels(0, 0, this.canvasWidth, this.canvasHeight, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);
        return pixels;
    }
    resizeCanvas(dimensions) {
        super.resizeCanvas(dimensions);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
    }
}
_WilsonGPU_shaderPrograms = new WeakMap(), _WilsonGPU_uniforms = new WeakMap(), _WilsonGPU_numShaders = new WeakMap(), _WilsonGPU_currentShaderId = new WeakMap(), _WilsonGPU_framebuffers = new WeakMap(), _WilsonGPU_textures = new WeakMap(), _WilsonGPU_instances = new WeakSet(), _WilsonGPU_loadShaderInternal = function _WilsonGPU_loadShaderInternal(type, source) {
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
