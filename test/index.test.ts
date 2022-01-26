import { rawAnalysis } from '../src/index'
import { SNP, SNPDB } from '../src/db'
import { readFileSync } from 'fs'
import { nucleobaseBinaryToText, nucleobaseTextToBinary, SNPAnalysisResult, snpLookup } from '../src/snp'
import { InvalidVendorError } from '../src/exception'
import { GeneticAnalysisVendorEnum } from '../src/vendor'

test('Valid SNP lookup', () => {
  /** Get an existing SNP from the database and lookup itself */
  const existingDBSNP: SNP = SNPDB[0]
  const evaluation: SNPAnalysisResult = snpLookup(existingDBSNP.rsid, existingDBSNP.nucleobases[0].combination)

  expect(evaluation.snp).not.toBeNull()
  expect(evaluation.result).not.toBeNull()
  expect(evaluation.snp).toMatchObject(existingDBSNP)
  expect(evaluation.result).toMatchObject(existingDBSNP.nucleobases[0])
})

test('Non-existing SNP lookup', () => {
  /** banana123 is not a valid RSID */
  const evaluation: SNPAnalysisResult = snpLookup('banana123', 2)

  expect(evaluation.snp).toEqual(null)
  expect(evaluation.result).toEqual(null)
})

test('Existing SNP but non-existing nucleobase combination', () => {
  /** Get an existing SNP from the database and lookup itself */
  const existingDBSNP: SNP = SNPDB[0]
  const evaluation: SNPAnalysisResult = snpLookup(existingDBSNP.rsid, 8)

  expect(evaluation.snp).toEqual(existingDBSNP)
  expect(evaluation.result).toEqual(null)
})

test('Non-existing SNP and non-existing nucleobase combination', () => {
  const evaluation: SNPAnalysisResult = snpLookup('creamcheese', 0)

  expect(evaluation.snp).toEqual(null)
  expect(evaluation.result).toEqual(null)
})

test('Able to convert possible nucleobase combinations to binary', () => {
  const convertionResultAA: number|undefined = nucleobaseTextToBinary('AA')
  const convertionResultTT: number|undefined = nucleobaseTextToBinary('TT')
  const convertionResultTA: number|undefined = nucleobaseTextToBinary('TA')

  expect(convertionResultAA).toEqual(2)
  expect(convertionResultTT).toEqual(16)
  expect(convertionResultTA).toEqual(9)
})

test('Unable to convert nucleobase combination to binary results in non-fatal zero return', () => {
  const convertionResult: number|undefined = nucleobaseTextToBinary('XX')

  expect(convertionResult).toEqual(0)
})

test('Able to convert binary nucleobase combination to text representation', () => {
  const convertionResult16: string|null = nucleobaseBinaryToText(16)
  const convertionResult12: string|null = nucleobaseBinaryToText(12)
  const convertionResult10: string|null = nucleobaseBinaryToText(10)
  const convertionResult9: string|null = nucleobaseBinaryToText(9)
  const convertionResult8: string|null = nucleobaseBinaryToText(8)
  const convertionResult6: string|null = nucleobaseBinaryToText(6)
  const convertionResult5: string|null = nucleobaseBinaryToText(5)
  const convertionResult4: string|null = nucleobaseBinaryToText(4)
  const convertionResult3: string|null = nucleobaseBinaryToText(3)
  const convertionResult2: string|null = nucleobaseBinaryToText(2)

  expect(convertionResult2).toEqual('AA')
  expect(convertionResult3).toEqual('CA')
  expect(convertionResult5).toEqual('GA')
  expect(convertionResult9).toEqual('TA')
  expect(convertionResult4).toEqual('CC')
  expect(convertionResult6).toEqual('GC')
  expect(convertionResult10).toEqual('TC')
  expect(convertionResult8).toEqual('GG')
  expect(convertionResult12).toEqual('TG')
  expect(convertionResult16).toEqual('TT')
})

test('Unable to convert binary nucleobase combination to text representation results in non-fatal null return', () => {
  const convertionResult40: string|null = nucleobaseBinaryToText(40)

  expect(convertionResult40).toEqual(null)
})

test('Analyze a raw file string and return valid results', async () => {
  const rawDataString: string = await readFileSync('./test/test-files/validRawGeneraFile.csv', { encoding: 'utf8', flag: 'r' })
  const parsingResult: SNPAnalysisResult[] = await rawAnalysis(rawDataString, GeneticAnalysisVendorEnum.GENERA)

  expect(Array.isArray(parsingResult)).toBe(true) /** On success, the result will always be an array */
  expect(parsingResult).toHaveLength(1) /** The test file contains exactly 1 SNP from the database */
})

test('Attempting to analyze a valid raw file string with an unknow vendor enumerate', async () => {
  const rawDataString: string = await readFileSync('./test/test-files/validRawGeneraFile.csv', { encoding: 'utf8', flag: 'r' })
  // @ts-expect-error
  await expect(rawAnalysis(rawDataString, 'FISH_GENETICS_INC')).rejects.toThrow(InvalidVendorError)
})
