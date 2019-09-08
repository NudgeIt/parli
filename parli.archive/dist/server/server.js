(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "46298d61dd57eb246f67";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9sb2ctYXBwbHktcmVzdWx0LmpzP2U1MmUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsV0FBVyxtQkFBTyxDQUFDLGdEQUFPOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2ctYXBwbHktcmVzdWx0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXBkYXRlZE1vZHVsZXMsIHJlbmV3ZWRNb2R1bGVzKSB7XG5cdHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XG5cdH0pO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdGlmICh1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0bG9nKFxuXHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIlxuXHRcdCk7XG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XG5cdH0gZWxzZSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIiAmJiBtb2R1bGVJZC5pbmRleE9mKFwiIVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gbW9kdWxlSWQuc3BsaXQoXCIhXCIpO1xuXHRcdFx0XHRsb2cuZ3JvdXBDb2xsYXBzZWQoXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBwYXJ0cy5wb3AoKSk7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdFx0bG9nLmdyb3VwRW5kKFwiaW5mb1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgbnVtYmVySWRzID0gcmVuZXdlZE1vZHVsZXMuZXZlcnkoZnVuY3Rpb24obW9kdWxlSWQpIHtcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XG5cdFx0fSk7XG5cdFx0aWYgKG51bWJlcklkcylcblx0XHRcdGxvZyhcblx0XHRcdFx0XCJpbmZvXCIsXG5cdFx0XHRcdFwiW0hNUl0gQ29uc2lkZXIgdXNpbmcgdGhlIE5hbWVkTW9kdWxlc1BsdWdpbiBmb3IgbW9kdWxlIG5hbWVzLlwiXG5cdFx0XHQpO1xuXHR9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/hot/log-apply-result.js\n");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function(err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9sb2cuanM/MWFmZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbG9nTGV2ZWwgPSBcImluZm9cIjtcblxuZnVuY3Rpb24gZHVtbXkoKSB7fVxuXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbihsZXZlbCwgbXNnKSB7XG5cdFx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRcdGxvZ0ZuKG1zZyk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxldmVsLCBtc2cpIHtcblx0aWYgKHNob3VsZExvZyhsZXZlbCkpIHtcblx0XHRpZiAobGV2ZWwgPT09IFwiaW5mb1wiKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH0gZWxzZSBpZiAobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XG5cdFx0XHRjb25zb2xlLndhcm4obXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcImVycm9yXCIpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IobXNnKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGlucyAqL1xudmFyIGdyb3VwID0gY29uc29sZS5ncm91cCB8fCBkdW1teTtcbnZhciBncm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgfHwgZHVtbXk7XG52YXIgZ3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kIHx8IGR1bW15O1xuLyogZXNsaW50LWVuYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cblxubW9kdWxlLmV4cG9ydHMuZ3JvdXAgPSBsb2dHcm91cChncm91cCk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cEVuZCA9IGxvZ0dyb3VwKGdyb3VwRW5kKTtcblxubW9kdWxlLmV4cG9ydHMuc2V0TG9nTGV2ZWwgPSBmdW5jdGlvbihsZXZlbCkge1xuXHRsb2dMZXZlbCA9IGxldmVsO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcblx0dmFyIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcblx0dmFyIHN0YWNrID0gZXJyLnN0YWNrO1xuXHRpZiAoIXN0YWNrKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoc3RhY2suaW5kZXhPZihtZXNzYWdlKSA8IDApIHtcblx0XHRyZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjaztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gc3RhY2s7XG5cdH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/webpack/hot/log.js\n");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?1000\"))\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9wb2xsLmpzPzEwYmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBVTtBQUNkO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLGdEQUFPOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLG1CQUFPLENBQUMsMEVBQW9CO0FBQ2pDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMsTUFBTSxFQUVOIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L3BvbGwuanM/MTAwMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vKmdsb2JhbHMgX19yZXNvdXJjZVF1ZXJ5ICovXG5pZiAobW9kdWxlLmhvdCkge1xuXHR2YXIgaG90UG9sbEludGVydmFsID0gK19fcmVzb3VyY2VRdWVyeS5zdWJzdHIoMSkgfHwgMTAgKiA2MCAqIDEwMDA7XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cblx0dmFyIGNoZWNrRm9yVXBkYXRlID0gZnVuY3Rpb24gY2hlY2tGb3JVcGRhdGUoZnJvbVVwZGF0ZSkge1xuXHRcdGlmIChtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImlkbGVcIikge1xuXHRcdFx0bW9kdWxlLmhvdFxuXHRcdFx0XHQuY2hlY2sodHJ1ZSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0XHRpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZnJvbVVwZGF0ZSkgbG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZSBhcHBsaWVkLlwiKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVxdWlyZShcIi4vbG9nLWFwcGx5LXJlc3VsdFwiKSh1cGRhdGVkTW9kdWxlcywgdXBkYXRlZE1vZHVsZXMpO1xuXHRcdFx0XHRcdGNoZWNrRm9yVXBkYXRlKHRydWUpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0dmFyIHN0YXR1cyA9IG1vZHVsZS5ob3Quc3RhdHVzKCk7XG5cdFx0XHRcdFx0aWYgKFtcImFib3J0XCIsIFwiZmFpbFwiXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuXHRcdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIENhbm5vdCBhcHBseSB1cGRhdGUuXCIpO1xuXHRcdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFlvdSBuZWVkIHRvIHJlc3RhcnQgdGhlIGFwcGxpY2F0aW9uIVwiKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFVwZGF0ZSBmYWlsZWQ6IFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXHRzZXRJbnRlcnZhbChjaGVja0ZvclVwZGF0ZSwgaG90UG9sbEludGVydmFsKTtcbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/hot/poll.js?1000\n");

/***/ }),

