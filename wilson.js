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
var _Wilson_instances, _Wilson_destroyed, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_canvasAspectRatio, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_nonFullscreenWorldWidth, _Wilson_nonFullscreenWorldHeight, _Wilson_onResizeCanvasCallback, _Wilson_useP3ColorSpace, _Wilson_interactionCallbacks, _Wilson_needPanAndZoomUpdate, _Wilson_interactionOnPanAndZoom, _Wilson_numPreviousVelocities, _Wilson_lastPanVelocityX, _Wilson_lastPanVelocityY, _Wilson_lastZoomVelocity, _Wilson_lastPanVelocitiesX, _Wilson_lastPanVelocitiesY, _Wilson_lastZoomVelocities, _Wilson_panVelocityX, _Wilson_panVelocityY, _Wilson_zoomVelocity, _Wilson_panFriction, _Wilson_zoomFriction, _Wilson_panVelocityThreshold, _Wilson_zoomVelocityThreshold, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_currentlyFullscreen, _Wilson_fullscreenOldScroll, _Wilson_fullscreenFillScreen, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButton, _Wilson_fullscreenExitFullscreenButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_metaThemeColorElement, _Wilson_oldMetaThemeColor, _Wilson_onResizeWindow, _Wilson_handleKeydownEvent, _Wilson_onResizeCanvas, _Wilson_zeroVelocities, _Wilson_setLastZoomVelocity, _Wilson_setLastPanVelocity, _Wilson_setZoomVelocity, _Wilson_setPanVelocity, _Wilson_currentlyDragging, _Wilson_currentlyPinching, _Wilson_ignoreTouchendCooldown, _Wilson_atMaxWorldSize, _Wilson_atMinWorldSize, _Wilson_lastInteractionRow, _Wilson_lastInteractionCol, _Wilson_lastInteractionRow2, _Wilson_lastInteractionCol2, _Wilson_clampWorldCoordinates, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMousemove, _Wilson_updateFromPinching, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_zoomFixedPoint, _Wilson_zoomCanvas, _Wilson_onWheel, _Wilson_lastPanAndZoomTimestamp, _Wilson_updatePanAndZoomVelocity, _Wilson_initInteraction, _Wilson_draggables, _Wilson_draggableDefaultId, _Wilson_currentMouseDraggableId, _Wilson_documentDraggableMousemoveListener, _Wilson_documentDraggableMouseupListener, _Wilson_initDraggables, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_updateDraggablesContainerSize, _Wilson_updateDraggablesLocation, _Wilson_initFullscreen, _Wilson_preventGestures, _Wilson_canvasOldWidth, _Wilson_canvasOldWidthStyle, _Wilson_canvasOldHeightStyle, _Wilson_enterFullscreen, _Wilson_exitFullscreen, _Wilson_interpolatePageToWorld, _WilsonGPU_instances, _WilsonGPU_useWebGL2, _WilsonGPU_shaderPrograms, _WilsonGPU_uniforms, _WilsonGPU_loadShaderInternal, _WilsonGPU_numShaders, _WilsonGPU_currentShaderId, _WilsonGPU_framebuffers, _WilsonGPU_textures;
const defaultInteractionCallbacks = {
    mousedown: ({ x, y, event }) => { },
    mouseup: ({ x, y, event }) => { },
    mousemove: ({ x, y, xDelta, yDelta, event }) => { },
    mousedrag: ({ x, y, xDelta, yDelta, event }) => { },
    touchstart: ({ x, y, event }) => { },
    touchend: ({ x, y, event }) => { },
    touchmove: ({ x, y, xDelta, yDelta, event }) => { },
    wheel: ({ x, y, scrollDelta, event }) => { },
};
const defaultDraggableCallbacks = {
    ongrab: ({ id, x, y, event }) => { },
    ondrag: ({ id, x, y, xDelta, yDelta, event }) => { },
    onrelease: ({ id, x, y, event }) => { },
};
class Wilson {
    constructor(canvas, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14;
        _Wilson_instances.add(this);
        _Wilson_destroyed.set(this, false);
        // Duplicated properties like this are effectively readonly. Whenever we
        // change the private version, we also change the public one.
        // Writing to the public version does nothing.
        _Wilson_canvasWidth.set(this, void 0);
        _Wilson_canvasHeight.set(this, void 0);
        _Wilson_canvasAspectRatio.set(this, void 0);
        _Wilson_worldWidth.set(this, void 0);
        _Wilson_worldHeight.set(this, void 0);
        _Wilson_worldCenterX.set(this, void 0);
        _Wilson_worldCenterY.set(this, void 0);
        _Wilson_nonFullscreenWorldWidth.set(this, void 0);
        _Wilson_nonFullscreenWorldHeight.set(this, void 0);
        _Wilson_onResizeCanvasCallback.set(this, void 0);
        _Wilson_useP3ColorSpace.set(this, void 0);
        _Wilson_interactionCallbacks.set(this, void 0);
        _Wilson_needPanAndZoomUpdate.set(this, false);
        _Wilson_interactionOnPanAndZoom.set(this, () => { });
        _Wilson_numPreviousVelocities.set(this, 5);
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
        _Wilson_panVelocityThreshold.set(this, 0.001);
        _Wilson_zoomVelocityThreshold.set(this, 0.001);
        _Wilson_draggablesRadius.set(this, void 0);
        _Wilson_draggablesStatic.set(this, void 0);
        _Wilson_draggableCallbacks.set(this, void 0);
        _Wilson_draggablesContainerWidth.set(this, 0);
        _Wilson_draggablesContainerHeight.set(this, 0);
        _Wilson_draggablesContainerRestrictedWidth.set(this, 0);
        _Wilson_draggablesContainerRestrictedHeight.set(this, 0);
        _Wilson_currentlyFullscreen.set(this, false);
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
            const update = () => {
                if (__classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
                    // Resize the canvas to fill the screen but keep the same total number of pixels.
                    const windowAspectRatio = window.innerWidth / window.innerHeight;
                    const aspectRatioChange = windowAspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
                    this.canvas.style.width = "100vw";
                    this.canvas.style.height = "100vh";
                    // A sketchy hack to make rotating on iOS work properly.
                    requestAnimationFrame(() => this.canvas.style.height = "100%");
                    window.scroll(0, 0);
                    __classPrivateFieldSet(this, _Wilson_worldWidth, Math.max(__classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f")), "f");
                    this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
                    __classPrivateFieldSet(this, _Wilson_worldHeight, Math.max(__classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f")), "f");
                    this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
                    const width = Math.round(Math.sqrt(__classPrivateFieldGet(this, _Wilson_canvasWidth, "f") * __classPrivateFieldGet(this, _Wilson_canvasHeight, "f") * windowAspectRatio));
                    this.resizeCanvas({ width });
                    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
                }
                requestAnimationFrame(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this));
            };
            update();
            setTimeout(update, 10);
            setTimeout(update, 50);
        });
        _Wilson_handleKeydownEvent.set(this, (e) => {
            if (e.key === "Escape" && __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f")) {
                e.preventDefault();
                e.stopPropagation();
                this.exitFullscreen();
            }
        });
        _Wilson_currentlyDragging.set(this, false);
        _Wilson_currentlyPinching.set(this, false);
        _Wilson_ignoreTouchendCooldown.set(this, 0);
        _Wilson_atMaxWorldSize.set(this, false);
        _Wilson_atMinWorldSize.set(this, false);
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
            __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesX, "f").shift();
            __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesX, "f").push(__classPrivateFieldGet(this, _Wilson_lastPanVelocityX, "f"));
            __classPrivateFieldSet(this, _Wilson_lastPanVelocityX, 0, "f");
            __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesY, "f").shift();
            __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesY, "f").push(__classPrivateFieldGet(this, _Wilson_lastPanVelocityY, "f"));
            __classPrivateFieldSet(this, _Wilson_lastPanVelocityY, 0, "f");
            const timeElapsed = timestamp - __classPrivateFieldGet(this, _Wilson_lastPanAndZoomTimestamp, "f");
            __classPrivateFieldSet(this, _Wilson_ignoreTouchendCooldown, Math.max(0, __classPrivateFieldGet(this, _Wilson_ignoreTouchendCooldown, "f") - timeElapsed), "f");
            __classPrivateFieldSet(this, _Wilson_lastPanAndZoomTimestamp, timestamp, "f");
            if (timeElapsed === 0 || timeElapsed > 10000) {
                if (!__classPrivateFieldGet(this, _Wilson_destroyed, "f")) {
                    requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_updatePanAndZoomVelocity, "f"));
                }
                return;
            }
            if (__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f")) {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zoomCanvas).call(this, 1 + __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") * 0.005);
                __classPrivateFieldSet(this, _Wilson_zoomVelocity, __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") * Math.pow(__classPrivateFieldGet(this, _Wilson_zoomFriction, "f"), timeElapsed / (1000 / 60)), "f");
                if (Math.abs(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f")) < __classPrivateFieldGet(this, _Wilson_zoomVelocityThreshold, "f")) {
                    __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
                }
            }
            if (__classPrivateFieldGet(this, _Wilson_panVelocityX, "f") || __classPrivateFieldGet(this, _Wilson_panVelocityY, "f")) {
                __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") + __classPrivateFieldGet(this, _Wilson_panVelocityX, "f"), "f");
                this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
                __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") + __classPrivateFieldGet(this, _Wilson_panVelocityY, "f"), "f");
                this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
                __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
                const frictionFactor = Math.pow(__classPrivateFieldGet(this, _Wilson_panFriction, "f"), timeElapsed / (1000 / 60));
                __classPrivateFieldSet(this, _Wilson_panVelocityX, __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") * frictionFactor, "f");
                __classPrivateFieldSet(this, _Wilson_panVelocityY, __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") * frictionFactor, "f");
                const totalPanVelocitySquared = __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") * __classPrivateFieldGet(this, _Wilson_panVelocityX, "f")
                    + __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") * __classPrivateFieldGet(this, _Wilson_panVelocityY, "f");
                const threshold = __classPrivateFieldGet(this, _Wilson_panVelocityThreshold, "f")
                    * Math.min(__classPrivateFieldGet(this, _Wilson_worldWidth, "f"), __classPrivateFieldGet(this, _Wilson_worldHeight, "f"));
                if (totalPanVelocitySquared < threshold * threshold) {
                    __classPrivateFieldSet(this, _Wilson_panVelocityX, 0, "f");
                    __classPrivateFieldSet(this, _Wilson_panVelocityY, 0, "f");
                }
            }
            if (__classPrivateFieldGet(this, _Wilson_needPanAndZoomUpdate, "f")) {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
                __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
                __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, false, "f");
            }
            if (!__classPrivateFieldGet(this, _Wilson_destroyed, "f")) {
                requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_updatePanAndZoomVelocity, "f"));
            }
        });
        _Wilson_draggables.set(this, {});
        this.draggables = {};
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
        if (options.canvasWidth !== undefined) {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(options.canvasWidth), "f");
            this.canvasWidth = __classPrivateFieldGet(this, _Wilson_canvasWidth, "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(options.canvasWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
            this.canvasHeight = __classPrivateFieldGet(this, _Wilson_canvasHeight, "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(options.canvasHeight * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
            this.canvasWidth = __classPrivateFieldGet(this, _Wilson_canvasWidth, "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(options.canvasHeight), "f");
            this.canvasHeight = __classPrivateFieldGet(this, _Wilson_canvasHeight, "f");
        }
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        if (options.worldWidth !== undefined && options.worldHeight !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldWidth, options.worldWidth, "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, options.worldHeight, "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        }
        else if (options.worldHeight !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldHeight, options.worldHeight, "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
            __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_worldHeight, "f") * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"), "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        }
        else if (options.worldWidth !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldWidth, options.worldWidth, "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"), "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_worldWidth, Math.max(2, 2 * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, Math.max(2, 2 / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")), "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        }
        __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, __classPrivateFieldGet(this, _Wilson_worldWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, __classPrivateFieldGet(this, _Wilson_worldHeight, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterX, (_a = options.worldCenterX) !== null && _a !== void 0 ? _a : 0, "f");
        this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, (_b = options.worldCenterY) !== null && _b !== void 0 ? _b : 0, "f");
        this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        this.minWorldWidth = (_c = options.minWorldWidth) !== null && _c !== void 0 ? _c : 0;
        this.maxWorldWidth = (_d = options.maxWorldWidth) !== null && _d !== void 0 ? _d : Infinity;
        this.minWorldHeight = (_e = options.minWorldHeight) !== null && _e !== void 0 ? _e : 0;
        this.maxWorldHeight = (_f = options.maxWorldHeight) !== null && _f !== void 0 ? _f : Infinity;
        this.minWorldCenterX = (_g = options.minWorldCenterX) !== null && _g !== void 0 ? _g : -Infinity;
        this.maxWorldCenterX = (_h = options.maxWorldCenterX) !== null && _h !== void 0 ? _h : Infinity;
        this.minWorldCenterY = (_j = options.minWorldCenterY) !== null && _j !== void 0 ? _j : -Infinity;
        this.maxWorldCenterY = (_k = options.maxWorldCenterY) !== null && _k !== void 0 ? _k : Infinity;
        __classPrivateFieldSet(this, _Wilson_onResizeCanvasCallback, (_l = options === null || options === void 0 ? void 0 : options.onResizeCanvas) !== null && _l !== void 0 ? _l : (() => { }), "f");
        __classPrivateFieldSet(this, _Wilson_useP3ColorSpace, (_m = options.useP3ColorSpace) !== null && _m !== void 0 ? _m : true, "f");
        this.useP3ColorSpace = __classPrivateFieldGet(this, _Wilson_useP3ColorSpace, "f");
        this.reduceMotion = (_o = options.reduceMotion) !== null && _o !== void 0 ? _o : matchMedia("(prefers-reduced-motion: reduce)").matches;
        __classPrivateFieldSet(this, _Wilson_interactionCallbacks, { ...defaultInteractionCallbacks, ...(_p = options.interactionOptions) === null || _p === void 0 ? void 0 : _p.callbacks }, "f");
        this.useInteractionForPanAndZoom = (_r = (_q = options.interactionOptions) === null || _q === void 0 ? void 0 : _q.useForPanAndZoom) !== null && _r !== void 0 ? _r : false;
        __classPrivateFieldSet(this, _Wilson_panFriction, 0.875, "f");
        __classPrivateFieldSet(this, _Wilson_zoomFriction, 0.85, "f");
        if ((_s = options.interactionOptions) === null || _s === void 0 ? void 0 : _s.useForPanAndZoom) {
            __classPrivateFieldSet(this, _Wilson_interactionOnPanAndZoom, (_u = (_t = options.interactionOptions) === null || _t === void 0 ? void 0 : _t.onPanAndZoom) !== null && _u !== void 0 ? _u : (() => { }), "f");
            __classPrivateFieldSet(this, _Wilson_panFriction, (_w = (_v = options.interactionOptions) === null || _v === void 0 ? void 0 : _v.panFriction) !== null && _w !== void 0 ? _w : __classPrivateFieldGet(this, _Wilson_panFriction, "f"), "f");
            __classPrivateFieldSet(this, _Wilson_zoomFriction, (_y = (_x = options.interactionOptions) === null || _x === void 0 ? void 0 : _x.zoomFriction) !== null && _y !== void 0 ? _y : __classPrivateFieldGet(this, _Wilson_zoomFriction, "f"), "f");
            if (((_z = options.interactionOptions) === null || _z === void 0 ? void 0 : _z.inertia) === false) {
                __classPrivateFieldSet(this, _Wilson_panFriction, 0, "f");
                __classPrivateFieldSet(this, _Wilson_zoomFriction, 0, "f");
                __classPrivateFieldSet(this, _Wilson_panVelocityThreshold, Infinity, "f");
                __classPrivateFieldSet(this, _Wilson_zoomVelocityThreshold, Infinity, "f");
            }
            __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesX, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
            __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesY, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
            __classPrivateFieldSet(this, _Wilson_lastZoomVelocities, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
        }
        __classPrivateFieldSet(this, _Wilson_draggablesRadius, (_1 = (_0 = options.draggableOptions) === null || _0 === void 0 ? void 0 : _0.radius) !== null && _1 !== void 0 ? _1 : 12, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesStatic, (_3 = (_2 = options.draggableOptions) === null || _2 === void 0 ? void 0 : _2.static) !== null && _3 !== void 0 ? _3 : false, "f");
        __classPrivateFieldSet(this, _Wilson_draggableCallbacks, { ...defaultDraggableCallbacks, ...(_4 = options.draggableOptions) === null || _4 === void 0 ? void 0 : _4.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, (_6 = (_5 = options.fullscreenOptions) === null || _5 === void 0 ? void 0 : _5.fillScreen) !== null && _6 !== void 0 ? _6 : false, "f");
        this.animateFullscreen = (_8 = (_7 = options.fullscreenOptions) === null || _7 === void 0 ? void 0 : _7.animate) !== null && _8 !== void 0 ? _8 : true;
        __classPrivateFieldSet(this, _Wilson_fullscreenUseButton, (_10 = (_9 = options.fullscreenOptions) === null || _9 === void 0 ? void 0 : _9.useFullscreenButton) !== null && _10 !== void 0 ? _10 : false, "f");
        if ((_11 = options.fullscreenOptions) === null || _11 === void 0 ? void 0 : _11.useFullscreenButton) {
            __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, (_12 = options.fullscreenOptions) === null || _12 === void 0 ? void 0 : _12.enterFullscreenButtonIconPath, "f");
            __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, (_13 = options.fullscreenOptions) === null || _13 === void 0 ? void 0 : _13.exitFullscreenButtonIconPath, "f");
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
        if ((_14 = options.draggableOptions) === null || _14 === void 0 ? void 0 : _14.draggables) {
            for (const [id, location] of Object.entries(options.draggableOptions.draggables)) {
                this.addDraggable({
                    id,
                    location
                });
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
        const aspectRatio = (__classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f"))
            ? window.innerWidth / window.innerHeight
            : __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        if (dimensions.width !== undefined) {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(dimensions.width), "f");
            this.canvasWidth = __classPrivateFieldGet(this, _Wilson_canvasWidth, "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(dimensions.width / aspectRatio), "f");
            this.canvasHeight = __classPrivateFieldGet(this, _Wilson_canvasHeight, "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_canvasWidth, Math.round(dimensions.height * aspectRatio), "f");
            this.canvasWidth = __classPrivateFieldGet(this, _Wilson_canvasWidth, "f");
            __classPrivateFieldSet(this, _Wilson_canvasHeight, Math.round(dimensions.height), "f");
            this.canvasHeight = __classPrivateFieldGet(this, _Wilson_canvasHeight, "f");
        }
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
    }
    resizeWorld({ width, height, centerX, centerY }) {
        const aspectRatio = (__classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f"))
            ? window.innerWidth / window.innerHeight
            : __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        if (width !== undefined && height !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldWidth, width, "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, height, "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
            const aspectRatioChange = aspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
            __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, width / Math.max(aspectRatioChange, 1), "f");
            __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, height * Math.min(aspectRatioChange, 1), "f");
        }
        else if (width !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldWidth, width, "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_worldHeight, width / aspectRatio, "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
            __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, width, "f");
            __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, width / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"), "f");
        }
        else if (height !== undefined) {
            __classPrivateFieldSet(this, _Wilson_worldHeight, height, "f");
            this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
            __classPrivateFieldSet(this, _Wilson_worldWidth, height * aspectRatio, "f");
            this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
            __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, height, "f");
            __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, height * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"), "f");
        }
        __classPrivateFieldSet(this, _Wilson_worldCenterX, centerX !== null && centerX !== void 0 ? centerX : __classPrivateFieldGet(this, _Wilson_worldCenterX, "f"), "f");
        this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, centerY !== null && centerY !== void 0 ? centerY : __classPrivateFieldGet(this, _Wilson_worldCenterY, "f"), "f");
        this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
        if (this.useInteractionForPanAndZoom) {
            __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
        }
    }
    addDraggable({ id, location }) {
        var _a;
        const [x, y] = location;
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
        __classPrivateFieldGet(this, _Wilson_draggables, "f")[useableId] = {
            element,
            location: [x, y],
            currentlyDragging: false,
        };
        this.draggables[useableId] = {
            element,
            location: [x, y],
            currentlyDragging: false,
        };
        return element;
    }
    removeDraggable(id) {
        __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].element.remove();
        delete __classPrivateFieldGet(this, _Wilson_draggables, "f")[id];
        delete this.draggables[id];
    }
    setDraggablePosition({ id, location }) {
        const [x, y] = location;
        __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location = [x, y];
        this.draggables[id].location = [x, y];
        const element = __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].element;
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    }
    enterFullscreen() {
        // @ts-ignore
        if (document.startViewTransition && this.animateFullscreen) {
            document.body.querySelectorAll(".WILSON_enter-fullscreen-button, .WILSON_exit-fullscreen-button")
                .forEach(button => button.style.removeProperty("view-transition-name"));
            document.body.querySelectorAll(".WILSON_canvas-container > canvas")
                .forEach(container => container.style.removeProperty("view-transition-name"));
            document.body.querySelectorAll(".WILSON_draggable")
                .forEach(container => container.style.removeProperty("view-transition-name"));
            if (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f") && !this.reduceMotion) {
                if (__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").style.setProperty("view-transition-name", "WILSON_fullscreen-button");
                }
                if (__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").style.setProperty("view-transition-name", "WILSON_fullscreen-button");
                }
                this.canvas.style.setProperty("view-transition-name", "WILSON_canvas");
                for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggables, "f"))) {
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
            if (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f") && !this.reduceMotion) {
                this.canvas.style.setProperty("view-transition-name", "WILSON_canvas");
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
_Wilson_destroyed = new WeakMap(), _Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_canvasAspectRatio = new WeakMap(), _Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_nonFullscreenWorldWidth = new WeakMap(), _Wilson_nonFullscreenWorldHeight = new WeakMap(), _Wilson_onResizeCanvasCallback = new WeakMap(), _Wilson_useP3ColorSpace = new WeakMap(), _Wilson_interactionCallbacks = new WeakMap(), _Wilson_needPanAndZoomUpdate = new WeakMap(), _Wilson_interactionOnPanAndZoom = new WeakMap(), _Wilson_numPreviousVelocities = new WeakMap(), _Wilson_lastPanVelocityX = new WeakMap(), _Wilson_lastPanVelocityY = new WeakMap(), _Wilson_lastZoomVelocity = new WeakMap(), _Wilson_lastPanVelocitiesX = new WeakMap(), _Wilson_lastPanVelocitiesY = new WeakMap(), _Wilson_lastZoomVelocities = new WeakMap(), _Wilson_panVelocityX = new WeakMap(), _Wilson_panVelocityY = new WeakMap(), _Wilson_zoomVelocity = new WeakMap(), _Wilson_panFriction = new WeakMap(), _Wilson_zoomFriction = new WeakMap(), _Wilson_panVelocityThreshold = new WeakMap(), _Wilson_zoomVelocityThreshold = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_currentlyFullscreen = new WeakMap(), _Wilson_fullscreenOldScroll = new WeakMap(), _Wilson_fullscreenFillScreen = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButton = new WeakMap(), _Wilson_fullscreenExitFullscreenButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_metaThemeColorElement = new WeakMap(), _Wilson_oldMetaThemeColor = new WeakMap(), _Wilson_onResizeWindow = new WeakMap(), _Wilson_handleKeydownEvent = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_currentlyPinching = new WeakMap(), _Wilson_ignoreTouchendCooldown = new WeakMap(), _Wilson_atMaxWorldSize = new WeakMap(), _Wilson_atMinWorldSize = new WeakMap(), _Wilson_lastInteractionRow = new WeakMap(), _Wilson_lastInteractionCol = new WeakMap(), _Wilson_lastInteractionRow2 = new WeakMap(), _Wilson_lastInteractionCol2 = new WeakMap(), _Wilson_zoomFixedPoint = new WeakMap(), _Wilson_lastPanAndZoomTimestamp = new WeakMap(), _Wilson_updatePanAndZoomVelocity = new WeakMap(), _Wilson_draggables = new WeakMap(), _Wilson_draggableDefaultId = new WeakMap(), _Wilson_currentMouseDraggableId = new WeakMap(), _Wilson_documentDraggableMousemoveListener = new WeakMap(), _Wilson_documentDraggableMouseupListener = new WeakMap(), _Wilson_preventGestures = new WeakMap(), _Wilson_canvasOldWidth = new WeakMap(), _Wilson_canvasOldWidthStyle = new WeakMap(), _Wilson_canvasOldHeightStyle = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_onResizeCanvas = function _Wilson_onResizeCanvas() {
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
}, _Wilson_setLastZoomVelocity = function _Wilson_setLastZoomVelocity(lastZoomVelocity) {
    if (Math.abs(lastZoomVelocity) > Math.abs(__classPrivateFieldGet(this, _Wilson_lastZoomVelocity, "f"))) {
        __classPrivateFieldSet(this, _Wilson_lastZoomVelocity, lastZoomVelocity, "f");
    }
}, _Wilson_setLastPanVelocity = function _Wilson_setLastPanVelocity(lastPanVelocityX, lastPanVelocityY) {
    if (Math.abs(lastPanVelocityX) > Math.abs(__classPrivateFieldGet(this, _Wilson_lastPanVelocityX, "f"))) {
        __classPrivateFieldSet(this, _Wilson_lastPanVelocityX, lastPanVelocityX, "f");
    }
    if (Math.abs(lastPanVelocityY) > Math.abs(__classPrivateFieldGet(this, _Wilson_lastPanVelocityY, "f"))) {
        __classPrivateFieldSet(this, _Wilson_lastPanVelocityY, lastPanVelocityY, "f");
    }
}, _Wilson_setZoomVelocity = function _Wilson_setZoomVelocity() {
    __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
    for (let i = 0; i < __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f"); i++) {
        __classPrivateFieldSet(this, _Wilson_zoomVelocity, __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") + Math.sign(__classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f")[i])
            * __classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f")[i] ** 2, "f");
    }
    __classPrivateFieldSet(this, _Wilson_zoomVelocity, Math.sign(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f"))
        * Math.sqrt(Math.abs(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f")) / __classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")), "f");
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
    const totalPanVelocitySquared = __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") * __classPrivateFieldGet(this, _Wilson_panVelocityX, "f")
        + __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") * __classPrivateFieldGet(this, _Wilson_panVelocityY, "f");
    const threshold = __classPrivateFieldGet(this, _Wilson_panVelocityThreshold, "f")
        * Math.min(__classPrivateFieldGet(this, _Wilson_worldWidth, "f"), __classPrivateFieldGet(this, _Wilson_worldHeight, "f"));
    if (totalPanVelocitySquared < threshold * threshold) {
        __classPrivateFieldSet(this, _Wilson_panVelocityX, 0, "f");
        __classPrivateFieldSet(this, _Wilson_panVelocityY, 0, "f");
    }
}, _Wilson_clampWorldCoordinates = function _Wilson_clampWorldCoordinates() {
    __classPrivateFieldSet(this, _Wilson_worldCenterX, Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_worldCenterX, "f"), this.minWorldCenterX), this.maxWorldCenterX), "f");
    this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
    __classPrivateFieldSet(this, _Wilson_worldCenterY, Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_worldCenterY, "f"), this.minWorldCenterY), this.maxWorldCenterY), "f");
    this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
    __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, false, "f");
    __classPrivateFieldSet(this, _Wilson_atMinWorldSize, false, "f");
    const applyFactor = (factor) => {
        __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_worldHeight, "f") * factor, "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_worldWidth, "f") * factor, "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") * factor, "f");
        __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") * factor, "f");
    };
    if (__classPrivateFieldGet(this, _Wilson_worldWidth, "f") < this.minWorldWidth) {
        applyFactor(this.minWorldWidth / __classPrivateFieldGet(this, _Wilson_worldWidth, "f"));
        __classPrivateFieldSet(this, _Wilson_atMinWorldSize, true, "f");
    }
    else if (__classPrivateFieldGet(this, _Wilson_worldWidth, "f") > this.maxWorldWidth) {
        applyFactor(this.maxWorldWidth / __classPrivateFieldGet(this, _Wilson_worldWidth, "f"));
        __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, true, "f");
    }
    if (__classPrivateFieldGet(this, _Wilson_worldHeight, "f") < this.minWorldHeight) {
        applyFactor(this.minWorldHeight / __classPrivateFieldGet(this, _Wilson_worldHeight, "f"));
        __classPrivateFieldSet(this, _Wilson_atMinWorldSize, true, "f");
    }
    else if (__classPrivateFieldGet(this, _Wilson_worldHeight, "f") > this.maxWorldHeight) {
        applyFactor(this.maxWorldHeight / __classPrivateFieldGet(this, _Wilson_worldHeight, "f"));
        __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, true, "f");
    }
}, _Wilson_onMousedown = function _Wilson_onMousedown(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable")) {
        return;
    }
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, true, "f");
    if (this.useInteractionForPanAndZoom) {
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zeroVelocities).call(this);
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mousedown({ x, y, event: e });
}, _Wilson_onMouseup = function _Wilson_onMouseup(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable")) {
        return;
    }
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    if (this.useInteractionForPanAndZoom && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setPanVelocity).call(this);
    }
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseup({ x, y, event: e });
}, _Wilson_onMousemove = function _Wilson_onMousemove(e) {
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    const [lastX, lastY] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        __classPrivateFieldGet(this, _Wilson_lastInteractionRow, "f"),
        __classPrivateFieldGet(this, _Wilson_lastInteractionCol, "f")
    ]);
    const callback = __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")
        ? __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mousedrag
        : __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mousemove;
    if (this.useInteractionForPanAndZoom && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
        __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") - (x - lastX), "f");
        this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") - (y - lastY), "f");
        this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setLastPanVelocity).call(this, lastX - x, lastY - y);
        __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
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
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f"),
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f")
    ];
    const scale = lastDistance / distance;
    __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_worldWidth, "f") * scale, "f");
    this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
    __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_worldHeight, "f") * scale, "f");
    this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
    __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") * scale, "f");
    __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") * scale, "f");
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setLastZoomVelocity).call(this, (scale - 1) * 200);
    const newFixedPointX = centerProportion[0] * __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
    const newFixedPointY = centerProportion[1] * __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
    const newWorldCenterX = __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - newFixedPointX;
    const newWorldCenterY = __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - newFixedPointY;
    __classPrivateFieldSet(this, _Wilson_worldCenterX, newWorldCenterX, "f");
    this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
    __classPrivateFieldSet(this, _Wilson_worldCenterY, newWorldCenterY, "f");
    this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
}, _Wilson_onTouchstart = function _Wilson_onTouchstart(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable")) {
        return;
    }
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, true, "f");
    if (this.useInteractionForPanAndZoom) {
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
    if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable")) {
        return;
    }
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    if (__classPrivateFieldGet(this, _Wilson_ignoreTouchendCooldown, "f") !== 0) {
        if (e.touches.length === 0) {
            __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
        }
        return;
    }
    if (this.useInteractionForPanAndZoom && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f") && __classPrivateFieldGet(this, _Wilson_ignoreTouchendCooldown, "f") === 0) {
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setPanVelocity).call(this);
    }
    if (e.touches.length === 0) {
        __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    }
    const [x, y] = e.touches.length === 0
        ? __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
            __classPrivateFieldGet(this, _Wilson_lastInteractionRow, "f"),
            __classPrivateFieldGet(this, _Wilson_lastInteractionCol, "f")
        ])
        : __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
            e.touches[0].clientY,
            e.touches[0].clientX
        ]);
    if (e.touches.length !== 0) {
        __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.touches[0].clientY, "f");
        __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.touches[0].clientX, "f");
    }
    if (e.touches.length > 1) {
        __classPrivateFieldSet(this, _Wilson_lastInteractionRow2, e.touches[1].clientY, "f");
        __classPrivateFieldSet(this, _Wilson_lastInteractionCol2, e.touches[1].clientX, "f");
    }
    else {
        if (__classPrivateFieldGet(this, _Wilson_currentlyPinching, "f")) {
            __classPrivateFieldSet(this, _Wilson_ignoreTouchendCooldown, 350, "f");
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setZoomVelocity).call(this);
        }
        __classPrivateFieldSet(this, _Wilson_currentlyPinching, false, "f");
    }
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").touchend({ x, y, event: e });
}, _Wilson_onTouchmove = function _Wilson_onTouchmove(e) {
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    if (__classPrivateFieldGet(this, _Wilson_ignoreTouchendCooldown, "f") !== 0) {
        return;
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        e.touches[0].clientY,
        e.touches[0].clientX
    ]);
    const [lastX, lastY] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [
        __classPrivateFieldGet(this, _Wilson_lastInteractionRow, "f"),
        __classPrivateFieldGet(this, _Wilson_lastInteractionCol, "f")
    ]);
    if (this.useInteractionForPanAndZoom && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
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
            const xDelta = (x + touch2[0]) / 2 - (lastX + lastTouch2[0]) / 2;
            const yDelta = (y + touch2[1]) / 2 - (lastY + lastTouch2[1]) / 2;
            __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") - xDelta, "f");
            this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
            __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") - yDelta, "f");
            this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setLastPanVelocity).call(this, -xDelta, -yDelta);
            __classPrivateFieldSet(this, _Wilson_lastInteractionRow2, e.touches[1].clientY, "f"),
                __classPrivateFieldSet(this, _Wilson_lastInteractionCol2, e.touches[1].clientX, "f");
        }
        else {
            __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") - (x - lastX), "f");
            this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
            __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") - (y - lastY), "f");
            this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setLastPanVelocity).call(this, lastX - x, lastY - y);
        }
        __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
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
    if (scale > 1 && __classPrivateFieldGet(this, _Wilson_atMaxWorldSize, "f") || scale < 1 && __classPrivateFieldGet(this, _Wilson_atMinWorldSize, "f")) {
        return;
    }
    const centerProportion = [
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f"),
        (__classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f")
    ];
    __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_worldWidth, "f") * scale, "f");
    this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
    __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_worldHeight, "f") * scale, "f");
    this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
    __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") * scale, "f");
    __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") * scale, "f");
    const newFixedPointX = centerProportion[0] * __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
    const newFixedPointY = centerProportion[1] * __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
    __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[0] - newFixedPointX, "f");
    this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
    __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_zoomFixedPoint, "f")[1] - newFixedPointY, "f");
    this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
    __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
}, _Wilson_onWheel = function _Wilson_onWheel(e) {
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    if (this.useInteractionForPanAndZoom) {
        __classPrivateFieldSet(this, _Wilson_zoomFixedPoint, [x, y], "f");
        if (Math.abs(e.deltaY) < 50) {
            const scale = 1 + e.deltaY * 0.005;
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zoomCanvas).call(this, scale);
        }
        else {
            __classPrivateFieldSet(this, _Wilson_zoomVelocity, Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") + Math.sign(e.deltaY) * 15, -30), 30), "f");
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
        canvas.addEventListener("mouseleave", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onMouseup).call(this, e));
    }
    if (this.useInteractionForPanAndZoom) {
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
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = true;
    this.draggables[id].currentlyDragging = true;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ongrab({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
            y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            event: e,
        });
    });
}, _Wilson_draggableOnMouseup = function _Wilson_draggableOnMouseup(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentMouseDraggableId, undefined, "f");
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = false;
    this.draggables[id].currentlyDragging = false;
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").onrelease({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
            y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            event: e,
        });
    });
}, _Wilson_draggableOnMousemove = function _Wilson_draggableOnMousemove(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    if (!__classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging) {
        return;
    }
    const rect = __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").getBoundingClientRect();
    const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), e.clientY - rect.top), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
    const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), e.clientX - rect.left), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    const x = ((col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") / 2)
        / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f")) * __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
    const y = (-(row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f") - __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") / 2)
        / __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f")) * __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ondrag({
            id,
            x,
            y,
            xDelta: x - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
            yDelta: y - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            event: e,
        });
        __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location = [x, y];
        this.draggables[id].location = [x, y];
    });
}, _Wilson_draggableOnTouchstart = function _Wilson_draggableOnTouchstart(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = true;
    this.draggables[id].currentlyDragging = true;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ongrab({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
            y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            event: e,
        });
    });
}, _Wilson_draggableOnTouchend = function _Wilson_draggableOnTouchend(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = false;
    this.draggables[id].currentlyDragging = false;
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").onrelease({
            id,
            x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
            y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            event: e,
        });
    });
}, _Wilson_draggableOnTouchmove = function _Wilson_draggableOnTouchmove(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    if (!__classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging) {
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
        return (coordinate[0] - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0]) ** 2
            + (coordinate[1] - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1]) ** 2;
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
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    requestAnimationFrame(() => {
        __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").ondrag({
            id,
            x,
            y,
            xDelta: x - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
            yDelta: y - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            event: e,
        });
        __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location = [x, y];
        this.draggables[id].location = [x, y];
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
    for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
        const x = __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0];
        const y = __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1];
        const element = __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].element;
        const uncappedRow = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5))) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = Math.floor(__classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
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
    __classPrivateFieldSet(this, _Wilson_currentlyFullscreen, true, "f");
    this.currentlyFullscreen = __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f");
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
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.add("WILSON_fullscreen-fill-screen");
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100%";
        window.scroll(0, 0);
        const windowAspectRatio = window.innerWidth / window.innerHeight;
        const aspectRatioChange = windowAspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        __classPrivateFieldSet(this, _Wilson_worldWidth, Math.max(__classPrivateFieldGet(this, _Wilson_worldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_worldWidth, "f")), "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, Math.max(__classPrivateFieldGet(this, _Wilson_worldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_worldHeight, "f")), "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
    }
    else {
        this.canvas.style.width = `min(100vw, calc(100vh * ${__classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")}))`;
        this.canvas.style.height = `min(100vh, calc(100vw / ${__classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")}))`;
    }
    __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onResizeCanvas).call(this);
}, _Wilson_exitFullscreen = function _Wilson_exitFullscreen() {
    var _a;
    __classPrivateFieldSet(this, _Wilson_currentlyFullscreen, false, "f");
    this.currentlyFullscreen = __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f");
    if (__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f"), "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f"), "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
    }
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
    if (__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.remove("WILSON_fullscreen-fill-screen");
        this.resizeCanvas({ width: __classPrivateFieldGet(this, _Wilson_canvasOldWidth, "f") });
    }
    this.canvas.style.width = __classPrivateFieldGet(this, _Wilson_canvasOldWidthStyle, "f");
    this.canvas.style.height = __classPrivateFieldGet(this, _Wilson_canvasOldHeightStyle, "f");
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
        var _a, _b, _c;
        super(canvas, options);
        _WilsonGPU_instances.add(this);
        _WilsonGPU_useWebGL2.set(this, void 0);
        _WilsonGPU_shaderPrograms.set(this, {});
        _WilsonGPU_uniforms.set(this, {});
        _WilsonGPU_numShaders.set(this, 0);
        _WilsonGPU_currentShaderId.set(this, "0");
        _WilsonGPU_framebuffers.set(this, {});
        _WilsonGPU_textures.set(this, {});
        __classPrivateFieldSet(this, _WilsonGPU_useWebGL2, (_a = options.useWebGL2) !== null && _a !== void 0 ? _a : true, "f");
        const gl = __classPrivateFieldGet(this, _WilsonGPU_useWebGL2, "f")
            ? (_b = canvas.getContext("webgl2")) !== null && _b !== void 0 ? _b : canvas.getContext("webgl")
            : canvas.getContext("webgl");
        if (!gl) {
            throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
        }
        this.gl = gl;
        if (this.gl instanceof WebGL2RenderingContext
            && !this.gl.getExtension("EXT_color_buffer_float")) {
            console.warn("[Wilson] No support for float textures.");
        }
        else if (this.gl instanceof WebGLRenderingContext
            && !this.gl.getExtension("OES_texture_float")) {
            console.warn("[Wilson] No support for float textures.");
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
                    uniforms: (_c = options.uniforms) === null || _c === void 0 ? void 0 : _c[id],
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
        this.useShader(id);
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
        for (const [name, value] of Object.entries(uniforms)) {
            const location = this.gl.getUniformLocation(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], name);
            if (location === null) {
                throw new Error(`[Wilson] Couldn't get uniform location for ${name}. Check that it is used in the shader (so that it is not compiled away). Full shader source: ${source}`);
            }
            // Match strings like "uniform int foo;" to "int".
            const match = source.match(new RegExp(`uniform\\s+(\\S+?)\\s+${name}\\s*;`));
            if (!match) {
                throw new Error(`[Wilson] Couldn't find uniform ${name} in shader source: ${source}`);
            }
            const type = match[1].trim();
            if (!(type in uniformFunctions)) {
                throw new Error(`[Wilson] Invalid uniform type ${type} for uniform ${name} in shader source: ${source}`);
            }
            __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[id][name] = { location, type: type };
            this.setUniforms({ [name]: value });
        }
    }
    setUniforms(uniforms, shader = __classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")) {
        this.useShader(shader);
        for (const [name, value] of Object.entries(uniforms)) {
            const { location, type } = __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name];
            const uniformFunction = uniformFunctions[type];
            uniformFunction(this.gl, location, value);
        }
        this.useShader(__classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f"));
    }
    useShader(id) {
        __classPrivateFieldSet(this, _WilsonGPU_currentShaderId, id, "f");
        this.gl.useProgram(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
    }
    createFramebufferTexturePair({ id, width = this.canvasWidth, height = this.canvasHeight, textureType }) {
        const framebuffer = this.gl.createFramebuffer();
        if (!framebuffer) {
            throw new Error(`[Wilson] Couldn't create a framebuffer with id ${id}.`);
        }
        const texture = this.gl.createTexture();
        if (!texture) {
            throw new Error(`[Wilson] Couldn't create a texture with id ${id}.`);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, (textureType === "float" && this.gl instanceof WebGL2RenderingContext)
            ? this.gl.RGBA32F
            : this.gl.RGBA, width, height, 0, this.gl.RGBA, textureType === "float"
            ? this.gl.FLOAT
            : this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id] = framebuffer;
        __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id] = {
            texture,
            width,
            height,
            type: textureType,
        };
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
        this.gl.bindTexture(this.gl.TEXTURE_2D, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].texture);
    }
    setTexture({ id, data, }) {
        if (!__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id]) {
            throw new Error(`[Wilson] Tried to set a texture with id ${id}, but it doesn't exist.`);
        }
        if ((data instanceof Uint8Array && __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type !== "unsignedByte")
            || (data instanceof Float32Array && __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type !== "float")) {
            throw new Error(`[Wilson] Tried to set a texture with id ${id}, but the data type does not match the texture type (the data type should be a ${__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type === 'unsignedByte' ? 'Uint8Array' : 'Float32Array'}).`);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, (__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type === "float" && this.gl instanceof WebGL2RenderingContext)
            ? this.gl.RGBA32F
            : this.gl.RGBA, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].width, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].height, 0, this.gl.RGBA, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type === "float"
            ? this.gl.FLOAT
            : this.gl.UNSIGNED_BYTE, data);
    }
    readPixels(format = "unsignedByte") {
        const pixels = format === "float"
            ? new Float32Array(this.canvasWidth * this.canvasHeight * 4)
            : new Uint8Array(this.canvasWidth * this.canvasHeight * 4);
        this.gl.readPixels(0, 0, this.canvasWidth, this.canvasHeight, this.gl.RGBA, format === "float"
            ? this.gl.FLOAT
            : this.gl.UNSIGNED_BYTE, pixels);
        return pixels;
    }
    resizeCanvas(dimensions) {
        super.resizeCanvas(dimensions);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
    }
    downloadFrame(filename, drawNewFrame = true) {
        if (drawNewFrame) {
            this.drawFrame();
        }
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
_WilsonGPU_useWebGL2 = new WeakMap(), _WilsonGPU_shaderPrograms = new WeakMap(), _WilsonGPU_uniforms = new WeakMap(), _WilsonGPU_numShaders = new WeakMap(), _WilsonGPU_currentShaderId = new WeakMap(), _WilsonGPU_framebuffers = new WeakMap(), _WilsonGPU_textures = new WeakMap(), _WilsonGPU_instances = new WeakSet(), _WilsonGPU_loadShaderInternal = function _WilsonGPU_loadShaderInternal(type, source) {
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
