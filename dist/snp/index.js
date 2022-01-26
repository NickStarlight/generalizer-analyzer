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
import { SNPDB } from '../db/index';
/**
 * Enumerates the possible nucleobase combinations.
 *
 * Converting each acid to a binary representation allows
 * us to use primitive mathematical operations to check if
 * a provided SNP contains the described combination, this works
 * because the sum of each combination is unique.
 */
var AcidBinaryNotationEnum;
(function (AcidBinaryNotationEnum) {
    AcidBinaryNotationEnum[AcidBinaryNotationEnum["A"] = 1] = "A";
    AcidBinaryNotationEnum[AcidBinaryNotationEnum["C"] = 2] = "C";
    AcidBinaryNotationEnum[AcidBinaryNotationEnum["G"] = 4] = "G";
    AcidBinaryNotationEnum[AcidBinaryNotationEnum["T"] = 8] = "T";
})(AcidBinaryNotationEnum || (AcidBinaryNotationEnum = {}));
/**
 * Search a SNP and nucleobase combination.
 *
 * @param {string} rsid Valid SNP RSID for lookup
 * @param {string} combination The nucleobase combination
 * @returns {SNPAnalysisResult} The SNP and nucleobase combination or null in case each one is not found
 */
function snpLookup(rsid, combination) {
    const lookupResult = SNPDB.find(el => el.rsid === rsid);
    const combinationResult = lookupResult?.nucleobases.find(el => el.combination === combination);
    const result = {
        snp: (lookupResult != null) ? lookupResult : null,
        result: (combinationResult != null) ? combinationResult : null
    };
    return result;
}
/**
 * Converts a textual nucleobase combination to the respective binary
 * representation used by Generalizer.
 *
 * @param {string} combination A textual nucleobase combination. Ex: AA
 * @returns {number} The binary integer representation, zero if impossible combination
 */
function nucleobaseTextToBinary(combination) {
    /** Split each acid character */
    const splittedAcids = combination.split('');
    /** Iterate over each acid, convert it to binary and sum with the next */
    const binarySum = splittedAcids.reduce((sum, acid) => {
        const acidValue = AcidBinaryNotationEnum[acid];
        sum += (acidValue === undefined ? 0 : acidValue);
        return sum;
    }, 0);
    return binarySum;
}
/**
 * Converts a binary nucleobase combination to the respective textual
 * representation.
 *
 * @param {number} combination A binary nucleobase combination. Ex: 10, 16, 3
 * @returns {number|null} The textual representation, null if impossible combination
 */
function nucleobaseBinaryToText(combination) {
    /** Those are all the valid binary representations possible */
    if (![1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 16].includes(combination)) {
        return null;
    }
    /** Homozygotes are AA, CC, GG and TT, they can't be parsed by regular bitwise operations */
    const homozygotes = [2, 4, 8, 16];
    if (homozygotes.includes(combination)) {
        const acidValue = AcidBinaryNotationEnum[combination / 2];
        return `${acidValue}${acidValue}`;
    }
    /** In Heterozygotes, we can apply bitwise operations to guess the sum of the values */
    let textRepresentation = '';
    if ((combination & AcidBinaryNotationEnum.T) !== 0) {
        textRepresentation = textRepresentation.concat('T');
    }
    if ((combination & AcidBinaryNotationEnum.G) !== 0) {
        textRepresentation = textRepresentation.concat('G');
    }
    if ((combination & AcidBinaryNotationEnum.C) !== 0) {
        textRepresentation = textRepresentation.concat('C');
    }
    if ((combination & AcidBinaryNotationEnum.A) !== 0) {
        textRepresentation = textRepresentation.concat('A');
    }
    return textRepresentation;
}
export { snpLookup, nucleobaseTextToBinary, nucleobaseBinaryToText };
//# sourceMappingURL=index.js.map