/***/ "./src/app/config/AppConfig.ts":
/*!*************************************!*\
  !*** ./src/app/config/AppConfig.ts ***!
  \*************************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AppConfig\", function() { return AppConfig; });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * read default config and merge it with CONFIG environment variable\n */\nprocess.env.NODE_CONFIG_DIR = path__WEBPACK_IMPORTED_MODULE_0__[\"join\"](path__WEBPACK_IMPORTED_MODULE_0__[\"resolve\"](__dirname), 'app', 'config');\nvar envConfig = JSON.parse(process.env.CONFIG || '{}');\nvar AppConfig = Object.assign({}, function(module){return require(module);}('config'), envConfig);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbmZpZy9BcHBDb25maWcudHM/NTMzYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QjtBQUc3Qjs7R0FFRztBQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLHlDQUFTLENBQUMsNENBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEYsSUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQztBQUM5RCxJQUFNLFNBQVMsR0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSx5Q0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL2FwcC9jb25maWcvQXBwQ29uZmlnLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IElBcHBDb25maWcgfSBmcm9tICcuL0lBcHBDb25maWcnO1xuXG4vKipcbiAqIHJlYWQgZGVmYXVsdCBjb25maWcgYW5kIG1lcmdlIGl0IHdpdGggQ09ORklHIGVudmlyb25tZW50IHZhcmlhYmxlXG4gKi9cbnByb2Nlc3MuZW52Lk5PREVfQ09ORklHX0RJUiA9IHBhdGguam9pbihwYXRoLnJlc29sdmUoX19kaXJuYW1lKSwgJ2FwcCcsICdjb25maWcnKTtcbmNvbnN0IGVudkNvbmZpZzogSUFwcENvbmZpZyA9IEpTT04ucGFyc2UocHJvY2Vzcy5lbnYuQ09ORklHIHx8ICd7fScpO1xuZXhwb3J0IGNvbnN0IEFwcENvbmZpZzogSUFwcENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIG5vZGVSZXF1aXJlKCdjb25maWcnKSwgZW52Q29uZmlnKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/config/AppConfig.ts\n");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Logger */ \"./src/server/utils/Logger.ts\");\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server */ \"./src/server/server.ts\");\n\n\n\nvar server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_2__[\"app\"]);\nvar port = process.env.PORT || '3000';\nvar currentApp = _server__WEBPACK_IMPORTED_MODULE_2__[\"app\"];\nserver.listen(port, function () {\n    _utils_Logger__WEBPACK_IMPORTED_MODULE_1__[\"Logger\"].info(\"server started at http://localhost:\" + port);\n});\nif (true) {\n    module.hot.accept(/*! ./server */ \"./src/server/server.ts\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server */ \"./src/server/server.ts\");\n(function () {\n        server.removeListener('request', currentApp);\n        server.on('request', _server__WEBPACK_IMPORTED_MODULE_2__[\"app\"]);\n        currentApp = _server__WEBPACK_IMPORTED_MODULE_2__[\"app\"];\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));\n}\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luZGV4LnRzPzVlZTYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF3QjtBQUNnQjtBQUNUO0FBRS9CLElBQU0sTUFBTSxHQUFHLDJDQUFJLENBQUMsWUFBWSxDQUFDLDJDQUFHLENBQUMsQ0FBQztBQUN0QyxJQUFNLElBQUksR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7QUFDaEQsSUFBSSxVQUFVLEdBQUcsMkNBQUcsQ0FBQztBQUVyQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUNsQixvREFBTSxDQUFDLElBQUksQ0FBQyx3Q0FBc0MsSUFBTSxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLElBQVUsRUFBRTtJQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHdDQUFVLEVBQUU7QUFBQTtRQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSwyQ0FBRyxDQUFDLENBQUM7UUFDMUIsVUFBVSxHQUFHLDJDQUFHLENBQUM7SUFDbkIsQ0FBQyxtREFBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiLi9zcmMvc2VydmVyL2luZGV4LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL3V0aWxzL0xvZ2dlcic7XG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuL3NlcnZlcic7XG5cbmNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5jb25zdCBwb3J0OiBzdHJpbmcgPSBwcm9jZXNzLmVudi5QT1JUIHx8ICczMDAwJztcbmxldCBjdXJyZW50QXBwID0gYXBwO1xuXG5zZXJ2ZXIubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgTG9nZ2VyLmluZm8oYHNlcnZlciBzdGFydGVkIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fWApO1xufSk7XG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KCcuL3NlcnZlcicsICgpID0+IHtcbiAgICBzZXJ2ZXIucmVtb3ZlTGlzdGVuZXIoJ3JlcXVlc3QnLCBjdXJyZW50QXBwKTtcbiAgICBzZXJ2ZXIub24oJ3JlcXVlc3QnLCBhcHApO1xuICAgIGN1cnJlbnRBcHAgPSBhcHA7XG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/server/index.ts\n");

/***/ }),

/***/ "./src/server/middlewares/index.ts":
/*!*****************************************!*\
  !*** ./src/server/middlewares/index.ts ***!
  \*****************************************/
/*! exports provided: applyMiddlewares */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyMiddlewares\", function() { return applyMiddlewares; });\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar applyMiddlewares = function (app) {\n    app.use(body_parser__WEBPACK_IMPORTED_MODULE_1__[\"json\"]());\n    app.use(body_parser__WEBPACK_IMPORTED_MODULE_1__[\"urlencoded\"]({ extended: true }));\n    app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2__());\n    app.use(helmet__WEBPACK_IMPORTED_MODULE_0___default()());\n    app.use(compression__WEBPACK_IMPORTED_MODULE_3__({ threshold: 0 }));\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21pZGRsZXdhcmVzL2luZGV4LnRzP2RiMjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEI7QUFDYztBQUNJO0FBQ0g7QUFFcEMsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEdBQXdCO0lBQ3ZELEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0RBQWUsRUFBRSxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzREFBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQ0FBWSxFQUFFLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLDZDQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0NBQVcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL3NlcnZlci9taWRkbGV3YXJlcy9pbmRleC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCAqIGFzIGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcblxuZXhwb3J0IGNvbnN0IGFwcGx5TWlkZGxld2FyZXMgPSAoYXBwOiBFeHByZXNzLkFwcGxpY2F0aW9uKSA9PiB7XG4gIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbiAgYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG4gIGFwcC51c2UoaGVsbWV0KCkpO1xuICBhcHAudXNlKGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/server/middlewares/index.ts\n");

/***/ }),

/***/ "./src/server/routes/CounterRoutes.ts":
/*!********************************************!*\
  !*** ./src/server/routes/CounterRoutes.ts ***!
  \********************************************/
/*! exports provided: CounterRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CounterRoutes\", function() { return CounterRoutes; });\nvar CounterRoutes = function (app) {\n    app.put('/counter/increment', function (req, res) {\n        setTimeout(function () {\n            res.status(200).json({ count: parseInt(req.body.count, 10) + 1 });\n        }, 200);\n    });\n    app.put('/counter/decrement', function (req, res) {\n        setTimeout(function () {\n            res.status(200).json({ count: parseInt(req.body.count, 10) - 1 });\n        }, 200);\n    });\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9Db3VudGVyUm91dGVzLnRzPzIzYzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7QUFBQTtBQUFPLElBQU0sYUFBYSxHQUFHLFVBQUMsR0FBd0I7SUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3hELFVBQVUsQ0FBQztZQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3hELFVBQVUsQ0FBQztZQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL3NlcnZlci9yb3V0ZXMvQ291bnRlclJvdXRlcy50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5leHBvcnQgY29uc3QgQ291bnRlclJvdXRlcyA9IChhcHA6IEV4cHJlc3MuQXBwbGljYXRpb24pID0+IHtcbiAgYXBwLnB1dCgnL2NvdW50ZXIvaW5jcmVtZW50JywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBjb3VudDogcGFyc2VJbnQocmVxLmJvZHkuY291bnQsIDEwKSArIDEgfSk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgYXBwLnB1dCgnL2NvdW50ZXIvZGVjcmVtZW50JywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBjb3VudDogcGFyc2VJbnQocmVxLmJvZHkuY291bnQsIDEwKSAtIDEgfSk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/server/routes/CounterRoutes.ts\n");

/***/ }),

/***/ "./src/server/routes/DemoRoutes.ts":
/*!*****************************************!*\
  !*** ./src/server/routes/DemoRoutes.ts ***!
  \*****************************************/
