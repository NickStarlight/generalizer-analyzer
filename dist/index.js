/**
 *   ____                           _ _
 *  / ___| ___ _ __   ___ _ __ __ _| (_)_______ _ __
 * | |  _ / _ \ '_ \ / _ \ '__/ _` | | |_  / _ \ '__|
 * | |_| |  __/ | | |  __/ | | (_| | | |/ /  __/ |
 *  \____|\___|_| |_|\___|_|  \__,_|_|_/___\___|_|
 *
 * @file Main file for `Generalizer` containing feature functions
 * for analyzing raw genetic files.
 */
import { SNPDB } from './db/index.js';
import { snpLookup } from './snp/index.js';
import { parseRawGeneticFileText } from './parser/index.js';
import { GeneticAnalysisVendorEnum } from './vendor/index.js';
/**
 * Analyze a raw genetic file string, returning a list of SNP's available
 * in the `Generalizer` database with the inputted raw data results.
 *
 * @param {string} rawData The raw genetic file contents read as string
 * @param {GeneticAnalysisVendorEnum} vendor The genetic vendor that provided/generated this file
 *
 * @returns {Promise<SNPAnalysisResult[]>} A promise that resolves to an array containing the parsed raw file contents
 */
async function rawAnalysis(rawData, vendor) {
    const dbRSID = SNPDB.map(snp => { return snp.rsid; });
    const parsingResult = await parseRawGeneticFileText(rawData, vendor);
    const filteredResults = parsingResult.filter(snp => { return dbRSID.includes(snp.rsid); });
    /** Iterate over each SNP available in the DB and evaluate if the user has it, returning the analysis result */
    const analysisResults = filteredResults.map(function (snp) {
        return snpLookup(snp.rsid, snp.nucleobase);
    });
    return analysisResults;
}
export { SNPDB, GeneticAnalysisVendorEnum, rawAnalysis };
//# sourceMappingURL=index.js.map