# Generalizer
[![Total alerts](https://img.shields.io/lgtm/alerts/g/NickStarlight/generalizer-analyzer.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/NickStarlight/generalizer-analyzer/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/NickStarlight/generalizer-analyzer.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/NickStarlight/generalizer-analyzer/context:javascript)
[![codecov](https://codecov.io/gh/NickStarlight/generalizer-analyzer/branch/main/graph/badge.svg?token=6EZ912V460)](https://codecov.io/gh/NickStarlight/generalizer-analyzer)
[![Tests and code coverage analysis](https://github.com/NickStarlight/generalizer-analyzer/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/NickStarlight/generalizer-analyzer/actions/workflows/tests.yml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Typescript](https://img.shields.io/npm/types/typescript)
[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)

## About
This module allows easy interpretation and parsing of raw genetic files provided by consumer-grade genetic analysis vendors
like Genera, Family Tree DNA and 23andMe.

The main goal is allowing fast, easy, human-readable and client-side evaluation of raw genetic data.

## Usage
```js
import { rawAnalysis, GeneticAnalysisVendorEnum } from 'generalizer-analyzer'

const result = rawAnalysis(yourRawDataFileAsString, GeneticAnalysisVendorEnum.GENETICVENDORENUM)
```
For supported genetic vendors enumerated strings, check [src/vendor/index.ts](https://github.com/NickStarlight/generalizer-analyzer/blob/main/src/vendor/index.ts)

For result format, check `SNPAnalysisResult` in [src/snp/index.ts](https://github.com/NickStarlight/generalizer-analyzer/blob/main/src/snp/index.ts)

## Currently supported genetic vendors
* Genera (http://genera.com.br)

## Developing
1. `git clone https://github.com/NickStarlight/generalizer-analyzer.git`
2. `npm install`
3. `npm run dev` or `npm run build`

Would like to change something? Open a pull request!

## Core principles
* Every analyzed SNP **must** contain solid sources to back it's claims.
* Every analyzed SNP **must** contain easy to read and interpret text meant to every public.
* Data **must** **never** be sent over the network, thus, this module shall remain client-side only.
* The implementation **must** target all modern browsers up to 3 versions behind the current LTS.
* This must remain as free software, **forever**.

## Acknowledgments
* [SNPedia](https://www.snpedia.com) for providing free, open-source genetic knowledge for the world.

## License
This work is licensed under the [WTFPL](https://choosealicense.com/licenses/wtfpl/) license.
