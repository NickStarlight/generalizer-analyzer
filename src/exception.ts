/**
 *   ____                           _ _
 *  / ___| ___ _ __   ___ _ __ __ _| (_)_______ _ __
 * | |  _ / _ \ '_ \ / _ \ '__/ _` | | |_  / _ \ '__|
 * | |_| |  __/ | | |  __/ | | (_| | | |/ /  __/ |
 *  \____|\___|_| |_|\___|_|  \__,_|_|_/___\___|_|
 *
 * @file Declares all the errors used by `Generalizer`
 */
/**
 * Defines the error when parsing a file and the
 * supplied vendor enumerate does not exist.
 */
class InvalidVendorError extends Error {
  constructor () {
    super('Invalid genetic vendor supplied')
    Object.setPrototypeOf(this, InvalidVendorError.prototype)
  }
}

export { InvalidVendorError }
