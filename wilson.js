/// <reference path="./types/webgpu.d.ts" />
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
var _Wilson_instances, _Wilson_destroyed, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_lastCanvasWidth, _Wilson_lastCanvasHeight, _Wilson_canvasAspectRatio, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_nonFullscreenWorldWidth, _Wilson_nonFullscreenWorldHeight, _Wilson_minWorldWidth, _Wilson_maxWorldWidth, _Wilson_minWorldHeight, _Wilson_maxWorldHeight, _Wilson_minWorldX, _Wilson_maxWorldX, _Wilson_minWorldY, _Wilson_maxWorldY, _Wilson_onResizeCanvasCallback, _Wilson_useP3ColorSpace, _Wilson_needDraggablesContainerSizeUpdate, _Wilson_interactionCallbacks, _Wilson_needPanAndZoomUpdate, _Wilson_interactionOnPanAndZoom, _Wilson_lastInteractionTimes, _Wilson_lastInteractionTypes, _Wilson_numPreviousVelocities, _Wilson_lastVelocityFactors, _Wilson_lastPanVelocityX, _Wilson_lastPanVelocityY, _Wilson_lastZoomVelocity, _Wilson_lastPanVelocitiesX, _Wilson_lastPanVelocitiesY, _Wilson_lastZoomVelocities, _Wilson_panVelocityX, _Wilson_panVelocityY, _Wilson_zoomVelocity, _Wilson_panFriction, _Wilson_zoomFriction, _Wilson_panVelocityThreshold, _Wilson_zoomVelocityThreshold, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_currentlyFullscreen, _Wilson_fullscreenOldScroll, _Wilson_fullscreenCanvasRect, _Wilson_fullscreenInitialWindowInnerWidth, _Wilson_fullscreenInitialWindowInnerHeight, _Wilson_fullscreenFillScreen, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButton, _Wilson_fullscreenExitFullscreenButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_draggables, _Wilson_draggableDefaultId, _Wilson_currentMouseDraggableId, _Wilson_useResetButton, _Wilson_resetButton, _Wilson_resetButtonTimeoutId, _Wilson_resetButtonIconPath, _Wilson_defaultWorldCenterX, _Wilson_defaultWorldCenterY, _Wilson_defaultWorldWidth, _Wilson_defaultWorldHeight, _Wilson_defaultDraggableLocations, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_buttonContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_metaThemeColorElement, _Wilson_oldMetaThemeColor, _Wilson_salt, _Wilson_getDefaultWorldSize, _Wilson_onResizeWindow, _Wilson_handleKeydownEvent, _Wilson_resizeCanvas, _Wilson_zeroVelocities, _Wilson_setLastZoomVelocity, _Wilson_setLastPanVelocity, _Wilson_setZoomVelocity, _Wilson_setPanVelocity, _Wilson_currentlyDragging, _Wilson_currentlyPinching, _Wilson_currentlyWheeling, _Wilson_currentlyWheelingTimeoutId, _Wilson_ignoreTouchendCooldown, _Wilson_atMaxWorldSize, _Wilson_atMinWorldSize, _Wilson_lastInteractionRow, _Wilson_lastInteractionCol, _Wilson_lastInteractionRow2, _Wilson_lastInteractionCol2, _Wilson_clampWorldCoordinates, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMouseenter, _Wilson_onMouseleave, _Wilson_onMousemove, _Wilson_updateFromPinching, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_zoomFixedPoint, _Wilson_zoomCanvas, _Wilson_onWheel, _Wilson_lastPanAndZoomTimestamp, _Wilson_animationFrameLoop, _Wilson_initInteraction, _Wilson_documentDraggableMousemoveListener, _Wilson_documentDraggableMouseupListener, _Wilson_initDraggables, _Wilson_setDraggables, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_updateDraggablesContainerSize, _Wilson_updateDraggablesLocation, _Wilson_initFullscreen, _Wilson_initResetButton, _Wilson_preventGestures, _Wilson_canvasOldWidth, _Wilson_canvasOldWidthStyle, _Wilson_canvasOldHeightStyle, _Wilson_enterFullscreen, _Wilson_addEnterFullscreenFillScreenTransitionStyle, _Wilson_exitFullscreen, _Wilson_addExitFullscreenFillScreenTransitionStyle, _Wilson_interpolatePageToWorld, _WilsonGL_useWebGL2, _WilsonGL_shaderPrograms, _WilsonGL_shaderProgramSources, _WilsonGL_uniforms, _WilsonGL_numShaders, _WilsonGL_currentShaderId, _WilsonGL_framebuffers, _WilsonGL_textures, _WilsonGPU_instances, _WilsonGPU_uniformData, _WilsonGPU_uniformBuffer, _WilsonGPU_uniformBufferSize, _WilsonGPU_uniformBufferData, _WilsonGPU_uniformBufferViews, _WilsonGPU_computePipeline, _WilsonGPU_renderPipeline, _WilsonGPU_bindGroup, _WilsonGPU_outputTexture, _WilsonGPU_loaded, _WilsonGPU_loadedResolve, _WilsonGPU_loadedReject, _WilsonGPU_initWebGPU, _WilsonGPU_initUniforms;
const defaultInteractionCallbacks = {
    mousedown: ({ x, y, event }) => { },
    mouseup: ({ x, y, event }) => { },
    mouseenter: ({ x, y, event }) => { },
    mouseleave: ({ x, y, event }) => { },
    mousemove: ({ x, y, xDelta, yDelta, event }) => { },
    mousedrag: ({ x, y, xDelta, yDelta, event }) => { },
    touchstart: ({ x, y, event }) => { },
    touchend: ({ x, y, event }) => { },
    touchmove: ({ x, y, xDelta, yDelta, event }) => { },
    wheel: ({ x, y, scrollDelta, event }) => { },
};
const defaultDraggableCallbacks = {
    grab: ({ id, x, y, event }) => { },
    drag: ({ id, x, y, xDelta, yDelta, event }) => { },
    release: ({ id, x, y, event }) => { },
};
class Wilson {
    constructor(canvas, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37;
        _Wilson_instances.add(this);
        _Wilson_destroyed.set(this, false);
        this.verbose = false;
        // Duplicated properties like this are effectively readonly. Whenever we
        // change the private version, we also change the public one.
        // Writing to the public version does nothing.
        _Wilson_canvasWidth.set(this, void 0);
        _Wilson_canvasHeight.set(this, void 0);
        _Wilson_lastCanvasWidth.set(this, void 0);
        _Wilson_lastCanvasHeight.set(this, void 0);
        _Wilson_canvasAspectRatio.set(this, void 0);
        _Wilson_worldWidth.set(this, void 0);
        _Wilson_worldHeight.set(this, void 0);
        _Wilson_worldCenterX.set(this, void 0);
        _Wilson_worldCenterY.set(this, void 0);
        _Wilson_nonFullscreenWorldWidth.set(this, void 0);
        _Wilson_nonFullscreenWorldHeight.set(this, void 0);
        _Wilson_minWorldWidth.set(this, void 0);
        _Wilson_maxWorldWidth.set(this, void 0);
        _Wilson_minWorldHeight.set(this, void 0);
        _Wilson_maxWorldHeight.set(this, void 0);
        _Wilson_minWorldX.set(this, void 0);
        _Wilson_maxWorldX.set(this, void 0);
        _Wilson_minWorldY.set(this, void 0);
        _Wilson_maxWorldY.set(this, void 0);
        _Wilson_onResizeCanvasCallback.set(this, void 0);
        _Wilson_useP3ColorSpace.set(this, void 0);
        _Wilson_needDraggablesContainerSizeUpdate.set(this, false);
        _Wilson_interactionCallbacks.set(this, void 0);
        this.usePanAndZoomRubberbanding = false;
        this.rubberbandingPanSoftness = 3.5;
        this.rubberbandingZoomSoftness = 2;
        this.disallowZooming = false;
        _Wilson_needPanAndZoomUpdate.set(this, false);
        _Wilson_interactionOnPanAndZoom.set(this, () => { });
        // Used to debounce mouse/touch events on hybrid devices.
        _Wilson_lastInteractionTimes.set(this, {
            grab: Date.now(),
            release: Date.now(),
        });
        _Wilson_lastInteractionTypes.set(this, {
            grab: "mouse",
            release: "mouse",
        });
        _Wilson_numPreviousVelocities.set(this, 4);
        _Wilson_lastVelocityFactors.set(this, []);
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
        this.fullscreenRestoreScroll = false;
        _Wilson_fullscreenOldScroll.set(this, 0);
        _Wilson_fullscreenCanvasRect.set(this, new DOMRect());
        _Wilson_fullscreenInitialWindowInnerWidth.set(this, window.innerWidth);
        _Wilson_fullscreenInitialWindowInnerHeight.set(this, window.innerHeight);
        _Wilson_fullscreenFillScreen.set(this, void 0);
        _Wilson_fullscreenUseButton.set(this, void 0);
        _Wilson_fullscreenEnterFullscreenButton.set(this, null);
        _Wilson_fullscreenExitFullscreenButton.set(this, null);
        _Wilson_fullscreenEnterFullscreenButtonIconPath.set(this, void 0);
        _Wilson_fullscreenExitFullscreenButtonIconPath.set(this, void 0);
        _Wilson_draggables.set(this, {});
        this.draggables = {};
        _Wilson_draggableDefaultId.set(this, 0);
        _Wilson_currentMouseDraggableId.set(this, void 0);
        _Wilson_useResetButton.set(this, void 0);
        _Wilson_resetButton.set(this, null);
        _Wilson_resetButtonTimeoutId.set(this, void 0);
        _Wilson_resetButtonIconPath.set(this, void 0);
        this.onReset = () => { };
        _Wilson_defaultWorldCenterX.set(this, void 0);
        _Wilson_defaultWorldCenterY.set(this, void 0);
        _Wilson_defaultWorldWidth.set(this, void 0);
        _Wilson_defaultWorldHeight.set(this, void 0);
        _Wilson_defaultDraggableLocations.set(this, {});
        _Wilson_appletContainer.set(this, void 0);
        _Wilson_canvasContainer.set(this, void 0);
        _Wilson_draggablesContainer.set(this, void 0);
        _Wilson_buttonContainer.set(this, void 0);
        _Wilson_fullscreenContainer.set(this, void 0);
        _Wilson_fullscreenContainerLocation.set(this, void 0);
        _Wilson_metaThemeColorElement.set(this, document.querySelector("meta[name='theme-color']"));
        _Wilson_oldMetaThemeColor.set(this, null);
        _Wilson_salt.set(this, Date.now().toString(36) + Math.random().toString(36).slice(2));
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
                    __classPrivateFieldSet(this, _Wilson_worldWidth, Math.max(__classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f")), "f");
                    this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
                    __classPrivateFieldSet(this, _Wilson_worldHeight, Math.max(__classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f")), "f");
                    this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
                    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
                    const width = Math.round(Math.sqrt(__classPrivateFieldGet(this, _Wilson_canvasWidth, "f") * __classPrivateFieldGet(this, _Wilson_canvasHeight, "f") * windowAspectRatio));
                    if (__classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_resizeCanvas).call(this, { width })) {
                        __classPrivateFieldGet(this, _Wilson_onResizeCanvasCallback, "f").call(this);
                    }
                }
                __classPrivateFieldSet(this, _Wilson_needDraggablesContainerSizeUpdate, true, "f");
            };
            update();
            setTimeout(update, 10);
            setTimeout(update, 50);
        });
        _Wilson_handleKeydownEvent.set(this, (e) => {
            if (e.key === "Escape" && __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") && this.closeFullscreenWithEscape) {
                e.preventDefault();
                e.stopPropagation();
                this.exitFullscreen();
            }
        });
        this.resizeCanvasGL = () => { };
        _Wilson_currentlyDragging.set(this, false);
        _Wilson_currentlyPinching.set(this, false);
        _Wilson_currentlyWheeling.set(this, false);
        _Wilson_currentlyWheelingTimeoutId.set(this, -1);
        _Wilson_ignoreTouchendCooldown.set(this, 0);
        _Wilson_atMaxWorldSize.set(this, false);
        _Wilson_atMinWorldSize.set(this, false);
        _Wilson_lastInteractionRow.set(this, 0);
        _Wilson_lastInteractionCol.set(this, 0);
        _Wilson_lastInteractionRow2.set(this, 0);
        _Wilson_lastInteractionCol2.set(this, 0);
        _Wilson_zoomFixedPoint.set(this, [0, 0]);
        _Wilson_lastPanAndZoomTimestamp.set(this, -1);
        _Wilson_animationFrameLoop.set(this, (timestamp) => {
            const timeElapsed = timestamp - __classPrivateFieldGet(this, _Wilson_lastPanAndZoomTimestamp, "f");
            __classPrivateFieldSet(this, _Wilson_lastPanAndZoomTimestamp, timestamp, "f");
            if (this.useInteractionForPanAndZoom) {
                __classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f").shift();
                __classPrivateFieldGet(this, _Wilson_lastZoomVelocities, "f").push(__classPrivateFieldGet(this, _Wilson_lastZoomVelocity, "f"));
                __classPrivateFieldSet(this, _Wilson_lastZoomVelocity, 0, "f");
                __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesX, "f").shift();
                __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesX, "f").push(__classPrivateFieldGet(this, _Wilson_lastPanVelocityX, "f"));
                __classPrivateFieldSet(this, _Wilson_lastPanVelocityX, 0, "f");
                __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesY, "f").shift();
                __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesY, "f").push(__classPrivateFieldGet(this, _Wilson_lastPanVelocityY, "f"));
                __classPrivateFieldSet(this, _Wilson_lastPanVelocityY, 0, "f");
                // It would seem like we should divide by timeElapsed,
                // but this is a lag compensation measure --- if we're dropping
                // frames, we increase the velocity factor so that the inertia effect
                // isn't halted so quickly
                __classPrivateFieldGet(this, _Wilson_lastVelocityFactors, "f").shift();
                __classPrivateFieldGet(this, _Wilson_lastVelocityFactors, "f").push(Math.max(timeElapsed / (1000 / 60), 1));
                __classPrivateFieldSet(this, _Wilson_ignoreTouchendCooldown, Math.max(0, __classPrivateFieldGet(this, _Wilson_ignoreTouchendCooldown, "f") - timeElapsed), "f");
            }
            if (timeElapsed === 0 || timeElapsed > 10000) {
                if (!__classPrivateFieldGet(this, _Wilson_destroyed, "f")) {
                    requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_animationFrameLoop, "f"));
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
                __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, false, "f");
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this, Math.min(timeElapsed / (1000 / 60), 1));
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
                __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
                this.showResetButton();
            }
            if (__classPrivateFieldGet(this, _Wilson_needDraggablesContainerSizeUpdate, "f")) {
                requestAnimationFrame(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this));
                __classPrivateFieldSet(this, _Wilson_needDraggablesContainerSizeUpdate, false, "f");
            }
            if (!__classPrivateFieldGet(this, _Wilson_destroyed, "f")) {
                requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_animationFrameLoop, "f"));
            }
        });
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
        const computedStyle = getComputedStyle(this.canvas);
        __classPrivateFieldSet(this, _Wilson_canvasAspectRatio, parseFloat(computedStyle.width) / parseFloat(computedStyle.height), "f");
        if (!__classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f") || __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f") <= 0 || __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f") === Infinity) {
            throw new Error("[Wilson] Could not get canvas aspect ratio. Check that the canvas has a nonzero width and height and is displayed on the page.");
        }
        if (options.canvasWidth === undefined && options.canvasHeight === undefined) {
            throw new Error("[Wilson] Exactly one of canvasWidth and canvasHeight must be specified.");
        }
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
        __classPrivateFieldSet(this, _Wilson_lastCanvasWidth, __classPrivateFieldGet(this, _Wilson_canvasWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_lastCanvasHeight, __classPrivateFieldGet(this, _Wilson_canvasHeight, "f"), "f");
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        const resizeObserver = new ResizeObserver(() => {
            __classPrivateFieldSet(this, _Wilson_needDraggablesContainerSizeUpdate, true, "f");
        });
        resizeObserver.observe(this.canvas);
        this.verbose = (_a = options.verbose) !== null && _a !== void 0 ? _a : false;
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
        __classPrivateFieldSet(this, _Wilson_worldCenterX, (_b = options.worldCenterX) !== null && _b !== void 0 ? _b : 0, "f");
        this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, (_c = options.worldCenterY) !== null && _c !== void 0 ? _c : 0, "f");
        this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        __classPrivateFieldSet(this, _Wilson_minWorldX, (_d = options.minWorldX) !== null && _d !== void 0 ? _d : -Infinity, "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldX, (_e = options.maxWorldX) !== null && _e !== void 0 ? _e : Infinity, "f");
        __classPrivateFieldSet(this, _Wilson_minWorldY, (_f = options.minWorldY) !== null && _f !== void 0 ? _f : -Infinity, "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldY, (_g = options.maxWorldY) !== null && _g !== void 0 ? _g : Infinity, "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldWidth, (options.minWorldX !== undefined && options.maxWorldX !== undefined)
            ? options.maxWorldX - options.minWorldX
            : (_h = options.maxWorldWidth) !== null && _h !== void 0 ? _h : Infinity, "f");
        __classPrivateFieldSet(this, _Wilson_minWorldWidth, (_j = options.minWorldWidth) !== null && _j !== void 0 ? _j : 0, "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldHeight, (options.minWorldY !== undefined && options.maxWorldY !== undefined)
            ? options.maxWorldY - options.minWorldY
            : (_k = options.maxWorldHeight) !== null && _k !== void 0 ? _k : Infinity, "f");
        __classPrivateFieldSet(this, _Wilson_minWorldHeight, (_l = options.minWorldHeight) !== null && _l !== void 0 ? _l : 0, "f");
        if (__classPrivateFieldGet(this, _Wilson_minWorldX, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldX, "f")
            || __classPrivateFieldGet(this, _Wilson_minWorldY, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldY, "f")
            || __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f")
            || __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f")) {
            throw new Error("[Wilson] minWorldX and minWorldY must be less than maxWorldX and maxWorldY, repsectively");
        }
        this.clampWorldCoordinatesMode = (_m = options.clampWorldCoordinatesMode) !== null && _m !== void 0 ? _m : "one";
        __classPrivateFieldSet(this, _Wilson_defaultWorldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultWorldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultWorldWidth, __classPrivateFieldGet(this, _Wilson_worldWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultWorldHeight, __classPrivateFieldGet(this, _Wilson_worldHeight, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_useResetButton, (_o = options.useResetButton) !== null && _o !== void 0 ? _o : false, "f");
        this.animateReset = (_p = options.animateReset) !== null && _p !== void 0 ? _p : true;
        if (options.useResetButton) {
            __classPrivateFieldSet(this, _Wilson_resetButtonIconPath, options.resetButtonIconPath, "f");
            this.onReset = (_q = options.onReset) !== null && _q !== void 0 ? _q : (() => { });
        }
        __classPrivateFieldSet(this, _Wilson_onResizeCanvasCallback, (_r = options === null || options === void 0 ? void 0 : options.onResizeCanvas) !== null && _r !== void 0 ? _r : (() => { }), "f");
        __classPrivateFieldSet(this, _Wilson_useP3ColorSpace, (_s = options.useP3ColorSpace) !== null && _s !== void 0 ? _s : true, "f");
        this.useP3ColorSpace = __classPrivateFieldGet(this, _Wilson_useP3ColorSpace, "f");
        this.reduceMotion = (_t = options.reduceMotion) !== null && _t !== void 0 ? _t : matchMedia("(prefers-reduced-motion: reduce)").matches;
        __classPrivateFieldSet(this, _Wilson_interactionCallbacks, { ...defaultInteractionCallbacks, ...(_u = options.interactionOptions) === null || _u === void 0 ? void 0 : _u.callbacks }, "f");
        this.useInteractionForPanAndZoom = (_w = (_v = options.interactionOptions) === null || _v === void 0 ? void 0 : _v.useForPanAndZoom) !== null && _w !== void 0 ? _w : false;
        __classPrivateFieldSet(this, _Wilson_panFriction, 0.875, "f");
        __classPrivateFieldSet(this, _Wilson_zoomFriction, 0.85, "f");
        if ((_x = options.interactionOptions) === null || _x === void 0 ? void 0 : _x.useForPanAndZoom) {
            __classPrivateFieldSet(this, _Wilson_interactionOnPanAndZoom, (_z = (_y = options.interactionOptions) === null || _y === void 0 ? void 0 : _y.onPanAndZoom) !== null && _z !== void 0 ? _z : (() => { }), "f");
            __classPrivateFieldSet(this, _Wilson_panFriction, (_1 = (_0 = options.interactionOptions) === null || _0 === void 0 ? void 0 : _0.panFriction) !== null && _1 !== void 0 ? _1 : __classPrivateFieldGet(this, _Wilson_panFriction, "f"), "f");
            __classPrivateFieldSet(this, _Wilson_zoomFriction, (_3 = (_2 = options.interactionOptions) === null || _2 === void 0 ? void 0 : _2.zoomFriction) !== null && _3 !== void 0 ? _3 : __classPrivateFieldGet(this, _Wilson_zoomFriction, "f"), "f");
            if (((_4 = options.interactionOptions) === null || _4 === void 0 ? void 0 : _4.inertia) === false) {
                __classPrivateFieldSet(this, _Wilson_panFriction, 0, "f");
                __classPrivateFieldSet(this, _Wilson_zoomFriction, 0, "f");
                __classPrivateFieldSet(this, _Wilson_panVelocityThreshold, Infinity, "f");
                __classPrivateFieldSet(this, _Wilson_zoomVelocityThreshold, Infinity, "f");
            }
            this.usePanAndZoomRubberbanding = (_6 = (_5 = options.interactionOptions) === null || _5 === void 0 ? void 0 : _5.rubberbanding) !== null && _6 !== void 0 ? _6 : false;
            this.rubberbandingPanSoftness = (_8 = (_7 = options.interactionOptions) === null || _7 === void 0 ? void 0 : _7.rubberbandingPanSoftness) !== null && _8 !== void 0 ? _8 : 3.5;
            this.rubberbandingZoomSoftness = (_10 = (_9 = options.interactionOptions) === null || _9 === void 0 ? void 0 : _9.rubberbandingZoomSoftness) !== null && _10 !== void 0 ? _10 : 2;
            this.disallowZooming = (_12 = (_11 = options.interactionOptions) === null || _11 === void 0 ? void 0 : _11.disallowZooming) !== null && _12 !== void 0 ? _12 : false;
            __classPrivateFieldSet(this, _Wilson_lastVelocityFactors, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(1), "f");
            __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesX, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
            __classPrivateFieldSet(this, _Wilson_lastPanVelocitiesY, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
            __classPrivateFieldSet(this, _Wilson_lastZoomVelocities, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(0), "f");
        }
        __classPrivateFieldSet(this, _Wilson_draggablesRadius, (_14 = (_13 = options.draggableOptions) === null || _13 === void 0 ? void 0 : _13.radius) !== null && _14 !== void 0 ? _14 : 12, "f");
        __classPrivateFieldSet(this, _Wilson_draggablesStatic, (_16 = (_15 = options.draggableOptions) === null || _15 === void 0 ? void 0 : _15.static) !== null && _16 !== void 0 ? _16 : false, "f");
        __classPrivateFieldSet(this, _Wilson_draggableCallbacks, { ...defaultDraggableCallbacks, ...(_17 = options.draggableOptions) === null || _17 === void 0 ? void 0 : _17.callbacks }, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, (_19 = (_18 = options.fullscreenOptions) === null || _18 === void 0 ? void 0 : _18.fillScreen) !== null && _19 !== void 0 ? _19 : false, "f");
        this.animateFullscreen = (_21 = (_20 = options.fullscreenOptions) === null || _20 === void 0 ? void 0 : _20.animate) !== null && _21 !== void 0 ? _21 : true;
        this.crossfadeFullscreen = (_23 = (_22 = options.fullscreenOptions) === null || _22 === void 0 ? void 0 : _22.crossfade) !== null && _23 !== void 0 ? _23 : false;
        this.closeFullscreenWithEscape = (_25 = (_24 = options.fullscreenOptions) === null || _24 === void 0 ? void 0 : _24.closeWithEscape) !== null && _25 !== void 0 ? _25 : true;
        this.fullscreenRestoreScroll = (_27 = (_26 = options.fullscreenOptions) === null || _26 === void 0 ? void 0 : _26.restoreScroll) !== null && _27 !== void 0 ? _27 : true;
        this.beforeSwitchFullscreen = (_29 = (_28 = options.fullscreenOptions) === null || _28 === void 0 ? void 0 : _28.beforeSwitch) !== null && _29 !== void 0 ? _29 : (() => { });
        this.onSwitchFullscreen = (_31 = (_30 = options.fullscreenOptions) === null || _30 === void 0 ? void 0 : _30.onSwitch) !== null && _31 !== void 0 ? _31 : (() => { });
        __classPrivateFieldSet(this, _Wilson_fullscreenUseButton, (_33 = (_32 = options.fullscreenOptions) === null || _32 === void 0 ? void 0 : _32.useFullscreenButton) !== null && _33 !== void 0 ? _33 : false, "f");
        if ((_34 = options.fullscreenOptions) === null || _34 === void 0 ? void 0 : _34.useFullscreenButton) {
            __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, (_35 = options.fullscreenOptions) === null || _35 === void 0 ? void 0 : _35.enterFullscreenButtonIconPath, "f");
            __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, (_36 = options.fullscreenOptions) === null || _36 === void 0 ? void 0 : _36.exitFullscreenButtonIconPath, "f");
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
        __classPrivateFieldSet(this, _Wilson_buttonContainer, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_buttonContainer, "f").classList.add("WILSON_button-container");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_buttonContainer, "f"));
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
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initInteraction).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initDraggables).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initResetButton).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_initFullscreen).call(this);
        requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_animationFrameLoop, "f"));
        window.addEventListener("resize", __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f"));
        document.documentElement.addEventListener("keydown", __classPrivateFieldGet(this, _Wilson_handleKeydownEvent, "f"));
        if ((_37 = options.draggableOptions) === null || _37 === void 0 ? void 0 : _37.draggables) {
            this.setDraggables(options.draggableOptions.draggables);
            for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggables, "f"))) {
                __classPrivateFieldGet(this, _Wilson_defaultDraggableLocations, "f")[id] = data.location;
            }
        }
        if (this.verbose) {
            console.log(`[Wilson] Initialized a ${__classPrivateFieldGet(this, _Wilson_canvasWidth, "f")}x${__classPrivateFieldGet(this, _Wilson_canvasHeight, "f")} canvas`
                + (this.canvas.id ? ` with ID ${this.canvas.id}` : ""));
        }
    }
    destroy() {
        if (this.currentlyFullscreen) {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this, false);
        }
        __classPrivateFieldSet(this, _Wilson_destroyed, true, "f");
        window.removeEventListener("resize", __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f"));
        document.documentElement.removeEventListener("keydown", __classPrivateFieldGet(this, _Wilson_handleKeydownEvent, "f"));
        document.documentElement.removeEventListener("mousemove", __classPrivateFieldGet(this, _Wilson_documentDraggableMousemoveListener, "f"));
        document.documentElement.removeEventListener("mouseup", __classPrivateFieldGet(this, _Wilson_documentDraggableMouseupListener, "f"));
        document.removeEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
        document.removeEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
        document.removeEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
        if (__classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f")
            && __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").parentElement) {
            __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").parentElement.insertBefore(this.canvas, __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f"));
        }
        __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").remove();
    }
    setCurrentStateAsDefault() {
        __classPrivateFieldSet(this, _Wilson_defaultWorldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultWorldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultWorldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultWorldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_defaultDraggableLocations, {}, "f");
        for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
            __classPrivateFieldGet(this, _Wilson_defaultDraggableLocations, "f")[id] = [...__classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location];
        }
    }
    resetWorldCoordinates(animate = this.animateReset) {
        const [width, height] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getDefaultWorldSize).call(this);
        if (!animate) {
            this.resizeWorld({
                width,
                height,
                centerX: __classPrivateFieldGet(this, _Wilson_defaultWorldCenterX, "f"),
                centerY: __classPrivateFieldGet(this, _Wilson_defaultWorldCenterY, "f"),
                showResetButton: false,
            });
            return;
        }
        const duration = 350;
        const startTime = performance.now();
        const oldWorldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        const oldWorldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        const oldWorldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        const oldWorldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-in-out quad
            const t = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            this.resizeWorld({
                width: (1 - t) * oldWorldWidth + t * width,
                height: (1 - t) * oldWorldHeight + t * height,
                centerX: (1 - t) * oldWorldCenterX + t * __classPrivateFieldGet(this, _Wilson_defaultWorldCenterX, "f"),
                centerY: (1 - t) * oldWorldCenterY + t * __classPrivateFieldGet(this, _Wilson_defaultWorldCenterY, "f"),
                showResetButton: false,
            });
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    }
    resetDraggables(animate = this.animateReset) {
        for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
            __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").grab({
                id,
                x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
                y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
            });
        }
        const oldDraggableLocations = {};
        for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
            oldDraggableLocations[id] = [...__classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location];
        }
        if (!animate) {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setDraggables).call(this, __classPrivateFieldGet(this, _Wilson_defaultDraggableLocations, "f"), false);
            for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
                __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").drag({
                    id,
                    x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
                    y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
                    xDelta: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0] - oldDraggableLocations[id][0],
                    yDelta: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1] - oldDraggableLocations[id][1],
                });
            }
            for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
                __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").release({
                    id,
                    x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
                    y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
                });
            }
            return;
        }
        const duration = 350;
        const startTime = performance.now();
        const updatedDraggableLocations = {};
        let lastDraggableLocations = structuredClone(oldDraggableLocations);
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-in-out quad
            const t = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
                updatedDraggableLocations[id] = [
                    (1 - t) * oldDraggableLocations[id][0] + t * __classPrivateFieldGet(this, _Wilson_defaultDraggableLocations, "f")[id][0],
                    (1 - t) * oldDraggableLocations[id][1] + t * __classPrivateFieldGet(this, _Wilson_defaultDraggableLocations, "f")[id][1]
                ];
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setDraggables).call(this, updatedDraggableLocations, false);
                __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").drag({
                    id,
                    x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
                    y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
                    xDelta: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0] - lastDraggableLocations[id][0],
                    yDelta: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1] - lastDraggableLocations[id][1],
                });
            }
            lastDraggableLocations = structuredClone(updatedDraggableLocations);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
            else {
                for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
                    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").release({
                        id,
                        x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
                        y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
                    });
                }
            }
        };
        requestAnimationFrame(update);
    }
    reset() {
        this.resetWorldCoordinates();
        this.resetDraggables();
        this.onReset(this.animateReset);
        if (__classPrivateFieldGet(this, _Wilson_resetButton, "f")) {
            __classPrivateFieldGet(this, _Wilson_resetButton, "f").style.opacity = "0";
            clearTimeout(__classPrivateFieldGet(this, _Wilson_resetButtonTimeoutId, "f"));
            __classPrivateFieldSet(this, _Wilson_resetButtonTimeoutId, window.setTimeout(() => {
                if (__classPrivateFieldGet(this, _Wilson_resetButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_resetButton, "f").style.display = "none";
                }
            }, 150), "f");
        }
    }
    resizeCanvas(dimensions) {
        if (!__classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f")) {
            const computedStyle = getComputedStyle(this.canvas);
            __classPrivateFieldSet(this, _Wilson_canvasAspectRatio, parseFloat(computedStyle.width) / parseFloat(computedStyle.height), "f");
        }
        if (__classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_resizeCanvas).call(this, dimensions)) {
            __classPrivateFieldGet(this, _Wilson_onResizeCanvasCallback, "f").call(this);
        }
    }
    resizeWorld({ width, height, centerX, centerY, minWidth, maxWidth, minHeight, maxHeight, minX, maxX, minY, maxY, showResetButton = true, }) {
        const lastWorldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        const lastWorldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        const lastWorldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        const lastWorldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
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
        __classPrivateFieldSet(this, _Wilson_minWorldX, minX !== null && minX !== void 0 ? minX : __classPrivateFieldGet(this, _Wilson_minWorldX, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldX, maxX !== null && maxX !== void 0 ? maxX : __classPrivateFieldGet(this, _Wilson_maxWorldX, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_minWorldY, minY !== null && minY !== void 0 ? minY : __classPrivateFieldGet(this, _Wilson_minWorldY, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldY, maxY !== null && maxY !== void 0 ? maxY : __classPrivateFieldGet(this, _Wilson_maxWorldY, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldWidth, (minX !== undefined && maxX !== undefined)
            ? maxX - minX
            : maxWidth !== null && maxWidth !== void 0 ? maxWidth : __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_minWorldWidth, minWidth !== null && minWidth !== void 0 ? minWidth : __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_maxWorldHeight, (minY !== undefined && maxY !== undefined)
            ? maxY - minY
            : maxHeight !== null && maxHeight !== void 0 ? maxHeight : __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_minWorldHeight, minHeight !== null && minHeight !== void 0 ? minHeight : __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f"), "f");
        if (__classPrivateFieldGet(this, _Wilson_minWorldX, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldX, "f")
            || __classPrivateFieldGet(this, _Wilson_minWorldY, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldY, "f")
            || __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f")
            || __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f")) {
            throw new Error("[Wilson] minWorldX and minWorldY must be less than maxWorldX and maxWorldY, repsectively");
        }
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesLocation).call(this);
        const differentFromLastWorldSize = __classPrivateFieldGet(this, _Wilson_worldWidth, "f") !== lastWorldWidth
            || __classPrivateFieldGet(this, _Wilson_worldHeight, "f") !== lastWorldHeight
            || __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") !== lastWorldCenterX
            || __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") !== lastWorldCenterY;
        if (showResetButton && differentFromLastWorldSize) {
            this.showResetButton();
        }
        if (this.useInteractionForPanAndZoom && differentFromLastWorldSize) {
            __classPrivateFieldGet(this, _Wilson_interactionOnPanAndZoom, "f").call(this);
        }
    }
    setDraggables(draggables) {
        let onlyNewDraggables = true;
        for (const id in __classPrivateFieldGet(this, _Wilson_draggables, "f")) {
            if (id in draggables) {
                onlyNewDraggables = false;
                break;
            }
        }
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setDraggables).call(this, draggables, !onlyNewDraggables);
    }
    removeDraggables(id) {
        const ids = Array.isArray(id) ? id : [id];
        for (const draggableId of ids) {
            __classPrivateFieldGet(this, _Wilson_draggables, "f")[draggableId].element.remove();
            delete __classPrivateFieldGet(this, _Wilson_draggables, "f")[draggableId];
            delete this.draggables[draggableId];
        }
    }
    showResetButton() {
        if (__classPrivateFieldGet(this, _Wilson_resetButton, "f")) {
            clearTimeout(__classPrivateFieldGet(this, _Wilson_resetButtonTimeoutId, "f"));
            __classPrivateFieldGet(this, _Wilson_resetButton, "f").style.display = "block";
            requestAnimationFrame(() => {
                if (__classPrivateFieldGet(this, _Wilson_resetButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_resetButton, "f").style.opacity = "1";
                }
            });
        }
    }
    async enterFullscreen() {
        await this.beforeSwitchFullscreen(true);
        const elements = [
            __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f"),
            __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f"),
            __classPrivateFieldGet(this, _Wilson_resetButton, "f"),
            this.canvas,
            ...(Object.values(__classPrivateFieldGet(this, _Wilson_draggables, "f")).map(draggable => draggable.element))
        ];
        for (const element of elements) {
            if (element) {
                element.style.removeProperty("view-transition-name");
            }
        }
        // @ts-ignore
        if (document.startViewTransition) {
            const styleElement = __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f") && this.animateFullscreen && !this.crossfadeFullscreen
                ? __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_addEnterFullscreenFillScreenTransitionStyle).call(this)
                : null;
            if (!this.reduceMotion && !this.crossfadeFullscreen && this.animateFullscreen) {
                if (__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").style.setProperty("view-transition-name", `WILSON_fullscreen-button-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
                if (__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").style.setProperty("view-transition-name", `WILSON_fullscreen-button-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
                if (__classPrivateFieldGet(this, _Wilson_resetButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_resetButton, "f").style.setProperty("view-transition-name", `WILSON_reset-button-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
                this.canvas.style.setProperty("view-transition-name", `WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggables, "f"))) {
                    data.element.style.setProperty("view-transition-name", `WILSON_draggable-${id}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
            }
            if (this.animateFullscreen) {
                // @ts-ignore
                const transition = document.startViewTransition(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this));
                if (transition.finished !== undefined) {
                    await transition.finished;
                    styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
                }
                else {
                    setTimeout(() => styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove(), 1000);
                }
            }
            else {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this);
            }
        }
        else {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this);
        }
    }
    async exitFullscreen() {
        await this.beforeSwitchFullscreen(false);
        const elements = [
            __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f"),
            __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f"),
            __classPrivateFieldGet(this, _Wilson_resetButton, "f"),
            this.canvas,
            ...(Object.values(__classPrivateFieldGet(this, _Wilson_draggables, "f")).map(draggable => draggable.element))
        ];
        for (const element of elements) {
            if (element) {
                element.style.removeProperty("view-transition-name");
            }
        }
        // @ts-ignore
        if (document.startViewTransition) {
            const styleElement = __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f") && this.animateFullscreen && !this.crossfadeFullscreen
                ? __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_addExitFullscreenFillScreenTransitionStyle).call(this)
                : null;
            if (!this.reduceMotion
                && !this.crossfadeFullscreen
                && this.animateFullscreen
                && (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")
                    || (window.innerWidth == __classPrivateFieldGet(this, _Wilson_fullscreenInitialWindowInnerWidth, "f")
                        && window.innerHeight == __classPrivateFieldGet(this, _Wilson_fullscreenInitialWindowInnerHeight, "f")))) {
                if (__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").style.setProperty("view-transition-name", `WILSON_fullscreen-button-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
                if (__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").style.setProperty("view-transition-name", `WILSON_fullscreen-button-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
                if (__classPrivateFieldGet(this, _Wilson_resetButton, "f")) {
                    __classPrivateFieldGet(this, _Wilson_resetButton, "f").style.setProperty("view-transition-name", `WILSON_reset-button-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
                this.canvas.style.setProperty("view-transition-name", `WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggables, "f"))) {
                    data.element.style.setProperty("view-transition-name", `WILSON_draggable-${id}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                }
            }
            if (this.animateFullscreen) {
                // @ts-ignore
                const transition = document.startViewTransition(() => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this));
                if (transition.finished !== undefined) {
                    await transition.finished;
                    styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
                }
                else {
                    setTimeout(() => styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove(), 1000);
                }
            }
            else {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this);
            }
        }
        else {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this);
        }
        for (const element of elements) {
            if (element) {
                element.style.removeProperty("view-transition-name");
            }
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
_Wilson_destroyed = new WeakMap(), _Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_lastCanvasWidth = new WeakMap(), _Wilson_lastCanvasHeight = new WeakMap(), _Wilson_canvasAspectRatio = new WeakMap(), _Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_nonFullscreenWorldWidth = new WeakMap(), _Wilson_nonFullscreenWorldHeight = new WeakMap(), _Wilson_minWorldWidth = new WeakMap(), _Wilson_maxWorldWidth = new WeakMap(), _Wilson_minWorldHeight = new WeakMap(), _Wilson_maxWorldHeight = new WeakMap(), _Wilson_minWorldX = new WeakMap(), _Wilson_maxWorldX = new WeakMap(), _Wilson_minWorldY = new WeakMap(), _Wilson_maxWorldY = new WeakMap(), _Wilson_onResizeCanvasCallback = new WeakMap(), _Wilson_useP3ColorSpace = new WeakMap(), _Wilson_needDraggablesContainerSizeUpdate = new WeakMap(), _Wilson_interactionCallbacks = new WeakMap(), _Wilson_needPanAndZoomUpdate = new WeakMap(), _Wilson_interactionOnPanAndZoom = new WeakMap(), _Wilson_lastInteractionTimes = new WeakMap(), _Wilson_lastInteractionTypes = new WeakMap(), _Wilson_numPreviousVelocities = new WeakMap(), _Wilson_lastVelocityFactors = new WeakMap(), _Wilson_lastPanVelocityX = new WeakMap(), _Wilson_lastPanVelocityY = new WeakMap(), _Wilson_lastZoomVelocity = new WeakMap(), _Wilson_lastPanVelocitiesX = new WeakMap(), _Wilson_lastPanVelocitiesY = new WeakMap(), _Wilson_lastZoomVelocities = new WeakMap(), _Wilson_panVelocityX = new WeakMap(), _Wilson_panVelocityY = new WeakMap(), _Wilson_zoomVelocity = new WeakMap(), _Wilson_panFriction = new WeakMap(), _Wilson_zoomFriction = new WeakMap(), _Wilson_panVelocityThreshold = new WeakMap(), _Wilson_zoomVelocityThreshold = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_currentlyFullscreen = new WeakMap(), _Wilson_fullscreenOldScroll = new WeakMap(), _Wilson_fullscreenCanvasRect = new WeakMap(), _Wilson_fullscreenInitialWindowInnerWidth = new WeakMap(), _Wilson_fullscreenInitialWindowInnerHeight = new WeakMap(), _Wilson_fullscreenFillScreen = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButton = new WeakMap(), _Wilson_fullscreenExitFullscreenButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_draggables = new WeakMap(), _Wilson_draggableDefaultId = new WeakMap(), _Wilson_currentMouseDraggableId = new WeakMap(), _Wilson_useResetButton = new WeakMap(), _Wilson_resetButton = new WeakMap(), _Wilson_resetButtonTimeoutId = new WeakMap(), _Wilson_resetButtonIconPath = new WeakMap(), _Wilson_defaultWorldCenterX = new WeakMap(), _Wilson_defaultWorldCenterY = new WeakMap(), _Wilson_defaultWorldWidth = new WeakMap(), _Wilson_defaultWorldHeight = new WeakMap(), _Wilson_defaultDraggableLocations = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_buttonContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_metaThemeColorElement = new WeakMap(), _Wilson_oldMetaThemeColor = new WeakMap(), _Wilson_salt = new WeakMap(), _Wilson_onResizeWindow = new WeakMap(), _Wilson_handleKeydownEvent = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_currentlyPinching = new WeakMap(), _Wilson_currentlyWheeling = new WeakMap(), _Wilson_currentlyWheelingTimeoutId = new WeakMap(), _Wilson_ignoreTouchendCooldown = new WeakMap(), _Wilson_atMaxWorldSize = new WeakMap(), _Wilson_atMinWorldSize = new WeakMap(), _Wilson_lastInteractionRow = new WeakMap(), _Wilson_lastInteractionCol = new WeakMap(), _Wilson_lastInteractionRow2 = new WeakMap(), _Wilson_lastInteractionCol2 = new WeakMap(), _Wilson_zoomFixedPoint = new WeakMap(), _Wilson_lastPanAndZoomTimestamp = new WeakMap(), _Wilson_animationFrameLoop = new WeakMap(), _Wilson_documentDraggableMousemoveListener = new WeakMap(), _Wilson_documentDraggableMouseupListener = new WeakMap(), _Wilson_preventGestures = new WeakMap(), _Wilson_canvasOldWidth = new WeakMap(), _Wilson_canvasOldWidthStyle = new WeakMap(), _Wilson_canvasOldHeightStyle = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_getDefaultWorldSize = function _Wilson_getDefaultWorldSize() {
    if (__classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") && __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        const windowAspectRatio = window.innerWidth / window.innerHeight;
        const aspectRatioChange = windowAspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        return [
            Math.max(__classPrivateFieldGet(this, _Wilson_defaultWorldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_defaultWorldWidth, "f")),
            Math.max(__classPrivateFieldGet(this, _Wilson_defaultWorldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_defaultWorldHeight, "f")),
        ];
    }
    return [
        __classPrivateFieldGet(this, _Wilson_defaultWorldWidth, "f"),
        __classPrivateFieldGet(this, _Wilson_defaultWorldHeight, "f"),
    ];
}, _Wilson_resizeCanvas = function _Wilson_resizeCanvas(dimensions) {
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
    if (__classPrivateFieldGet(this, _Wilson_lastCanvasWidth, "f") !== __classPrivateFieldGet(this, _Wilson_canvasWidth, "f")
        || __classPrivateFieldGet(this, _Wilson_lastCanvasHeight, "f") !== __classPrivateFieldGet(this, _Wilson_canvasHeight, "f")) {
        this.canvas.setAttribute("width", __classPrivateFieldGet(this, _Wilson_canvasWidth, "f").toString());
        this.canvas.setAttribute("height", __classPrivateFieldGet(this, _Wilson_canvasHeight, "f").toString());
        this.resizeCanvasGL();
        __classPrivateFieldSet(this, _Wilson_lastCanvasWidth, __classPrivateFieldGet(this, _Wilson_canvasWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_lastCanvasHeight, __classPrivateFieldGet(this, _Wilson_canvasHeight, "f"), "f");
        return true;
    }
    return false;
}, _Wilson_zeroVelocities = function _Wilson_zeroVelocities() {
    __classPrivateFieldSet(this, _Wilson_panVelocityX, 0, "f");
    __classPrivateFieldSet(this, _Wilson_panVelocityY, 0, "f");
    __classPrivateFieldSet(this, _Wilson_zoomVelocity, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastPanVelocityX, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastPanVelocityY, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastZoomVelocity, 0, "f");
    __classPrivateFieldSet(this, _Wilson_lastVelocityFactors, Array(__classPrivateFieldGet(this, _Wilson_numPreviousVelocities, "f")).fill(1), "f");
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
    if (this.disallowZooming) {
        return;
    }
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
        __classPrivateFieldSet(this, _Wilson_panVelocityX, __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") + __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesX, "f")[i]
            * __classPrivateFieldGet(this, _Wilson_lastVelocityFactors, "f")[i], "f");
        __classPrivateFieldSet(this, _Wilson_panVelocityY, __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") + __classPrivateFieldGet(this, _Wilson_lastPanVelocitiesY, "f")[i]
            * __classPrivateFieldGet(this, _Wilson_lastVelocityFactors, "f")[i], "f");
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
}, _Wilson_clampWorldCoordinates = function _Wilson_clampWorldCoordinates(hardnessFactor = 1) {
    __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, false, "f");
    __classPrivateFieldSet(this, _Wilson_atMinWorldSize, false, "f");
    const applyFactor = (factor) => {
        if (this.usePanAndZoomRubberbanding) {
            if (__classPrivateFieldGet(this, _Wilson_currentlyPinching, "f")) {
                return;
            }
            factor = Math.pow(factor, (hardnessFactor / this.rubberbandingZoomSoftness)
                / (__classPrivateFieldGet(this, _Wilson_currentlyWheeling, "f") ? 1.5 : 1));
            if (Math.abs(factor - 1) > __classPrivateFieldGet(this, _Wilson_zoomVelocityThreshold, "f")) {
                __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
            }
        }
        __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_worldHeight, "f") * factor, "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_worldWidth, "f") * factor, "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") * factor, "f");
        __classPrivateFieldSet(this, _Wilson_nonFullscreenWorldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") * factor, "f");
    };
    let factor1 = 1;
    let factor2 = 1;
    if (__classPrivateFieldGet(this, _Wilson_worldWidth, "f") < __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f")) {
        factor1 = __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f") / __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
    }
    else if (__classPrivateFieldGet(this, _Wilson_worldWidth, "f") > __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f")) {
        factor1 = __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f") / __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
    }
    if (__classPrivateFieldGet(this, _Wilson_worldHeight, "f") < __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f")) {
        factor2 = __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f") / __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
    }
    else if (__classPrivateFieldGet(this, _Wilson_worldHeight, "f") > __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f")) {
        factor2 = __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f") / __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
    }
    const maxFactor = Math.max(factor1, factor2);
    const minFactor = Math.min(factor1, factor2);
    if (this.clampWorldCoordinatesMode === "both") {
        if (minFactor < 1) {
            applyFactor(minFactor);
            __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, true, "f");
        }
        else if (maxFactor > 1) {
            applyFactor(maxFactor);
            __classPrivateFieldSet(this, _Wilson_atMinWorldSize, true, "f");
        }
    }
    else {
        if (maxFactor < 1) {
            applyFactor(maxFactor);
            __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, true, "f");
        }
        else if (minFactor > 1) {
            applyFactor(minFactor);
            __classPrivateFieldSet(this, _Wilson_atMinWorldSize, true, "f");
        }
    }
    if ((this.usePanAndZoomRubberbanding && !__classPrivateFieldGet(this, _Wilson_currentlyDragging, "f"))
        || !this.usePanAndZoomRubberbanding) {
        const xIncrease = Math.max(__classPrivateFieldGet(this, _Wilson_minWorldX, "f") + __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / 2 - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f"), 0);
        const xDecrease = Math.max(__classPrivateFieldGet(this, _Wilson_worldCenterX, "f") - (__classPrivateFieldGet(this, _Wilson_maxWorldX, "f") - __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / 2), 0);
        const yIncrease = Math.max(__classPrivateFieldGet(this, _Wilson_minWorldY, "f") + __classPrivateFieldGet(this, _Wilson_worldHeight, "f") / 2 - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f"), 0);
        const yDecrease = Math.max(__classPrivateFieldGet(this, _Wilson_worldCenterY, "f") - (__classPrivateFieldGet(this, _Wilson_maxWorldY, "f") - __classPrivateFieldGet(this, _Wilson_worldHeight, "f") / 2), 0);
        let xAdjust = (xIncrease !== 0 && xDecrease !== 0 || __classPrivateFieldGet(this, _Wilson_worldWidth, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f"))
            ? (__classPrivateFieldGet(this, _Wilson_maxWorldX, "f") + __classPrivateFieldGet(this, _Wilson_minWorldX, "f")) / 2 - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")
            : xIncrease - xDecrease;
        let yAdjust = (yIncrease !== 0 && yDecrease !== 0 || __classPrivateFieldGet(this, _Wilson_worldHeight, "f") >= __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f"))
            ? (__classPrivateFieldGet(this, _Wilson_maxWorldY, "f") + __classPrivateFieldGet(this, _Wilson_minWorldY, "f")) / 2 - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")
            : yIncrease - yDecrease;
        if (this.usePanAndZoomRubberbanding) {
            xAdjust /= this.rubberbandingPanSoftness * hardnessFactor;
            yAdjust /= this.rubberbandingPanSoftness * hardnessFactor;
        }
        xAdjust = isNaN(xAdjust) ? 0 : xAdjust;
        yAdjust = isNaN(yAdjust) ? 0 : yAdjust;
        __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") + xAdjust, "f");
        this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") + yAdjust, "f");
        this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        const threshold = __classPrivateFieldGet(this, _Wilson_panVelocityThreshold, "f")
            * Math.min(__classPrivateFieldGet(this, _Wilson_worldWidth, "f"), __classPrivateFieldGet(this, _Wilson_worldHeight, "f"));
        if (this.usePanAndZoomRubberbanding
            && xAdjust ** 2 + yAdjust ** 2 > threshold * threshold) {
            __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
        }
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
    if (Date.now() - __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").grab <= 33
        && __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").grab === "touch") {
        return;
    }
    __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").grab = Date.now();
    __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").grab = "mouse";
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
        __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
    }
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    if (Date.now() - __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").release <= 33
        && __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").grab === "touch") {
        return;
    }
    __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").release = Date.now();
    __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").release = "mouse";
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseup({ x, y, event: e });
}, _Wilson_onMouseenter = function _Wilson_onMouseenter(e) {
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseenter({ x, y, event: e });
}, _Wilson_onMouseleave = function _Wilson_onMouseleave(e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable")) {
        return;
    }
    if (this.useInteractionForPanAndZoom) {
        e.preventDefault();
    }
    if (this.useInteractionForPanAndZoom && __classPrivateFieldGet(this, _Wilson_currentlyDragging, "f")) {
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setPanVelocity).call(this);
        __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
    }
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    __classPrivateFieldSet(this, _Wilson_lastInteractionRow, e.clientY, "f");
    __classPrivateFieldSet(this, _Wilson_lastInteractionCol, e.clientX, "f");
    __classPrivateFieldGet(this, _Wilson_interactionCallbacks, "f").mouseleave({ x, y, event: e });
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
    if (this.disallowZooming) {
        return;
    }
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
    if (Date.now() - __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").grab <= 33
        && __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").grab === "mouse") {
        return;
    }
    __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").grab = Date.now();
    __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").grab = "touch";
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
        __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
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
            __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
        }
        __classPrivateFieldSet(this, _Wilson_currentlyPinching, false, "f");
    }
    if (Date.now() - __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").release <= 33
        && __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").grab === "mouse") {
        return;
    }
    __classPrivateFieldGet(this, _Wilson_lastInteractionTimes, "f").release = Date.now();
    __classPrivateFieldGet(this, _Wilson_lastInteractionTypes, "f").release = "touch";
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
    if (this.disallowZooming) {
        return;
    }
    if (!this.usePanAndZoomRubberbanding && (scale > 1 && __classPrivateFieldGet(this, _Wilson_atMaxWorldSize, "f")
        || scale < 1 && __classPrivateFieldGet(this, _Wilson_atMinWorldSize, "f"))) {
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
    if (this.useInteractionForPanAndZoom && !this.disallowZooming) {
        e.preventDefault();
    }
    const [x, y] = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_interpolatePageToWorld).call(this, [e.clientY, e.clientX]);
    if (this.useInteractionForPanAndZoom) {
        __classPrivateFieldSet(this, _Wilson_zoomFixedPoint, [x, y], "f");
        if (Math.abs(e.deltaY) < 40
            || __classPrivateFieldGet(this, _Wilson_currentlyWheeling, "f") && Math.abs(e.deltaY) < 90) {
            const sigmoided = 60 * (2 / (1 + Math.pow(1.035, -e.deltaY)) - 1);
            const scale = 1 + sigmoided * 0.005;
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zoomCanvas).call(this, scale);
        }
        else {
            __classPrivateFieldSet(this, _Wilson_zoomVelocity, Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") + Math.sign(e.deltaY) * 15, -30), 30), "f");
        }
    }
    __classPrivateFieldSet(this, _Wilson_currentlyWheeling, true, "f");
    if (__classPrivateFieldGet(this, _Wilson_currentlyWheelingTimeoutId, "f") !== -1) {
        clearTimeout(__classPrivateFieldGet(this, _Wilson_currentlyWheelingTimeoutId, "f"));
    }
    __classPrivateFieldSet(this, _Wilson_currentlyWheelingTimeoutId, setTimeout(() => {
        __classPrivateFieldSet(this, _Wilson_currentlyWheeling, false, "f");
        __classPrivateFieldSet(this, _Wilson_currentlyWheelingTimeoutId, -1, "f");
        __classPrivateFieldSet(this, _Wilson_needPanAndZoomUpdate, true, "f");
    }, 50), "f");
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
        canvas.addEventListener("mouseenter", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onMouseenter).call(this, e));
        canvas.addEventListener("mouseleave", (e) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_onMouseleave).call(this, e));
    }
}, _Wilson_initDraggables = function _Wilson_initDraggables() {
    document.documentElement.addEventListener("mousemove", __classPrivateFieldGet(this, _Wilson_documentDraggableMousemoveListener, "f"));
    document.documentElement.addEventListener("mouseup", __classPrivateFieldGet(this, _Wilson_documentDraggableMouseupListener, "f"));
}, _Wilson_setDraggables = function _Wilson_setDraggables(draggables, showResetButton) {
    var _a;
    for (const [id, location] of Object.entries(draggables)) {
        const [x, y] = location;
        //First convert to page coordinates.
        const uncappedRow = __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5)
            + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        __classPrivateFieldSet(this, _Wilson_draggableDefaultId, (_a = __classPrivateFieldGet(this, _Wilson_draggableDefaultId, "f"), _a++, _a), "f");
        if (!__classPrivateFieldGet(this, _Wilson_draggables, "f")[id]) {
            const element = document.createElement("div");
            element.classList.add("WILSON_draggable");
            element.id = `WILSON_draggable-${id}`;
            element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
            element.addEventListener("mousedown", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMousedown).call(this, e, id));
            element.addEventListener("mouseup", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMouseup).call(this, e, id));
            element.addEventListener("mousemove", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnMousemove).call(this, e, id));
            element.addEventListener("touchstart", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnTouchstart).call(this, e, id));
            element.addEventListener("touchend", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnTouchend).call(this, e, id));
            element.addEventListener("touchmove", e => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_draggableOnTouchmove).call(this, e, id));
            __classPrivateFieldGet(this, _Wilson_draggablesContainer, "f").appendChild(element);
            __classPrivateFieldGet(this, _Wilson_draggables, "f")[id] = {
                element,
                location: [x, y],
                currentlyDragging: false,
            };
            this.draggables[id] = {
                element,
                location: [x, y],
                currentlyDragging: false,
            };
            __classPrivateFieldGet(this, _Wilson_defaultDraggableLocations, "f")[id] = [x, y];
        }
        else {
            __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location = [x, y];
            this.draggables[id].location = [x, y];
            const element = __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].element;
            element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
            if (showResetButton) {
                this.showResetButton();
            }
        }
    }
}, _Wilson_draggableOnMousedown = function _Wilson_draggableOnMousedown(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldSet(this, _Wilson_currentMouseDraggableId, id, "f");
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = true;
    this.draggables[id].currentlyDragging = true;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").grab({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
        y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
        event: e,
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
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").release({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
        y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
        event: e,
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
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").drag({
        id,
        x,
        y,
        xDelta: x - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
        yDelta: y - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
        event: e,
    });
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location = [x, y];
    this.draggables[id].location = [x, y];
    this.showResetButton();
}, _Wilson_draggableOnTouchstart = function _Wilson_draggableOnTouchstart(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = true;
    this.draggables[id].currentlyDragging = true;
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").grab({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
        y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
        event: e,
    });
}, _Wilson_draggableOnTouchend = function _Wilson_draggableOnTouchend(e, id) {
    if (__classPrivateFieldGet(this, _Wilson_draggablesStatic, "f")) {
        return;
    }
    e.preventDefault();
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].currentlyDragging = false;
    this.draggables[id].currentlyDragging = false;
    __classPrivateFieldSet(this, _Wilson_currentlyDragging, false, "f");
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").release({
        id,
        x: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
        y: __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
        event: e,
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
    __classPrivateFieldGet(this, _Wilson_draggableCallbacks, "f").drag({
        id,
        x,
        y,
        xDelta: x - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[0],
        yDelta: y - __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location[1],
        event: e,
    });
    __classPrivateFieldGet(this, _Wilson_draggables, "f")[id].location = [x, y];
    this.draggables[id].location = [x, y];
    this.showResetButton();
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
        const uncappedRow = __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedHeight, "f") * (1 - ((y - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_worldHeight, "f") + .5)) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const uncappedCol = __classPrivateFieldGet(this, _Wilson_draggablesContainerRestrictedWidth, "f") * ((x - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_worldWidth, "f") + .5) + __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f");
        const row = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedRow), __classPrivateFieldGet(this, _Wilson_draggablesContainerHeight, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        const col = Math.min(Math.max(__classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"), uncappedCol), __classPrivateFieldGet(this, _Wilson_draggablesContainerWidth, "f") - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f"));
        element.style.transform = `translate(${col - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px, ${row - __classPrivateFieldGet(this, _Wilson_draggablesRadius, "f")}px)`;
    }
}, _Wilson_initFullscreen = function _Wilson_initFullscreen() {
    if (__classPrivateFieldGet(this, _Wilson_fullscreenUseButton, "f")) {
        __classPrivateFieldSet(this, _Wilson_fullscreenEnterFullscreenButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").classList.add("WILSON_enter-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_buttonContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f"));
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").appendChild(img);
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").addEventListener("click", () => {
            this.enterFullscreen();
        });
        __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").classList.add("WILSON_exit-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_buttonContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f"));
        const img2 = document.createElement("img");
        img2.src = __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButtonIconPath, "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").appendChild(img2);
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").addEventListener("click", () => {
            this.exitFullscreen();
        });
    }
}, _Wilson_initResetButton = function _Wilson_initResetButton() {
    if (__classPrivateFieldGet(this, _Wilson_useResetButton, "f")) {
        __classPrivateFieldSet(this, _Wilson_resetButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_resetButton, "f").classList.add("WILSON_reset-button");
        __classPrivateFieldGet(this, _Wilson_buttonContainer, "f").appendChild(__classPrivateFieldGet(this, _Wilson_resetButton, "f"));
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _Wilson_resetButtonIconPath, "f");
        __classPrivateFieldGet(this, _Wilson_resetButton, "f").appendChild(img);
        __classPrivateFieldGet(this, _Wilson_resetButton, "f").addEventListener("click", () => {
            this.reset();
        });
    }
}, _Wilson_enterFullscreen = function _Wilson_enterFullscreen() {
    __classPrivateFieldSet(this, _Wilson_currentlyFullscreen, true, "f");
    this.currentlyFullscreen = __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f");
    __classPrivateFieldSet(this, _Wilson_fullscreenInitialWindowInnerWidth, window.innerWidth, "f");
    __classPrivateFieldSet(this, _Wilson_fullscreenInitialWindowInnerHeight, window.innerHeight, "f");
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
    this.onSwitchFullscreen(true);
    setTimeout(() => {
        __classPrivateFieldSet(this, _Wilson_fullscreenInitialWindowInnerWidth, window.innerWidth, "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenInitialWindowInnerHeight, window.innerHeight, "f");
    }, 100);
}, _Wilson_addEnterFullscreenFillScreenTransitionStyle = function _Wilson_addEnterFullscreenFillScreenTransitionStyle() {
    const canvasRect = this.canvas.getBoundingClientRect();
    __classPrivateFieldSet(this, _Wilson_fullscreenCanvasRect, canvasRect, "f");
    // The old canvas snaps to being as large as possible, so we correct it.
    const windowAspectRatio = window.innerWidth / window.innerHeight;
    const scaleStart = windowAspectRatio >= __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")
        ? canvasRect.height / window.innerHeight
        : canvasRect.width / window.innerWidth;
    const scaleEnd = windowAspectRatio >= __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")
        ? window.innerHeight / (window.innerWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"))
        : 1;
    const oldWidthEnd = Math.min(window.innerWidth, window.innerHeight * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"));
    const oldHeightEnd = Math.min(window.innerHeight, window.innerWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"));
    const oldLeftEnd = (window.innerWidth - oldWidthEnd) / 2;
    const oldTopEnd = (window.innerHeight - oldHeightEnd) / 2;
    // Position the center of the new canvas over the old one.
    const newTopStart = canvasRect.top - (window.innerHeight * scaleStart - canvasRect.height) / 2;
    const newLeftStart = canvasRect.left - (window.innerWidth * scaleStart - canvasRect.width) / 2;
    const temporaryStyle = /* css */ `
			@keyframes WILSON_move-out
			{
				from
				{
					transform: translate(${__classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").left}px, ${__classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").top}px) scale(${scaleStart * scaleEnd});
					transform-origin: top left;
					opacity: 1;
				}

				to
				{
					transform: translate(${oldLeftEnd}px, ${oldTopEnd}px) scale(${scaleEnd});
					transform-origin: top left;
					opacity: 0;
				}
			}

			@keyframes WILSON_move-in
			{
				from
				{
					transform: translate(${newLeftStart}px, ${newTopStart}px) scale(${scaleStart});
					transform-origin: top left;
					opacity: 0;
				}

				to
				{
					transform: translate(0px, 0px) scale(1);
					transform-origin: top left;
					opacity: 1;
				}
			}
			
			::view-transition-group(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation: none;
			}

			::view-transition-old(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation-name: WILSON_move-out;
				mix-blend-mode: plus-lighter;
			}

			::view-transition-new(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation-name: WILSON_move-in;
				mix-blend-mode: plus-lighter;
			}
		`;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = temporaryStyle;
    document.head.appendChild(styleElement);
    return styleElement;
}, _Wilson_exitFullscreen = function _Wilson_exitFullscreen(resetMetaThemeColor = true) {
    __classPrivateFieldSet(this, _Wilson_currentlyFullscreen, false, "f");
    this.currentlyFullscreen = __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f");
    if (__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f"), "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f"), "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
    }
    if (__classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f") && resetMetaThemeColor) {
        if (!__classPrivateFieldGet(this, _Wilson_oldMetaThemeColor, "f")) {
            __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").removeAttribute("content");
        }
        else if (__classPrivateFieldGet(this, _Wilson_oldMetaThemeColor, "f") !== "#000000") {
            __classPrivateFieldGet(this, _Wilson_metaThemeColorElement, "f").setAttribute("content", __classPrivateFieldGet(this, _Wilson_oldMetaThemeColor, "f"));
        }
    }
    __classPrivateFieldGet(this, _Wilson_fullscreenContainerLocation, "f").appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f"));
    this.canvas.classList.remove("WILSON_fullscreen");
    __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").classList.remove("WILSON_fullscreen");
    __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.remove("WILSON_fullscreen");
    document.documentElement.style.userSelect = "auto";
    document.removeEventListener("gesturestart", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    document.removeEventListener("gesturechange", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    document.removeEventListener("gestureend", __classPrivateFieldGet(this, _Wilson_preventGestures, "f"));
    if (__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")) {
        __classPrivateFieldGet(this, _Wilson_fullscreenContainer, "f").classList.remove("WILSON_fullscreen-fill-screen");
        if (__classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_resizeCanvas).call(this, { width: __classPrivateFieldGet(this, _Wilson_canvasOldWidth, "f") })) {
            __classPrivateFieldGet(this, _Wilson_onResizeCanvasCallback, "f").call(this);
        }
    }
    this.canvas.style.width = __classPrivateFieldGet(this, _Wilson_canvasOldWidthStyle, "f");
    this.canvas.style.height = __classPrivateFieldGet(this, _Wilson_canvasOldHeightStyle, "f");
    __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
    this.onSwitchFullscreen(false);
    // When there are multiple Wilson instances on the same page,
    // one of them might incorrectly try to scroll back to 0.
    if (__classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f") && this.fullscreenRestoreScroll) {
        window.scrollTo(0, __classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f"));
        setTimeout(() => window.scrollTo(0, __classPrivateFieldGet(this, _Wilson_fullscreenOldScroll, "f")), 10);
    }
}, _Wilson_addExitFullscreenFillScreenTransitionStyle = function _Wilson_addExitFullscreenFillScreenTransitionStyle() {
    // This one starts aligned to the shrunk canvas, so we have to undo the transforms
    // in weird ways.
    const oldLeftStart = -__classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").left;
    const oldTopStart = -__classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").top;
    const windowAspectRatio = window.innerWidth / window.innerHeight;
    const scaleStart = __classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").width / window.innerWidth;
    const scaleEnd = windowAspectRatio >= __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f")
        ? window.innerHeight / (window.innerWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"))
        : 1;
    const oldWidthEnd = window.innerWidth * scaleStart / scaleEnd;
    const oldHeightEnd = window.innerHeight * scaleStart / scaleEnd;
    const oldLeftEnd = (__classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").width - oldWidthEnd) / 2;
    const oldTopEnd = (__classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").height - oldHeightEnd) / 2;
    const newWidthStart = Math.min(window.innerWidth, window.innerHeight * __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"));
    const newHeightStart = Math.min(window.innerHeight, window.innerWidth / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f"));
    const newLeftStart = (window.innerWidth - newWidthStart) / 2 - __classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").left;
    const newTopStart = (window.innerHeight - newHeightStart) / 2 - __classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").top;
    const temporaryStyle = /* css */ `
			@keyframes WILSON_move-out-${__classPrivateFieldGet(this, _Wilson_salt, "f")}
			{
				from
				{
					transform: translate(${oldLeftStart}px, ${oldTopStart}px) scale(${1 / scaleStart});
					transform-origin: top left;
					opacity: 1;
				}

				to
				{
					transform: translate(${oldLeftEnd}px, ${oldTopEnd}px) scale(${1 / scaleEnd});
					transform-origin: top left;
					opacity: 0;
				}
			}

			@keyframes WILSON_move-in-${__classPrivateFieldGet(this, _Wilson_salt, "f")}
			{
				from
				{
					transform: translate(${newLeftStart}px, ${newTopStart}px) scale(${scaleEnd / scaleStart});
					transform-origin: top left;
					opacity: 0;
				}

				to
				{
					transform: translate(0px, 0px) scale(1);
					transform-origin: top left;
					opacity: 1;
				}
			}
			
			::view-transition-group(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation: none;
			}

			::view-transition-old(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation-name: WILSON_move-out-${__classPrivateFieldGet(this, _Wilson_salt, "f")};
				mix-blend-mode: plus-lighter;
			}

			::view-transition-new(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation-name: WILSON_move-in-${__classPrivateFieldGet(this, _Wilson_salt, "f")};
				mix-blend-mode: plus-lighter;
			}
		`;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = temporaryStyle;
    document.head.appendChild(styleElement);
    return styleElement;
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
        var _a;
        super(canvas, options);
        const colorSpace = (this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
            ? "display-p3"
            : "srgb";
        const willReadFrequently = (_a = options.willReadFrequently) !== null && _a !== void 0 ? _a : false;
        const ctx = this.canvas.getContext("2d", {
            colorSpace,
            willReadFrequently,
        });
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
                if (this.verbose) {
                    console.error(`[Wilson] Could not create a blob from a canvas with ID ${this.canvas.id}`);
                }
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
    intArray: (gl, location, value) => gl.uniform1iv(location, value),
    floatArray: (gl, location, value) => gl.uniform1fv(location, value),
    vec2Array: (gl, location, value) => gl.uniform2fv(location, value.flat()),
    vec3Array: (gl, location, value) => gl.uniform3fv(location, value.flat()),
    vec4Array: (gl, location, value) => gl.uniform4fv(location, value.flat()),
    mat2: (gl, location, value) => gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]),
    mat3: (gl, location, value) => gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]),
    mat4: (gl, location, value) => gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]),
};
export class WilsonGL extends Wilson {
    constructor(canvas, options) {
        var _a, _b, _c;
        super(canvas, options);
        _WilsonGL_useWebGL2.set(this, void 0);
        _WilsonGL_shaderPrograms.set(this, {});
        _WilsonGL_shaderProgramSources.set(this, {});
        _WilsonGL_uniforms.set(this, {});
        _WilsonGL_numShaders.set(this, 0);
        _WilsonGL_currentShaderId.set(this, "0");
        _WilsonGL_framebuffers.set(this, {});
        _WilsonGL_textures.set(this, {});
        this.resizeCanvasGL = () => {
            this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
        };
        __classPrivateFieldSet(this, _WilsonGL_useWebGL2, (_a = options.useWebGL2) !== null && _a !== void 0 ? _a : true, "f");
        const gl = __classPrivateFieldGet(this, _WilsonGL_useWebGL2, "f")
            ? (_b = canvas.getContext("webgl2")) !== null && _b !== void 0 ? _b : canvas.getContext("webgl")
            : canvas.getContext("webgl");
        if (!gl) {
            throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
        }
        this.gl = gl;
        this.gl.getExtension("KHR_parallel_shader_compile");
        if (this.gl instanceof WebGL2RenderingContext
            && !this.gl.getExtension("EXT_color_buffer_float")
            && this.verbose) {
            console.warn("[Wilson] No support for float textures.");
        }
        else if (this.gl instanceof WebGLRenderingContext
            && !this.gl.getExtension("OES_texture_float")
            && this.verbose) {
            console.warn("[Wilson] No support for float textures.");
        }
        if ("drawingBufferColorSpace" in this.gl && this.useP3ColorSpace) {
            this.gl.drawingBufferColorSpace = "display-p3";
        }
        if ("shader" in options) {
            this.loadShader({
                shader: options.shader,
                uniforms: options.uniforms,
            });
        }
        else if ("shaders" in options) {
            for (const [id, shader] of Object.entries(options.shaders)) {
                this.loadShader({
                    id,
                    shader,
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
    loadShader({ id = __classPrivateFieldGet(this, _WilsonGL_numShaders, "f").toString(), shader, uniforms = {} }) {
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
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragShader) {
            throw new Error(`[Wilson] Couldn't create shader: ${vertexShader}, ${fragShader}`);
        }
        const shaderProgram = this.gl.createProgram();
        if (!shaderProgram) {
            throw new Error(`[Wilson] Couldn't create shader program. Full shader source: ${shader}`);
        }
        __classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id] = shaderProgram;
        __classPrivateFieldGet(this, _WilsonGL_shaderProgramSources, "f")[id] = shader;
        this.gl.attachShader(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id], vertexShader);
        this.gl.attachShader(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id], fragShader);
        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.shaderSource(fragShader, shader);
        this.gl.compileShader(vertexShader);
        this.gl.compileShader(fragShader);
        this.gl.linkProgram(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id]);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            throw new Error(`[Wilson] Couldn't link shader program: ${this.gl.getProgramInfoLog(shaderProgram)}. Full shader source: ${shader}`);
        }
        this.useShader(id);
        const positionBuffer = this.gl.createBuffer();
        if (!positionBuffer) {
            throw new Error(`[Wilson] Couldn't create position buffer. Full shader source: ${shader}`);
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        const quad = [
            -1, -1, 0,
            -1, 1, 0,
            1, -1, 0,
            1, 1, 0
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(quad), this.gl.STATIC_DRAW);
        const positionAttribute = this.gl.getAttribLocation(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id], "position");
        if (positionAttribute === -1) {
            throw new Error(`[Wilson] Couldn't get position attribute. Full shader source: ${shader}`);
        }
        this.gl.enableVertexAttribArray(positionAttribute);
        this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
        // Initialize the uniforms.
        __classPrivateFieldGet(this, _WilsonGL_uniforms, "f")[id] = {};
        for (const [name, value] of Object.entries(uniforms)) {
            const location = this.gl.getUniformLocation(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id], name);
            if (location === null) {
                if (this.verbose) {
                    console.warn(`[Wilson] Couldn't get uniform location for ${name} in shader "${id}". Check that it is used in the shader (so that it is not compiled away).`);
                }
                continue;
            }
            // Match strings like "uniform int foo;" to "int".
            const match = shader.match(new RegExp(`uniform\\s+(\\S+?)\\s+${name}(\\[\\d+\\])?\\s*;`));
            if (!match) {
                throw new Error(`[Wilson] Couldn't find uniform ${name} in shader source: ${shader}`);
            }
            const type = match[1].trim() + (match[2] ? "Array" : "");
            if (!(type in uniformFunctions)) {
                throw new Error(`[Wilson] Invalid uniform type ${type} for uniform ${name} in shader source: ${shader}`);
            }
            __classPrivateFieldGet(this, _WilsonGL_uniforms, "f")[id][name] = { location, type: type };
            this.setUniforms({ [name]: value });
        }
    }
    setUniforms(uniforms, shader = __classPrivateFieldGet(this, _WilsonGL_currentShaderId, "f")) {
        this.gl.useProgram(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[shader]);
        for (const [name, value] of Object.entries(uniforms)) {
            if (__classPrivateFieldGet(this, _WilsonGL_uniforms, "f")[shader][name] === undefined) {
                continue;
            }
            const { location, type } = __classPrivateFieldGet(this, _WilsonGL_uniforms, "f")[shader][name];
            const uniformFunction = uniformFunctions[type];
            __classPrivateFieldGet(this, _WilsonGL_uniforms, "f")[shader][name].value = value;
            uniformFunction(this.gl, location, value);
        }
        this.gl.useProgram(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[__classPrivateFieldGet(this, _WilsonGL_currentShaderId, "f")]);
    }
    useShader(id) {
        __classPrivateFieldSet(this, _WilsonGL_currentShaderId, id, "f");
        this.gl.useProgram(__classPrivateFieldGet(this, _WilsonGL_shaderPrograms, "f")[id]);
    }
    createFramebufferTexturePair({ id, width = this.canvasWidth, height = this.canvasHeight, textureType }) {
        if (textureType !== "unsignedByte" && textureType !== "float") {
            throw new Error(`[Wilson] Invalid texture type "${textureType}".`);
        }
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
        __classPrivateFieldGet(this, _WilsonGL_framebuffers, "f")[id] = framebuffer;
        __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id] = {
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
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, __classPrivateFieldGet(this, _WilsonGL_framebuffers, "f")[id]);
    }
    useTexture(id) {
        if (id === null) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            return;
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].texture);
    }
    setTexture({ id, data, }) {
        if (!__classPrivateFieldGet(this, _WilsonGL_textures, "f")[id]) {
            throw new Error(`[Wilson] Tried to set a texture with id ${id}, but it doesn't exist.`);
        }
        if ((data instanceof Uint8Array && __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].type !== "unsignedByte")
            || (data instanceof Float32Array && __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].type !== "float")) {
            throw new Error(`[Wilson] Tried to set a texture with id ${id}, but the data type does not match the texture type (the data type should be a ${__classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].type === 'unsignedByte' ? 'Uint8Array' : 'Float32Array'}).`);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].texture);
        if (data === null || data instanceof Uint8Array || data instanceof Float32Array) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, (__classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].type === "float" && this.gl instanceof WebGL2RenderingContext)
                ? this.gl.RGBA32F
                : this.gl.RGBA, __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].width, __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].height, 0, this.gl.RGBA, __classPrivateFieldGet(this, _WilsonGL_textures, "f")[id].type === "float"
                ? this.gl.FLOAT
                : this.gl.UNSIGNED_BYTE, data);
        }
        else {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        }
    }
    readPixels(options) {
        const defaultOptions = {
            row: 0,
            col: 0,
            height: this.canvasHeight,
            width: this.canvasWidth,
            format: "unsignedByte",
        };
        const { row, col, height, width, format } = { ...defaultOptions, ...(options !== null && options !== void 0 ? options : {}) };
        const pixels = format === "float"
            ? new Float32Array(width * height * 4)
            : new Uint8Array(width * height * 4);
        this.gl.readPixels(col, row, width, height, this.gl.RGBA, format === "float"
            ? this.gl.FLOAT
            : this.gl.UNSIGNED_BYTE, pixels);
        return pixels;
    }
    downloadFrame(filename, drawNewFrame = true) {
        if (drawNewFrame) {
            this.drawFrame();
        }
        this.canvas.toBlob((blob) => {
            if (!blob) {
                console.error("[Wilson] Could not create a canvas blob");
                return;
            }
            const link = document.createElement("a");
            link.download = filename;
            link.href = window.URL.createObjectURL(blob);
            link.click();
            link.remove();
        });
    }
    async readHighResPixels({ resolution = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight)), uniforms = {}, format = "unsignedByte", }) {
        const workerCode = `${""}
			const uniformFunctions = {
				int: (
					gl,
					location,
					value,
				) => gl.uniform1i(location, value),
				
				float: (
					gl,
					location,
					value,
				) => gl.uniform1f(location, value),
				
				vec2: (
					gl,
					location,
					value,
				) => gl.uniform2fv(location, value),

				vec3: (
					gl,
					location,
					value,
				) => gl.uniform3fv(location, value),
				
				vec4: (
					gl,
					location,
					value,
				) => gl.uniform4fv(location, value),

				intArray: (
					gl,
					location,
					value,
				) => gl.uniform1iv(location, value),
				
				floatArray: (
					gl,
					location,
					value,
				) => gl.uniform1fv(location, value),
				
				vec2Array: (
					gl,
					location,
					value,
				) => gl.uniform2fv(location, value.flat()),

				vec3Array: (
					gl,
					location,
					value,
				) => gl.uniform3fv(location, value.flat()),
				
				vec4Array: (
					gl,
					location,
					value,
				) => gl.uniform4fv(location, value.flat()),

				mat2: (
					gl,
					location,
					value,
				) => gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]),
				
				mat3: (
					gl,
					location,
					value,
				) => gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]),
				
				mat4: (
					gl,
					location,
					value,
				) => gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]),
			};

			self.addEventListener("message", (event) => 
			{
				const { offscreen, canvasWidth, canvasHeight, shader, uniforms, options } = event.data;

				const gl = options.useWebGL2
					? offscreen.getContext("webgl2") ?? offscreen.getContext("webgl")
					: offscreen.getContext("webgl");

				if (!gl)
				{
					throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
				}

				gl.getExtension("KHR_parallel_shader_compile");

				if (
					gl instanceof WebGL2RenderingContext
					&& !gl.getExtension("EXT_color_buffer_float")
				) {
					// No support for float textures.
				}

				else if (
					gl instanceof WebGLRenderingContext
					&& !gl.getExtension("OES_texture_float")
				) {
					// No support for float textures.
				}

				if ("drawingBufferColorSpace" in gl && options.useP3ColorSpace)
				{
					gl.drawingBufferColorSpace = "display-p3";
				}

				const vertexShaderSource = \`
					attribute vec3 position;
					varying vec2 uv;

					void main(void)
					{
						gl_Position = vec4(position, 1.0);

						// !!!IMPORTANT!!!
						// Flip the y coordinate because WebGL's coordinate system is different from the one used by ctx, and this is the fastest way to fix that.
						uv = vec2(position.x, -position.y);
					}
				\`;

				const vertexShader = gl.createShader(gl.VERTEX_SHADER);
				const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

				const shaderProgram = gl.createProgram();

				gl.attachShader(shaderProgram, vertexShader);
				gl.attachShader(shaderProgram, fragShader);

				gl.shaderSource(vertexShader, vertexShaderSource);
				gl.shaderSource(fragShader, shader);

				gl.compileShader(vertexShader);
				gl.compileShader(fragShader);

				gl.linkProgram(shaderProgram);

				gl.useProgram(shaderProgram);

				const positionBuffer = gl.createBuffer();

				gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

				const quad = [
					-1, -1, 0,
					-1,  1, 0,
					1, -1, 0,
					1,  1, 0
				];
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quad), gl.STATIC_DRAW);

				const positionAttribute = gl.getAttribLocation(shaderProgram, "position");

				gl.enableVertexAttribArray(positionAttribute);
				gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 0, 0);
				gl.viewport(0, 0, canvasWidth, canvasHeight);

				for (const [name, data] of Object.entries(uniforms))
				{
					const location = gl.getUniformLocation(shaderProgram, name);
					const type = data.type;
					const uniformFunction = uniformFunctions[type];
					uniformFunction(gl, location, data.value);
				}



				const framebuffer = gl.createFramebuffer();

				const texture = gl.createTexture();

				gl.bindTexture(gl.TEXTURE_2D, texture);

				gl.texImage2D(
					gl.TEXTURE_2D,
					0,
					(${format === "float"} && gl instanceof WebGL2RenderingContext)
						? gl.RGBA32F
						: gl.RGBA,
					canvasWidth,
					canvasHeight,
					0,
					gl.RGBA,
					${format === "float"}
						? gl.FLOAT
						: gl.UNSIGNED_BYTE,
					null
				);

			

				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

				gl.disable(gl.DEPTH_TEST);

				gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

				gl.framebufferTexture2D(
					gl.FRAMEBUFFER,
					gl.COLOR_ATTACHMENT0,
					gl.TEXTURE_2D,
					texture,
					0
				);

				gl.bindTexture(gl.TEXTURE_2D, null);



				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

				gl.finish();
			
				const pixels = new ${format === "float" ? "Float32Array" : "Uint8Array"}(canvasWidth * canvasHeight * 4);
				gl.readPixels(0, 0, canvasWidth, canvasHeight, gl.RGBA, ${format === "float" ? "gl.FLOAT" : "gl.UNSIGNED_BYTE"}, pixels);

				self.postMessage({
					type: "frame-ready",
					pixels,
				});
			});
		`;
        const blob = new Blob([workerCode], { type: "application/javascript" });
        const workerUrl = URL.createObjectURL(blob);
        const worker = new Worker(workerUrl);
        const canvasWidth = Math.round(Math.sqrt(resolution * resolution * this.canvasWidth / this.canvasHeight));
        const canvasHeight = Math.round(Math.sqrt(resolution * resolution * this.canvasHeight / this.canvasWidth));
        let resolve;
        const promise = new Promise((r) => (resolve = r));
        worker.addEventListener("message", (event) => {
            if (event.data.type === "frame-ready") {
                const { pixels } = event.data;
                resolve({
                    pixels,
                    width: canvasWidth,
                    height: canvasHeight,
                });
            }
        });
        // Clean up the blob URL
        URL.revokeObjectURL(workerUrl);
        const offscreen = new OffscreenCanvas(canvasWidth, canvasHeight);
        const uniformData = {};
        for (const [name, data] of Object.entries(__classPrivateFieldGet(this, _WilsonGL_uniforms, "f")[__classPrivateFieldGet(this, _WilsonGL_currentShaderId, "f")])) {
            uniformData[name] = {
                type: data.type,
                value: data.value,
            };
        }
        for (const [name, value] of Object.entries(uniforms)) {
            uniformData[name].value = value;
        }
        worker.postMessage({
            offscreen,
            shader: __classPrivateFieldGet(this, _WilsonGL_shaderProgramSources, "f")[__classPrivateFieldGet(this, _WilsonGL_currentShaderId, "f")],
            uniforms: uniformData,
            canvasWidth,
            canvasHeight,
            options: {
                useWebGL2: __classPrivateFieldGet(this, _WilsonGL_useWebGL2, "f"),
                useP3ColorSpace: this.useP3ColorSpace,
            }
        }, [offscreen]);
        return promise;
    }
    async downloadHighResFrame(filename, resolution = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight)), uniforms = {}) {
        const { pixels, width, height } = await this.readHighResPixels({
            resolution,
            uniforms,
        });
        const imageData = new ImageData(new Uint8ClampedArray(pixels), width);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            if (this.verbose) {
                console.error("[Wilson] Could not get 2d context for canvas");
            }
            return;
        }
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
            if (!blob) {
                if (this.verbose) {
                    console.error("[Wilson] Could not create a canvas blob");
                }
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
_WilsonGL_useWebGL2 = new WeakMap(), _WilsonGL_shaderPrograms = new WeakMap(), _WilsonGL_shaderProgramSources = new WeakMap(), _WilsonGL_uniforms = new WeakMap(), _WilsonGL_numShaders = new WeakMap(), _WilsonGL_currentShaderId = new WeakMap(), _WilsonGL_framebuffers = new WeakMap(), _WilsonGL_textures = new WeakMap();
const gpuTypeData = {
    // ============================================
    // SCALAR TYPES
    // ============================================
    "f32": { size: 4, alignment: 4, baseType: "float", isScalar: true },
    "i32": { size: 4, alignment: 4, baseType: "int", isScalar: true },
    "u32": { size: 4, alignment: 4, baseType: "uint", isScalar: true },
    "bool": { size: 4, alignment: 4, baseType: "uint", isScalar: true }, // Bools are stored as 32-bit in buffers
    // ============================================
    // VECTOR TYPES - f32
    // ============================================
    "vec2<f32>": { size: 8, alignment: 8, baseType: "float", vectorSize: 2 },
    "vec3<f32>": { size: 12, alignment: 16, baseType: "float", vectorSize: 3 }, // Note: vec3 aligns to 16!
    "vec4<f32>": { size: 16, alignment: 16, baseType: "float", vectorSize: 4 },
    // ============================================
    // VECTOR TYPES - i32
    // ============================================
    "vec2<i32>": { size: 8, alignment: 8, baseType: "int", vectorSize: 2 },
    "vec3<i32>": { size: 12, alignment: 16, baseType: "int", vectorSize: 3 },
    "vec4<i32>": { size: 16, alignment: 16, baseType: "int", vectorSize: 4 },
    // ============================================
    // VECTOR TYPES - u32
    // ============================================
    "vec2<u32>": { size: 8, alignment: 8, baseType: "uint", vectorSize: 2 },
    "vec3<u32>": { size: 12, alignment: 16, baseType: "uint", vectorSize: 3 },
    "vec4<u32>": { size: 16, alignment: 16, baseType: "uint", vectorSize: 4 },
    // ============================================
    // MATRIX TYPES - f32 (Square)
    // ============================================
    // Matrices are column-major: matCxR = C columns, R rows
    // Size = columns * stride(column_type)
    // Alignment = alignment(column_type)
    "mat2x2<f32>": { size: 16, alignment: 8, baseType: "float", matrixSize: [2, 2] }, // 2 cols of vec2<f32>, stride 8
    "mat3x3<f32>": { size: 48, alignment: 16, baseType: "float", matrixSize: [3, 3] }, // 3 cols of vec3<f32>, stride 16
    "mat4x4<f32>": { size: 64, alignment: 16, baseType: "float", matrixSize: [4, 4] }, // 4 cols of vec4<f32>, stride 16
    // ============================================
    // MATRIX TYPES - f32 (Non-square)
    // ============================================
    // Format: matCxR where C = columns, R = rows
    // 2 columns (different row counts)
    "mat2x3<f32>": { size: 32, alignment: 16, baseType: "float", matrixSize: [2, 3] }, // 2 cols of vec3<f32>, stride 16
    "mat2x4<f32>": { size: 32, alignment: 16, baseType: "float", matrixSize: [2, 4] }, // 2 cols of vec4<f32>, stride 16
    // 3 columns (different row counts)
    "mat3x2<f32>": { size: 24, alignment: 8, baseType: "float", matrixSize: [3, 2] }, // 3 cols of vec2<f32>, stride 8
    "mat3x4<f32>": { size: 48, alignment: 16, baseType: "float", matrixSize: [3, 4] }, // 3 cols of vec4<f32>, stride 16
    // 4 columns (different row counts)
    "mat4x2<f32>": { size: 32, alignment: 8, baseType: "float", matrixSize: [4, 2] }, // 4 cols of vec2<f32>, stride 8
    "mat4x3<f32>": { size: 64, alignment: 16, baseType: "float", matrixSize: [4, 3] }, // 4 cols of vec4<f32>, stride 16
};
export class WilsonGPU extends Wilson {
    constructor(canvas, options) {
        super(canvas, options);
        _WilsonGPU_instances.add(this);
        _WilsonGPU_uniformData.set(this, {});
        _WilsonGPU_uniformBuffer.set(this, void 0);
        _WilsonGPU_uniformBufferSize.set(this, 0);
        // Todo: shouldn't be recreating the buffer every time
        _WilsonGPU_uniformBufferData.set(this, void 0);
        _WilsonGPU_uniformBufferViews.set(this, void 0);
        _WilsonGPU_computePipeline.set(this, void 0);
        _WilsonGPU_renderPipeline.set(this, void 0);
        _WilsonGPU_bindGroup.set(this, void 0);
        _WilsonGPU_outputTexture.set(this, void 0);
        _WilsonGPU_loaded.set(this, void 0);
        _WilsonGPU_loadedResolve.set(this, () => { });
        _WilsonGPU_loadedReject.set(this, () => { });
        __classPrivateFieldSet(this, _WilsonGPU_loaded, new Promise((resolve, reject) => {
            __classPrivateFieldSet(this, _WilsonGPU_loadedResolve, resolve, "f");
            __classPrivateFieldSet(this, _WilsonGPU_loadedReject, reject, "f");
        }), "f");
        if (!navigator.gpu) {
            __classPrivateFieldGet(this, _WilsonGPU_loadedReject, "f").call(this);
            throw new Error("[Wilson] This browser does not support WebGPU");
        }
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_initWebGPU).call(this, options);
    }
    setUniforms(uniforms) {
        for (const name in uniforms) {
            const value = uniforms[name];
            const typeData = __classPrivateFieldGet(this, _WilsonGPU_uniformData, "f")[name];
            const viewOffset = __classPrivateFieldGet(this, _WilsonGPU_uniformData, "f")[name].offset / 4;
            if (typeData.isScalar) {
                // SCALAR: f32, i32, u32, bool
                __classPrivateFieldGet(this, _WilsonGPU_uniformBufferViews, "f")[typeData.baseType][viewOffset] = value;
            }
            else if (typeData.vectorSize) {
                // VECTOR: vec2/3/4<type>
                const view = __classPrivateFieldGet(this, _WilsonGPU_uniformBufferViews, "f")[typeData.baseType];
                for (let i = 0; i < typeData.vectorSize; i++) {
                    view[viewOffset + i] = value[i];
                }
            }
            else if (typeData.matrixSize) {
                // MATRIX: matCxR<f32>
                const cols = typeData.matrixSize[0];
                const rows = typeData.matrixSize[1];
                const view = __classPrivateFieldGet(this, _WilsonGPU_uniformBufferViews, "f").float;
                // Column stride: vec2=2, vec3/vec4=4 (vec3 is padded!)
                const colStride = rows === 2 ? 2 : 4;
                for (let col = 0; col < cols; col++) {
                    for (let row = 0; row < rows; row++) {
                        view[viewOffset + col * colStride + row] = value[row][col];
                    }
                }
            }
        }
        this.device.queue.writeBuffer(__classPrivateFieldGet(this, _WilsonGPU_uniformBuffer, "f"), 0, __classPrivateFieldGet(this, _WilsonGPU_uniformBufferData, "f"));
    }
    async drawFrame() {
        await __classPrivateFieldGet(this, _WilsonGPU_loaded, "f");
        // Update uniforms
        const uniformData = new Float32Array([-0.3, 0.7]);
        this.device.queue.writeBuffer(__classPrivateFieldGet(this, _WilsonGPU_uniformBuffer, "f"), 0, uniformData);
        const maxIterData = new Uint32Array([200]);
        this.device.queue.writeBuffer(__classPrivateFieldGet(this, _WilsonGPU_uniformBuffer, "f"), 8, maxIterData);
        // Run compute shader
        const commandEncoder = this.device.createCommandEncoder();
        const computePass = commandEncoder.beginComputePass();
        computePass.setPipeline(__classPrivateFieldGet(this, _WilsonGPU_computePipeline, "f"));
        computePass.setBindGroup(0, __classPrivateFieldGet(this, _WilsonGPU_bindGroup, "f"));
        // Dispatch workgroups (512 / 8 = 64 workgroups per dimension)
        const workgroupCount = Math.ceil(this.canvasWidth / 8);
        computePass.dispatchWorkgroups(workgroupCount, workgroupCount);
        computePass.end();
        // Display the result
        const sampler = this.device.createSampler({
            magFilter: "linear",
            minFilter: "linear"
        });
        const displayBindGroup = this.device.createBindGroup({
            layout: __classPrivateFieldGet(this, _WilsonGPU_renderPipeline, "f").getBindGroupLayout(0),
            entries: [
                { binding: 0, resource: sampler },
                { binding: 1, resource: __classPrivateFieldGet(this, _WilsonGPU_outputTexture, "f").createView() }
            ]
        });
        const textureView = this.context.getCurrentTexture().createView();
        const renderPass = commandEncoder.beginRenderPass({
            colorAttachments: [{
                    view: textureView,
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                    loadOp: "clear",
                    storeOp: "store"
                }]
        });
        renderPass.setPipeline(__classPrivateFieldGet(this, _WilsonGPU_renderPipeline, "f"));
        renderPass.setBindGroup(0, displayBindGroup);
        renderPass.draw(3);
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
    }
}
_WilsonGPU_uniformData = new WeakMap(), _WilsonGPU_uniformBuffer = new WeakMap(), _WilsonGPU_uniformBufferSize = new WeakMap(), _WilsonGPU_uniformBufferData = new WeakMap(), _WilsonGPU_uniformBufferViews = new WeakMap(), _WilsonGPU_computePipeline = new WeakMap(), _WilsonGPU_renderPipeline = new WeakMap(), _WilsonGPU_bindGroup = new WeakMap(), _WilsonGPU_outputTexture = new WeakMap(), _WilsonGPU_loaded = new WeakMap(), _WilsonGPU_loadedResolve = new WeakMap(), _WilsonGPU_loadedReject = new WeakMap(), _WilsonGPU_instances = new WeakSet(), _WilsonGPU_initWebGPU = async function _WilsonGPU_initWebGPU(options) {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw new Error("[Wilson] Could not get WebGPU context");
    }
    this.device = await adapter.requestDevice();
    const context = this.canvas.getContext("webgpu");
    if (!context) {
        __classPrivateFieldGet(this, _WilsonGPU_loadedReject, "f").call(this);
        throw new Error("[Wilson] Could not get WebGPU context");
    }
    this.context = context;
    this.context.configure({
        device: this.device,
        format: "rgba16float",
        toneMapping: { mode: "extended" },
    });
    // TODO: uniform initialization
    // TODO: handle multiple shaders
    const shaderModule = this.device.createShaderModule({ code: options.shader });
    // TODO: investigate what auto means here
    __classPrivateFieldSet(this, _WilsonGPU_computePipeline, this.device.createComputePipeline({
        layout: "auto",
        compute: {
            module: shaderModule,
            entryPoint: "main"
        }
    }), "f");
    if (!__classPrivateFieldGet(this, _WilsonGPU_computePipeline, "f")) {
        __classPrivateFieldGet(this, _WilsonGPU_loadedReject, "f").call(this);
        throw new Error("[Wilson] Could not create compute pipeline");
    }
    __classPrivateFieldSet(this, _WilsonGPU_uniformBuffer, this.device.createBuffer({
        size: 16, // 2 floats for c (real, imag), 1 uint for max iterations, padding
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    }), "f");
    // Create output texture for compute shader
    __classPrivateFieldSet(this, _WilsonGPU_outputTexture, this.device.createTexture({
        size: [this.canvasWidth, this.canvasHeight],
        // TODO: investigate rgba16float for HDR content
        format: "rgba16float",
        usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING
    }), "f");
    // Create bind group
    __classPrivateFieldSet(this, _WilsonGPU_bindGroup, this.device.createBindGroup({
        layout: __classPrivateFieldGet(this, _WilsonGPU_computePipeline, "f").getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: { buffer: __classPrivateFieldGet(this, _WilsonGPU_uniformBuffer, "f") }
            },
            {
                binding: 1,
                resource: __classPrivateFieldGet(this, _WilsonGPU_outputTexture, "f").createView()
            }
        ]
    }), "f");
    const displayShaderCode = /* wgsl */ `
			struct VertexOutput
			{
				@builtin(position) position: vec4<f32>,
				@location(0) uv: vec2<f32>,
			}
			
			@vertex
			fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput
			{
				// Single triangle to cover the entire canvas.
				var pos = array<vec2<f32>, 3>(
					vec2<f32>(-1.0, -1.0),
					vec2<f32>( 3.0, -1.0),
					vec2<f32>(-1.0,  3.0)
				);
				
				var output: VertexOutput;
				output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
				output.uv = (pos[vertexIndex] + 1.0) * 0.5;
				return output;
			}
			
			@group(0) @binding(0) var texSampler: sampler;
			@group(0) @binding(1) var tex: texture_2d<f32>;
			
			@fragment
			fn fs_main(input: VertexOutput) -> @location(0) vec4<f32>
			{
				return textureSample(tex, texSampler, input.uv);
			}
		`;
    const displayShaderModule = this.device.createShaderModule({
        code: displayShaderCode
    });
    __classPrivateFieldSet(this, _WilsonGPU_renderPipeline, this.device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: displayShaderModule,
            entryPoint: "vs_main"
        },
        fragment: {
            module: displayShaderModule,
            entryPoint: "fs_main",
            targets: [{ format: "rgba16float", }]
        }
    }), "f");
    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_initUniforms).call(this, options.shader);
    __classPrivateFieldGet(this, _WilsonGPU_loadedResolve, "f").call(this);
}, _WilsonGPU_initUniforms = function _WilsonGPU_initUniforms(shader) {
    // Pull the uniforms out of the shader code.
    const structMatch = shader.match(/struct\s+Uniforms\s*\{([^}]+)\}/);
    if (!structMatch) {
        console.warn("[Wilson] No Uniforms struct found in WGSL");
        return;
    }
    const structBody = structMatch[1];
    const memberRegex = /(\w+)\s*:\s*([\w<>]+)/g;
    let match;
    let offset = 0;
    while ((match = memberRegex.exec(structBody)) !== null) {
        const name = match[1];
        const typeString = match[2];
        if (!(typeString in gpuTypeData)) {
            throw new Error(`[Wilson] Invalid uniform type ${typeString} for uniform ${name} in shader "${shader}".`);
        }
        const typeData = gpuTypeData[typeString];
        const size = typeData.size;
        const alignment = typeData.alignment;
        offset = Math.ceil(offset / alignment) * alignment;
        __classPrivateFieldGet(this, _WilsonGPU_uniformData, "f")[name] = {
            ...typeData,
            offset
        };
        offset += size;
    }
    __classPrivateFieldSet(this, _WilsonGPU_uniformBufferSize, Math.ceil(offset / 256) * 256, "f");
    __classPrivateFieldSet(this, _WilsonGPU_uniformBuffer, this.device.createBuffer({
        size: __classPrivateFieldGet(this, _WilsonGPU_uniformBufferSize, "f"),
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    }), "f");
    __classPrivateFieldSet(this, _WilsonGPU_uniformBufferData, new ArrayBuffer(__classPrivateFieldGet(this, _WilsonGPU_uniformBufferSize, "f")), "f");
    __classPrivateFieldSet(this, _WilsonGPU_uniformBufferViews, {
        float: new Float32Array(__classPrivateFieldGet(this, _WilsonGPU_uniformBufferData, "f")),
        int: new Int32Array(__classPrivateFieldGet(this, _WilsonGPU_uniformBufferData, "f")),
        uint: new Uint32Array(__classPrivateFieldGet(this, _WilsonGPU_uniformBufferData, "f"))
    }, "f");
};
