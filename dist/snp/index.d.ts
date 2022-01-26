/**
 *   ____                           _ _
 *  / ___| ___ _ __   ___ _ __ __ _| (_)_______ _ __
 * | |  _ / _ \ '_ \ / _ \ '__/ _` | | |_  / _ \ '__|
 * | |_| |  __/ | | |  __/ | | (_| | | |/ /  __/ |
 *  \____|\___|_| |_|\___|_|  \__,_|_|_/___\___|_|
 *
 * @file Declares common functions used to parse and normalize SNP information
 * and their nucleobases
 */
import { NucleobaseCombination, SNP } from '../db';
/**
 * Defines a SNP analysis result structure
 * This structure contains the original evaluated SNP that can be found
 * inside the `Generalizer` database and the NucleobaseCombination combination
 * of the evaluated set.
 */
interface SNPAnalysisResult {
    /** A existing SNP inside the `Generalizer` database */
    snp: SNP | null;
    /** The evaluation result against the SNP above */
    result: NucleobaseCombination | null;
}
/**
 * Search a SNP and nucleobase combination.
 *
 * @param {string} rsid Valid SNP RSID for lookup
 * @param {string} combination The nucleobase combination
 * @returns {SNPAnalysisResult} The SNP and nucleobase combination or null in case each one is not found
 */
declare function snpLookup(rsid: string, combination: number): SNPAnalysisResult;
/**
 * Converts a textual nucleobase combination to the respective binary
 * representation used by Generalizer.
 *
 * @param {string} combination A textual nucleobase combination. Ex: AA
 * @returns {number} The binary integer representation, zero if impossible combination
 */
declare function nucleobaseTextToBinary(combination: string): number;
/**
   * Converts a binary nucleobase combination to the respective textual
   * representation.
   *
   * @param {number} combination A binary nucleobase combination. Ex: 10, 16, 3
   * @returns {number|null} The textual representation, null if impossible combination
   */
declare function nucleobaseBinaryToText(combination: number): string | null;
export { SNPAnalysisResult, snpLookup, nucleobaseTextToBinary, nucleobaseBinaryToText };
