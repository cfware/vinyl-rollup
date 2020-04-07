# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.8.0](https://github.com/cfware/vinyl-rollup/compare/v0.7.0...v0.8.0) (2020-04-07)


### ⚠ BREAKING CHANGES

* Upgrade rollup to 2.x (#43)

### Features

* Upgrade rollup to 2.x ([#43](https://github.com/cfware/vinyl-rollup/issues/43)) ([042a3a3](https://github.com/cfware/vinyl-rollup/commit/042a3a378932ea5db87d7fbfad74e0c150ef830f))

## [0.7.0](https://github.com/cfware/vinyl-rollup/compare/v0.6.2...v0.7.0) (2020-01-26)


### ⚠ BREAKING CHANGES

* The `rollup.output.vinylOpts` option has been renamed to
`rollup.output.vinylOptions`.
* Use of this module through the user-space `esm` is no
longer supported.

### Features

* Support node.js native ES module ([48dcd87](https://github.com/cfware/vinyl-rollup/commit/48dcd87d5bdb2a7a5bf301654cb7f0374b9f71bc))

### [0.6.2](https://github.com/cfware/vinyl-rollup/compare/v0.6.1...v0.6.2) (2019-08-13)


### Bug Fixes

* Use official rollup API for bundled module names ([#24](https://github.com/cfware/vinyl-rollup/issues/24)) ([1227f59](https://github.com/cfware/vinyl-rollup/commit/1227f59))

### [0.6.1](https://github.com/cfware/vinyl-rollup/compare/v0.6.0...v0.6.1) (2019-07-14)


### Bug Fixes

* **package:** update p-map to version 3.0.0 ([#21](https://github.com/cfware/vinyl-rollup/issues/21)) ([2a06f5a](https://github.com/cfware/vinyl-rollup/commit/2a06f5a))



## [0.6.0](https://github.com/cfware/vinyl-rollup/compare/v0.5.1...v0.6.0) (2019-07-05)


### Features

* Restructure closer to eventual node.js native ESM ([3ac63b8](https://github.com/cfware/vinyl-rollup/commit/3ac63b8))


### BREAKING CHANGES

* This module no longer distributes CJS, can be loaded
via esm or babel.



## [0.5.1](https://github.com/cfware/vinyl-rollup/compare/v0.5.0...v0.5.1) (2019-04-05)


### Bug Fixes

* Remove arrify dependency ([08b75bb](https://github.com/cfware/vinyl-rollup/commit/08b75bb))



# [0.5.0](https://github.com/cfware/vinyl-rollup/compare/v0.4.2...v0.5.0) (2019-03-16)


### Features

* Do not perform recursive module copy for copyModules: true. ([fd225ea](https://github.com/cfware/vinyl-rollup/commit/fd225ea))



## [0.4.2](https://github.com/cfware/vinyl-rollup/compare/v0.4.1...v0.4.2) (2019-02-27)


### Bug Fixes

* Resolve incompatibility with rollup >= 1.2.5. ([966d3a2](https://github.com/cfware/vinyl-rollup/commit/966d3a2))