/*! exports provided: DemoRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DemoRoutes\", function() { return DemoRoutes; });\n/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils */ \"./src/server/utils/Utils.ts\");\n/* harmony import */ var _vuesion_utils_dist_randomGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vuesion/utils/dist/randomGenerator */ \"@vuesion/utils/dist/randomGenerator\");\n/* harmony import */ var _vuesion_utils_dist_randomGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vuesion_utils_dist_randomGenerator__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar getErrorWithProbability = function (probability) { return Object(_vuesion_utils_dist_randomGenerator__WEBPACK_IMPORTED_MODULE_1__[\"getIntInRange\"])(0, 100) <= probability; };\nvar DemoRoutes = function (app) {\n    /**\n     * http -> https redirect for heroku\n     */\n    app.get('*', function (req, res, next) {\n        var host = req.headers.host || 'localhost:3000';\n        var redirect = \"https://\" + host + req.url;\n        if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {\n            res.redirect(redirect);\n        }\n        else {\n            next();\n        }\n    });\n    app.use('/storybook', Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_0__[\"serve\"])('../../storybook-static'));\n    app.use('/docs', function (req, res) {\n        res.status(301).redirect('https://vuesion.github.io/docs/en/');\n    });\n    /**\n     * Auth-Demo\n     */\n    app.post('/token', function (req, res) {\n        if (getErrorWithProbability(10)) {\n            res.status(500).json({});\n        }\n        else if (req.body.grant_type === 'password') {\n            res.status(200).json({ access_token: 'accessToken', refresh_token: 'refreshToken' });\n        }\n        else if (req.body.grant_type === 'refresh_token' && req.body.refresh_token === 'refreshToken') {\n            res.status(200).json({ access_token: 'accessToken2', refresh_token: 'refreshToken2' });\n        }\n        else if (req.body.grant_type === 'refresh_token' && req.body.refresh_token === 'refreshToken2') {\n            res.status(200).json({ access_token: 'accessToken', refresh_token: 'refreshToken' });\n        }\n    });\n    app.delete('/token', function (req, res) {\n        if (getErrorWithProbability(10)) {\n            res.status(500).json({});\n        }\n        else {\n            res.status(200).json({});\n        }\n    });\n    app.get('/protected', function (req, res) {\n        if (getErrorWithProbability(40)) {\n            res.status(401).json({});\n        }\n        else {\n            res.status(200).json({});\n        }\n    });\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9EZW1vUm91dGVzLnRzP2I2N2QiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUM2QjtBQUVwRSxJQUFNLHVCQUF1QixHQUFHLFVBQUMsV0FBbUIsSUFBSyxnR0FBYSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxXQUFXLEVBQXBDLENBQW9DLENBQUM7QUFFdkYsSUFBTSxVQUFVLEdBQUcsVUFBQyxHQUF3QjtJQUNqRDs7T0FFRztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFTO1FBQ2xELElBQU0sSUFBSSxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLGdCQUFnQixDQUFDO1FBQzFELElBQU0sUUFBUSxHQUFXLGFBQVcsSUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFFckQsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLE9BQU8sRUFBRTtZQUNwRixHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxJQUFJLEVBQUUsQ0FBQztTQUNSO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSwwREFBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztJQUN2RCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDN0MsSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjthQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN0RjthQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssZUFBZSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLGNBQWMsRUFBRTtZQUMvRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDeEY7YUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLGVBQWUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxlQUFlLEVBQUU7WUFDaEcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3RGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQy9DLElBQUksdUJBQXVCLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ2hELElBQUksdUJBQXVCLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJmaWxlIjoiLi9zcmMvc2VydmVyL3JvdXRlcy9EZW1vUm91dGVzLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBzZXJ2ZSB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJztcbmltcG9ydCB7IGdldEludEluUmFuZ2UgfSBmcm9tICdAdnVlc2lvbi91dGlscy9kaXN0L3JhbmRvbUdlbmVyYXRvcic7XG5cbmNvbnN0IGdldEVycm9yV2l0aFByb2JhYmlsaXR5ID0gKHByb2JhYmlsaXR5OiBudW1iZXIpID0+IGdldEludEluUmFuZ2UoMCwgMTAwKSA8PSBwcm9iYWJpbGl0eTtcblxuZXhwb3J0IGNvbnN0IERlbW9Sb3V0ZXMgPSAoYXBwOiBFeHByZXNzLkFwcGxpY2F0aW9uKSA9PiB7XG4gIC8qKlxuICAgKiBodHRwIC0+IGh0dHBzIHJlZGlyZWN0IGZvciBoZXJva3VcbiAgICovXG4gIGFwcC5nZXQoJyonLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBhbnkpID0+IHtcbiAgICBjb25zdCBob3N0OiBzdHJpbmcgPSByZXEuaGVhZGVycy5ob3N0IHx8ICdsb2NhbGhvc3Q6MzAwMCc7XG4gICAgY29uc3QgcmVkaXJlY3Q6IHN0cmluZyA9IGBodHRwczovLyR7aG9zdH1gICsgcmVxLnVybDtcblxuICAgIGlmIChyZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG8nXSAmJiByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG8nXSAhPT0gJ2h0dHBzJykge1xuICAgICAgcmVzLnJlZGlyZWN0KHJlZGlyZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfSk7XG4gIGFwcC51c2UoJy9zdG9yeWJvb2snLCBzZXJ2ZSgnLi4vLi4vc3Rvcnlib29rLXN0YXRpYycpKTtcbiAgYXBwLnVzZSgnL2RvY3MnLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KCdodHRwczovL3Z1ZXNpb24uZ2l0aHViLmlvL2RvY3MvZW4vJyk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBBdXRoLURlbW9cbiAgICovXG4gIGFwcC5wb3N0KCcvdG9rZW4nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKGdldEVycm9yV2l0aFByb2JhYmlsaXR5KDEwKSkge1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe30pO1xuICAgIH0gZWxzZSBpZiAocmVxLmJvZHkuZ3JhbnRfdHlwZSA9PT0gJ3Bhc3N3b3JkJykge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBhY2Nlc3NfdG9rZW46ICdhY2Nlc3NUb2tlbicsIHJlZnJlc2hfdG9rZW46ICdyZWZyZXNoVG9rZW4nIH0pO1xuICAgIH0gZWxzZSBpZiAocmVxLmJvZHkuZ3JhbnRfdHlwZSA9PT0gJ3JlZnJlc2hfdG9rZW4nICYmIHJlcS5ib2R5LnJlZnJlc2hfdG9rZW4gPT09ICdyZWZyZXNoVG9rZW4nKSB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGFjY2Vzc190b2tlbjogJ2FjY2Vzc1Rva2VuMicsIHJlZnJlc2hfdG9rZW46ICdyZWZyZXNoVG9rZW4yJyB9KTtcbiAgICB9IGVsc2UgaWYgKHJlcS5ib2R5LmdyYW50X3R5cGUgPT09ICdyZWZyZXNoX3Rva2VuJyAmJiByZXEuYm9keS5yZWZyZXNoX3Rva2VuID09PSAncmVmcmVzaFRva2VuMicpIHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgYWNjZXNzX3Rva2VuOiAnYWNjZXNzVG9rZW4nLCByZWZyZXNoX3Rva2VuOiAncmVmcmVzaFRva2VuJyB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGFwcC5kZWxldGUoJy90b2tlbicsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICBpZiAoZ2V0RXJyb3JXaXRoUHJvYmFiaWxpdHkoMTApKSB7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy9wcm90ZWN0ZWQnLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKGdldEVycm9yV2l0aFByb2JhYmlsaXR5KDQwKSkge1xuICAgICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oe30pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7fSk7XG4gICAgfVxuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/server/routes/DemoRoutes.ts\n");

/***/ }),

/***/ "./src/server/routes/SSRRoutes.ts":
/*!****************************************!*\
  !*** ./src/server/routes/SSRRoutes.ts ***!
  \****************************************/
