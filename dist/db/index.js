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
var OrientationEnum;
(function (OrientationEnum) {
    /** Also know as plus or forward orientation  */
    OrientationEnum[OrientationEnum["FORWARD"] = 0] = "FORWARD";
    /** Also know as minus or reverse orientation */
    OrientationEnum[OrientationEnum["REVERSE"] = 1] = "REVERSE";
})(OrientationEnum || (OrientationEnum = {}));
/**
 * Enumerates the supported types for SNP Groups.
 */
var SNPGroupNameEnum;
(function (SNPGroupNameEnum) {
    /** Used to group medical conditions like diseases, deficiencies etc... */
    SNPGroupNameEnum[SNPGroupNameEnum["MEDICAL_CONDITIONS"] = 0] = "MEDICAL_CONDITIONS";
    /** Used to group medicine interactions with certain SNP's like aspirin, ibuprofen etc... */
    SNPGroupNameEnum[SNPGroupNameEnum["MEDICINE_INTERACTIONS"] = 1] = "MEDICINE_INTERACTIONS";
    /** Used to group personal characteristics from individuals like eye color */
    SNPGroupNameEnum[SNPGroupNameEnum["PERSONAL_CHARACTERISTICS"] = 2] = "PERSONAL_CHARACTERISTICS";
})(SNPGroupNameEnum || (SNPGroupNameEnum = {}));
/**
 * Maps all available SNP groups.
 * This object makes it easier in the future for creating grouped
 * SNP reports for the end user.
 */
const GROUPDB = {
    [SNPGroupNameEnum.MEDICAL_CONDITIONS]: {
        name: SNPGroupNameEnum.MEDICAL_CONDITIONS,
        prettyName: 'Medical Conditions',
        description: "SNP's associated with medical conditions"
    },
    [SNPGroupNameEnum.MEDICINE_INTERACTIONS]: {
        name: SNPGroupNameEnum.MEDICINE_INTERACTIONS,
        prettyName: 'Medicine Interactions',
        description: "SNP's associated with effects when using certain medicines"
    },
    [SNPGroupNameEnum.PERSONAL_CHARACTERISTICS]: {
        name: SNPGroupNameEnum.PERSONAL_CHARACTERISTICS,
        prettyName: 'Personal Characteristics',
        description: "SNP's associated with personal characteristics"
    }
};
/**
 * Maps all available SNP's and their nucleobase combinations.
 */
