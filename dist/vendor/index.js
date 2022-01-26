import { nucleobaseTextToBinary } from '../snp';
/**
 * Defines the regex mask for validating SNP's RSID.
 *
 * This is a lousy definition, there's no ISO or any other
 * standard to represent and exactly define the format.
 *
 * @see https://www.ncbi.nlm.nih.gov/snp/docs/RefSNP_about/
 */
const SNP_RSID_FORMAT_REGEX = /rs[0-9]{3,12}/;
/**
  * Defines the regex mask for validating SNP's nucleobases.
  */
const SNP_NUCLEOBASE_FORMAT_REGEX = /[AGTC]{2}/;
/**
 * Defines the supported vendors that
 * `Generalizer` can work with.
 */
var GeneticAnalysisVendorEnum;
(function (GeneticAnalysisVendorEnum) {
    /**
     * Genera is a Brazilian genetic analysis vendor
     * @see https://www.genera.com.br
     */
    GeneticAnalysisVendorEnum[GeneticAnalysisVendorEnum["GENERA"] = 0] = "GENERA";
})(GeneticAnalysisVendorEnum || (GeneticAnalysisVendorEnum = {}));
/**
 * Normalizes data from the `Genera` genetic vendor.
 *
 * @param {ParseResult} parsedResults Results generated by @function parseRawGeneticFileText or a raw `papaparse` call
 * @returns {NormalizedSNPData[]} Array of filtered and normalized SNP's
 */
function normalizeGeneraData(parsedResults) {
    /** Cleanup possible weird and inconsistent data that Genera may return */
    const filteredData = parsedResults.data.filter(line => SNP_RSID_FORMAT_REGEX.test(line.RSID) && SNP_NUCLEOBASE_FORMAT_REGEX.test(line.RESULT));
    /** Normalize the data */
    const normalizedData = filteredData.map(line => ({
        rsid: line.RSID,
        nucleobase: nucleobaseTextToBinary(line.RESULT)
    }));
    return normalizedData;
}
export { GeneticAnalysisVendorEnum, normalizeGeneraData };
//# sourceMappingURL=index.js.map