/*! exports provided: SSRRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SSRRoutes\", function() { return SSRRoutes; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var accept_language__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! accept-language */ \"accept-language\");\n/* harmony import */ var accept_language__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(accept_language__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Logger */ \"./src/server/utils/Logger.ts\");\n/* harmony import */ var _app_config_AppConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/config/AppConfig */ \"./src/app/config/AppConfig.ts\");\n/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/Utils */ \"./src/server/utils/Utils.ts\");\n/* harmony import */ var _utils_RuntimeConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/RuntimeConfig */ \"./src/server/utils/RuntimeConfig.ts\");\n\n\n\n\n\n\n\nvar renderer;\nvar createRenderer = function (bundle, template) {\n    var LRU = function(module){return require(module);}('lru-cache');\n    renderer = function(module){return require(module);}('vue-server-renderer').createBundleRenderer(bundle, {\n        template: template,\n        cache: new LRU({\n            max: 1000,\n            maxAge: 1000 * 60 * 15,\n        }),\n    });\n};\nvar setHeaders = function (res) {\n    res.setHeader('Content-Type', 'text/html');\n    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');\n    res.setHeader('Pragma', 'no-cache');\n    res.setHeader('Expires', '0');\n    res.setHeader('max-age', '0');\n};\nvar vuesionConfig = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_0__[\"readFileSync\"](Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_5__[\"resolve\"])('../../.vuesion/config.json')).toString());\nvar SSRRoutes = function (app) {\n    if (_utils_Utils__WEBPACK_IMPORTED_MODULE_5__[\"isProd\"]) {\n        var bundle = function(module){return require(module);}('./vue-ssr-bundle.json');\n        var template = fs__WEBPACK_IMPORTED_MODULE_0__[\"readFileSync\"](Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_5__[\"resolve\"])('../client/index.html'), 'utf-8');\n        createRenderer(bundle, template);\n    }\n    else {\n        var devServer = function(module){return require(module);}('./dev-server.js').default;\n        devServer(app, function (bundle, template) {\n            createRenderer(bundle, template);\n        });\n    }\n    app.get('*', function (req, res) {\n        setHeaders(res);\n        if (!renderer) {\n            return res.status(503).end('waiting for compilation... refresh in a moment.');\n        }\n        accept_language__WEBPACK_IMPORTED_MODULE_2___default.a.languages(vuesionConfig.i18n.supportedLocales);\n        var startTime = Date.now();\n        var acceptLang = req.headers['accept-language']\n            ? req.headers['accept-language'].toString()\n            : vuesionConfig.i18n.defaultLocale;\n        var defaultLang = accept_language__WEBPACK_IMPORTED_MODULE_2___default.a.get(acceptLang);\n        var errorHandler = function (err) {\n            if (err && err.code === 404) {\n                res.status(404);\n                _utils_Logger__WEBPACK_IMPORTED_MODULE_3__[\"Logger\"].warn('unsupported route: %s; error: %s', req.url, JSON.stringify(err, Object.getOwnPropertyNames(err)));\n                render('/not-found');\n            }\n            else if (err && err.code === 302) {\n                var redirectUrl = url__WEBPACK_IMPORTED_MODULE_1__[\"format\"]({\n                    protocol: req.protocol,\n                    host: req.get('host'),\n                }) + err.path;\n                /**\n                 * transfer server state to cookies\n                 */\n                err.cookies.forEach(function (cookie) { return res.cookie(cookie.name, cookie.value); });\n                res.redirect(302, redirectUrl);\n                res.send();\n            }\n            else {\n                res.status(500);\n                _utils_Logger__WEBPACK_IMPORTED_MODULE_3__[\"Logger\"].error('error during rendering: %s; error: %s', req.url, JSON.stringify(err, Object.getOwnPropertyNames(err)));\n                render('/error', true);\n            }\n        };\n        var render = function (url, redirect) {\n            if (redirect === void 0) { redirect = false; }\n            var serverContext = {\n                url: url,\n                cookies: req.cookies,\n                acceptLanguage: defaultLang,\n                htmlLang: defaultLang.substr(0, 2),\n                appConfig: Object(_utils_RuntimeConfig__WEBPACK_IMPORTED_MODULE_6__[\"RuntimeConfig\"])(_app_config_AppConfig__WEBPACK_IMPORTED_MODULE_4__[\"AppConfig\"], req),\n                redirect: redirect,\n            };\n            renderer\n                .renderToStream(serverContext)\n                .on('error', errorHandler)\n                .on('end', function () { return _utils_Logger__WEBPACK_IMPORTED_MODULE_3__[\"Logger\"].debug(\"whole request: \" + (Date.now() - startTime) + \"ms\"); })\n                .pipe(res);\n        };\n        render(req.url);\n    });\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9TU1JSb3V0ZXMudHM/MDJiNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUI7QUFDRTtBQUNrQjtBQUdKO0FBQ1U7QUFDRjtBQUNNO0FBRXZELElBQUksUUFBd0IsQ0FBQztBQUU3QixJQUFNLGNBQWMsR0FBRyxVQUFDLE1BQWMsRUFBRSxRQUFnQjtJQUN0RCxJQUFNLEdBQUcsR0FBRyx5Q0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXJDLFFBQVEsR0FBRyx5Q0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFO1FBQ3pFLFFBQVE7UUFDUixLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUM7WUFDYixHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUU7U0FDdkIsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUNGLElBQU0sVUFBVSxHQUFHLFVBQUMsR0FBYTtJQUMvQixHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUNGLElBQU0sYUFBYSxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsK0NBQWUsQ0FBQyw0REFBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBRWxHLElBQU0sU0FBUyxHQUFHLFVBQUMsR0FBd0I7SUFDaEQsSUFBSSxtREFBTSxFQUFFO1FBQ1YsSUFBTSxNQUFNLEdBQVEseUNBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pELElBQU0sUUFBUSxHQUFXLCtDQUFlLENBQUMsNERBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRW5GLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbEM7U0FBTTtRQUNMLElBQU0sU0FBUyxHQUFRLHlDQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFOUQsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFDLE1BQWMsRUFBRSxRQUFnQjtZQUM5QyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3ZDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1NBQy9FO1FBRUQsc0RBQWMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTlELElBQU0sU0FBUyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFNLFVBQVUsR0FBVyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1lBQ3ZELENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzNDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxJQUFNLFdBQVcsR0FBVyxzREFBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFNLFlBQVksR0FBRyxVQUFDLEdBQVE7WUFDNUIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLG9EQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0csTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFO2dCQUNsQyxJQUFNLFdBQVcsR0FDZiwwQ0FBVSxDQUFDO29CQUNULFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtvQkFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2lCQUN0QixDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFaEI7O21CQUVHO2dCQUNILEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBVyxJQUFLLFVBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztnQkFFNUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNaO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLG9EQUFNLENBQUMsS0FBSyxDQUNWLHVDQUF1QyxFQUN2QyxHQUFHLENBQUMsR0FBRyxFQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNyRCxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUM7UUFDRixJQUFNLE1BQU0sR0FBRyxVQUFDLEdBQVcsRUFBRSxRQUF5QjtZQUF6QiwyQ0FBeUI7WUFDcEQsSUFBTSxhQUFhLEdBQW1CO2dCQUNwQyxHQUFHO2dCQUNILE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztnQkFDcEIsY0FBYyxFQUFFLFdBQVc7Z0JBQzNCLFFBQVEsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLFNBQVMsRUFBRSwwRUFBYSxDQUFDLCtEQUFTLEVBQUUsR0FBRyxDQUFDO2dCQUN4QyxRQUFRO2FBQ1QsQ0FBQztZQUVGLFFBQVE7aUJBQ0wsY0FBYyxDQUFDLGFBQWEsQ0FBQztpQkFDN0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7aUJBQ3pCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBTSwyREFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBa0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsUUFBSSxDQUFDLEVBQTFELENBQTBELENBQUM7aUJBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJmaWxlIjoiLi9zcmMvc2VydmVyL3JvdXRlcy9TU1JSb3V0ZXMudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBFeHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIFVSTCBmcm9tICd1cmwnO1xuaW1wb3J0IGFjY2VwdExhbmd1YWdlIGZyb20gJ2FjY2VwdC1sYW5ndWFnZSc7XG5pbXBvcnQgeyBCdW5kbGVSZW5kZXJlciB9IGZyb20gJ3Z1ZS1zZXJ2ZXItcmVuZGVyZXInO1xuaW1wb3J0IHsgSVNlcnZlckNvbnRleHQgfSBmcm9tICcuLi9pc29tb3JwaGljJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL3V0aWxzL0xvZ2dlcic7XG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tICdAL2FwcC9jb25maWcvQXBwQ29uZmlnJztcbmltcG9ydCB7IGlzUHJvZCwgcmVzb2x2ZSB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJztcbmltcG9ydCB7IFJ1bnRpbWVDb25maWcgfSBmcm9tICcuLi91dGlscy9SdW50aW1lQ29uZmlnJztcblxubGV0IHJlbmRlcmVyOiBCdW5kbGVSZW5kZXJlcjtcblxuY29uc3QgY3JlYXRlUmVuZGVyZXIgPSAoYnVuZGxlOiBzdHJpbmcsIHRlbXBsYXRlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3QgTFJVID0gbm9kZVJlcXVpcmUoJ2xydS1jYWNoZScpO1xuXG4gIHJlbmRlcmVyID0gbm9kZVJlcXVpcmUoJ3Z1ZS1zZXJ2ZXItcmVuZGVyZXInKS5jcmVhdGVCdW5kbGVSZW5kZXJlcihidW5kbGUsIHtcbiAgICB0ZW1wbGF0ZSxcbiAgICBjYWNoZTogbmV3IExSVSh7XG4gICAgICBtYXg6IDEwMDAsXG4gICAgICBtYXhBZ2U6IDEwMDAgKiA2MCAqIDE1LFxuICAgIH0pLFxuICB9KTtcbn07XG5jb25zdCBzZXRIZWFkZXJzID0gKHJlczogUmVzcG9uc2UpOiB2b2lkID0+IHtcbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xuICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJyk7XG4gIHJlcy5zZXRIZWFkZXIoJ1ByYWdtYScsICduby1jYWNoZScpO1xuICByZXMuc2V0SGVhZGVyKCdFeHBpcmVzJywgJzAnKTtcbiAgcmVzLnNldEhlYWRlcignbWF4LWFnZScsICcwJyk7XG59O1xuY29uc3QgdnVlc2lvbkNvbmZpZzogYW55ID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocmVzb2x2ZSgnLi4vLi4vLnZ1ZXNpb24vY29uZmlnLmpzb24nKSkudG9TdHJpbmcoKSk7XG5cbmV4cG9ydCBjb25zdCBTU1JSb3V0ZXMgPSAoYXBwOiBFeHByZXNzLkFwcGxpY2F0aW9uKTogYW55ID0+IHtcbiAgaWYgKGlzUHJvZCkge1xuICAgIGNvbnN0IGJ1bmRsZTogYW55ID0gbm9kZVJlcXVpcmUoJy4vdnVlLXNzci1idW5kbGUuanNvbicpO1xuICAgIGNvbnN0IHRlbXBsYXRlOiBzdHJpbmcgPSBmcy5yZWFkRmlsZVN5bmMocmVzb2x2ZSgnLi4vY2xpZW50L2luZGV4Lmh0bWwnKSwgJ3V0Zi04Jyk7XG5cbiAgICBjcmVhdGVSZW5kZXJlcihidW5kbGUsIHRlbXBsYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkZXZTZXJ2ZXI6IGFueSA9IG5vZGVSZXF1aXJlKCcuL2Rldi1zZXJ2ZXIuanMnKS5kZWZhdWx0O1xuXG4gICAgZGV2U2VydmVyKGFwcCwgKGJ1bmRsZTogc3RyaW5nLCB0ZW1wbGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBjcmVhdGVSZW5kZXJlcihidW5kbGUsIHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcC5nZXQoJyonLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgc2V0SGVhZGVycyhyZXMpO1xuXG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAzKS5lbmQoJ3dhaXRpbmcgZm9yIGNvbXBpbGF0aW9uLi4uIHJlZnJlc2ggaW4gYSBtb21lbnQuJyk7XG4gICAgfVxuXG4gICAgYWNjZXB0TGFuZ3VhZ2UubGFuZ3VhZ2VzKHZ1ZXNpb25Db25maWcuaTE4bi5zdXBwb3J0ZWRMb2NhbGVzKTtcblxuICAgIGNvbnN0IHN0YXJ0VGltZTogbnVtYmVyID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBhY2NlcHRMYW5nOiBzdHJpbmcgPSByZXEuaGVhZGVyc1snYWNjZXB0LWxhbmd1YWdlJ11cbiAgICAgID8gcmVxLmhlYWRlcnNbJ2FjY2VwdC1sYW5ndWFnZSddLnRvU3RyaW5nKClcbiAgICAgIDogdnVlc2lvbkNvbmZpZy5pMThuLmRlZmF1bHRMb2NhbGU7XG4gICAgY29uc3QgZGVmYXVsdExhbmc6IHN0cmluZyA9IGFjY2VwdExhbmd1YWdlLmdldChhY2NlcHRMYW5nKTtcbiAgICBjb25zdCBlcnJvckhhbmRsZXIgPSAoZXJyOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIgJiYgZXJyLmNvZGUgPT09IDQwNCkge1xuICAgICAgICByZXMuc3RhdHVzKDQwNCk7XG4gICAgICAgIExvZ2dlci53YXJuKCd1bnN1cHBvcnRlZCByb3V0ZTogJXM7IGVycm9yOiAlcycsIHJlcS51cmwsIEpTT04uc3RyaW5naWZ5KGVyciwgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKSkpO1xuICAgICAgICByZW5kZXIoJy9ub3QtZm91bmQnKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyICYmIGVyci5jb2RlID09PSAzMDIpIHtcbiAgICAgICAgY29uc3QgcmVkaXJlY3RVcmwgPVxuICAgICAgICAgIFVSTC5mb3JtYXQoe1xuICAgICAgICAgICAgcHJvdG9jb2w6IHJlcS5wcm90b2NvbCxcbiAgICAgICAgICAgIGhvc3Q6IHJlcS5nZXQoJ2hvc3QnKSxcbiAgICAgICAgICB9KSArIGVyci5wYXRoO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0cmFuc2ZlciBzZXJ2ZXIgc3RhdGUgdG8gY29va2llc1xuICAgICAgICAgKi9cbiAgICAgICAgZXJyLmNvb2tpZXMuZm9yRWFjaCgoY29va2llOiBhbnkpID0+IHJlcy5jb29raWUoY29va2llLm5hbWUsIGNvb2tpZS52YWx1ZSkpO1xuXG4gICAgICAgIHJlcy5yZWRpcmVjdCgzMDIsIHJlZGlyZWN0VXJsKTtcbiAgICAgICAgcmVzLnNlbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKTtcbiAgICAgICAgTG9nZ2VyLmVycm9yKFxuICAgICAgICAgICdlcnJvciBkdXJpbmcgcmVuZGVyaW5nOiAlczsgZXJyb3I6ICVzJyxcbiAgICAgICAgICByZXEudXJsLFxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGVyciwgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKSksXG4gICAgICAgICk7XG4gICAgICAgIHJlbmRlcignL2Vycm9yJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCByZW5kZXIgPSAodXJsOiBzdHJpbmcsIHJlZGlyZWN0OiBib29sZWFuID0gZmFsc2UpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IHNlcnZlckNvbnRleHQ6IElTZXJ2ZXJDb250ZXh0ID0ge1xuICAgICAgICB1cmwsXG4gICAgICAgIGNvb2tpZXM6IHJlcS5jb29raWVzLFxuICAgICAgICBhY2NlcHRMYW5ndWFnZTogZGVmYXVsdExhbmcsXG4gICAgICAgIGh0bWxMYW5nOiBkZWZhdWx0TGFuZy5zdWJzdHIoMCwgMiksXG4gICAgICAgIGFwcENvbmZpZzogUnVudGltZUNvbmZpZyhBcHBDb25maWcsIHJlcSksXG4gICAgICAgIHJlZGlyZWN0LFxuICAgICAgfTtcblxuICAgICAgcmVuZGVyZXJcbiAgICAgICAgLnJlbmRlclRvU3RyZWFtKHNlcnZlckNvbnRleHQpXG4gICAgICAgIC5vbignZXJyb3InLCBlcnJvckhhbmRsZXIpXG4gICAgICAgIC5vbignZW5kJywgKCkgPT4gTG9nZ2VyLmRlYnVnKGB3aG9sZSByZXF1ZXN0OiAke0RhdGUubm93KCkgLSBzdGFydFRpbWV9bXNgKSlcbiAgICAgICAgLnBpcGUocmVzKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKHJlcS51cmwpO1xuICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/server/routes/SSRRoutes.ts\n");