const SNPDB = [
    {
        rsid: 'rs7216389',
        group: GROUPDB[SNPGroupNameEnum.MEDICAL_CONDITIONS],
        description: 'Associated with susceptibility of Childhood Asthma',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: '0.69x lower risk of Childhood Asthma'
            },
            {
                combination: 10,
                outcome: 'Normal risk for Childhood Asthma'
            },
            {
                combination: 16,
                outcome: '1.5x increased risk for Childhood Asthma'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs7216389'
        ]
    },
    {
        rsid: 'rs3798220',
        group: GROUPDB[SNPGroupNameEnum.MEDICAL_CONDITIONS],
        description: 'Associated with higher risk of cardiovascular events.',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: '2-3x higher risk for cardiovascular events'
            },
            {
                combination: 10,
                outcome: '2-3x higher risk for cardiovascular events'
            },
            {
                combination: 16,
                outcome: 'Normal risk of cardiovascular events'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs3798220'
        ]
    },
    {
        rsid: 'rs5918',
        group: GROUPDB[SNPGroupNameEnum.MEDICAL_CONDITIONS],
        description: 'Associated with higher risk of Myocardial Infarction, heart diseases',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: 'Higher risk of Myocardial Infarction, heart diseases.'
            },
            {
                combination: 10,
                outcome: 'Higher risk of Myocardial Infarction, heart diseases.'
            },
            {
                combination: 16,
                outcome: 'Normal risk of Myocardial Infarction, heart diseases.'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs5918'
        ]
    },
    {
        rsid: 'rs6983267',
        group: GROUPDB[SNPGroupNameEnum.MEDICAL_CONDITIONS],
        description: 'Determines prostate cancer risk',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 8,
                outcome: '1.6x increased risk for Prostate Cancer'
            },
            {
                combination: 12,
                outcome: '1.3x increased risk of Prostate Cancer'
            },
            {
                combination: 16,
                outcome: 'Normal risk for Prostate Cancer'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs6983267'
        ]
    },
    {
        rsid: 'rs121912617',
        group: GROUPDB[SNPGroupNameEnum.PERSONAL_CHARACTERISTICS],
        description: 'Determines the capacity of functioning with shorter sleep cicles',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: 'Short sleeper, can work normally with less sleep hours'
            },
            {
                combination: 6,
                outcome: 'Short sleeper, can work normally with less sleep hours'
            },
            {
                combination: 8,
                outcome: 'Normal sleeper'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs121912617'
        ]
    },
    {
        rsid: 'rs9264942',
        group: GROUPDB[SNPGroupNameEnum.PERSONAL_CHARACTERISTICS],
        description: 'Affects HIV viral load within infected individuals',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: '90% reduction in HIV viral load'
            },
            {
                combination: 6,
                outcome: '60% reduction in HIV viral load'
            },
            {
                combination: 8,
                outcome: 'No changes in HIV viral load'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs9264942'
        ]
    },
    {
        rsid: 'rs9939609',
        group: GROUPDB[SNPGroupNameEnum.MEDICAL_CONDITIONS],
        description: 'Describes the risk of obesity and Type 2 Diabetes',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 2,
                outcome: 'Higher risk of obesity. 1.6x higher risk of Type 2 Diabetes'
            },
            {
                combination: 9,
                outcome: 'Higher risk of obesity. 1.3x higher risk of Type 2 Diabetes'
            },
            {
                combination: 16,
                outcome: 'Lower risk of obesity. Lower risk of Type 2 Diabetes'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs9939609'
        ]
    },
    {
        rsid: 'rs4680',
        group: GROUPDB[SNPGroupNameEnum.PERSONAL_CHARACTERISTICS],
        description: "Describes the action of the COMT enzyme, which breaks down dopamine in the brain's prefrontal cortex",
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 2,
                outcome: 'Worrier Gene. More exploratory. Lower pain threshold. Enhanced vulnerability to stress. More efficient at processing information under most conditions'
            },
            {
                combination: 5,
                outcome: 'Intermediate between Worrier and Warrior gene'
            },
            {
                combination: 8,
                outcome: 'Warrior Gene. Less exploratory. Higher pain threshold. Better stress resiliency. Modest reduction in executive cognition performance under most conditions'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/Rs4680'
        ]
    },
    {
        rsid: 'rs9275596',
        group: GROUPDB[SNPGroupNameEnum.PERSONAL_CHARACTERISTICS],
        description: 'Describes the risk of developing peanut allergy',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: '3x increased risk for developing a peanut allergy'
            },
            {
                combination: 10,
                outcome: '1.7x increased risk for developing a peanut allergy'
            },
            {
                combination: 16,
                outcome: 'Normal risk of developing peanut allergy'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/rs9275596'
        ]
    },
    {
        rsid: 'rs324420',
        group: GROUPDB[SNPGroupNameEnum.PERSONAL_CHARACTERISTICS],
        description: 'Describes the risk of developing substance use disorders',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 2,
                outcome: 'Significantly increased risk for substance use disorders'
            },
            {
                combination: 3,
                outcome: 'Normal risk'
            },
            {
                combination: 4,
                outcome: 'Normal risk'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/rs9275596'
        ]
    },
    {
        rsid: 'rs1815739',
        group: GROUPDB[SNPGroupNameEnum.PERSONAL_CHARACTERISTICS],
        description: 'Affects individual muscle performance',
        orientation: OrientationEnum.FORWARD,
        nucleobases: [
            {
                combination: 4,
                outcome: 'Better performing muscles. Likely sprinter.'
            },
            {
                combination: 10,
                outcome: 'Mix of muscle types. Likely sprinter.'
            },
            {
                combination: 16,
                outcome: 'Impaired muscle performance. Likely endurance athlete.'
            }
        ],
        informationSources: [
            'https://www.snpedia.com/index.php/rs1815739'
        ]
    }
];
export { SNPGroupNameEnum, SNPDB, GROUPDB };
//# sourceMappingURL=index.js.map