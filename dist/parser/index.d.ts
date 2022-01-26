/**
 *   ____                           _ _
 *  / ___| ___ _ __   ___ _ __ __ _| (_)_______ _ __
 * | |  _ / _ \ '_ \ / _ \ '__/ _` | | |_  / _ \ '__|
 * | |_| |  __/ | | |  __/ | | (_| | | |/ /  __/ |
 *  \____|\___|_| |_|\___|_|  \__,_|_|_/___\___|_|
 *
 * @file Declares the `papaparse` library configuration objects
 * that are used by `Generalizer` on a per-vendor basis.
 */
import { ParseConfig, ParseResult } from 'papaparse';
import { GeneticAnalysisVendorEnum } from '../vendor';
/**
 * Defines a common structure for all parsed raw genetic files.
 */
interface NormalizedSNPData {
    /** The regular RSID code */
    rsid: string;
    /** A binary representation of the nucleobase combination */
    nucleobase: number;
}
/**
 * Parses a raw genetic file.
 *
 * @param {string} rawData The raw genetic file contents read as string
 * @param {GeneticAnalysisVendorEnum} vendor The genetic vendor that provided/generated this file
 *
 * @returns {Promise<NormalizedSNPData[]>} A promise that resolves to an array containing the parsed raw file contents
 */
declare function parseRawGeneticFileText(rawData: string, vendor: GeneticAnalysisVendorEnum): Promise<NormalizedSNPData[]>;
/**
 * Normalizes results generated by `parseRawGeneticFileText` to standarize the data
 * across `Generalizer`.
 *
 * @param {ParseResult} parsedResults Results generated by @function parseRawGeneticFileText or a raw `papaparse` call
 * @param {GeneticAnalysisVendorEnum} vendor The genetic vendor that provided/generated this file
 *
 * @returns {NormalizedSNPData[]} Array of standarized SNP data
 */
declare function normalizeParsedGeneticFile(parsedResults: ParseResult<any>, vendor: GeneticAnalysisVendorEnum): NormalizedSNPData[];
/**
 * Maps all available `papaparse` configuration objects available
 * for `Generalizer`.
 */
declare const PARSER_CONFIGURATION: {
    [key in GeneticAnalysisVendorEnum]: ParseConfig;
};
export { NormalizedSNPData, PARSER_CONFIGURATION, parseRawGeneticFileText, normalizeParsedGeneticFile };