/***/ }),

/***/ "./src/server/routes/StaticRoutes.ts":
/*!*******************************************!*\
  !*** ./src/server/routes/StaticRoutes.ts ***!
  \*******************************************/
/*! exports provided: StaticRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StaticRoutes\", function() { return StaticRoutes; });\n/* harmony import */ var serve_favicon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serve-favicon */ \"serve-favicon\");\n/* harmony import */ var serve_favicon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serve_favicon__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ \"./src/server/utils/Utils.ts\");\n/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Logger */ \"./src/server/utils/Logger.ts\");\n\n\n\n\nvar StaticRoutes = function (app) {\n    app.use('/sw.js', Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_2__[\"serve\"])('../client/sw.js'));\n    app.use('/', Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_2__[\"serve\"])('../static'));\n    app.use('/i18n', Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_2__[\"serve\"])('../../i18n'));\n    app.use('/client', Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_2__[\"serve\"])('../client'));\n    app.use(serve_favicon__WEBPACK_IMPORTED_MODULE_0__(path__WEBPACK_IMPORTED_MODULE_1__[\"resolve\"](__dirname, '../static/favicon.ico')));\n    app.post('/log/error', function (req, res) {\n        var err = req.body.error;\n        _utils_Logger__WEBPACK_IMPORTED_MODULE_3__[\"Logger\"].error('error during rendering: %s; error: %s', req.url, JSON.stringify(err, Object.getOwnPropertyNames(err)));\n        res.status(200).json({});\n    });\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy9TdGF0aWNSb3V0ZXMudHM/MjljOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlDO0FBQ1o7QUFDVTtBQUNFO0FBRWxDLElBQU0sWUFBWSxHQUFHLFVBQUMsR0FBd0I7SUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsMERBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDNUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsMERBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDBEQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwwREFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQ0FBTyxDQUFDLDRDQUFZLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7UUFDakQsSUFBTSxHQUFHLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFaEMsb0RBQU0sQ0FBQyxLQUFLLENBQ1YsdUNBQXVDLEVBQ3ZDLEdBQUcsQ0FBQyxHQUFHLEVBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3JELENBQUM7UUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2ZXIvcm91dGVzL1N0YXRpY1JvdXRlcy50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgZmF2aWNvbiBmcm9tICdzZXJ2ZS1mYXZpY29uJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBzZXJ2ZSB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uL3V0aWxzL0xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBTdGF0aWNSb3V0ZXMgPSAoYXBwOiBFeHByZXNzLkFwcGxpY2F0aW9uKSA9PiB7XG4gIGFwcC51c2UoJy9zdy5qcycsIHNlcnZlKCcuLi9jbGllbnQvc3cuanMnKSk7XG4gIGFwcC51c2UoJy8nLCBzZXJ2ZSgnLi4vc3RhdGljJykpO1xuICBhcHAudXNlKCcvaTE4bicsIHNlcnZlKCcuLi8uLi9pMThuJykpO1xuICBhcHAudXNlKCcvY2xpZW50Jywgc2VydmUoJy4uL2NsaWVudCcpKTtcbiAgYXBwLnVzZShmYXZpY29uKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zdGF0aWMvZmF2aWNvbi5pY28nKSkpO1xuICBhcHAucG9zdCgnL2xvZy9lcnJvcicsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCBlcnI6IGFueSA9IHJlcS5ib2R5LmVycm9yO1xuXG4gICAgTG9nZ2VyLmVycm9yKFxuICAgICAgJ2Vycm9yIGR1cmluZyByZW5kZXJpbmc6ICVzOyBlcnJvcjogJXMnLFxuICAgICAgcmVxLnVybCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KGVyciwgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyKSksXG4gICAgKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcbiAgfSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/server/routes/StaticRoutes.ts\n");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! exports provided: app */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return app; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares */ \"./src/server/middlewares/index.ts\");\n/* harmony import */ var _routes_DemoRoutes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/DemoRoutes */ \"./src/server/routes/DemoRoutes.ts\");\n/* harmony import */ var _routes_CounterRoutes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/CounterRoutes */ \"./src/server/routes/CounterRoutes.ts\");\n/* harmony import */ var _routes_StaticRoutes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/StaticRoutes */ \"./src/server/routes/StaticRoutes.ts\");\n/* harmony import */ var _routes_SSRRoutes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/SSRRoutes */ \"./src/server/routes/SSRRoutes.ts\");\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0__();\napp.disable('x-powered-by');\nObject(_middlewares__WEBPACK_IMPORTED_MODULE_1__[\"applyMiddlewares\"])(app);\n/**\n * routes to demonstrate the possibilities of vuesion\n * can be removed if you don't need them in your application\n */\nObject(_routes_DemoRoutes__WEBPACK_IMPORTED_MODULE_2__[\"DemoRoutes\"])(app);\nObject(_routes_CounterRoutes__WEBPACK_IMPORTED_MODULE_3__[\"CounterRoutes\"])(app);\n/**\n * core routes, don't delete these\n */\nObject(_routes_StaticRoutes__WEBPACK_IMPORTED_MODULE_4__[\"StaticRoutes\"])(app);\nObject(_routes_SSRRoutes__WEBPACK_IMPORTED_MODULE_5__[\"SSRRoutes\"])(app);\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3NlcnZlci50cz8zMTc1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUNjO0FBQ0E7QUFDTTtBQUNGO0FBQ047QUFFeEMsSUFBTSxHQUFHLEdBQXdCLG9DQUFPLEVBQUUsQ0FBQztBQUVsRCxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVCLHFFQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXRCOzs7R0FHRztBQUNILHFFQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsMkVBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVuQjs7R0FFRztBQUNILHlFQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsbUVBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2ZXIvc2VydmVyLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGFwcGx5TWlkZGxld2FyZXMgfSBmcm9tICcuL21pZGRsZXdhcmVzJztcbmltcG9ydCB7IERlbW9Sb3V0ZXMgfSBmcm9tICcuL3JvdXRlcy9EZW1vUm91dGVzJztcbmltcG9ydCB7IENvdW50ZXJSb3V0ZXMgfSBmcm9tICcuL3JvdXRlcy9Db3VudGVyUm91dGVzJztcbmltcG9ydCB7IFN0YXRpY1JvdXRlcyB9IGZyb20gJy4vcm91dGVzL1N0YXRpY1JvdXRlcyc7XG5pbXBvcnQgeyBTU1JSb3V0ZXMgfSBmcm9tICcuL3JvdXRlcy9TU1JSb3V0ZXMnO1xuXG5leHBvcnQgY29uc3QgYXBwOiBFeHByZXNzLkFwcGxpY2F0aW9uID0gRXhwcmVzcygpO1xuXG5hcHAuZGlzYWJsZSgneC1wb3dlcmVkLWJ5Jyk7XG5cbmFwcGx5TWlkZGxld2FyZXMoYXBwKTtcblxuLyoqXG4gKiByb3V0ZXMgdG8gZGVtb25zdHJhdGUgdGhlIHBvc3NpYmlsaXRpZXMgb2YgdnVlc2lvblxuICogY2FuIGJlIHJlbW92ZWQgaWYgeW91IGRvbid0IG5lZWQgdGhlbSBpbiB5b3VyIGFwcGxpY2F0aW9uXG4gKi9cbkRlbW9Sb3V0ZXMoYXBwKTtcbkNvdW50ZXJSb3V0ZXMoYXBwKTtcblxuLyoqXG4gKiBjb3JlIHJvdXRlcywgZG9uJ3QgZGVsZXRlIHRoZXNlXG4gKi9cblN0YXRpY1JvdXRlcyhhcHApO1xuU1NSUm91dGVzKGFwcCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/server/server.ts\n");

