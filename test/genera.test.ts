import { readFileSync } from 'fs'
import { NormalizedSNPData, parseRawGeneticFileText } from '../src/parser'
import { GeneticAnalysisVendorEnum } from '../src/vendor'

test('Able to parse a valid `Genera` raw file input', async () => {
  const rawDataString: string = await readFileSync('./test/test-files/validRawGeneraFile.csv', { encoding: 'utf8', flag: 'r' })
  const parsingResult: NormalizedSNPData[] = await parseRawGeneticFileText(rawDataString, GeneticAnalysisVendorEnum.GENERA)

  expect(Array.isArray(parsingResult)).toBe(true) /** On success, the result will always be an array */
  expect(parsingResult).toHaveLength(28) /** The test file contains exactly 28 valid SNP's and 3 broken ones */

  /** Genera parsing results have very specific fields and results */
  parsingResult.forEach((snp) => {
    expect(snp).toHaveProperty('rsid')
    expect(snp).toHaveProperty('nucleobase')
  })
})

test('Empty array on fully invalid `Genera` raw file input without throwing errors', async () => {
  const rawDataString: string = await readFileSync('./test/test-files/invalidRawGeneraFile.csv', { encoding: 'utf8', flag: 'r' })
  const parsingResult: NormalizedSNPData[] = await parseRawGeneticFileText(rawDataString, GeneticAnalysisVendorEnum.GENERA)

  expect(Array.isArray(parsingResult)).toBe(true) /** On success, the result will always be an array */
  expect(parsingResult).toHaveLength(0) /** Complete invalid files should yield zero results and not throw */
})
