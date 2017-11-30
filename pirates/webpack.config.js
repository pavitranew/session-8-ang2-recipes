const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!URL.startsWith('/') || URL.startsWith('//')) {
                        return URL;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${URL}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
            customProperties({ preserve: true })
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": {
      "rxjs/AsyncSubject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/AsyncSubject.js",
      "rxjs/BehaviorSubject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/BehaviorSubject.js",
      "rxjs/InnerSubscriber": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/InnerSubscriber.js",
      "rxjs/Notification": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Notification.js",
      "rxjs/Observable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Observable.js",
      "rxjs/Observer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Observer.js",
      "rxjs/Operator": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Operator.js",
      "rxjs/OuterSubscriber": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/OuterSubscriber.js",
      "rxjs/ReplaySubject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/ReplaySubject.js",
      "rxjs/Rx": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Rx.js",
      "rxjs/Scheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Scheduler.js",
      "rxjs/Subject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Subject.js",
      "rxjs/SubjectSubscription": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/SubjectSubscription.js",
      "rxjs/Subscriber": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Subscriber.js",
      "rxjs/Subscription": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/Subscription.js",
      "rxjs/add/observable/bindCallback": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/bindCallback.js",
      "rxjs/add/observable/bindNodeCallback": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/bindNodeCallback.js",
      "rxjs/add/observable/combineLatest": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/combineLatest.js",
      "rxjs/add/observable/concat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/concat.js",
      "rxjs/add/observable/defer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/defer.js",
      "rxjs/add/observable/dom/ajax": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/dom/ajax.js",
      "rxjs/add/observable/dom/webSocket": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/dom/webSocket.js",
      "rxjs/add/observable/empty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/empty.js",
      "rxjs/add/observable/forkJoin": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/forkJoin.js",
      "rxjs/add/observable/from": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/from.js",
      "rxjs/add/observable/fromEvent": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/fromEvent.js",
      "rxjs/add/observable/fromEventPattern": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/fromEventPattern.js",
      "rxjs/add/observable/fromPromise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/fromPromise.js",
      "rxjs/add/observable/generate": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/generate.js",
      "rxjs/add/observable/if": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/if.js",
      "rxjs/add/observable/interval": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/interval.js",
      "rxjs/add/observable/merge": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/merge.js",
      "rxjs/add/observable/never": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/never.js",
      "rxjs/add/observable/of": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/of.js",
      "rxjs/add/observable/onErrorResumeNext": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/onErrorResumeNext.js",
      "rxjs/add/observable/pairs": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/pairs.js",
      "rxjs/add/observable/race": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/race.js",
      "rxjs/add/observable/range": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/range.js",
      "rxjs/add/observable/throw": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/throw.js",
      "rxjs/add/observable/timer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/timer.js",
      "rxjs/add/observable/using": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/using.js",
      "rxjs/add/observable/zip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/observable/zip.js",
      "rxjs/add/operator/audit": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/audit.js",
      "rxjs/add/operator/auditTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/auditTime.js",
      "rxjs/add/operator/buffer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/buffer.js",
      "rxjs/add/operator/bufferCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/bufferCount.js",
      "rxjs/add/operator/bufferTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/bufferTime.js",
      "rxjs/add/operator/bufferToggle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/bufferToggle.js",
      "rxjs/add/operator/bufferWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/bufferWhen.js",
      "rxjs/add/operator/catch": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/catch.js",
      "rxjs/add/operator/combineAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/combineAll.js",
      "rxjs/add/operator/combineLatest": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/combineLatest.js",
      "rxjs/add/operator/concat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/concat.js",
      "rxjs/add/operator/concatAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/concatAll.js",
      "rxjs/add/operator/concatMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/concatMap.js",
      "rxjs/add/operator/concatMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/concatMapTo.js",
      "rxjs/add/operator/count": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/count.js",
      "rxjs/add/operator/debounce": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/debounce.js",
      "rxjs/add/operator/debounceTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/debounceTime.js",
      "rxjs/add/operator/defaultIfEmpty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/defaultIfEmpty.js",
      "rxjs/add/operator/delay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/delay.js",
      "rxjs/add/operator/delayWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/delayWhen.js",
      "rxjs/add/operator/dematerialize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/dematerialize.js",
      "rxjs/add/operator/distinct": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/distinct.js",
      "rxjs/add/operator/distinctUntilChanged": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js",
      "rxjs/add/operator/distinctUntilKeyChanged": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/distinctUntilKeyChanged.js",
      "rxjs/add/operator/do": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/do.js",
      "rxjs/add/operator/elementAt": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/elementAt.js",
      "rxjs/add/operator/every": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/every.js",
      "rxjs/add/operator/exhaust": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/exhaust.js",
      "rxjs/add/operator/exhaustMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/exhaustMap.js",
      "rxjs/add/operator/expand": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/expand.js",
      "rxjs/add/operator/filter": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/filter.js",
      "rxjs/add/operator/finally": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/finally.js",
      "rxjs/add/operator/find": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/find.js",
      "rxjs/add/operator/findIndex": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/findIndex.js",
      "rxjs/add/operator/first": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/first.js",
      "rxjs/add/operator/groupBy": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/groupBy.js",
      "rxjs/add/operator/ignoreElements": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/ignoreElements.js",
      "rxjs/add/operator/isEmpty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/isEmpty.js",
      "rxjs/add/operator/last": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/last.js",
      "rxjs/add/operator/let": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/let.js",
      "rxjs/add/operator/map": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/map.js",
      "rxjs/add/operator/mapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/mapTo.js",
      "rxjs/add/operator/materialize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/materialize.js",
      "rxjs/add/operator/max": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/max.js",
      "rxjs/add/operator/merge": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/merge.js",
      "rxjs/add/operator/mergeAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/mergeAll.js",
      "rxjs/add/operator/mergeMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/mergeMap.js",
      "rxjs/add/operator/mergeMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/mergeMapTo.js",
      "rxjs/add/operator/mergeScan": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/mergeScan.js",
      "rxjs/add/operator/min": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/min.js",
      "rxjs/add/operator/multicast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/multicast.js",
      "rxjs/add/operator/observeOn": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/observeOn.js",
      "rxjs/add/operator/onErrorResumeNext": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/onErrorResumeNext.js",
      "rxjs/add/operator/pairwise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/pairwise.js",
      "rxjs/add/operator/partition": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/partition.js",
      "rxjs/add/operator/pluck": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/pluck.js",
      "rxjs/add/operator/publish": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/publish.js",
      "rxjs/add/operator/publishBehavior": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/publishBehavior.js",
      "rxjs/add/operator/publishLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/publishLast.js",
      "rxjs/add/operator/publishReplay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/publishReplay.js",
      "rxjs/add/operator/race": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/race.js",
      "rxjs/add/operator/reduce": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/reduce.js",
      "rxjs/add/operator/repeat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/repeat.js",
      "rxjs/add/operator/repeatWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/repeatWhen.js",
      "rxjs/add/operator/retry": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/retry.js",
      "rxjs/add/operator/retryWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/retryWhen.js",
      "rxjs/add/operator/sample": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/sample.js",
      "rxjs/add/operator/sampleTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/sampleTime.js",
      "rxjs/add/operator/scan": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/scan.js",
      "rxjs/add/operator/sequenceEqual": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/sequenceEqual.js",
      "rxjs/add/operator/share": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/share.js",
      "rxjs/add/operator/shareReplay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/shareReplay.js",
      "rxjs/add/operator/single": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/single.js",
      "rxjs/add/operator/skip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/skip.js",
      "rxjs/add/operator/skipLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/skipLast.js",
      "rxjs/add/operator/skipUntil": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/skipUntil.js",
      "rxjs/add/operator/skipWhile": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/skipWhile.js",
      "rxjs/add/operator/startWith": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/startWith.js",
      "rxjs/add/operator/subscribeOn": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/subscribeOn.js",
      "rxjs/add/operator/switch": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/switch.js",
      "rxjs/add/operator/switchMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/switchMap.js",
      "rxjs/add/operator/switchMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/switchMapTo.js",
      "rxjs/add/operator/take": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/take.js",
      "rxjs/add/operator/takeLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/takeLast.js",
      "rxjs/add/operator/takeUntil": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/takeUntil.js",
      "rxjs/add/operator/takeWhile": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/takeWhile.js",
      "rxjs/add/operator/throttle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/throttle.js",
      "rxjs/add/operator/throttleTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/throttleTime.js",
      "rxjs/add/operator/timeInterval": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/timeInterval.js",
      "rxjs/add/operator/timeout": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/timeout.js",
      "rxjs/add/operator/timeoutWith": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/timeoutWith.js",
      "rxjs/add/operator/timestamp": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/timestamp.js",
      "rxjs/add/operator/toArray": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/toArray.js",
      "rxjs/add/operator/toPromise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/toPromise.js",
      "rxjs/add/operator/window": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/window.js",
      "rxjs/add/operator/windowCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/windowCount.js",
      "rxjs/add/operator/windowTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/windowTime.js",
      "rxjs/add/operator/windowToggle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/windowToggle.js",
      "rxjs/add/operator/windowWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/windowWhen.js",
      "rxjs/add/operator/withLatestFrom": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/withLatestFrom.js",
      "rxjs/add/operator/zip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/zip.js",
      "rxjs/add/operator/zipAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/add/operator/zipAll.js",
      "rxjs/interfaces": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/interfaces.js",
      "rxjs/observable/ArrayLikeObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/ArrayLikeObservable.js",
      "rxjs/observable/ArrayObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/ArrayObservable.js",
      "rxjs/observable/BoundCallbackObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/BoundCallbackObservable.js",
      "rxjs/observable/BoundNodeCallbackObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/BoundNodeCallbackObservable.js",
      "rxjs/observable/ConnectableObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/ConnectableObservable.js",
      "rxjs/observable/DeferObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/DeferObservable.js",
      "rxjs/observable/EmptyObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/EmptyObservable.js",
      "rxjs/observable/ErrorObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/ErrorObservable.js",
      "rxjs/observable/ForkJoinObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/ForkJoinObservable.js",
      "rxjs/observable/FromEventObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/FromEventObservable.js",
      "rxjs/observable/FromEventPatternObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/FromEventPatternObservable.js",
      "rxjs/observable/FromObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/FromObservable.js",
      "rxjs/observable/GenerateObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/GenerateObservable.js",
      "rxjs/observable/IfObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/IfObservable.js",
      "rxjs/observable/IntervalObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/IntervalObservable.js",
      "rxjs/observable/IteratorObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/IteratorObservable.js",
      "rxjs/observable/NeverObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/NeverObservable.js",
      "rxjs/observable/PairsObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/PairsObservable.js",
      "rxjs/observable/PromiseObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/PromiseObservable.js",
      "rxjs/observable/RangeObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/RangeObservable.js",
      "rxjs/observable/ScalarObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/ScalarObservable.js",
      "rxjs/observable/SubscribeOnObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/SubscribeOnObservable.js",
      "rxjs/observable/TimerObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/TimerObservable.js",
      "rxjs/observable/UsingObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/UsingObservable.js",
      "rxjs/observable/bindCallback": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/bindCallback.js",
      "rxjs/observable/bindNodeCallback": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/bindNodeCallback.js",
      "rxjs/observable/combineLatest": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/combineLatest.js",
      "rxjs/observable/concat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/concat.js",
      "rxjs/observable/defer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/defer.js",
      "rxjs/observable/dom/AjaxObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/dom/AjaxObservable.js",
      "rxjs/observable/dom/WebSocketSubject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/dom/WebSocketSubject.js",
      "rxjs/observable/dom/ajax": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/dom/ajax.js",
      "rxjs/observable/dom/webSocket": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/dom/webSocket.js",
      "rxjs/observable/empty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/empty.js",
      "rxjs/observable/forkJoin": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/forkJoin.js",
      "rxjs/observable/from": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/from.js",
      "rxjs/observable/fromEvent": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/fromEvent.js",
      "rxjs/observable/fromEventPattern": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/fromEventPattern.js",
      "rxjs/observable/fromPromise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/fromPromise.js",
      "rxjs/observable/generate": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/generate.js",
      "rxjs/observable/if": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/if.js",
      "rxjs/observable/interval": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/interval.js",
      "rxjs/observable/merge": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/merge.js",
      "rxjs/observable/never": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/never.js",
      "rxjs/observable/of": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/of.js",
      "rxjs/observable/onErrorResumeNext": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/onErrorResumeNext.js",
      "rxjs/observable/pairs": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/pairs.js",
      "rxjs/observable/race": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/race.js",
      "rxjs/observable/range": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/range.js",
      "rxjs/observable/throw": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/throw.js",
      "rxjs/observable/timer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/timer.js",
      "rxjs/observable/using": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/using.js",
      "rxjs/observable/zip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/observable/zip.js",
      "rxjs/operator/audit": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/audit.js",
      "rxjs/operator/auditTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/auditTime.js",
      "rxjs/operator/buffer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/buffer.js",
      "rxjs/operator/bufferCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/bufferCount.js",
      "rxjs/operator/bufferTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/bufferTime.js",
      "rxjs/operator/bufferToggle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/bufferToggle.js",
      "rxjs/operator/bufferWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/bufferWhen.js",
      "rxjs/operator/catch": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/catch.js",
      "rxjs/operator/combineAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/combineAll.js",
      "rxjs/operator/combineLatest": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/combineLatest.js",
      "rxjs/operator/concat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/concat.js",
      "rxjs/operator/concatAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/concatAll.js",
      "rxjs/operator/concatMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/concatMap.js",
      "rxjs/operator/concatMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/concatMapTo.js",
      "rxjs/operator/count": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/count.js",
      "rxjs/operator/debounce": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/debounce.js",
      "rxjs/operator/debounceTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/debounceTime.js",
      "rxjs/operator/defaultIfEmpty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/defaultIfEmpty.js",
      "rxjs/operator/delay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/delay.js",
      "rxjs/operator/delayWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/delayWhen.js",
      "rxjs/operator/dematerialize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/dematerialize.js",
      "rxjs/operator/distinct": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/distinct.js",
      "rxjs/operator/distinctUntilChanged": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/distinctUntilChanged.js",
      "rxjs/operator/distinctUntilKeyChanged": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/distinctUntilKeyChanged.js",
      "rxjs/operator/do": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/do.js",
      "rxjs/operator/elementAt": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/elementAt.js",
      "rxjs/operator/every": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/every.js",
      "rxjs/operator/exhaust": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/exhaust.js",
      "rxjs/operator/exhaustMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/exhaustMap.js",
      "rxjs/operator/expand": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/expand.js",
      "rxjs/operator/filter": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/filter.js",
      "rxjs/operator/finally": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/finally.js",
      "rxjs/operator/find": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/find.js",
      "rxjs/operator/findIndex": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/findIndex.js",
      "rxjs/operator/first": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/first.js",
      "rxjs/operator/groupBy": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/groupBy.js",
      "rxjs/operator/ignoreElements": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/ignoreElements.js",
      "rxjs/operator/isEmpty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/isEmpty.js",
      "rxjs/operator/last": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/last.js",
      "rxjs/operator/let": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/let.js",
      "rxjs/operator/map": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/map.js",
      "rxjs/operator/mapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/mapTo.js",
      "rxjs/operator/materialize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/materialize.js",
      "rxjs/operator/max": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/max.js",
      "rxjs/operator/merge": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/merge.js",
      "rxjs/operator/mergeAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/mergeAll.js",
      "rxjs/operator/mergeMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/mergeMap.js",
      "rxjs/operator/mergeMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/mergeMapTo.js",
      "rxjs/operator/mergeScan": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/mergeScan.js",
      "rxjs/operator/min": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/min.js",
      "rxjs/operator/multicast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/multicast.js",
      "rxjs/operator/observeOn": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/observeOn.js",
      "rxjs/operator/onErrorResumeNext": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/onErrorResumeNext.js",
      "rxjs/operator/pairwise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/pairwise.js",
      "rxjs/operator/partition": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/partition.js",
      "rxjs/operator/pluck": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/pluck.js",
      "rxjs/operator/publish": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/publish.js",
      "rxjs/operator/publishBehavior": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/publishBehavior.js",
      "rxjs/operator/publishLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/publishLast.js",
      "rxjs/operator/publishReplay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/publishReplay.js",
      "rxjs/operator/race": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/race.js",
      "rxjs/operator/reduce": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/reduce.js",
      "rxjs/operator/repeat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/repeat.js",
      "rxjs/operator/repeatWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/repeatWhen.js",
      "rxjs/operator/retry": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/retry.js",
      "rxjs/operator/retryWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/retryWhen.js",
      "rxjs/operator/sample": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/sample.js",
      "rxjs/operator/sampleTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/sampleTime.js",
      "rxjs/operator/scan": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/scan.js",
      "rxjs/operator/sequenceEqual": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/sequenceEqual.js",
      "rxjs/operator/share": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/share.js",
      "rxjs/operator/shareReplay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/shareReplay.js",
      "rxjs/operator/single": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/single.js",
      "rxjs/operator/skip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/skip.js",
      "rxjs/operator/skipLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/skipLast.js",
      "rxjs/operator/skipUntil": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/skipUntil.js",
      "rxjs/operator/skipWhile": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/skipWhile.js",
      "rxjs/operator/startWith": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/startWith.js",
      "rxjs/operator/subscribeOn": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/subscribeOn.js",
      "rxjs/operator/switch": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/switch.js",
      "rxjs/operator/switchMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/switchMap.js",
      "rxjs/operator/switchMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/switchMapTo.js",
      "rxjs/operator/take": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/take.js",
      "rxjs/operator/takeLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/takeLast.js",
      "rxjs/operator/takeUntil": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/takeUntil.js",
      "rxjs/operator/takeWhile": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/takeWhile.js",
      "rxjs/operator/throttle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/throttle.js",
      "rxjs/operator/throttleTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/throttleTime.js",
      "rxjs/operator/timeInterval": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/timeInterval.js",
      "rxjs/operator/timeout": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/timeout.js",
      "rxjs/operator/timeoutWith": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/timeoutWith.js",
      "rxjs/operator/timestamp": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/timestamp.js",
      "rxjs/operator/toArray": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/toArray.js",
      "rxjs/operator/toPromise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/toPromise.js",
      "rxjs/operator/window": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/window.js",
      "rxjs/operator/windowCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/windowCount.js",
      "rxjs/operator/windowTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/windowTime.js",
      "rxjs/operator/windowToggle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/windowToggle.js",
      "rxjs/operator/windowWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/windowWhen.js",
      "rxjs/operator/withLatestFrom": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/withLatestFrom.js",
      "rxjs/operator/zip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/zip.js",
      "rxjs/operator/zipAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operator/zipAll.js",
      "rxjs/operators/audit": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/audit.js",
      "rxjs/operators/auditTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/auditTime.js",
      "rxjs/operators/buffer": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/buffer.js",
      "rxjs/operators/bufferCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/bufferCount.js",
      "rxjs/operators/bufferTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/bufferTime.js",
      "rxjs/operators/bufferToggle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/bufferToggle.js",
      "rxjs/operators/bufferWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/bufferWhen.js",
      "rxjs/operators/catchError": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/catchError.js",
      "rxjs/operators/combineAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/combineAll.js",
      "rxjs/operators/combineLatest": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/combineLatest.js",
      "rxjs/operators/concat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/concat.js",
      "rxjs/operators/concatAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/concatAll.js",
      "rxjs/operators/concatMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/concatMap.js",
      "rxjs/operators/concatMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/concatMapTo.js",
      "rxjs/operators/count": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/count.js",
      "rxjs/operators/debounce": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/debounce.js",
      "rxjs/operators/debounceTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/debounceTime.js",
      "rxjs/operators/defaultIfEmpty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/defaultIfEmpty.js",
      "rxjs/operators/delay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/delay.js",
      "rxjs/operators/delayWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/delayWhen.js",
      "rxjs/operators/dematerialize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/dematerialize.js",
      "rxjs/operators/distinct": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/distinct.js",
      "rxjs/operators/distinctUntilChanged": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/distinctUntilChanged.js",
      "rxjs/operators/distinctUntilKeyChanged": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/distinctUntilKeyChanged.js",
      "rxjs/operators/elementAt": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/elementAt.js",
      "rxjs/operators/every": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/every.js",
      "rxjs/operators/exhaust": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/exhaust.js",
      "rxjs/operators/exhaustMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/exhaustMap.js",
      "rxjs/operators/expand": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/expand.js",
      "rxjs/operators/filter": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/filter.js",
      "rxjs/operators/finalize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/finalize.js",
      "rxjs/operators/find": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/find.js",
      "rxjs/operators/findIndex": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/findIndex.js",
      "rxjs/operators/first": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/first.js",
      "rxjs/operators/groupBy": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/groupBy.js",
      "rxjs/operators/ignoreElements": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/ignoreElements.js",
      "rxjs/operators/index": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/index.js",
      "rxjs/operators/isEmpty": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/isEmpty.js",
      "rxjs/operators/last": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/last.js",
      "rxjs/operators/map": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/map.js",
      "rxjs/operators/mapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/mapTo.js",
      "rxjs/operators/materialize": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/materialize.js",
      "rxjs/operators/max": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/max.js",
      "rxjs/operators/merge": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/merge.js",
      "rxjs/operators/mergeAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/mergeAll.js",
      "rxjs/operators/mergeMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/mergeMap.js",
      "rxjs/operators/mergeMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/mergeMapTo.js",
      "rxjs/operators/mergeScan": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/mergeScan.js",
      "rxjs/operators/min": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/min.js",
      "rxjs/operators/multicast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/multicast.js",
      "rxjs/operators/observeOn": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/observeOn.js",
      "rxjs/operators/onErrorResumeNext": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/onErrorResumeNext.js",
      "rxjs/operators/pairwise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/pairwise.js",
      "rxjs/operators/partition": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/partition.js",
      "rxjs/operators/pluck": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/pluck.js",
      "rxjs/operators/publish": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/publish.js",
      "rxjs/operators/publishBehavior": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/publishBehavior.js",
      "rxjs/operators/publishLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/publishLast.js",
      "rxjs/operators/publishReplay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/publishReplay.js",
      "rxjs/operators/race": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/race.js",
      "rxjs/operators/reduce": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/reduce.js",
      "rxjs/operators/refCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/refCount.js",
      "rxjs/operators/repeat": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/repeat.js",
      "rxjs/operators/repeatWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/repeatWhen.js",
      "rxjs/operators/retry": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/retry.js",
      "rxjs/operators/retryWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/retryWhen.js",
      "rxjs/operators/sample": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/sample.js",
      "rxjs/operators/sampleTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/sampleTime.js",
      "rxjs/operators/scan": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/scan.js",
      "rxjs/operators/sequenceEqual": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/sequenceEqual.js",
      "rxjs/operators/share": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/share.js",
      "rxjs/operators/shareReplay": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/shareReplay.js",
      "rxjs/operators/single": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/single.js",
      "rxjs/operators/skip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/skip.js",
      "rxjs/operators/skipLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/skipLast.js",
      "rxjs/operators/skipUntil": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/skipUntil.js",
      "rxjs/operators/skipWhile": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/skipWhile.js",
      "rxjs/operators/startWith": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/startWith.js",
      "rxjs/operators/subscribeOn": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/subscribeOn.js",
      "rxjs/operators/switchAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/switchAll.js",
      "rxjs/operators/switchMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/switchMap.js",
      "rxjs/operators/switchMapTo": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/switchMapTo.js",
      "rxjs/operators/take": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/take.js",
      "rxjs/operators/takeLast": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/takeLast.js",
      "rxjs/operators/takeUntil": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/takeUntil.js",
      "rxjs/operators/takeWhile": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/takeWhile.js",
      "rxjs/operators/tap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/tap.js",
      "rxjs/operators/throttle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/throttle.js",
      "rxjs/operators/throttleTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/throttleTime.js",
      "rxjs/operators/timeInterval": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/timeInterval.js",
      "rxjs/operators/timeout": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/timeout.js",
      "rxjs/operators/timeoutWith": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/timeoutWith.js",
      "rxjs/operators/timestamp": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/timestamp.js",
      "rxjs/operators/toArray": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/toArray.js",
      "rxjs/operators/window": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/window.js",
      "rxjs/operators/windowCount": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/windowCount.js",
      "rxjs/operators/windowTime": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/windowTime.js",
      "rxjs/operators/windowToggle": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/windowToggle.js",
      "rxjs/operators/windowWhen": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/windowWhen.js",
      "rxjs/operators/withLatestFrom": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/withLatestFrom.js",
      "rxjs/operators/zip": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/zip.js",
      "rxjs/operators/zipAll": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/zipAll.js",
      "rxjs/scheduler/Action": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/Action.js",
      "rxjs/scheduler/AnimationFrameAction": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/AnimationFrameAction.js",
      "rxjs/scheduler/AnimationFrameScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/AnimationFrameScheduler.js",
      "rxjs/scheduler/AsapAction": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/AsapAction.js",
      "rxjs/scheduler/AsapScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/AsapScheduler.js",
      "rxjs/scheduler/AsyncAction": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/AsyncAction.js",
      "rxjs/scheduler/AsyncScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/AsyncScheduler.js",
      "rxjs/scheduler/QueueAction": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/QueueAction.js",
      "rxjs/scheduler/QueueScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/QueueScheduler.js",
      "rxjs/scheduler/VirtualTimeScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/VirtualTimeScheduler.js",
      "rxjs/scheduler/animationFrame": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/animationFrame.js",
      "rxjs/scheduler/asap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/asap.js",
      "rxjs/scheduler/async": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/async.js",
      "rxjs/scheduler/queue": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/scheduler/queue.js",
      "rxjs/symbol/iterator": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/symbol/iterator.js",
      "rxjs/symbol/observable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/symbol/observable.js",
      "rxjs/symbol/rxSubscriber": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/symbol/rxSubscriber.js",
      "rxjs/testing/ColdObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/testing/ColdObservable.js",
      "rxjs/testing/HotObservable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/testing/HotObservable.js",
      "rxjs/testing/SubscriptionLog": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/testing/SubscriptionLog.js",
      "rxjs/testing/SubscriptionLoggable": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/testing/SubscriptionLoggable.js",
      "rxjs/testing/TestMessage": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/testing/TestMessage.js",
      "rxjs/testing/TestScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/testing/TestScheduler.js",
      "rxjs/util/AnimationFrame": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/AnimationFrame.js",
      "rxjs/util/ArgumentOutOfRangeError": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/ArgumentOutOfRangeError.js",
      "rxjs/util/EmptyError": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/EmptyError.js",
      "rxjs/util/FastMap": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/FastMap.js",
      "rxjs/util/Immediate": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/Immediate.js",
      "rxjs/util/Map": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/Map.js",
      "rxjs/util/MapPolyfill": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/MapPolyfill.js",
      "rxjs/util/ObjectUnsubscribedError": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js",
      "rxjs/util/Set": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/Set.js",
      "rxjs/util/TimeoutError": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/TimeoutError.js",
      "rxjs/util/UnsubscriptionError": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/UnsubscriptionError.js",
      "rxjs/util/applyMixins": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/applyMixins.js",
      "rxjs/util/assign": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/assign.js",
      "rxjs/util/errorObject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/errorObject.js",
      "rxjs/util/identity": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/identity.js",
      "rxjs/util/isArray": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isArray.js",
      "rxjs/util/isArrayLike": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isArrayLike.js",
      "rxjs/util/isDate": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isDate.js",
      "rxjs/util/isFunction": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isFunction.js",
      "rxjs/util/isNumeric": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isNumeric.js",
      "rxjs/util/isObject": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isObject.js",
      "rxjs/util/isPromise": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isPromise.js",
      "rxjs/util/isScheduler": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/isScheduler.js",
      "rxjs/util/noop": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/noop.js",
      "rxjs/util/not": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/not.js",
      "rxjs/util/pipe": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/pipe.js",
      "rxjs/util/root": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/root.js",
      "rxjs/util/subscribeToResult": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/subscribeToResult.js",
      "rxjs/util/toSubscriber": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/toSubscriber.js",
      "rxjs/util/tryCatch": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/util/tryCatch.js",
      "rxjs/operators": "/Volumes/Bucket/NYU/intermediate/session-8/pirates/node_modules/rxjs/_esm5/operators/index.js"
    },
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
    "styles": [
      "./src/styles.css"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.ts"
      },
      "sourceMap": true,
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {}
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
