/**
 *   ____                           _ _
 *  / ___| ___ _ __   ___ _ __ __ _| (_)_______ _ __
 * | |  _ / _ \ '_ \ / _ \ '__/ _` | | |_  / _ \ '__|
 * | |_| |  __/ | | |  __/ | | (_| | | |/ /  __/ |
 *  \____|\___|_| |_|\___|_|  \__,_|_|_/___\___|_|
 *
 * @file Declares all available SNP's that `Generalizer` can evaluate.
 * While this could work better as a .json file that can be parsed by ETL
 * tools and etc... this allows us to leverage Javascript objects and logic
 * so in the future, genotypes and other complex analysis can be injected
 * inside the DB object.
 */
/**
 * Enumerates the possible SNP orientations.
 *
 * @see https://www.snpedia.com/index.php/Orientation
 */
declare enum OrientationEnum {
    /** Also know as plus or forward orientation  */
    FORWARD = 0,
    /** Also know as minus or reverse orientation */
    REVERSE = 1
}
/**
 * Defines a nucleobase combination and their effects on the associated SNP
 */
interface NucleobaseCombination {
    /** The acid pair for this combination */
    combination: number;
    /** The outcome associated with this combination and the respective SNP */
    outcome: string;
}
/**
 * Defines a group of SNP's with common characteristics, per example, medical conditions
 * or skin related SNP's.
 */
interface SNPGroup {
    /** Enumerated name of the SNP group */
    name: SNPGroupNameEnum;
    /** User-friendly name to be displayed to the final user */
    prettyName: string;
    /** User-friendly description of the SNPs in this group */
    description: string;
}
/**
 * Defines an SNP with it's nucleobase combination results
 */
interface SNP {
    /** Standard rsid code */
    rsid: string;
    /** The group associated with this SNP */
    group: SNPGroup;
    /** User-friendly description of the SNP */
    description: string;
    /** The SNP orientation */
    orientation: OrientationEnum;
    /** A list of nucleobase combinations and their outcomes */
    nucleobases: NucleobaseCombination[];
    /** A list of cientified reviewed sources to back the nucleobases results claims */
    informationSources: string[];
}
/**
 * Enumerates the supported types for SNP Groups.
 */
declare enum SNPGroupNameEnum {
    /** Used to group medical conditions like diseases, deficiencies etc... */
    MEDICAL_CONDITIONS = 0,
    /** Used to group medicine interactions with certain SNP's like aspirin, ibuprofen etc... */
    MEDICINE_INTERACTIONS = 1,
    /** Used to group personal characteristics from individuals like eye color */
    PERSONAL_CHARACTERISTICS = 2
}
/**
 * Maps all available SNP groups.
 * This object makes it easier in the future for creating grouped
 * SNP reports for the end user.
 */
declare const GROUPDB: {
    [key in SNPGroupNameEnum]: SNPGroup;
};
/**
 * Maps all available SNP's and their nucleobase combinations.
 */
declare const SNPDB: SNP[];
export { SNP, SNPGroup, SNPGroupNameEnum, NucleobaseCombination, SNPDB, GROUPDB };