/***/ }),

/***/ "./src/server/utils/Logger.ts":
/*!************************************!*\
  !*** ./src/server/utils/Logger.ts ***!
  \************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Logger\", function() { return Logger; });\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! winston */ \"winston\");\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Logger = winston__WEBPACK_IMPORTED_MODULE_0__[\"createLogger\"]({\n    transports: [\n        new winston__WEBPACK_IMPORTED_MODULE_0__[\"transports\"].File({\n            filename: 'logs/error.log',\n            level: 'error',\n            maxFiles: 5,\n            maxsize: 10485760,\n            format: winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].combine(winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].splat(), winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].json()),\n        }),\n        new winston__WEBPACK_IMPORTED_MODULE_0__[\"transports\"].File({\n            filename: 'logs/all.log',\n            maxFiles: 5,\n            maxsize: 10485760,\n            format: winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].combine(winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].splat(), winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].json()),\n        }),\n        new winston__WEBPACK_IMPORTED_MODULE_0__[\"transports\"].Console({\n            level: 'debug',\n            handleExceptions: true,\n            format: winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].combine(winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].splat(), winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].colorize(), winston__WEBPACK_IMPORTED_MODULE_0__[\"format\"].simple()),\n        }),\n    ],\n    exitOnError: false,\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL0xvZ2dlci50cz9kZmUxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1DO0FBRTVCLElBQU0sTUFBTSxHQUFtQixvREFBb0IsQ0FBQztJQUN6RCxVQUFVLEVBQUU7UUFDVixJQUFJLGtEQUFrQixDQUFDLElBQUksQ0FBQztZQUMxQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLENBQUM7WUFDWCxPQUFPLEVBQUUsUUFBUTtZQUNqQixNQUFNLEVBQUUsOENBQWMsQ0FBQyxPQUFPLENBQUMsOENBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSw4Q0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzlFLENBQUM7UUFDRixJQUFJLGtEQUFrQixDQUFDLElBQUksQ0FBQztZQUMxQixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsQ0FBQztZQUNYLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLE1BQU0sRUFBRSw4Q0FBYyxDQUFDLE9BQU8sQ0FBQyw4Q0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLDhDQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDOUUsQ0FBQztRQUNGLElBQUksa0RBQWtCLENBQUMsT0FBTyxDQUFDO1lBQzdCLEtBQUssRUFBRSxPQUFPO1lBQ2QsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixNQUFNLEVBQUUsOENBQWMsQ0FBQyxPQUFPLENBQUMsOENBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSw4Q0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFFLDhDQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0csQ0FBQztLQUNIO0lBQ0QsV0FBVyxFQUFFLEtBQUs7Q0FDbkIsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4vc3JjL3NlcnZlci91dGlscy9Mb2dnZXIudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuXG5leHBvcnQgY29uc3QgTG9nZ2VyOiB3aW5zdG9uLkxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgdHJhbnNwb3J0czogW1xuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7XG4gICAgICBmaWxlbmFtZTogJ2xvZ3MvZXJyb3IubG9nJyxcbiAgICAgIGxldmVsOiAnZXJyb3InLFxuICAgICAgbWF4RmlsZXM6IDUsXG4gICAgICBtYXhzaXplOiAxMDQ4NTc2MCxcbiAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZSh3aW5zdG9uLmZvcm1hdC5zcGxhdCgpLCB3aW5zdG9uLmZvcm1hdC5qc29uKCkpLFxuICAgIH0pLFxuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7XG4gICAgICBmaWxlbmFtZTogJ2xvZ3MvYWxsLmxvZycsXG4gICAgICBtYXhGaWxlczogNSxcbiAgICAgIG1heHNpemU6IDEwNDg1NzYwLFxuICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKHdpbnN0b24uZm9ybWF0LnNwbGF0KCksIHdpbnN0b24uZm9ybWF0Lmpzb24oKSksXG4gICAgfSksXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgIGxldmVsOiAnZGVidWcnLFxuICAgICAgaGFuZGxlRXhjZXB0aW9uczogdHJ1ZSxcbiAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZSh3aW5zdG9uLmZvcm1hdC5zcGxhdCgpLCB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLCB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKSksXG4gICAgfSksXG4gIF0sXG4gIGV4aXRPbkVycm9yOiBmYWxzZSxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/server/utils/Logger.ts\n");

