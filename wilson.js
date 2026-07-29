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
var _Wilson_instances, _Wilson_destroyed, _Wilson_canvasWidth, _Wilson_canvasHeight, _Wilson_lastCanvasWidth, _Wilson_lastCanvasHeight, _Wilson_canvasAspectRatio, _Wilson_worldWidth, _Wilson_worldHeight, _Wilson_worldCenterX, _Wilson_worldCenterY, _Wilson_nonFullscreenWorldWidth, _Wilson_nonFullscreenWorldHeight, _Wilson_minWorldWidth, _Wilson_maxWorldWidth, _Wilson_minWorldHeight, _Wilson_maxWorldHeight, _Wilson_minWorldX, _Wilson_maxWorldX, _Wilson_minWorldY, _Wilson_maxWorldY, _Wilson_onResizeCanvasCallback, _Wilson_useP3ColorSpace, _Wilson_needDraggablesContainerSizeUpdate, _Wilson_interactionCallbacks, _Wilson_needPanAndZoomUpdate, _Wilson_interactionOnPanAndZoom, _Wilson_lastInteractionTimes, _Wilson_lastInteractionTypes, _Wilson_numPreviousVelocities, _Wilson_lastVelocityFactors, _Wilson_lastPanVelocityX, _Wilson_lastPanVelocityY, _Wilson_lastZoomVelocity, _Wilson_lastPanVelocitiesX, _Wilson_lastPanVelocitiesY, _Wilson_lastZoomVelocities, _Wilson_panVelocityX, _Wilson_panVelocityY, _Wilson_zoomVelocity, _Wilson_panFriction, _Wilson_zoomFriction, _Wilson_panVelocityThreshold, _Wilson_zoomVelocityThreshold, _Wilson_draggablesRadius, _Wilson_draggablesStatic, _Wilson_draggableCallbacks, _Wilson_draggablesContainerWidth, _Wilson_draggablesContainerHeight, _Wilson_draggablesContainerRestrictedWidth, _Wilson_draggablesContainerRestrictedHeight, _Wilson_currentlyFullscreen, _Wilson_fullscreenOldScroll, _Wilson_fullscreenCanvasRect, _Wilson_fullscreenInitialWindowInnerWidth, _Wilson_fullscreenInitialWindowInnerHeight, _Wilson_fullscreenFillScreen, _Wilson_externalFullscreenOldFillScreen, _Wilson_externalFullscreenActive, _Wilson_fullscreenUseButton, _Wilson_fullscreenEnterFullscreenButton, _Wilson_fullscreenExitFullscreenButton, _Wilson_fullscreenEnterFullscreenButtonIconPath, _Wilson_fullscreenExitFullscreenButtonIconPath, _Wilson_draggables, _Wilson_draggableDefaultId, _Wilson_currentMouseDraggableId, _Wilson_useResetButton, _Wilson_resetButton, _Wilson_resetButtonTimeoutId, _Wilson_resetButtonIconPath, _Wilson_defaultWorldCenterX, _Wilson_defaultWorldCenterY, _Wilson_defaultWorldWidth, _Wilson_defaultWorldHeight, _Wilson_defaultDraggableLocations, _Wilson_appletContainer, _Wilson_canvasContainer, _Wilson_draggablesContainer, _Wilson_fullscreenContainer, _Wilson_fullscreenContainerLocation, _Wilson_metaThemeColorElement, _Wilson_oldMetaThemeColor, _Wilson_salt, _Wilson_getDefaultWorldSize, _Wilson_onResizeWindow, _Wilson_handleKeydownEvent, _Wilson_resizeCanvas, _Wilson_zeroVelocities, _Wilson_setLastZoomVelocity, _Wilson_setLastPanVelocity, _Wilson_setZoomVelocity, _Wilson_setPanVelocity, _Wilson_currentlyDragging, _Wilson_currentlyPinching, _Wilson_currentlyWheeling, _Wilson_currentlyWheelingTimeoutId, _Wilson_ignoreTouchendCooldown, _Wilson_atMaxWorldSize, _Wilson_atMinWorldSize, _Wilson_lastInteractionRow, _Wilson_lastInteractionCol, _Wilson_lastInteractionRow2, _Wilson_lastInteractionCol2, _Wilson_clampWorldCoordinates, _Wilson_getPanOverscroll, _Wilson_getZoomOverscroll, _Wilson_onMousedown, _Wilson_onMouseup, _Wilson_onMouseenter, _Wilson_onMouseleave, _Wilson_onMousemove, _Wilson_updateFromPinching, _Wilson_onTouchstart, _Wilson_onTouchend, _Wilson_onTouchmove, _Wilson_zoomFixedPoint, _Wilson_zoomCanvas, _Wilson_onWheel, _Wilson_animationFrameLoopPaused, _Wilson_lastPanAndZoomTimestamp, _Wilson_animationFrameLoop, _Wilson_initInteraction, _Wilson_documentDraggableMousemoveListener, _Wilson_documentDraggableMouseupListener, _Wilson_initDraggables, _Wilson_setDraggables, _Wilson_draggableOnMousedown, _Wilson_draggableOnMouseup, _Wilson_draggableOnMousemove, _Wilson_draggableOnTouchstart, _Wilson_draggableOnTouchend, _Wilson_draggableOnTouchmove, _Wilson_updateDraggablesContainerSize, _Wilson_updateDraggablesLocation, _Wilson_initFullscreen, _Wilson_initResetButton, _Wilson_preventGestures, _Wilson_canvasOldWidth, _Wilson_canvasOldWidthStyle, _Wilson_canvasOldHeightStyle, _Wilson_enterFullscreen, _Wilson_addEnterFullscreenFillScreenTransitionStyle, _Wilson_syncFullscreenHiddenElements, _Wilson_fullscreenTransitionElementRect, _Wilson_measureFullscreenTransitionElements, _Wilson_addFullscreenHiddenElementTransitionStyle, _Wilson_exitFullscreen, _Wilson_addExitFullscreenFillScreenTransitionStyle, _Wilson_interpolatePageToWorld, _WilsonGPU_instances, _WilsonGPU_useWebGL2, _WilsonGPU_shaderPrograms, _WilsonGPU_shaderProgramSources, _WilsonGPU_uniforms, _WilsonGPU_useXRButton, _WilsonGPU_xrButtonIconPath, _WilsonGPU_xrButton, _WilsonGPU_xrButtonImg, _WilsonGPU_xrButtonText, _WilsonGPU_xrIsSupportedNow, _WilsonGPU_renderXRFrame, _WilsonGPU_xrData, _WilsonGPU_xrRequiredFeatures, _WilsonGPU_xrOptionalFeatures, _WilsonGPU_xrDepthNear, _WilsonGPU_xrDepthFar, _WilsonGPU_xrFramebufferScale, _WilsonGPU_createXRBaseLayer, _WilsonGPU_xrViewportScale, _WilsonGPU_lastAppliedXRViewportScales, _WilsonGPU_xrTargetFrameRate, _WilsonGPU_lastXRTime, _WilsonGPU_enteringXR, _WilsonGPU_xrFixedFoveation, _WilsonGPU_xrCallbacks, _WilsonGPU_useXRHandTracking, _WilsonGPU_xrControllerData, _WilsonGPU_xrControllerList, _WilsonGPU_xrViewport, _WilsonGPU_logShaderSource, _WilsonGPU_initXR, _WilsonGPU_lastReportedXRAvailability, _WilsonGPU_checkXRSupport, _WilsonGPU_onDeviceChange, _WilsonGPU_onPageFocus, _WilsonGPU_setXRButtonLoading, _WilsonGPU_initXRButton, _WilsonGPU_numShaders, _WilsonGPU_currentShaderId, _WilsonGPU_currentProgram, _WilsonGPU_useProgram, _WilsonGPU_framebuffers, _WilsonGPU_textures, _WilsonGPU_currentFramebufferId, _WilsonGPU_currentTextureId, _WilsonGPU_positionBuffers, _WilsonGPU_shaders, _WilsonGPU_onXRFrame, _WilsonGPU_onXRInputSourcesChange, _WilsonGPU_syncXRControllers, _WilsonGPU_createXRControllerData, _WilsonGPU_readXRPose, _WilsonGPU_updateXRControllers, _WilsonGPU_clearXRButtonEdges, _WilsonGPU_releaseXRControllerButtons, _WilsonGPU_dispatchXRInputSourceEvent, _WilsonGPU_onXREnd, _WilsonGPU_clearXRFunctions, _WilsonGPU_applyXRTargetFrameRate;
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
        _Wilson_externalFullscreenOldFillScreen.set(this, false);
        _Wilson_externalFullscreenActive.set(this, false);
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
        _Wilson_fullscreenContainer.set(this, void 0);
        _Wilson_fullscreenContainerLocation.set(this, void 0);
        _Wilson_metaThemeColorElement.set(this, document.querySelector("meta[name='theme-color']"));
        _Wilson_oldMetaThemeColor.set(this, null);
        this.additionalFullscreenViewTransitionElements = [];
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
            if (e.key === "Escape" && __classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") && this.closeFullscreenWithEscape && !__classPrivateFieldGet(this, _Wilson_externalFullscreenActive, "f")) {
                e.preventDefault();
                e.stopPropagation();
                this.exitFullscreen();
            }
        });
        this.resizeCanvasGPU = () => { };
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
        _Wilson_animationFrameLoopPaused.set(this, false);
        _Wilson_lastPanAndZoomTimestamp.set(this, -1);
        _Wilson_animationFrameLoop.set(this, (timestamp) => {
            if (__classPrivateFieldGet(this, _Wilson_animationFrameLoopPaused, "f") || __classPrivateFieldGet(this, _Wilson_destroyed, "f")) {
                return;
            }
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
                // isn't halted so quickly.
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
                // Extra friction when zoom momentum pushes further past bounds.
                // Rate of 15 means velocity drops to ~22% in 0.1s, roughly 3x
                // faster than normal friction. Only damps velocity in the
                // direction of further overscroll.
                if (this.usePanAndZoomRubberbanding) {
                    const dt = timeElapsed / 1000;
                    const { tooLargeWidth, tooLargeHeight, tooSmallWidth, tooSmallHeight } = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getZoomOverscroll).call(this);
                    // zoomVelocity > 0 means zooming out (world gets larger)
                    // zoomVelocity < 0 means zooming in (world gets smaller)
                    const pushingPastMax = __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") > 0
                        && (tooLargeWidth || tooLargeHeight);
                    const pushingPastMin = __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") < 0
                        && (tooSmallWidth || tooSmallHeight);
                    if (pushingPastMax || pushingPastMin) {
                        __classPrivateFieldSet(this, _Wilson_zoomVelocity, __classPrivateFieldGet(this, _Wilson_zoomVelocity, "f") * Math.exp(-15 * dt), "f");
                    }
                }
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
                // Extra friction when pan momentum pushes further past bounds.
                if (this.usePanAndZoomRubberbanding) {
                    const dt = timeElapsed / 1000;
                    const { overX, overY, xSatisfiable, ySatisfiable } = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getPanOverscroll).call(this);
                    const overscrollDamping = Math.exp(-15 * dt);
                    if (xSatisfiable) {
                        if ((overX > 0 && __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") > 0)
                            || (overX < 0 && __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") < 0)) {
                            __classPrivateFieldSet(this, _Wilson_panVelocityX, __classPrivateFieldGet(this, _Wilson_panVelocityX, "f") * overscrollDamping, "f");
                        }
                    }
                    if (ySatisfiable) {
                        if ((overY > 0 && __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") > 0)
                            || (overY < 0 && __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") < 0)) {
                            __classPrivateFieldSet(this, _Wilson_panVelocityY, __classPrivateFieldGet(this, _Wilson_panVelocityY, "f") * overscrollDamping, "f");
                        }
                    }
                }
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
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this, timeElapsed / 1000);
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
        //@ts-expect-error
        canvas.wilson = this;
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
        this.buttonContainer = document.createElement("div");
        this.buttonContainer.classList.add("WILSON_button-container");
        __classPrivateFieldGet(this, _Wilson_canvasContainer, "f").appendChild(this.buttonContainer);
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
    replaceCanvas() {
        const newCanvas = document.createElement("canvas");
        // Copy attributes
        newCanvas.width = this.canvas.width;
        newCanvas.height = this.canvas.height;
        newCanvas.id = this.canvas.id;
        newCanvas.className = this.canvas.className;
        // Copy inline styles
        newCanvas.style.cssText = this.canvas.style.cssText;
        // Copy data attributes
        for (const key of Object.keys(this.canvas.dataset)) {
            newCanvas.dataset[key] = this.canvas.dataset[key];
        }
        // Replace in DOM
        if (this.canvas.parentNode) {
            this.canvas.parentNode.replaceChild(newCanvas, this.canvas);
        }
        this.canvas = newCanvas;
        return newCanvas;
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
    set animationFrameLoopPaused(value) {
        if (value === __classPrivateFieldGet(this, _Wilson_animationFrameLoopPaused, "f")) {
            return;
        }
        __classPrivateFieldSet(this, _Wilson_animationFrameLoopPaused, value, "f");
        __classPrivateFieldSet(this, _Wilson_lastPanAndZoomTimestamp, -1, "f");
        if (__classPrivateFieldGet(this, _Wilson_animationFrameLoopPaused, "f")) {
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_zeroVelocities).call(this);
        }
        else {
            requestAnimationFrame(__classPrivateFieldGet(this, _Wilson_animationFrameLoop, "f"));
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
    addFullscreenViewTransitionElement(entry) {
        this.additionalFullscreenViewTransitionElements.push(entry);
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_syncFullscreenHiddenElements).call(this);
    }
    async enterFullscreen() {
        await this.beforeSwitchFullscreen(true);
        const elements = [
            __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f"),
            __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f"),
            __classPrivateFieldGet(this, _Wilson_resetButton, "f"),
            this.canvas,
            ...(Object.values(__classPrivateFieldGet(this, _Wilson_draggables, "f")).map(entry => entry.element)),
            ...this.additionalFullscreenViewTransitionElements.map(entry => entry.element),
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
            const useTransitionNames = !this.reduceMotion
                && !this.crossfadeFullscreen
                && this.animateFullscreen;
            if (useTransitionNames) {
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
                for (let i = 0; i < this.additionalFullscreenViewTransitionElements.length; i++) {
                    const entry = this.additionalFullscreenViewTransitionElements[i];
                    if (entry) {
                        entry.element.style.setProperty("view-transition-name", `WILSON_transitioning-element-${i}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                    }
                }
            }
            // For non-fill-screen mode, suppress the default crossfade on
            // draggable pseudo-elements to prevent an opacity dip in Safari.
            // In fill-screen mode, the fill-screen stylesheet already includes
            // per-draggable keyframe animations that track the canvas transform.
            let draggableStyleElement = null;
            if (!styleElement) {
                const draggableIds = Object.keys(__classPrivateFieldGet(this, _Wilson_draggables, "f"));
                if (draggableIds.length > 0) {
                    const rules = draggableIds.map(id => {
                        const name = `WILSON_draggable-${id}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`;
                        return `::view-transition-old(${name}),\n::view-transition-new(${name}) { animation: none; }`;
                    }).join("\n");
                    draggableStyleElement = document.createElement("style");
                    draggableStyleElement.innerHTML = rules;
                    document.head.appendChild(draggableStyleElement);
                }
            }
            if (this.animateFullscreen) {
                const rectsBefore = useTransitionNames
                    ? __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_measureFullscreenTransitionElements).call(this)
                    : null;
                // Where the one-sided elements end up is only knowable once the new state
                // is laid out, so the style goes in from inside the callback -- still
                // before the browser captures the new snapshots.
                let hiddenElementStyleElement = null;
                // @ts-ignore
                const transition = document.startViewTransition(() => {
                    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this);
                    if (rectsBefore) {
                        hiddenElementStyleElement = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_addFullscreenHiddenElementTransitionStyle).call(this, rectsBefore, __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_measureFullscreenTransitionElements).call(this));
                    }
                });
                const removeStyleElements = () => {
                    styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
                    draggableStyleElement === null || draggableStyleElement === void 0 ? void 0 : draggableStyleElement.remove();
                    hiddenElementStyleElement === null || hiddenElementStyleElement === void 0 ? void 0 : hiddenElementStyleElement.remove();
                };
                if (transition.finished !== undefined) {
                    await transition.finished;
                    removeStyleElements();
                }
                else {
                    setTimeout(removeStyleElements, 1000);
                }
            }
            else {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_enterFullscreen).call(this);
                draggableStyleElement === null || draggableStyleElement === void 0 ? void 0 : draggableStyleElement.remove();
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
            ...(Object.values(__classPrivateFieldGet(this, _Wilson_draggables, "f")).map(entry => entry.element)),
            ...this.additionalFullscreenViewTransitionElements.map(entry => entry.element),
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
            const useTransitionNames = !this.reduceMotion
                && !this.crossfadeFullscreen
                && this.animateFullscreen
                && (!__classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f")
                    || (window.innerWidth == __classPrivateFieldGet(this, _Wilson_fullscreenInitialWindowInnerWidth, "f")
                        && window.innerHeight == __classPrivateFieldGet(this, _Wilson_fullscreenInitialWindowInnerHeight, "f")));
            if (useTransitionNames) {
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
                for (let i = 0; i < this.additionalFullscreenViewTransitionElements.length; i++) {
                    const entry = this.additionalFullscreenViewTransitionElements[i];
                    if (entry) {
                        entry.element.style.setProperty("view-transition-name", `WILSON_transitioning-element-${i}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`);
                    }
                }
            }
            // For non-fill-screen mode, suppress the default crossfade on
            // draggable pseudo-elements to prevent an opacity dip in Safari.
            // In fill-screen mode, the fill-screen stylesheet already includes
            // per-draggable keyframe animations that track the canvas transform.
            let draggableStyleElement = null;
            if (!styleElement) {
                const draggableIds = Object.keys(__classPrivateFieldGet(this, _Wilson_draggables, "f"));
                if (draggableIds.length > 0) {
                    const rules = draggableIds.map(id => {
                        const name = `WILSON_draggable-${id}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`;
                        return `::view-transition-old(${name}),\n::view-transition-new(${name}) { animation: none; }`;
                    }).join("\n");
                    draggableStyleElement = document.createElement("style");
                    draggableStyleElement.innerHTML = rules;
                    document.head.appendChild(draggableStyleElement);
                }
            }
            if (this.animateFullscreen) {
                const rectsBefore = useTransitionNames
                    ? __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_measureFullscreenTransitionElements).call(this)
                    : null;
                // Where the one-sided elements come from is only knowable once the new
                // state is laid out, so the style goes in from inside the callback --
                // still before the browser captures the new snapshots.
                let hiddenElementStyleElement = null;
                // @ts-ignore
                const transition = document.startViewTransition(() => {
                    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this);
                    if (rectsBefore) {
                        hiddenElementStyleElement = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_addFullscreenHiddenElementTransitionStyle).call(this, rectsBefore, __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_measureFullscreenTransitionElements).call(this));
                    }
                });
                const removeStyleElements = () => {
                    styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
                    draggableStyleElement === null || draggableStyleElement === void 0 ? void 0 : draggableStyleElement.remove();
                    hiddenElementStyleElement === null || hiddenElementStyleElement === void 0 ? void 0 : hiddenElementStyleElement.remove();
                };
                if (transition.finished !== undefined) {
                    await transition.finished;
                    removeStyleElements();
                }
                else {
                    setTimeout(removeStyleElements, 1000);
                }
            }
            else {
                __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_exitFullscreen).call(this);
                draggableStyleElement === null || draggableStyleElement === void 0 ? void 0 : draggableStyleElement.remove();
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
    // Enters fullscreen state for the canvas (resizes buffer, updates world
    // coordinates) without managing its own fullscreen container. Used when
    // an external system (e.g. desmos fullscreen) handles the container.
    enterManagedFullscreen() {
        __classPrivateFieldSet(this, _Wilson_externalFullscreenActive, true, "f");
        __classPrivateFieldSet(this, _Wilson_externalFullscreenOldFillScreen, __classPrivateFieldGet(this, _Wilson_fullscreenFillScreen, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, true, "f");
        __classPrivateFieldSet(this, _Wilson_currentlyFullscreen, true, "f");
        this.currentlyFullscreen = true;
        __classPrivateFieldSet(this, _Wilson_canvasOldWidth, __classPrivateFieldGet(this, _Wilson_canvasWidth, "f"), "f");
        __classPrivateFieldSet(this, _Wilson_canvasOldWidthStyle, this.canvas.style.width, "f");
        __classPrivateFieldSet(this, _Wilson_canvasOldHeightStyle, this.canvas.style.height, "f");
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100%";
        const windowAspectRatio = window.innerWidth / window.innerHeight;
        const aspectRatioChange = windowAspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
        __classPrivateFieldSet(this, _Wilson_worldWidth, Math.max(__classPrivateFieldGet(this, _Wilson_worldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_worldWidth, "f")), "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, Math.max(__classPrivateFieldGet(this, _Wilson_worldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_worldHeight, "f")), "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
        __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
        this.onSwitchFullscreen(true);
    }
    exitManagedFullscreen() {
        __classPrivateFieldSet(this, _Wilson_externalFullscreenActive, false, "f");
        __classPrivateFieldSet(this, _Wilson_currentlyFullscreen, false, "f");
        this.currentlyFullscreen = false;
        __classPrivateFieldSet(this, _Wilson_worldWidth, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f"), "f");
        this.worldWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f");
        __classPrivateFieldSet(this, _Wilson_worldHeight, __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f"), "f");
        this.worldHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_clampWorldCoordinates).call(this);
        __classPrivateFieldSet(this, _Wilson_fullscreenFillScreen, __classPrivateFieldGet(this, _Wilson_externalFullscreenOldFillScreen, "f"), "f");
        if (__classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_resizeCanvas).call(this, { width: __classPrivateFieldGet(this, _Wilson_canvasOldWidth, "f") })) {
            __classPrivateFieldGet(this, _Wilson_onResizeCanvasCallback, "f").call(this);
        }
        this.canvas.style.width = __classPrivateFieldGet(this, _Wilson_canvasOldWidthStyle, "f");
        this.canvas.style.height = __classPrivateFieldGet(this, _Wilson_canvasOldHeightStyle, "f");
        __classPrivateFieldGet(this, _Wilson_onResizeWindow, "f").call(this);
        this.onSwitchFullscreen(false);
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
_Wilson_destroyed = new WeakMap(), _Wilson_canvasWidth = new WeakMap(), _Wilson_canvasHeight = new WeakMap(), _Wilson_lastCanvasWidth = new WeakMap(), _Wilson_lastCanvasHeight = new WeakMap(), _Wilson_canvasAspectRatio = new WeakMap(), _Wilson_worldWidth = new WeakMap(), _Wilson_worldHeight = new WeakMap(), _Wilson_worldCenterX = new WeakMap(), _Wilson_worldCenterY = new WeakMap(), _Wilson_nonFullscreenWorldWidth = new WeakMap(), _Wilson_nonFullscreenWorldHeight = new WeakMap(), _Wilson_minWorldWidth = new WeakMap(), _Wilson_maxWorldWidth = new WeakMap(), _Wilson_minWorldHeight = new WeakMap(), _Wilson_maxWorldHeight = new WeakMap(), _Wilson_minWorldX = new WeakMap(), _Wilson_maxWorldX = new WeakMap(), _Wilson_minWorldY = new WeakMap(), _Wilson_maxWorldY = new WeakMap(), _Wilson_onResizeCanvasCallback = new WeakMap(), _Wilson_useP3ColorSpace = new WeakMap(), _Wilson_needDraggablesContainerSizeUpdate = new WeakMap(), _Wilson_interactionCallbacks = new WeakMap(), _Wilson_needPanAndZoomUpdate = new WeakMap(), _Wilson_interactionOnPanAndZoom = new WeakMap(), _Wilson_lastInteractionTimes = new WeakMap(), _Wilson_lastInteractionTypes = new WeakMap(), _Wilson_numPreviousVelocities = new WeakMap(), _Wilson_lastVelocityFactors = new WeakMap(), _Wilson_lastPanVelocityX = new WeakMap(), _Wilson_lastPanVelocityY = new WeakMap(), _Wilson_lastZoomVelocity = new WeakMap(), _Wilson_lastPanVelocitiesX = new WeakMap(), _Wilson_lastPanVelocitiesY = new WeakMap(), _Wilson_lastZoomVelocities = new WeakMap(), _Wilson_panVelocityX = new WeakMap(), _Wilson_panVelocityY = new WeakMap(), _Wilson_zoomVelocity = new WeakMap(), _Wilson_panFriction = new WeakMap(), _Wilson_zoomFriction = new WeakMap(), _Wilson_panVelocityThreshold = new WeakMap(), _Wilson_zoomVelocityThreshold = new WeakMap(), _Wilson_draggablesRadius = new WeakMap(), _Wilson_draggablesStatic = new WeakMap(), _Wilson_draggableCallbacks = new WeakMap(), _Wilson_draggablesContainerWidth = new WeakMap(), _Wilson_draggablesContainerHeight = new WeakMap(), _Wilson_draggablesContainerRestrictedWidth = new WeakMap(), _Wilson_draggablesContainerRestrictedHeight = new WeakMap(), _Wilson_currentlyFullscreen = new WeakMap(), _Wilson_fullscreenOldScroll = new WeakMap(), _Wilson_fullscreenCanvasRect = new WeakMap(), _Wilson_fullscreenInitialWindowInnerWidth = new WeakMap(), _Wilson_fullscreenInitialWindowInnerHeight = new WeakMap(), _Wilson_fullscreenFillScreen = new WeakMap(), _Wilson_externalFullscreenOldFillScreen = new WeakMap(), _Wilson_externalFullscreenActive = new WeakMap(), _Wilson_fullscreenUseButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButton = new WeakMap(), _Wilson_fullscreenExitFullscreenButton = new WeakMap(), _Wilson_fullscreenEnterFullscreenButtonIconPath = new WeakMap(), _Wilson_fullscreenExitFullscreenButtonIconPath = new WeakMap(), _Wilson_draggables = new WeakMap(), _Wilson_draggableDefaultId = new WeakMap(), _Wilson_currentMouseDraggableId = new WeakMap(), _Wilson_useResetButton = new WeakMap(), _Wilson_resetButton = new WeakMap(), _Wilson_resetButtonTimeoutId = new WeakMap(), _Wilson_resetButtonIconPath = new WeakMap(), _Wilson_defaultWorldCenterX = new WeakMap(), _Wilson_defaultWorldCenterY = new WeakMap(), _Wilson_defaultWorldWidth = new WeakMap(), _Wilson_defaultWorldHeight = new WeakMap(), _Wilson_defaultDraggableLocations = new WeakMap(), _Wilson_appletContainer = new WeakMap(), _Wilson_canvasContainer = new WeakMap(), _Wilson_draggablesContainer = new WeakMap(), _Wilson_fullscreenContainer = new WeakMap(), _Wilson_fullscreenContainerLocation = new WeakMap(), _Wilson_metaThemeColorElement = new WeakMap(), _Wilson_oldMetaThemeColor = new WeakMap(), _Wilson_salt = new WeakMap(), _Wilson_onResizeWindow = new WeakMap(), _Wilson_handleKeydownEvent = new WeakMap(), _Wilson_currentlyDragging = new WeakMap(), _Wilson_currentlyPinching = new WeakMap(), _Wilson_currentlyWheeling = new WeakMap(), _Wilson_currentlyWheelingTimeoutId = new WeakMap(), _Wilson_ignoreTouchendCooldown = new WeakMap(), _Wilson_atMaxWorldSize = new WeakMap(), _Wilson_atMinWorldSize = new WeakMap(), _Wilson_lastInteractionRow = new WeakMap(), _Wilson_lastInteractionCol = new WeakMap(), _Wilson_lastInteractionRow2 = new WeakMap(), _Wilson_lastInteractionCol2 = new WeakMap(), _Wilson_zoomFixedPoint = new WeakMap(), _Wilson_animationFrameLoopPaused = new WeakMap(), _Wilson_lastPanAndZoomTimestamp = new WeakMap(), _Wilson_animationFrameLoop = new WeakMap(), _Wilson_documentDraggableMousemoveListener = new WeakMap(), _Wilson_documentDraggableMouseupListener = new WeakMap(), _Wilson_preventGestures = new WeakMap(), _Wilson_canvasOldWidth = new WeakMap(), _Wilson_canvasOldWidthStyle = new WeakMap(), _Wilson_canvasOldHeightStyle = new WeakMap(), _Wilson_instances = new WeakSet(), _Wilson_getDefaultWorldSize = function _Wilson_getDefaultWorldSize() {
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
        this.resizeCanvasGPU();
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
}, _Wilson_clampWorldCoordinates = function _Wilson_clampWorldCoordinates(dt = 1) {
    __classPrivateFieldSet(this, _Wilson_atMaxWorldSize, false, "f");
    __classPrivateFieldSet(this, _Wilson_atMinWorldSize, false, "f");
    const applyFactor = (factor) => {
        if (this.usePanAndZoomRubberbanding) {
            if (__classPrivateFieldGet(this, _Wilson_currentlyPinching, "f")) {
                return;
            }
            // Frame-rate independent zoom snap-back using exponential decay.
            // The rate is calibrated so that at 60fps (dt = 1/60), the per-frame
            // correction matches the old behavior with the same softness value.
            // At dt = 1 (default for non-animation calls), this gives full correction.
            const wheelFactor = __classPrivateFieldGet(this, _Wilson_currentlyWheeling, "f") ? 1.5 : 1;
            const zoomSnapRate = -60 * Math.log(1 - 1 / (this.rubberbandingZoomSoftness * wheelFactor));
            const zoomExponent = 1 - Math.exp(-zoomSnapRate * dt);
            factor = Math.pow(factor, zoomExponent);
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
            // Frame-rate independent pan snap-back using exponential decay.
            // The rate is calibrated so that at 60fps (dt = 1/60), the per-frame
            // correction matches the old behavior with the same softness value.
            // At dt = 1 (default for non-animation calls), correction ≈ 1.0.
            const panSnapRate = -60 * Math.log(1 - 1 / this.rubberbandingPanSoftness);
            const panCorrection = 1 - Math.exp(-panSnapRate * dt);
            xAdjust *= panCorrection;
            yAdjust *= panCorrection;
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
}, _Wilson_getPanOverscroll = function _Wilson_getPanOverscroll() {
    const rightBound = __classPrivateFieldGet(this, _Wilson_maxWorldX, "f") - __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / 2;
    const leftBound = __classPrivateFieldGet(this, _Wilson_minWorldX, "f") + __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / 2;
    const xSatisfiable = rightBound >= leftBound;
    let overX = 0;
    if (xSatisfiable) {
        if (__classPrivateFieldGet(this, _Wilson_worldCenterX, "f") > rightBound) {
            overX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") - rightBound;
        }
        else if (__classPrivateFieldGet(this, _Wilson_worldCenterX, "f") < leftBound) {
            overX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") - leftBound;
        }
    }
    const topBound = __classPrivateFieldGet(this, _Wilson_maxWorldY, "f") - __classPrivateFieldGet(this, _Wilson_worldHeight, "f") / 2;
    const bottomBound = __classPrivateFieldGet(this, _Wilson_minWorldY, "f") + __classPrivateFieldGet(this, _Wilson_worldHeight, "f") / 2;
    const ySatisfiable = topBound >= bottomBound;
    let overY = 0;
    if (ySatisfiable) {
        if (__classPrivateFieldGet(this, _Wilson_worldCenterY, "f") > topBound) {
            overY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") - topBound;
        }
        else if (__classPrivateFieldGet(this, _Wilson_worldCenterY, "f") < bottomBound) {
            overY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") - bottomBound;
        }
    }
    return { overX, overY, xSatisfiable, ySatisfiable };
}, _Wilson_getZoomOverscroll = function _Wilson_getZoomOverscroll() {
    const tooLargeWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f") > __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f");
    const tooLargeHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f") > __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f");
    const tooSmallWidth = __classPrivateFieldGet(this, _Wilson_worldWidth, "f") < __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f");
    const tooSmallHeight = __classPrivateFieldGet(this, _Wilson_worldHeight, "f") < __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f");
    let overWidthRatio = 0;
    if (tooLargeWidth) {
        overWidthRatio = __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / __classPrivateFieldGet(this, _Wilson_maxWorldWidth, "f") - 1;
    }
    else if (tooSmallWidth) {
        overWidthRatio = 1 - __classPrivateFieldGet(this, _Wilson_worldWidth, "f") / __classPrivateFieldGet(this, _Wilson_minWorldWidth, "f");
    }
    let overHeightRatio = 0;
    if (tooLargeHeight) {
        overHeightRatio = __classPrivateFieldGet(this, _Wilson_worldHeight, "f") / __classPrivateFieldGet(this, _Wilson_maxWorldHeight, "f") - 1;
    }
    else if (tooSmallHeight) {
        overHeightRatio = 1 - __classPrivateFieldGet(this, _Wilson_worldHeight, "f") / __classPrivateFieldGet(this, _Wilson_minWorldHeight, "f");
    }
    return {
        overWidthRatio,
        overHeightRatio,
        tooLargeWidth,
        tooLargeHeight,
        tooSmallWidth,
        tooSmallHeight,
    };
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
        let deltaX = -(x - lastX);
        let deltaY = -(y - lastY);
        // Apply rubber band resistance when dragging past bounds.
        // Uses a reciprocal curve: at zero overscroll, full tracking (1:1);
        // at half the viewport past bounds, tracking is halved.
        // Only resists when pushing FURTHER past bounds, not when dragging back.
        if (this.usePanAndZoomRubberbanding) {
            const { overX, overY, xSatisfiable, ySatisfiable } = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getPanOverscroll).call(this);
            if (xSatisfiable && overX !== 0) {
                const pushingFurther = (overX > 0 && deltaX > 0)
                    || (overX < 0 && deltaX < 0);
                if (pushingFurther) {
                    deltaX *= 1 / (1 + Math.abs(overX)
                        / (__classPrivateFieldGet(this, _Wilson_worldWidth, "f") * 0.5));
                }
            }
            if (ySatisfiable && overY !== 0) {
                const pushingFurther = (overY > 0 && deltaY > 0)
                    || (overY < 0 && deltaY < 0);
                if (pushingFurther) {
                    deltaY *= 1 / (1 + Math.abs(overY)
                        / (__classPrivateFieldGet(this, _Wilson_worldHeight, "f") * 0.5));
                }
            }
        }
        __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") + deltaX, "f");
        this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
        __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") + deltaY, "f");
        this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
        __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setLastPanVelocity).call(this, deltaX, deltaY);
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
    let scale = lastDistance / distance;
    // Apply zoom resistance during pinch when past bounds.
    if (this.usePanAndZoomRubberbanding && scale !== 1) {
        const { overWidthRatio, overHeightRatio, tooLargeWidth, tooLargeHeight, tooSmallWidth, tooSmallHeight } = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getZoomOverscroll).call(this);
        const overZoomRatio = Math.max(overWidthRatio, overHeightRatio);
        const zoomingPastMax = (scale > 1)
            && (tooLargeWidth || tooLargeHeight);
        const zoomingPastMin = (scale < 1)
            && (tooSmallWidth || tooSmallHeight);
        if ((zoomingPastMax || zoomingPastMin) && overZoomRatio > 0) {
            const resistance = 1 / (1 + overZoomRatio * 3);
            scale = 1 + (scale - 1) * resistance;
        }
    }
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
            let deltaX = -(x - lastX);
            let deltaY = -(y - lastY);
            // Apply rubber band resistance when dragging past bounds.
            if (this.usePanAndZoomRubberbanding) {
                const { overX, overY, xSatisfiable, ySatisfiable } = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getPanOverscroll).call(this);
                if (xSatisfiable && overX !== 0) {
                    const pushingFurther = (overX > 0 && deltaX > 0)
                        || (overX < 0 && deltaX < 0);
                    if (pushingFurther) {
                        deltaX *= 1 / (1 + Math.abs(overX)
                            / (__classPrivateFieldGet(this, _Wilson_worldWidth, "f") * 0.5));
                    }
                }
                if (ySatisfiable && overY !== 0) {
                    const pushingFurther = (overY > 0 && deltaY > 0)
                        || (overY < 0 && deltaY < 0);
                    if (pushingFurther) {
                        deltaY *= 1 / (1 + Math.abs(overY)
                            / (__classPrivateFieldGet(this, _Wilson_worldHeight, "f") * 0.5));
                    }
                }
            }
            __classPrivateFieldSet(this, _Wilson_worldCenterX, __classPrivateFieldGet(this, _Wilson_worldCenterX, "f") + deltaX, "f");
            this.worldCenterX = __classPrivateFieldGet(this, _Wilson_worldCenterX, "f");
            __classPrivateFieldSet(this, _Wilson_worldCenterY, __classPrivateFieldGet(this, _Wilson_worldCenterY, "f") + deltaY, "f");
            this.worldCenterY = __classPrivateFieldGet(this, _Wilson_worldCenterY, "f");
            __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_setLastPanVelocity).call(this, deltaX, deltaY);
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
    // Apply zoom resistance when past bounds and rubberbanding is active.
    // Uses a reciprocal curve on the over-zoom ratio so that zooming further
    // past bounds requires increasingly more effort.
    if (this.usePanAndZoomRubberbanding && scale !== 1) {
        const { overWidthRatio, overHeightRatio, tooLargeWidth, tooLargeHeight, tooSmallWidth, tooSmallHeight } = __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_getZoomOverscroll).call(this);
        const overZoomRatio = Math.max(overWidthRatio, overHeightRatio);
        // scale > 1 means world gets larger (zooming out)
        // scale < 1 means world gets smaller (zooming in)
        const zoomingPastMax = (scale > 1)
            && (tooLargeWidth || tooLargeHeight);
        const zoomingPastMin = (scale < 1)
            && (tooSmallWidth || tooSmallHeight);
        if ((zoomingPastMax || zoomingPastMin) && overZoomRatio > 0) {
            const resistance = 1 / (1 + overZoomRatio * 3);
            scale = 1 + (scale - 1) * resistance;
        }
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
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").classList.add("WILSON_button");
        this.buttonContainer.appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f"));
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButtonIconPath, "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").appendChild(img);
        __classPrivateFieldGet(this, _Wilson_fullscreenEnterFullscreenButton, "f").addEventListener("click", () => {
            this.enterFullscreen();
        });
        __classPrivateFieldSet(this, _Wilson_fullscreenExitFullscreenButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").classList.add("WILSON_exit-fullscreen-button");
        __classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f").classList.add("WILSON_button");
        this.buttonContainer.appendChild(__classPrivateFieldGet(this, _Wilson_fullscreenExitFullscreenButton, "f"));
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
        __classPrivateFieldGet(this, _Wilson_resetButton, "f").classList.add("WILSON_button");
        this.buttonContainer.appendChild(__classPrivateFieldGet(this, _Wilson_resetButton, "f"));
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
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_syncFullscreenHiddenElements).call(this);
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
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this);
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
    // Compute per-draggable keyframes that track the canvas transform.
    const aspectRatioChange = windowAspectRatio / __classPrivateFieldGet(this, _Wilson_canvasAspectRatio, "f");
    const fullscreenWorldWidth = Math.max(__classPrivateFieldGet(this, _Wilson_worldWidth, "f") * aspectRatioChange, __classPrivateFieldGet(this, _Wilson_worldWidth, "f"));
    const fullscreenWorldHeight = Math.max(__classPrivateFieldGet(this, _Wilson_worldHeight, "f") / aspectRatioChange, __classPrivateFieldGet(this, _Wilson_worldHeight, "f"));
    let draggableRules = "";
    for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggables, "f"))) {
        const [wx, wy] = data.location;
        const dx = window.innerWidth
            * ((wx - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / fullscreenWorldWidth + 0.5);
        const dy = window.innerHeight
            * (1 - ((wy - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / fullscreenWorldHeight + 0.5));
        const A = newLeftStart + dx * (scaleStart - 1);
        const B = newTopStart + dy * (scaleStart - 1);
        const name = `WILSON_draggable-${id}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`;
        draggableRules += `
				@keyframes WILSON_draggable-${id}-enter-move-${__classPrivateFieldGet(this, _Wilson_salt, "f")}
				{
					from { transform: translate(${A}px, ${B}px); }
					to { transform: translate(0px, 0px); }
				}
				::view-transition-group(${name}) { animation: none; }
				::view-transition-old(${name}) { animation: none; opacity: 0; }
				::view-transition-new(${name}) {
					animation-name: WILSON_draggable-${id}-enter-move-${__classPrivateFieldGet(this, _Wilson_salt, "f")};
					animation-fill-mode: both;
				}
			`;
    }
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
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			::view-transition-new(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation-name: WILSON_move-in;
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			${draggableRules}
		`;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = temporaryStyle;
    document.head.appendChild(styleElement);
    return styleElement;
}, _Wilson_syncFullscreenHiddenElements = function _Wilson_syncFullscreenHiddenElements() {
    for (const entry of this.additionalFullscreenViewTransitionElements) {
        entry.element.classList.toggle("WILSON_fullscreen-hidden", !!(__classPrivateFieldGet(this, _Wilson_currentlyFullscreen, "f") ? entry.hideInFullscreen : entry.hideOutOfFullscreen));
    }
}, _Wilson_fullscreenTransitionElementRect = function _Wilson_fullscreenTransitionElementRect(element) {
    const hidden = element.classList.contains("WILSON_fullscreen-hidden");
    if (hidden) {
        element.classList.remove("WILSON_fullscreen-hidden");
    }
    const rect = element.getBoundingClientRect();
    if (hidden) {
        element.classList.add("WILSON_fullscreen-hidden");
    }
    return { rect, hidden };
}, _Wilson_measureFullscreenTransitionElements = function _Wilson_measureFullscreenTransitionElements() {
    return this.additionalFullscreenViewTransitionElements.map(({ element }) => __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_fullscreenTransitionElementRect).call(this, element));
}, _Wilson_addFullscreenHiddenElementTransitionStyle = function _Wilson_addFullscreenHiddenElementTransitionStyle(before, after) {
    let rules = "";
    for (let i = 0; i < this.additionalFullscreenViewTransitionElements.length; i++) {
        const oldState = before[i];
        const newState = after[i];
        // Nothing to do when the element is on both sides (the default group
        // animation already moves it) or on neither (there's no snapshot at all).
        if (!oldState
            || !newState
            || oldState.hidden === newState.hidden
            || (!oldState.rect.width && !oldState.rect.height)
            || (!newState.rect.width && !newState.rect.height)) {
            continue;
        }
        const name = `WILSON_transitioning-element-${i}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`;
        const keyframesName = `WILSON_transitioning-element-${i}-fade-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`;
        const dx = newState.rect.left - oldState.rect.left;
        const dy = newState.rect.top - oldState.rect.top;
        /*
            The scaleX squeezes the snapshot down to nothing so that the element
            reads as collapsing out of the row rather than merely fading. Scaling
            about the default center origin lands the collapse on the midpoint of
            the slot the element would have filled, which is where its neighbors
            meet -- the translate is written first so it applies after the scale.

            Only ::view-transition-old exists when the element is leaving, and only
            ::view-transition-new when it's arriving.
        */
        rules += newState.hidden
            ? `
					@keyframes ${keyframesName}
					{
						from { transform: translate(0px, 0px) scaleX(1); opacity: 1; }
						to { transform: translate(${dx}px, ${dy}px) scaleX(0); opacity: 0; }
					}

					::view-transition-group(${name}) { animation: none; }

					::view-transition-old(${name})
					{
						animation-name: ${keyframesName};
						animation-fill-mode: both;
					}
				`
            : `
					@keyframes ${keyframesName}
					{
						from { transform: translate(${-dx}px, ${-dy}px) scaleX(0); opacity: 0; }
						to { transform: translate(0px, 0px) scaleX(1); opacity: 1; }
					}

					::view-transition-group(${name}) { animation: none; }

					::view-transition-new(${name})
					{
						animation-name: ${keyframesName};
						animation-fill-mode: both;
					}
				`;
    }
    if (!rules) {
        return null;
    }
    const styleElement = document.createElement("style");
    styleElement.innerHTML = rules;
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
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_syncFullscreenHiddenElements).call(this);
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
    __classPrivateFieldGet(this, _Wilson_instances, "m", _Wilson_updateDraggablesContainerSize).call(this);
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
    const S0 = scaleEnd / scaleStart;
    let draggableRules = "";
    for (const [id, data] of Object.entries(__classPrivateFieldGet(this, _Wilson_draggables, "f"))) {
        const [wx, wy] = data.location;
        const dx = __classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").width
            * ((wx - __classPrivateFieldGet(this, _Wilson_worldCenterX, "f")) / __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldWidth, "f") + 0.5);
        const dy = __classPrivateFieldGet(this, _Wilson_fullscreenCanvasRect, "f").height
            * (1 - ((wy - __classPrivateFieldGet(this, _Wilson_worldCenterY, "f")) / __classPrivateFieldGet(this, _Wilson_nonFullscreenWorldHeight, "f") + 0.5));
        const A = newLeftStart + dx * (S0 - 1);
        const B = newTopStart + dy * (S0 - 1);
        const name = `WILSON_draggable-${id}-${__classPrivateFieldGet(this, _Wilson_salt, "f")}`;
        draggableRules += `
				@keyframes WILSON_draggable-${id}-move-${__classPrivateFieldGet(this, _Wilson_salt, "f")}
				{
					from { transform: translate(${A}px, ${B}px); }
					to { transform: translate(0px, 0px); }
				}
				::view-transition-group(${name}) { animation: none; }
				::view-transition-old(${name}) { animation: none; opacity: 0; }
				::view-transition-new(${name}) {
					animation-name: WILSON_draggable-${id}-move-${__classPrivateFieldGet(this, _Wilson_salt, "f")};
					animation-fill-mode: both;
				}
			`;
    }
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
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			::view-transition-new(WILSON_canvas-${__classPrivateFieldGet(this, _Wilson_salt, "f")})
			{
				animation-name: WILSON_move-in-${__classPrivateFieldGet(this, _Wilson_salt, "f")};
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			${draggableRules}
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
        this.ctx.putImageData(new ImageData(
        // @ts-ignore
        image, this.canvasWidth, this.canvasHeight), 0, 0);
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
    vec2Array: (gl, location, value) => {
        return value instanceof Float32Array
            ? gl.uniform2fv(location, value)
            : gl.uniform2fv(location, value.flat());
    },
    vec3Array: (gl, location, value) => {
        return value instanceof Float32Array
            ? gl.uniform3fv(location, value)
            : gl.uniform3fv(location, value.flat());
    },
    vec4Array: (gl, location, value) => {
        return value instanceof Float32Array
            ? gl.uniform4fv(location, value)
            : gl.uniform4fv(location, value.flat());
    },
    mat2: (gl, location, value) => {
        return value instanceof Float32Array
            ? gl.uniformMatrix2fv(location, false, value)
            : gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]);
    },
    mat3: (gl, location, value) => {
        return value instanceof Float32Array
            ? gl.uniformMatrix3fv(location, false, value)
            : gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]);
    },
    mat4: (gl, location, value) => {
        return value instanceof Float32Array
            ? gl.uniformMatrix4fv(location, false, value)
            : gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]);
    },
};
const XR_MODE = "immersive-vr";
const REFERENCE_SPACE = "local";
// Shared between the layer built when a session starts and every replacement that
// xrFramebufferScale swaps in, so that changing the scale can't quietly change anything
// else about the framebuffer.
const XR_LAYER_OPTIONS = {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: true,
};
// The xr-standard mapping, in order. Anything past index 5 is device-specific and lands in
// `extraButtons` instead (the Quest's thumbrest, for instance). The system/menu button is
// reserved by the runtime and is never exposed here at all.
const XR_BUTTON_NAMES = ["trigger", "squeeze", "touchpad", "thumbstick", "a", "b"];
function createXRButtonState() {
    return {
        pressed: false,
        touched: false,
        value: 0,
        justPressed: false,
        justReleased: false,
    };
}
function createXRControllerPose() {
    return {
        matrix: new Float32Array(16),
        position: new DOMPointReadOnly(0, 0, 0, 1),
        orientation: new DOMPointReadOnly(0, 0, 0, 1),
        linearVelocity: undefined,
        angularVelocity: undefined,
        emulatedPosition: false,
    };
}
export class WilsonGPU extends Wilson {
    get xrFramebufferScale() { return __classPrivateFieldGet(this, _WilsonGPU_xrFramebufferScale, "f"); }
    set xrFramebufferScale(value) {
        if (value <= 0) {
            if (this.verbose) {
                console.warn("[Wilson] Setting xrFramebufferScale to a nonpositive value has no effect.");
            }
            return;
        }
        // Rebuilding the layer is expensive enough that it's worth not doing it for a write
        // that wouldn't change anything.
        if (value === __classPrivateFieldGet(this, _WilsonGPU_xrFramebufferScale, "f")) {
            return;
        }
        __classPrivateFieldSet(this, _WilsonGPU_xrFramebufferScale, value, "f");
        if (!__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
            return;
        }
        // framebufferScaleFactor is fixed once a layer exists, so changing the render resolution
        // means building a replacement and swapping it in. That's allowed mid-session, but it
        // reallocates the swapchain and usually costs a frame or two, so this is a coarse quality
        // step to be debounced rather than a per-frame knob — xrViewportScale is the free one,
        // on the headsets that implement it.
        __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").session.updateRenderState({
            baseLayer: __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_createXRBaseLayer).call(this, __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").session)
        });
    }
    get xrViewportScale() { return __classPrivateFieldGet(this, _WilsonGPU_xrViewportScale, "f"); }
    set xrViewportScale(value) {
        if (value !== null && (value <= 0 || value > 1) && this.verbose) {
            console.warn("[Wilson] Setting xrViewportScale outside of (0, 1] has no effect.");
        }
        __classPrivateFieldSet(this, _WilsonGPU_xrViewportScale, value, "f");
    }
    get xrSupportedFrameRates() { var _a; return (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.session.supportedFrameRates; }
    get xrFrameRate() { var _a; return (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.session.frameRate; }
    get xrTargetFrameRate() { return __classPrivateFieldGet(this, _WilsonGPU_xrTargetFrameRate, "f"); }
    set xrTargetFrameRate(value) {
        __classPrivateFieldSet(this, _WilsonGPU_xrTargetFrameRate, value, "f");
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_applyXRTargetFrameRate).call(this);
    }
    get inXR() { return __classPrivateFieldGet(this, _WilsonGPU_xrData, "f") !== undefined; }
    get xrFramebufferWidth() { var _a; return (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.baseLayer.framebufferWidth; }
    get xrFramebufferHeight() { var _a; return (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.baseLayer.framebufferHeight; }
    get xrFixedFoveation() {
        var _a;
        // When in an XR session, return the actual foveation value; it may be undefined if
        // the headset doesn't support it. Outside a session, the base layer doesn't exist,
        // so return the value that was passed in, if any.
        if (__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
            // WebXR declares fixedFoveation as nullable, but the WebXR type is number | undefined,
            // so this normalizes null away.
            return (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").baseLayer.fixedFoveation) !== null && _a !== void 0 ? _a : undefined;
        }
        return __classPrivateFieldGet(this, _WilsonGPU_xrFixedFoveation, "f");
    }
    set xrFixedFoveation(value) {
        var _a;
        __classPrivateFieldSet(this, _WilsonGPU_xrFixedFoveation, value, "f");
        const baseLayer = (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.baseLayer;
        if (baseLayer) {
            baseLayer.fixedFoveation = value;
        }
    }
    get xrControllers() { return __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f"); }
    getXRController(handedness) {
        return __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f").find(controller => controller.handedness === handedness);
    }
    constructor(canvas, options) {
        var _a, _b, _c;
        super(canvas, options);
        _WilsonGPU_instances.add(this);
        _WilsonGPU_useWebGL2.set(this, void 0);
        _WilsonGPU_shaderPrograms.set(this, {});
        _WilsonGPU_shaderProgramSources.set(this, {});
        _WilsonGPU_uniforms.set(this, {});
        _WilsonGPU_useXRButton.set(this, false);
        _WilsonGPU_xrButtonIconPath.set(this, void 0);
        _WilsonGPU_xrButton.set(this, null);
        _WilsonGPU_xrButtonImg.set(this, null);
        _WilsonGPU_xrButtonText.set(this, null);
        this.xrIsSupported = Promise.resolve(false);
        _WilsonGPU_xrIsSupportedNow.set(this, null); // Resolves to a boolean once known.
        _WilsonGPU_renderXRFrame.set(this, () => { });
        // The single source of truth about the base layer. Its baseLayer is always the one the
        // current frame is rendering into, which is not necessarily the newest one handed to
        // updateRenderState(); #onXRFrame resyncs it from the session at the top of every frame.
        _WilsonGPU_xrData.set(this, void 0);
        _WilsonGPU_xrRequiredFeatures.set(this, []);
        _WilsonGPU_xrOptionalFeatures.set(this, []);
        _WilsonGPU_xrDepthNear.set(this, 0.1);
        _WilsonGPU_xrDepthFar.set(this, 1000);
        _WilsonGPU_xrFramebufferScale.set(this, 1);
        _WilsonGPU_xrViewportScale.set(this, null);
        _WilsonGPU_lastAppliedXRViewportScales.set(this, []);
        _WilsonGPU_xrTargetFrameRate.set(this, void 0);
        _WilsonGPU_lastXRTime.set(this, undefined);
        _WilsonGPU_enteringXR.set(this, false);
        _WilsonGPU_xrFixedFoveation.set(this, void 0);
        _WilsonGPU_xrCallbacks.set(this, {
            onEnter: () => { },
            onExit: () => { },
            onFrameStart: () => { },
            onAvailabilityChange: () => { },
            onVisibilityChange: () => { },
            onFrameRateChange: () => { },
            onControllerConnect: () => { },
            onControllerDisconnect: () => { },
            onSelectStart: () => { },
            onSelect: () => { },
            onSelectEnd: () => { },
            onSqueezeStart: () => { },
            onSqueeze: () => { },
            onSqueezeEnd: () => { },
            onButtonDown: () => { },
            onButtonUp: () => { }
        });
        _WilsonGPU_useXRHandTracking.set(this, false);
        // Keyed on the XRInputSource, whose object identity is stable for as long as the device
        // stays connected.
        _WilsonGPU_xrControllerData.set(this, new Map());
        // Rebuilt whenever the set of input sources changes, so that applets can hold onto it for
        // the duration of a frame without it being reallocated underneath them.
        _WilsonGPU_xrControllerList.set(this, []);
        // Used to restore the eye viewport correctly when switching back to the
        // headset's framebuffer.
        _WilsonGPU_xrViewport.set(this, null);
        // Tracked separately from #xrIsSupportedNow, which every check resets to null before it
        // knows the answer, so that a check whose result matches the last one reported can tell.
        _WilsonGPU_lastReportedXRAvailability.set(this, null);
        // Needs to be an arrow function to maintain its binding when passed to addEventListener
        _WilsonGPU_onDeviceChange.set(this, () => {
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_checkXRSupport).call(this);
        });
        _WilsonGPU_onPageFocus.set(this, () => {
            if (!document.hidden && __classPrivateFieldGet(this, _WilsonGPU_xrIsSupportedNow, "f") !== true && !this.inXR) {
                __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_checkXRSupport).call(this);
            }
        });
        _WilsonGPU_numShaders.set(this, 0);
        _WilsonGPU_currentShaderId.set(this, "0");
        _WilsonGPU_currentProgram.set(this, null);
        _WilsonGPU_framebuffers.set(this, {});
        _WilsonGPU_textures.set(this, {});
        _WilsonGPU_currentFramebufferId.set(this, null);
        _WilsonGPU_currentTextureId.set(this, null);
        _WilsonGPU_positionBuffers.set(this, []);
        _WilsonGPU_shaders.set(this, []);
        this.resizeCanvasGPU = () => {
            this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
        };
        _WilsonGPU_onXRFrame.set(this, (time, frame) => {
            var _a, _b;
            if (!__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
                return;
            }
            const deltaTime = time - ((_a = __classPrivateFieldGet(this, _WilsonGPU_lastXRTime, "f")) !== null && _a !== void 0 ? _a : time);
            __classPrivateFieldSet(this, _WilsonGPU_lastXRTime, time, "f");
            const { session, refSpace } = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f");
            // Queue the next frame first so an exception mid-render doesn't stall the loop.
            session.requestAnimationFrame(__classPrivateFieldGet(this, _WilsonGPU_onXRFrame, "f"));
            // updateRenderState() takes effect asynchronously, so a layer swapped in by
            // xrFramebufferScale isn't the one this frame renders into until the runtime says it is.
            // The session's own render state is the only thing that knows which layer that is, so
            // everything else reads #xrData.baseLayer and this keeps it honest.
            const baseLayer = session.renderState.baseLayer;
            if (!baseLayer) {
                __classPrivateFieldSet(this, _WilsonGPU_lastXRTime, undefined, "f");
                return;
            }
            if (baseLayer !== __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").baseLayer) {
                // A fresh layer starts at full size no matter what the one it replaced had applied,
                // so these have to be forgotten or the scale below would be suppressed as redundant
                // and never actually reapplied.
                __classPrivateFieldGet(this, _WilsonGPU_lastAppliedXRViewportScales, "f").length = 0;
                __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").baseLayer = baseLayer;
            }
            if (session.visibilityState === "hidden") {
                // Treat skipped frames as a discontinuity.
                __classPrivateFieldSet(this, _WilsonGPU_lastXRTime, undefined, "f");
                // The runtime has taken input for a system menu, and it won't report the releases.
                // Without this, a button held when the menu opened would still read as pressed once
                // the applet comes back.
                for (const { controller } of __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").values()) {
                    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_releaseXRControllerButtons).call(this, controller, { time, frame, refSpace, session });
                }
                return;
            }
            // Deliberately ahead of the viewer pose check below: a controller's buttons and axes are
            // still perfectly valid on a frame where head tracking dropped out, and skipping the poll
            // would desync every justPressed edge.
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_updateXRControllers).call(this, time, frame, refSpace, session);
            const pose = frame.getViewerPose(refSpace);
            // Null when tracking is temporarily lost — skip the frame.
            if (!pose) {
                __classPrivateFieldSet(this, _WilsonGPU_lastXRTime, undefined, "f");
                return;
            }
            // This binds the framebuffer directly since useFramebuffer() early-returns
            // if the ID matches the current one, and both the canvas and the XR framebuffer
            // use null as their ID.
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, baseLayer.framebuffer);
            __classPrivateFieldSet(this, _WilsonGPU_currentFramebufferId, null, "f");
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            const { views, emulatedPosition } = pose;
            // Give the callback a predictable, full-framebuffer viewport; the loop below
            // sets the per-eye viewport before each view renders.
            this.gl.viewport(0, 0, baseLayer.framebufferWidth, baseLayer.framebufferHeight);
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onFrameStart({
                time,
                deltaTime,
                frame,
                session,
                refSpace,
                pose
            });
            try {
                // One view per eye (two for stereo VR), sharing the framebuffer via side-by-side viewports.
                for (let viewIndex = 0; viewIndex < views.length; viewIndex++) {
                    const view = views[viewIndex];
                    const scale = (_b = __classPrivateFieldGet(this, _WilsonGPU_xrViewportScale, "f")) !== null && _b !== void 0 ? _b : view.recommendedViewportScale;
                    if (scale && scale !== __classPrivateFieldGet(this, _WilsonGPU_lastAppliedXRViewportScales, "f")[viewIndex]) {
                        view.requestViewportScale(scale);
                        __classPrivateFieldGet(this, _WilsonGPU_lastAppliedXRViewportScales, "f")[viewIndex] = scale;
                    }
                    const viewport = baseLayer.getViewport(view);
                    if (!viewport) {
                        // Skip this eye, not the whole frame
                        continue;
                    }
                    __classPrivateFieldSet(this, _WilsonGPU_xrViewport, viewport, "f");
                    this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
                    __classPrivateFieldGet(this, _WilsonGPU_renderXRFrame, "f").call(this, {
                        view,
                        projectionMatrix: view.projectionMatrix,
                        cameraToWorld: view.transform.matrix,
                        eye: view.eye,
                        viewIndex,
                        numViews: views.length,
                        viewport,
                        time,
                        deltaTime,
                        frame,
                        refSpace,
                        position: view.transform.position,
                        emulatedPosition,
                        session,
                        pose,
                    });
                }
            }
            finally {
                __classPrivateFieldSet(this, _WilsonGPU_xrViewport, null, "f");
            }
        }
        // Needs to be an arrow function to maintain its binding when passed to addEventListener.
        );
        // Needs to be an arrow function to maintain its binding when passed to addEventListener.
        _WilsonGPU_onXRInputSourcesChange.set(this, () => {
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_syncXRControllers).call(this);
        });
        _WilsonGPU_onXREnd.set(this, () => {
            var _a;
            const session = (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.session;
            const disconnected = __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f");
            __classPrivateFieldSet(this, _WilsonGPU_xrData, undefined, "f");
            __classPrivateFieldSet(this, _WilsonGPU_lastAppliedXRViewportScales, [], "f");
            __classPrivateFieldSet(this, _WilsonGPU_lastXRTime, undefined, "f");
            __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").clear();
            __classPrivateFieldSet(this, _WilsonGPU_xrControllerList, [], "f");
            // This binds the framebuffer directly since useFramebuffer() early-returns
            // if the ID matches the current one, and both the canvas and the XR framebuffer
            // use null as their ID.
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            __classPrivateFieldSet(this, _WilsonGPU_currentFramebufferId, null, "f");
            this.resizeCanvasGPU();
            this.animationFrameLoopPaused = false;
            // Every controller goes away with the session, so applets holding onto them hear about
            // it the same way they would if a controller had been switched off mid-session.
            if (session) {
                for (const controller of disconnected) {
                    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_releaseXRControllerButtons).call(this, controller, null);
                    controller.targetRay = null;
                    controller.grip = null;
                    controller.selecting = false;
                    controller.squeezing = false;
                    __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onControllerDisconnect({
                        controller,
                        controllers: __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f"),
                        session
                    });
                }
            }
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onExit();
        });
        __classPrivateFieldSet(this, _WilsonGPU_useWebGL2, (_a = options.useWebGL2) !== null && _a !== void 0 ? _a : true, "f");
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_initXR).call(this, options.xrOptions);
        const getContextOptions = {
            xrCompatible: true,
            powerPreference: "high-performance",
            antialias: false,
            depth: false,
            stencil: false,
        };
        const gl = __classPrivateFieldGet(this, _WilsonGPU_useWebGL2, "f")
            ? (_b = canvas.getContext("webgl2", getContextOptions)) !== null && _b !== void 0 ? _b : canvas.getContext("webgl", getContextOptions)
            : canvas.getContext("webgl", getContextOptions);
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
    loadShader({ id = __classPrivateFieldGet(this, _WilsonGPU_numShaders, "f").toString(), shader, uniforms = {} }) {
        var _a, _b;
        var _c;
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
        __classPrivateFieldGet(this, _WilsonGPU_shaders, "f").push(vertexShader, fragShader);
        const shaderProgram = this.gl.createProgram();
        if (!shaderProgram) {
            throw new Error(`[Wilson] Couldn't create shader program. Full shader source: ${shader}`);
        }
        __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id] = shaderProgram;
        __classPrivateFieldGet(this, _WilsonGPU_shaderProgramSources, "f")[id] = shader;
        __classPrivateFieldSet(this, _WilsonGPU_numShaders, (_c = __classPrivateFieldGet(this, _WilsonGPU_numShaders, "f"), _c++, _c), "f");
        this.gl.attachShader(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], vertexShader);
        this.gl.attachShader(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], fragShader);
        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.shaderSource(fragShader, shader);
        this.gl.compileShader(vertexShader);
        this.gl.compileShader(fragShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            const infoLog = (_a = this.gl.getShaderInfoLog(vertexShader)) !== null && _a !== void 0 ? _a : "";
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_logShaderSource).call(this, vertexShaderSource, infoLog);
            console.groupCollapsed(`[Wilson] Full non-compiled vertex shader source:`);
            console.log(shader);
            console.groupEnd();
            throw new Error(`[Wilson] Couldn't compile vertex shader with id ${id}. ${infoLog}`);
        }
        if (!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS)) {
            const infoLog = (_b = this.gl.getShaderInfoLog(fragShader)) !== null && _b !== void 0 ? _b : "";
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_logShaderSource).call(this, shader, infoLog);
            console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
            console.log(shader);
            console.groupEnd();
            throw new Error(`[Wilson] Couldn't compile fragment shader with id ${id}. ${infoLog}`);
        }
        this.gl.linkProgram(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            throw new Error(`[Wilson] Couldn't link shader program with id ${id}: ${this.gl.getProgramInfoLog(shaderProgram)}`);
        }
        this.useShader(id);
        const positionBuffer = this.gl.createBuffer();
        if (!positionBuffer) {
            throw new Error(`[Wilson] Couldn't create position buffer with id ${id}.`);
        }
        __classPrivateFieldGet(this, _WilsonGPU_positionBuffers, "f").push(positionBuffer);
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
            console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
            console.log(shader);
            console.groupEnd();
            throw new Error(`[Wilson] Couldn't get position attribute for shader with id ${id}.`);
        }
        this.gl.enableVertexAttribArray(positionAttribute);
        this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
        // Initialize the uniforms.
        __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[id] = {};
        for (const [name, value] of Object.entries(uniforms)) {
            const location = this.gl.getUniformLocation(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id], name);
            if (location === null) {
                if (this.verbose) {
                    console.warn(`[Wilson] Couldn't get uniform location for ${name} in shader with id ${id}. Check that it is used in the shader (so that it is not compiled away).`);
                }
                continue;
            }
            // Match strings like "uniform int foo;" to "int".
            const match = shader.match(new RegExp(`uniform\\s+(\\S+?)\\s+${name}(\\[\\d+\\])?\\s*;`));
            if (!match) {
                console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
                console.log(shader);
                console.groupEnd();
                throw new Error(`[Wilson] Couldn't find uniform ${name} in shader with id ${id}.`);
            }
            const type = match[1].trim() + (match[2] ? "Array" : "");
            if (!(type in uniformFunctions)) {
                console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
                console.log(shader);
                console.groupEnd();
                throw new Error(`[Wilson] Invalid uniform type ${type} for uniform ${name} in shader with id ${id}.`);
            }
            __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[id][name] = { location, type: type };
            this.setUniforms({ [name]: value });
        }
    }
    setUniform(name, value, shader = __classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")) {
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_useProgram).call(this, __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[shader]);
        if (__classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name] !== undefined) {
            const { location, type } = __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name];
            const uniformFunction = uniformFunctions[type];
            __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name].value = value;
            uniformFunction(this.gl, location, value);
        }
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_useProgram).call(this, __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[__classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")]);
    }
    setUniforms(uniforms, shader = __classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")) {
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_useProgram).call(this, __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[shader]);
        for (const [name, value] of Object.entries(uniforms)) {
            if (__classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name] === undefined) {
                continue;
            }
            const { location, type } = __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name];
            const uniformFunction = uniformFunctions[type];
            __classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[shader][name].value = value;
            uniformFunction(this.gl, location, value);
        }
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_useProgram).call(this, __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[__classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")]);
    }
    useShader(id) {
        __classPrivateFieldSet(this, _WilsonGPU_currentShaderId, id, "f");
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_useProgram).call(this, __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
    }
    createFramebufferTexturePair({ id, width, height, textureType }) {
        const currentFramebufferId = __classPrivateFieldGet(this, _WilsonGPU_currentFramebufferId, "f");
        const currentTextureId = __classPrivateFieldGet(this, _WilsonGPU_currentTextureId, "f");
        // Delete any existing pair with this ID so they don't leak.
        this.deleteFramebufferTexturePair(id);
        // Set default width and height.
        if (this.inXR) {
            width !== null && width !== void 0 ? width : (width = this.xrFramebufferWidth);
            height !== null && height !== void 0 ? height : (height = this.xrFramebufferHeight);
            if (width === undefined || height === undefined) {
                throw new Error("[Wilson] Cannot get XR framebuffer size.");
            }
        }
        else {
            width !== null && width !== void 0 ? width : (width = this.canvasWidth);
            height !== null && height !== void 0 ? height : (height = this.canvasHeight);
        }
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
        __classPrivateFieldSet(this, _WilsonGPU_currentTextureId, id, "f");
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, (textureType === "float" && this.gl instanceof WebGL2RenderingContext)
            ? this.gl.RGBA32F
            : this.gl.RGBA, width, height, 0, this.gl.RGBA, textureType === "float"
            ? this.gl.FLOAT
            : this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
        __classPrivateFieldSet(this, _WilsonGPU_currentFramebufferId, id, "f");
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id] = framebuffer;
        __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id] = {
            texture,
            width,
            height,
            type: textureType,
        };
        this.useFramebuffer(currentFramebufferId);
        this.useTexture(currentTextureId);
    }
    deleteFramebufferTexturePair(id) {
        if (__classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id]) {
            // Deleting a bound framebuffer makes WebGL revert the binding to the default one,
            // so the cached ID has to follow.
            if (__classPrivateFieldGet(this, _WilsonGPU_currentFramebufferId, "f") === id) {
                __classPrivateFieldSet(this, _WilsonGPU_currentFramebufferId, null, "f");
            }
            this.gl.deleteFramebuffer(__classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id]);
            delete __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id];
        }
        if (__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id]) {
            // Likewise, deleting a bound texture reverts the binding to null.
            if (__classPrivateFieldGet(this, _WilsonGPU_currentTextureId, "f") === id) {
                __classPrivateFieldSet(this, _WilsonGPU_currentTextureId, null, "f");
            }
            this.gl.deleteTexture(__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].texture);
            delete __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id];
        }
    }
    useFramebuffer(id) {
        if (id === __classPrivateFieldGet(this, _WilsonGPU_currentFramebufferId, "f")) {
            return;
        }
        if (id !== null && !__classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id]) {
            throw new Error(`[Wilson] No framebuffer with ID ${id}.`);
        }
        __classPrivateFieldSet(this, _WilsonGPU_currentFramebufferId, id, "f");
        if (id === null) {
            if (__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").baseLayer.framebuffer);
                if (__classPrivateFieldGet(this, _WilsonGPU_xrViewport, "f")) {
                    const { x, y, width, height } = __classPrivateFieldGet(this, _WilsonGPU_xrViewport, "f");
                    this.gl.viewport(x, y, width, height);
                }
                return;
            }
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            return;
        }
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id]);
    }
    useTexture(id) {
        if (id === __classPrivateFieldGet(this, _WilsonGPU_currentTextureId, "f")) {
            return;
        }
        if (id !== null && !__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id]) {
            throw new Error(`[Wilson] No texture with ID ${id}.`);
        }
        __classPrivateFieldSet(this, _WilsonGPU_currentTextureId, id, "f");
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
        const oldId = __classPrivateFieldGet(this, _WilsonGPU_currentTextureId, "f");
        this.useTexture(id);
        if (data === null || data instanceof Uint8Array || data instanceof Float32Array) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, (__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type === "float" && this.gl instanceof WebGL2RenderingContext)
                ? this.gl.RGBA32F
                : this.gl.RGBA, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].width, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].height, 0, this.gl.RGBA, __classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].type === "float"
                ? this.gl.FLOAT
                : this.gl.UNSIGNED_BYTE, data);
        }
        else {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        }
        this.useTexture(oldId);
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
				) => {
					return value instanceof Float32Array
						? gl.uniform2fv(location, value)
						: gl.uniform2fv(location, value.flat());
				},

				vec3Array: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniform3fv(location, value)
						: gl.uniform3fv(location, value.flat());
				},
				
				vec4Array: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniform4fv(location, value)
						: gl.uniform4fv(location, value.flat());
				},

				mat2: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniformMatrix2fv(location, false, value)
						: gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]);
				},
				
				mat3: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniformMatrix3fv(location, false, value)
						: gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]);
				},
				
				mat4: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniformMatrix4fv(location, false, value)
						: gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]);
				},
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

				if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
				{
					console.groupCollapsed("[Wilson] Full non-compiled vertex shader source:");
					console.log(vertexShaderSource);
					console.groupEnd();

					throw new Error("[Wilson] Couldn't compile vertex shader: " + gl.getShaderInfoLog(vertexShader));
				}

				if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
				{
					console.groupCollapsed("[Wilson] Full non-compiled fragment shader source:");
					console.log(shader);
					console.groupEnd();

					throw new Error("[Wilson] Couldn't compile fragment shader: " + gl.getShaderInfoLog(fragShader));
				}

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
        for (const [name, data] of Object.entries(__classPrivateFieldGet(this, _WilsonGPU_uniforms, "f")[__classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")])) {
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
            shader: __classPrivateFieldGet(this, _WilsonGPU_shaderProgramSources, "f")[__classPrivateFieldGet(this, _WilsonGPU_currentShaderId, "f")],
            uniforms: uniformData,
            canvasWidth,
            canvasHeight,
            options: {
                useWebGL2: __classPrivateFieldGet(this, _WilsonGPU_useWebGL2, "f"),
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
        const colorSpace = (this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
            ? "display-p3"
            : "srgb";
        const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height, { colorSpace });
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", {
            colorSpace,
        });
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
                    console.error("[Wilson] Could not create a canvas blob.");
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
    async enterXR() {
        if (this.inXR || __classPrivateFieldGet(this, _WilsonGPU_enteringXR, "f") || __classPrivateFieldGet(this, _WilsonGPU_xrIsSupportedNow, "f") === false) {
            return false;
        }
        __classPrivateFieldSet(this, _WilsonGPU_enteringXR, true, "f");
        if (!navigator.xr) {
            __classPrivateFieldSet(this, _WilsonGPU_enteringXR, false, "f");
            return false;
        }
        let session;
        try {
            // This has to happen before any other await, since requestSession consumes the
            // transient user activation from the click that got us here, and that activation
            // expires on a timer: awaiting a support check first can let it lapse and make this
            // throw a SecurityError even though the headset is perfectly available.
            session = await navigator.xr.requestSession(XR_MODE, {
                requiredFeatures: __classPrivateFieldGet(this, _WilsonGPU_xrRequiredFeatures, "f"),
                optionalFeatures: __classPrivateFieldGet(this, _WilsonGPU_xrOptionalFeatures, "f"),
            });
        }
        catch (ex) {
            if (this.verbose) {
                console.error(`[Wilson] Couldn't create XR session: ${ex}`);
            }
            // The request may have failed because support changed since the last check, so this
            // resyncs #xrIsSupportedNow and the button's visibility with reality.
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_checkXRSupport).call(this);
            __classPrivateFieldSet(this, _WilsonGPU_enteringXR, false, "f");
            return false;
        }
        try {
            // Initializes the framebuffer (both eyes, side-by-side).
            const baseLayer = __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_createXRBaseLayer).call(this, session);
            session.updateRenderState({
                baseLayer,
                depthNear: __classPrivateFieldGet(this, _WilsonGPU_xrDepthNear, "f"),
                depthFar: __classPrivateFieldGet(this, _WilsonGPU_xrDepthFar, "f")
            });
            const refSpace = await session.requestReferenceSpace(REFERENCE_SPACE);
            __classPrivateFieldSet(this, _WilsonGPU_xrData, { session, refSpace, baseLayer }, "f");
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_applyXRTargetFrameRate).call(this);
            session.addEventListener("visibilitychange", () => {
                __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onVisibilityChange(session.visibilityState);
            });
            session.addEventListener("frameratechange", () => {
                __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onFrameRateChange(session.frameRate);
            });
            session.addEventListener("inputsourceschange", __classPrivateFieldGet(this, _WilsonGPU_onXRInputSourcesChange, "f"));
            session.addEventListener("selectstart", event => __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_dispatchXRInputSourceEvent).call(this, event, "onSelectStart", { selecting: true }));
            session.addEventListener("select", event => __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_dispatchXRInputSourceEvent).call(this, event, "onSelect"));
            session.addEventListener("selectend", event => __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_dispatchXRInputSourceEvent).call(this, event, "onSelectEnd", { selecting: false }));
            session.addEventListener("squeezestart", event => __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_dispatchXRInputSourceEvent).call(this, event, "onSqueezeStart", { squeezing: true }));
            session.addEventListener("squeeze", event => __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_dispatchXRInputSourceEvent).call(this, event, "onSqueeze"));
            session.addEventListener("squeezeend", event => __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_dispatchXRInputSourceEvent).call(this, event, "onSqueezeEnd", { squeezing: false }));
            session.addEventListener("end", __classPrivateFieldGet(this, _WilsonGPU_onXREnd, "f"));
            session.requestAnimationFrame(__classPrivateFieldGet(this, _WilsonGPU_onXRFrame, "f"));
            __classPrivateFieldSet(this, _WilsonGPU_enteringXR, false, "f");
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onEnter();
            this.animationFrameLoopPaused = true;
            // Controllers that were already connected when the session started don't necessarily
            // arrive via inputsourceschange, and this populates xrControllers before enterXR
            // resolves. After onEnter, so that a session is never reported as having controllers
            // before it's reported as having started.
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_syncXRControllers).call(this);
            return true;
        }
        catch (ex) {
            if (this.verbose) {
                console.error(`[Wilson] Couldn't enter XR: ${ex}`);
            }
            __classPrivateFieldSet(this, _WilsonGPU_xrData, undefined, "f");
            __classPrivateFieldSet(this, _WilsonGPU_enteringXR, false, "f");
            await session.end().catch(() => { });
            return false;
        }
    }
    async exitXR() {
        if (!__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
            return;
        }
        await __classPrivateFieldGet(this, _WilsonGPU_xrData, "f").session.end();
    }
    destroy() {
        var _a;
        super.destroy();
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_clearXRFunctions).call(this);
        this.exitXR().catch(() => { });
        __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").clear();
        __classPrivateFieldSet(this, _WilsonGPU_xrControllerList, [], "f");
        (_a = navigator.xr) === null || _a === void 0 ? void 0 : _a.removeEventListener("devicechange", __classPrivateFieldGet(this, _WilsonGPU_onDeviceChange, "f"));
        window.removeEventListener("focus", __classPrivateFieldGet(this, _WilsonGPU_onPageFocus, "f"));
        document.removeEventListener("visibilitychange", __classPrivateFieldGet(this, _WilsonGPU_onPageFocus, "f"));
        // Delete all textures.
        for (const id in __classPrivateFieldGet(this, _WilsonGPU_textures, "f")) {
            this.gl.deleteTexture(__classPrivateFieldGet(this, _WilsonGPU_textures, "f")[id].texture);
        }
        __classPrivateFieldSet(this, _WilsonGPU_textures, {}, "f");
        // Delete all framebuffers.
        for (const id in __classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")) {
            this.gl.deleteFramebuffer(__classPrivateFieldGet(this, _WilsonGPU_framebuffers, "f")[id]);
        }
        __classPrivateFieldSet(this, _WilsonGPU_framebuffers, {}, "f");
        // Delete all shader programs (this also detaches shaders).
        for (const id in __classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")) {
            this.gl.deleteProgram(__classPrivateFieldGet(this, _WilsonGPU_shaderPrograms, "f")[id]);
        }
        __classPrivateFieldSet(this, _WilsonGPU_shaderPrograms, {}, "f");
        __classPrivateFieldSet(this, _WilsonGPU_shaderProgramSources, {}, "f");
        __classPrivateFieldSet(this, _WilsonGPU_currentProgram, null, "f");
        // Delete all buffers.
        for (const buffer of __classPrivateFieldGet(this, _WilsonGPU_positionBuffers, "f")) {
            this.gl.deleteBuffer(buffer);
        }
        __classPrivateFieldSet(this, _WilsonGPU_positionBuffers, [], "f");
        // Delete all shaders.
        for (const shader of __classPrivateFieldGet(this, _WilsonGPU_shaders, "f")) {
            this.gl.deleteShader(shader);
        }
        __classPrivateFieldSet(this, _WilsonGPU_shaders, [], "f");
        // Clear uniform references.
        __classPrivateFieldSet(this, _WilsonGPU_uniforms, {}, "f");
        // Lose the WebGL context to free up the context slot.
        const loseContext = this.gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
            loseContext.loseContext();
        }
    }
}
_WilsonGPU_useWebGL2 = new WeakMap(), _WilsonGPU_shaderPrograms = new WeakMap(), _WilsonGPU_shaderProgramSources = new WeakMap(), _WilsonGPU_uniforms = new WeakMap(), _WilsonGPU_useXRButton = new WeakMap(), _WilsonGPU_xrButtonIconPath = new WeakMap(), _WilsonGPU_xrButton = new WeakMap(), _WilsonGPU_xrButtonImg = new WeakMap(), _WilsonGPU_xrButtonText = new WeakMap(), _WilsonGPU_xrIsSupportedNow = new WeakMap(), _WilsonGPU_renderXRFrame = new WeakMap(), _WilsonGPU_xrData = new WeakMap(), _WilsonGPU_xrRequiredFeatures = new WeakMap(), _WilsonGPU_xrOptionalFeatures = new WeakMap(), _WilsonGPU_xrDepthNear = new WeakMap(), _WilsonGPU_xrDepthFar = new WeakMap(), _WilsonGPU_xrFramebufferScale = new WeakMap(), _WilsonGPU_xrViewportScale = new WeakMap(), _WilsonGPU_lastAppliedXRViewportScales = new WeakMap(), _WilsonGPU_xrTargetFrameRate = new WeakMap(), _WilsonGPU_lastXRTime = new WeakMap(), _WilsonGPU_enteringXR = new WeakMap(), _WilsonGPU_xrFixedFoveation = new WeakMap(), _WilsonGPU_xrCallbacks = new WeakMap(), _WilsonGPU_useXRHandTracking = new WeakMap(), _WilsonGPU_xrControllerData = new WeakMap(), _WilsonGPU_xrControllerList = new WeakMap(), _WilsonGPU_xrViewport = new WeakMap(), _WilsonGPU_lastReportedXRAvailability = new WeakMap(), _WilsonGPU_onDeviceChange = new WeakMap(), _WilsonGPU_onPageFocus = new WeakMap(), _WilsonGPU_numShaders = new WeakMap(), _WilsonGPU_currentShaderId = new WeakMap(), _WilsonGPU_currentProgram = new WeakMap(), _WilsonGPU_framebuffers = new WeakMap(), _WilsonGPU_textures = new WeakMap(), _WilsonGPU_currentFramebufferId = new WeakMap(), _WilsonGPU_currentTextureId = new WeakMap(), _WilsonGPU_positionBuffers = new WeakMap(), _WilsonGPU_shaders = new WeakMap(), _WilsonGPU_onXRFrame = new WeakMap(), _WilsonGPU_onXRInputSourcesChange = new WeakMap(), _WilsonGPU_onXREnd = new WeakMap(), _WilsonGPU_instances = new WeakSet(), _WilsonGPU_createXRBaseLayer = function _WilsonGPU_createXRBaseLayer(session) {
    const baseLayer = new XRWebGLLayer(session, this.gl, {
        ...XR_LAYER_OPTIONS,
        // Headsets can run in a low-res mode by default for headroom, so the native factor
        // ensures we're rendering all the pixels available, and the applet's own factor
        // scales down from there.
        framebufferScaleFactor: XRWebGLLayer.getNativeFramebufferScaleFactor(session)
            * __classPrivateFieldGet(this, _WilsonGPU_xrFramebufferScale, "f")
    });
    // Foveation is a property of the layer, so a replacement starts at the runtime's default
    // instead of inheriting what the layer it's replacing had.
    baseLayer.fixedFoveation = __classPrivateFieldGet(this, _WilsonGPU_xrFixedFoveation, "f");
    return baseLayer;
}, _WilsonGPU_logShaderSource = function _WilsonGPU_logShaderSource(source, infoLog) {
    const match = infoLog.match(/\b0:(\d+)/);
    if (!match) {
        console.log(source);
        return;
    }
    const errorLine = parseInt(match[1]);
    const lines = source.split("\n");
    const numContextLines = 4;
    const start = Math.max(0, errorLine - numContextLines - 1);
    const end = Math.min(lines.length, errorLine + numContextLines);
    const normalStyle = "";
    const errorStyle = "color: red; font-weight: bold";
    const parts = [];
    const styles = [];
    for (let i = start; i < end; i++) {
        const lineNum = String(i + 1).padStart(4);
        parts.push(`%c${lineNum} | ${lines[i]}`);
        styles.push(i + 1 === errorLine ? errorStyle : normalStyle);
    }
    console.log(parts.join("\n"), ...styles);
}, _WilsonGPU_initXR = function _WilsonGPU_initXR(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    __classPrivateFieldSet(this, _WilsonGPU_useXRButton, (_a = options === null || options === void 0 ? void 0 : options.useButton) !== null && _a !== void 0 ? _a : false, "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrButtonIconPath, (options === null || options === void 0 ? void 0 : options.useButton) ? options.buttonIconPath : undefined, "f");
    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_initXRButton).call(this);
    (_b = navigator.xr) === null || _b === void 0 ? void 0 : _b.addEventListener("devicechange", __classPrivateFieldGet(this, _WilsonGPU_onDeviceChange, "f"));
    // Chrome on Windows doesn't reliably fire devicechange when an OpenXR runtime starts
    // after the page has already checked, so a headset connected mid-session never shows
    // the button. Re-checking when the tab regains focus covers the usual flow of leaving
    // to connect the headset and coming back.
    window.addEventListener("focus", __classPrivateFieldGet(this, _WilsonGPU_onPageFocus, "f"));
    document.addEventListener("visibilitychange", __classPrivateFieldGet(this, _WilsonGPU_onPageFocus, "f"));
    __classPrivateFieldSet(this, _WilsonGPU_renderXRFrame, (_c = options === null || options === void 0 ? void 0 : options.renderFrame) !== null && _c !== void 0 ? _c : (() => { }), "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrCallbacks, {
        onEnter: (_d = options === null || options === void 0 ? void 0 : options.onEnter) !== null && _d !== void 0 ? _d : (() => { }),
        onExit: (_e = options === null || options === void 0 ? void 0 : options.onExit) !== null && _e !== void 0 ? _e : (() => { }),
        onFrameStart: (_f = options === null || options === void 0 ? void 0 : options.onFrameStart) !== null && _f !== void 0 ? _f : (() => { }),
        onAvailabilityChange: (_g = options === null || options === void 0 ? void 0 : options.onAvailabilityChange) !== null && _g !== void 0 ? _g : (() => { }),
        onVisibilityChange: (_h = options === null || options === void 0 ? void 0 : options.onVisibilityChange) !== null && _h !== void 0 ? _h : (() => { }),
        onFrameRateChange: (_j = options === null || options === void 0 ? void 0 : options.onFrameRateChange) !== null && _j !== void 0 ? _j : (() => { }),
        onControllerConnect: (_k = options === null || options === void 0 ? void 0 : options.onControllerConnect) !== null && _k !== void 0 ? _k : (() => { }),
        onControllerDisconnect: (_l = options === null || options === void 0 ? void 0 : options.onControllerDisconnect) !== null && _l !== void 0 ? _l : (() => { }),
        onSelectStart: (_m = options === null || options === void 0 ? void 0 : options.onSelectStart) !== null && _m !== void 0 ? _m : (() => { }),
        onSelect: (_o = options === null || options === void 0 ? void 0 : options.onSelect) !== null && _o !== void 0 ? _o : (() => { }),
        onSelectEnd: (_p = options === null || options === void 0 ? void 0 : options.onSelectEnd) !== null && _p !== void 0 ? _p : (() => { }),
        onSqueezeStart: (_q = options === null || options === void 0 ? void 0 : options.onSqueezeStart) !== null && _q !== void 0 ? _q : (() => { }),
        onSqueeze: (_r = options === null || options === void 0 ? void 0 : options.onSqueeze) !== null && _r !== void 0 ? _r : (() => { }),
        onSqueezeEnd: (_s = options === null || options === void 0 ? void 0 : options.onSqueezeEnd) !== null && _s !== void 0 ? _s : (() => { }),
        onButtonDown: (_t = options === null || options === void 0 ? void 0 : options.onButtonDown) !== null && _t !== void 0 ? _t : (() => { }),
        onButtonUp: (_u = options === null || options === void 0 ? void 0 : options.onButtonUp) !== null && _u !== void 0 ? _u : (() => { })
    }, "f");
    // Deliberately after the callbacks are in place: the first check reports its result, and
    // an applet that passed onAvailabilityChange should hear about it.
    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_checkXRSupport).call(this);
    __classPrivateFieldSet(this, _WilsonGPU_xrRequiredFeatures, (_v = options === null || options === void 0 ? void 0 : options.requiredFeatures) !== null && _v !== void 0 ? _v : [], "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrOptionalFeatures, (_w = options === null || options === void 0 ? void 0 : options.optionalFeatures) !== null && _w !== void 0 ? _w : [], "f");
    __classPrivateFieldSet(this, _WilsonGPU_useXRHandTracking, (_x = options === null || options === void 0 ? void 0 : options.useHandTracking) !== null && _x !== void 0 ? _x : false, "f");
    // Hand tracking only produces input sources with a `hand` if the session was asked
    // for it. Optional rather than required, so that a headset without it can still
    // start a session.
    if (__classPrivateFieldGet(this, _WilsonGPU_useXRHandTracking, "f")
        && !__classPrivateFieldGet(this, _WilsonGPU_xrRequiredFeatures, "f").includes("hand-tracking")
        && !__classPrivateFieldGet(this, _WilsonGPU_xrOptionalFeatures, "f").includes("hand-tracking")) {
        __classPrivateFieldSet(this, _WilsonGPU_xrOptionalFeatures, [...__classPrivateFieldGet(this, _WilsonGPU_xrOptionalFeatures, "f"), "hand-tracking"], "f");
    }
    __classPrivateFieldSet(this, _WilsonGPU_xrDepthNear, (_y = options === null || options === void 0 ? void 0 : options.depthNear) !== null && _y !== void 0 ? _y : 0.1, "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrDepthFar, (_z = options === null || options === void 0 ? void 0 : options.depthFar) !== null && _z !== void 0 ? _z : 1000, "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrFramebufferScale, (_0 = options === null || options === void 0 ? void 0 : options.framebufferScale) !== null && _0 !== void 0 ? _0 : 1, "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrViewportScale, (_1 = options === null || options === void 0 ? void 0 : options.viewportScale) !== null && _1 !== void 0 ? _1 : null, "f");
    // Foveated rendering defaults to on.
    __classPrivateFieldSet(this, _WilsonGPU_xrFixedFoveation, (_2 = options === null || options === void 0 ? void 0 : options.fixedFoveation) !== null && _2 !== void 0 ? _2 : 0.3, "f");
    __classPrivateFieldSet(this, _WilsonGPU_xrTargetFrameRate, options === null || options === void 0 ? void 0 : options.targetFrameRate, "f");
}, _WilsonGPU_checkXRSupport = function _WilsonGPU_checkXRSupport() {
    __classPrivateFieldSet(this, _WilsonGPU_xrIsSupportedNow, null, "f");
    this.xrIsSupported = (navigator.xr
        ? navigator.xr.isSessionSupported(XR_MODE)
        : Promise.resolve(false))
        .catch(() => false)
        .then(supported => {
        __classPrivateFieldSet(this, _WilsonGPU_xrIsSupportedNow, supported, "f");
        if (__classPrivateFieldGet(this, _WilsonGPU_xrButton, "f")) {
            __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").style.display = supported ? "flex" : "none";
        }
        // Rechecks happen on every devicechange and every time the page regains focus, so
        // most of them find exactly what the last one did; only actual changes are worth
        // reporting. The first check always is one, since availability starts unknown.
        if (supported !== __classPrivateFieldGet(this, _WilsonGPU_lastReportedXRAvailability, "f")) {
            __classPrivateFieldSet(this, _WilsonGPU_lastReportedXRAvailability, supported, "f");
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onAvailabilityChange(supported);
        }
        return supported;
    });
    return this.xrIsSupported;
}, _WilsonGPU_setXRButtonLoading = function _WilsonGPU_setXRButtonLoading(loading) {
    if (!__classPrivateFieldGet(this, _WilsonGPU_xrButton, "f") || !__classPrivateFieldGet(this, _WilsonGPU_xrButtonImg, "f")) {
        return;
    }
    if (__classPrivateFieldGet(this, _WilsonGPU_xrButtonText, "f")) {
        __classPrivateFieldGet(this, _WilsonGPU_xrButtonText, "f").textContent = loading ? "Loading..." : "Enter VR";
    }
    __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").classList.toggle("WILSON_xr-button-loading", loading);
}, _WilsonGPU_initXRButton = function _WilsonGPU_initXRButton() {
    if (__classPrivateFieldGet(this, _WilsonGPU_useXRButton, "f")) {
        __classPrivateFieldSet(this, _WilsonGPU_xrButton, document.createElement("div"), "f");
        __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").classList.add("WILSON_xr-button");
        __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").classList.add("WILSON_button");
        // If #xrIsSupportedNow is a boolean already, this will correctly set the style.
        // If it's still null, it will keep it hidden until #checkXRSupport finishes.
        __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").style.display = __classPrivateFieldGet(this, _WilsonGPU_xrIsSupportedNow, "f") ? "flex" : "none";
        this.buttonContainer.appendChild(__classPrivateFieldGet(this, _WilsonGPU_xrButton, "f"));
        const img = document.createElement("img");
        img.src = __classPrivateFieldGet(this, _WilsonGPU_xrButtonIconPath, "f");
        __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").appendChild(img);
        __classPrivateFieldSet(this, _WilsonGPU_xrButtonImg, img, "f");
        const text = document.createElement("div");
        text.classList.add("WILSON_button-text");
        text.textContent = "Enter VR";
        __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").appendChild(text);
        __classPrivateFieldSet(this, _WilsonGPU_xrButtonText, text, "f");
        this.addFullscreenViewTransitionElement({
            element: __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f"),
            hideInFullscreen: true,
        });
        __classPrivateFieldGet(this, _WilsonGPU_xrButton, "f").addEventListener("click", async () => {
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_setXRButtonLoading).call(this, true);
            // Resolves once the session is running, or immediately on any failure, so the
            // icon never stays spinning after a cancelled or rejected launch.
            const result = await this.enterXR();
            if (!result) {
                window.alert("Failed to enter VR. Try reconnecting your headset and restarting your browser.");
            }
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_setXRButtonLoading).call(this, false);
        });
    }
}, _WilsonGPU_useProgram = function _WilsonGPU_useProgram(program) {
    if (program === __classPrivateFieldGet(this, _WilsonGPU_currentProgram, "f")) {
        return;
    }
    __classPrivateFieldSet(this, _WilsonGPU_currentProgram, program, "f");
    this.gl.useProgram(program);
}, _WilsonGPU_syncXRControllers = function _WilsonGPU_syncXRControllers() {
    if (!__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
        return;
    }
    const { session } = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f");
    const inputSources = session.inputSources;
    let added = null;
    let removed = null;
    for (const inputSource of inputSources) {
        if (!__classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").has(inputSource)) {
            const data = __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_createXRControllerData).call(this, inputSource);
            __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").set(inputSource, data);
            (added = added !== null && added !== void 0 ? added : []).push(data.controller);
        }
    }
    for (const [inputSource, data] of __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f")) {
        let stillConnected = false;
        for (const currentInputSource of inputSources) {
            if (currentInputSource === inputSource) {
                stillConnected = true;
                break;
            }
        }
        if (!stillConnected) {
            // Reset silently rather than dispatching button events for a device that no
            // longer exists; onControllerDisconnect is the signal for that.
            __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_releaseXRControllerButtons).call(this, data.controller, null);
            data.controller.targetRay = null;
            data.controller.grip = null;
            data.controller.selecting = false;
            data.controller.squeezing = false;
            __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").delete(inputSource);
            (removed = removed !== null && removed !== void 0 ? removed : []).push(data.controller);
        }
    }
    if (!added && !removed) {
        return;
    }
    __classPrivateFieldSet(this, _WilsonGPU_xrControllerList, [], "f");
    for (const data of __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").values()) {
        __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f").push(data.controller);
    }
    if (removed) {
        for (const controller of removed) {
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onControllerDisconnect({
                controller,
                controllers: __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f"),
                session
            });
        }
    }
    if (added) {
        for (const controller of added) {
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onControllerConnect({
                controller,
                controllers: __classPrivateFieldGet(this, _WilsonGPU_xrControllerList, "f"),
                session
            });
        }
    }
}, _WilsonGPU_createXRControllerData = function _WilsonGPU_createXRControllerData(inputSource) {
    var _a, _b;
    const buttons = {};
    for (const name of XR_BUTTON_NAMES) {
        buttons[name] = createXRButtonState();
    }
    const controller = {
        inputSource,
        handedness: inputSource.handedness,
        targetRayMode: inputSource.targetRayMode,
        profiles: inputSource.profiles,
        mapping: (_b = (_a = inputSource.gamepad) === null || _a === void 0 ? void 0 : _a.mapping) !== null && _b !== void 0 ? _b : "",
        targetRay: null,
        grip: null,
        buttons,
        extraButtons: [],
        thumbstick: [0, 0],
        touchpad: [0, 0],
        axes: [],
        selecting: false,
        squeezing: false,
        hand: null,
        pulse: (intensity, duration) => {
            var _a, _b;
            // WebXR uses the Gamepad API's hapticActuators rather than the vibrationActuator
            // that the mainline API settled on, and plenty of devices have neither.
            const actuator = (_b = (_a = inputSource.gamepad) === null || _a === void 0 ? void 0 : _a.hapticActuators) === null || _b === void 0 ? void 0 : _b[0];
            if (!actuator) {
                return Promise.resolve(false);
            }
            return actuator
                .pulse(Math.min(Math.max(intensity, 0), 1), duration)
                .catch(() => false);
        },
    };
    return {
        controller,
        targetRayPose: createXRControllerPose(),
        gripPose: createXRControllerPose(),
        handJoints: {},
        warnedAboutMapping: false,
    };
}, _WilsonGPU_readXRPose = function _WilsonGPU_readXRPose(frame, space, refSpace, target) {
    let pose;
    try {
        pose = frame.getPose(space, refSpace);
    }
    catch (ex) {
        return null;
    }
    if (!pose) {
        return null;
    }
    const result = target !== null && target !== void 0 ? target : createXRControllerPose();
    result.matrix.set(pose.transform.matrix);
    result.position = pose.transform.position;
    result.orientation = pose.transform.orientation;
    result.linearVelocity = pose.linearVelocity;
    result.angularVelocity = pose.angularVelocity;
    result.emulatedPosition = pose.emulatedPosition;
    return result;
}, _WilsonGPU_updateXRControllers = function _WilsonGPU_updateXRControllers(time, frame, refSpace, session) {
    var _a, _b, _c, _d;
    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_syncXRControllers).call(this);
    // Button transitions are collected and dispatched after every controller has been
    // updated, so that a callback reading a second controller sees this frame's state
    // rather than the last frame's.
    let buttonEvents = null;
    for (const data of __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").values()) {
        const { controller } = data;
        const { inputSource } = controller;
        controller.targetRay = __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_readXRPose).call(this, frame, inputSource.targetRaySpace, refSpace, data.targetRayPose);
        controller.grip = inputSource.gripSpace
            ? __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_readXRPose).call(this, frame, inputSource.gripSpace, refSpace, data.gripPose)
            : null;
        if (__classPrivateFieldGet(this, _WilsonGPU_useXRHandTracking, "f") && inputSource.hand && frame.getJointPose) {
            controller.hand = data.handJoints;
            for (const [jointName, jointSpace] of inputSource.hand) {
                const jointPose = frame.getJointPose(jointSpace, refSpace);
                if (!jointPose) {
                    // Better to drop the joint than to report a stale position for it.
                    delete data.handJoints[jointName];
                    continue;
                }
                let joint = data.handJoints[jointName];
                if (!joint) {
                    joint = {
                        matrix: new Float32Array(16),
                        position: jointPose.transform.position,
                        orientation: jointPose.transform.orientation,
                        radius: jointPose.radius,
                    };
                    data.handJoints[jointName] = joint;
                }
                joint.matrix.set(jointPose.transform.matrix);
                joint.position = jointPose.transform.position;
                joint.orientation = jointPose.transform.orientation;
                joint.radius = jointPose.radius;
            }
        }
        else {
            controller.hand = null;
        }
        const gamepad = inputSource.gamepad;
        // Hands and gaze input have no gamepad at all; their state comes from the session's
        // select and squeeze events instead.
        if (!gamepad) {
            continue;
        }
        controller.mapping = gamepad.mapping;
        if (gamepad.mapping !== "xr-standard" && !data.warnedAboutMapping) {
            data.warnedAboutMapping = true;
            if (this.verbose) {
                console.warn(`[Wilson] An XR controller (${inputSource.handedness}, profiles `
                    + `${inputSource.profiles.join(", ")}) reports a "${gamepad.mapping}" `
                    + `mapping rather than "xr-standard", so its named buttons and axes are `
                    + `a guess. Use its raw buttons and axes if they're wrong.`);
            }
        }
        const axes = gamepad.axes;
        controller.axes = axes;
        // The raw axes are +y down, which is backwards from how a stick is usually read.
        controller.touchpad[0] = (_a = axes[0]) !== null && _a !== void 0 ? _a : 0;
        controller.touchpad[1] = -((_b = axes[1]) !== null && _b !== void 0 ? _b : 0);
        controller.thumbstick[0] = (_c = axes[2]) !== null && _c !== void 0 ? _c : 0;
        controller.thumbstick[1] = -((_d = axes[3]) !== null && _d !== void 0 ? _d : 0);
        // Buttons that vanish from the gamepad between frames would otherwise keep whatever
        // edge they last had forever.
        __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_clearXRButtonEdges).call(this, controller);
        for (let i = 0; i < gamepad.buttons.length; i++) {
            const name = i < XR_BUTTON_NAMES.length ? XR_BUTTON_NAMES[i] : null;
            let state;
            if (name) {
                state = controller.buttons[name];
            }
            else {
                const extraIndex = i - XR_BUTTON_NAMES.length;
                if (!controller.extraButtons[extraIndex]) {
                    controller.extraButtons[extraIndex] = createXRButtonState();
                }
                state = controller.extraButtons[extraIndex];
            }
            const button = gamepad.buttons[i];
            const wasPressed = state.pressed;
            state.pressed = button.pressed;
            state.touched = button.touched;
            state.value = button.value;
            state.justPressed = button.pressed && !wasPressed;
            state.justReleased = !button.pressed && wasPressed;
            if (state.justPressed || state.justReleased) {
                (buttonEvents = buttonEvents !== null && buttonEvents !== void 0 ? buttonEvents : []).push({
                    controller,
                    name,
                    index: i,
                    state,
                    pressed: state.pressed
                });
            }
        }
    }
    if (!buttonEvents) {
        return;
    }
    for (const { controller, name, index, state, pressed } of buttonEvents) {
        const callback = pressed
            ? __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onButtonDown
            : __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onButtonUp;
        callback({
            controller,
            name,
            index,
            state,
            time,
            frame,
            refSpace,
            session
        });
    }
}, _WilsonGPU_clearXRButtonEdges = function _WilsonGPU_clearXRButtonEdges(controller) {
    for (const name of XR_BUTTON_NAMES) {
        controller.buttons[name].justPressed = false;
        controller.buttons[name].justReleased = false;
    }
    for (const state of controller.extraButtons) {
        state.justPressed = false;
        state.justReleased = false;
    }
}, _WilsonGPU_releaseXRControllerButtons = function _WilsonGPU_releaseXRControllerButtons(controller, dispatch) {
    for (let i = 0; i < XR_BUTTON_NAMES.length + controller.extraButtons.length; i++) {
        const name = i < XR_BUTTON_NAMES.length ? XR_BUTTON_NAMES[i] : null;
        const state = name
            ? controller.buttons[name]
            : controller.extraButtons[i - XR_BUTTON_NAMES.length];
        const wasPressed = state.pressed;
        state.pressed = false;
        state.touched = false;
        state.value = 0;
        state.justPressed = false;
        state.justReleased = wasPressed;
        if (wasPressed && dispatch) {
            __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f").onButtonUp({
                controller,
                name,
                index: i,
                state,
                time: dispatch.time,
                frame: dispatch.frame,
                refSpace: dispatch.refSpace,
                session: dispatch.session
            });
        }
    }
    controller.thumbstick[0] = 0;
    controller.thumbstick[1] = 0;
    controller.touchpad[0] = 0;
    controller.touchpad[1] = 0;
}, _WilsonGPU_dispatchXRInputSourceEvent = function _WilsonGPU_dispatchXRInputSourceEvent(event, callbackName, state) {
    if (!__classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) {
        return;
    }
    const { session, refSpace } = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f");
    // An input source's very first event can arrive before the frame loop has seen it.
    __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_syncXRControllers).call(this);
    const data = __classPrivateFieldGet(this, _WilsonGPU_xrControllerData, "f").get(event.inputSource);
    if (!data) {
        return;
    }
    const { controller } = data;
    if ((state === null || state === void 0 ? void 0 : state.selecting) !== undefined) {
        controller.selecting = state.selecting;
    }
    if ((state === null || state === void 0 ? void 0 : state.squeezing) !== undefined) {
        controller.squeezing = state.squeezing;
    }
    // The frame delivered with an input event isn't an animation frame — getViewerPose
    // would throw on it — but getPose is what's wanted here anyway, and it gives the poses
    // at the moment of the action rather than at the last rendered frame.
    const targetRay = __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_readXRPose).call(this, event.frame, controller.inputSource.targetRaySpace, refSpace);
    const grip = controller.inputSource.gripSpace
        ? __classPrivateFieldGet(this, _WilsonGPU_instances, "m", _WilsonGPU_readXRPose).call(this, event.frame, controller.inputSource.gripSpace, refSpace)
        : null;
    __classPrivateFieldGet(this, _WilsonGPU_xrCallbacks, "f")[callbackName]({
        controller,
        inputSource: event.inputSource,
        targetRay,
        grip,
        frame: event.frame,
        refSpace,
        session
    });
}, _WilsonGPU_clearXRFunctions = function _WilsonGPU_clearXRFunctions() {
    __classPrivateFieldSet(this, _WilsonGPU_xrCallbacks, {
        onEnter: () => { },
        onExit: () => { },
        onFrameStart: () => { },
        onAvailabilityChange: () => { },
        onVisibilityChange: (state) => { },
        onFrameRateChange: (frameRate) => { },
        onControllerConnect: () => { },
        onControllerDisconnect: () => { },
        onSelectStart: () => { },
        onSelect: () => { },
        onSelectEnd: () => { },
        onSqueezeStart: () => { },
        onSqueeze: () => { },
        onSqueezeEnd: () => { },
        onButtonDown: () => { },
        onButtonUp: () => { }
    }, "f");
    __classPrivateFieldSet(this, _WilsonGPU_renderXRFrame, () => { }, "f");
}, _WilsonGPU_applyXRTargetFrameRate = function _WilsonGPU_applyXRTargetFrameRate() {
    var _a;
    const session = (_a = __classPrivateFieldGet(this, _WilsonGPU_xrData, "f")) === null || _a === void 0 ? void 0 : _a.session;
    if (!session || __classPrivateFieldGet(this, _WilsonGPU_xrTargetFrameRate, "f") === undefined) {
        return;
    }
    const supportedFrameRates = session.supportedFrameRates;
    if (!supportedFrameRates || supportedFrameRates.length === 0) {
        if (this.verbose) {
            console.warn("[Wilson] This device doesn't support setting the XR frame rate.");
        }
        return;
    }
    // updateTargetFrameRate rejects on anything not in supportedFrameRates.
    let closestRate = supportedFrameRates[0];
    for (const rate of supportedFrameRates) {
        if (Math.abs(rate - __classPrivateFieldGet(this, _WilsonGPU_xrTargetFrameRate, "f"))
            < Math.abs(closestRate - __classPrivateFieldGet(this, _WilsonGPU_xrTargetFrameRate, "f"))) {
            closestRate = rate;
        }
    }
    if (this.verbose) {
        console.log(`[Wilson] Available XR framerates are ${supportedFrameRates}; using ${closestRate}.`);
    }
    session.updateTargetFrameRate(closestRate).catch((ex) => {
        if (this.verbose) {
            console.warn(`[Wilson] Couldn't set the XR frame rate: ${ex}`);
        }
    });
};