/***/ }),

/***/ "./src/server/utils/RuntimeConfig.ts":
/*!*******************************************!*\
  !*** ./src/server/utils/RuntimeConfig.ts ***!
  \*******************************************/
/*! exports provided: RuntimeConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RuntimeConfig\", function() { return RuntimeConfig; });\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ \"lodash/cloneDeep\");\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * The runtime config can be used to override the AppConfig per request,\n * it gets passed to the initial state and can be used in the client code\n */\nvar RuntimeConfig = function (appConfig, req) {\n    var runtimeConfig = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(appConfig);\n    runtimeConfig.features.disableParticles = req.query.disableParticles\n        ? Boolean(req.query.disableParticles)\n        : appConfig.features.disableParticles;\n    return runtimeConfig;\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL1J1bnRpbWVDb25maWcudHM/ZWNiZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtBQUFBO0FBQUE7QUFBQTtBQUF5QztBQUd6Qzs7O0dBR0c7QUFDSSxJQUFNLGFBQWEsR0FBRyxVQUFDLFNBQXFCLEVBQUUsR0FBWTtJQUMvRCxJQUFNLGFBQWEsR0FBZSx1REFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXZELGFBQWEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7UUFDbEUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQ3JDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO0lBRXhDLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9zZXJ2ZXIvdXRpbHMvUnVudGltZUNvbmZpZy50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoL2Nsb25lRGVlcCc7XG5pbXBvcnQgeyBJQXBwQ29uZmlnIH0gZnJvbSAnQC9hcHAvY29uZmlnL0lBcHBDb25maWcnO1xuXG4vKipcbiAqIFRoZSBydW50aW1lIGNvbmZpZyBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSB0aGUgQXBwQ29uZmlnIHBlciByZXF1ZXN0LFxuICogaXQgZ2V0cyBwYXNzZWQgdG8gdGhlIGluaXRpYWwgc3RhdGUgYW5kIGNhbiBiZSB1c2VkIGluIHRoZSBjbGllbnQgY29kZVxuICovXG5leHBvcnQgY29uc3QgUnVudGltZUNvbmZpZyA9IChhcHBDb25maWc6IElBcHBDb25maWcsIHJlcTogUmVxdWVzdCkgPT4ge1xuICBjb25zdCBydW50aW1lQ29uZmlnOiBJQXBwQ29uZmlnID0gY2xvbmVEZWVwKGFwcENvbmZpZyk7XG5cbiAgcnVudGltZUNvbmZpZy5mZWF0dXJlcy5kaXNhYmxlUGFydGljbGVzID0gcmVxLnF1ZXJ5LmRpc2FibGVQYXJ0aWNsZXNcbiAgICA/IEJvb2xlYW4ocmVxLnF1ZXJ5LmRpc2FibGVQYXJ0aWNsZXMpXG4gICAgOiBhcHBDb25maWcuZmVhdHVyZXMuZGlzYWJsZVBhcnRpY2xlcztcblxuICByZXR1cm4gcnVudGltZUNvbmZpZztcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/server/utils/RuntimeConfig.ts\n");

/***/ }),

/***/ "./src/server/utils/Utils.ts":
/*!***********************************!*\
  !*** ./src/server/utils/Utils.ts ***!
  \***********************************/
/*! exports provided: isProd, resolve, serve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isProd\", function() { return isProd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolve\", function() { return resolve; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serve\", function() { return serve; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar isProd = \"development\" === 'production';\nvar resolve = function (file) { return path__WEBPACK_IMPORTED_MODULE_1__[\"resolve\"](__dirname, file); };\nvar serve = function (servePath, cache) {\n    if (cache === void 0) { cache = true; }\n    return express__WEBPACK_IMPORTED_MODULE_0__[\"static\"](resolve(servePath), {\n        maxAge: cache && isProd ? '4w' : 0,\n    });\n};\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWxzL1V0aWxzLnRzP2IwYTkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUVOO0FBRXRCLElBQU0sTUFBTSxHQUFZLGFBQW9CLEtBQUssWUFBWSxDQUFDO0FBRTlELElBQU0sT0FBTyxHQUFHLFVBQUMsSUFBWSxJQUFhLG1EQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUE3QixDQUE2QixDQUFDO0FBRXhFLElBQU0sS0FBSyxHQUFHLFVBQUMsU0FBaUIsRUFBRSxLQUFxQjtJQUFyQixvQ0FBcUI7SUFDNUQscURBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDakMsTUFBTSxFQUFFLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQyxDQUFDO0FBRkYsQ0FFRSxDQUFDIiwiZmlsZSI6Ii4vc3JjL3NlcnZlci91dGlscy9VdGlscy50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBIYW5kbGVyLCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNvbnN0IGlzUHJvZDogYm9vbGVhbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlID0gKGZpbGU6IHN0cmluZyk6IHN0cmluZyA9PiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBmaWxlKTtcblxuZXhwb3J0IGNvbnN0IHNlcnZlID0gKHNlcnZlUGF0aDogc3RyaW5nLCBjYWNoZTogYm9vbGVhbiA9IHRydWUpOiBIYW5kbGVyID0+XG4gIEV4cHJlc3Muc3RhdGljKHJlc29sdmUoc2VydmVQYXRoKSwge1xuICAgIG1heEFnZTogY2FjaGUgJiYgaXNQcm9kID8gJzR3JyA6IDAsXG4gIH0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/server/utils/Utils.ts\n");

/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ./src/server/index webpack/hot/poll?1000 ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/gerrit/Documents/OneDrive/Sites/parli/src/server/index */"./src/server/index.ts");
module.exports = __webpack_require__(/*! webpack/hot/poll?1000 */"./node_modules/webpack/hot/poll.js?1000");


/***/ }),

/***/ "@vuesion/utils/dist/randomGenerator":
/*!******************************************************!*\
  !*** external "@vuesion/utils/dist/randomGenerator" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@vuesion/utils/dist/randomGenerator\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAdnVlc2lvbi91dGlscy9kaXN0L3JhbmRvbUdlbmVyYXRvclwiPzIwMWIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQHZ1ZXNpb24vdXRpbHMvZGlzdC9yYW5kb21HZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAdnVlc2lvbi91dGlscy9kaXN0L3JhbmRvbUdlbmVyYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@vuesion/utils/dist/randomGenerator\n");

/***/ }),

/***/ "accept-language":
/*!**********************************!*\
  !*** external "accept-language" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"accept-language\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhY2NlcHQtbGFuZ3VhZ2VcIj9iNGNhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImFjY2VwdC1sYW5ndWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFjY2VwdC1sYW5ndWFnZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///accept-language\n");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiPzgxODgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYm9keS1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///body-parser\n");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb21wcmVzc2lvblwiP2Y3OTEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiY29tcHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///compression\n");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCI/MjFkYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJjb29raWUtcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///cookie-parser\n");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCI/MjJmZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJleHByZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///express\n");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiP2E0MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///fs\n");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIj9hYWU5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImhlbG1ldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///helmet\n");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCI/OGQxOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJodHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///http\n");

/***/ }),

/***/ "lodash/cloneDeep":
/*!***********************************!*\
  !*** external "lodash/cloneDeep" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash/cloneDeep\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2gvY2xvbmVEZWVwXCI/MWE5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJsb2Rhc2gvY2xvbmVEZWVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoL2Nsb25lRGVlcFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///lodash/cloneDeep\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serve-favicon\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXJ2ZS1mYXZpY29uXCI/MWRkZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJzZXJ2ZS1mYXZpY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VydmUtZmF2aWNvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///serve-favicon\n");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIj82MWU4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InVybC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///url\n");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCI/Nzk3YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJ3aW5zdG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///winston\n");

/***/ })

/******/ })));