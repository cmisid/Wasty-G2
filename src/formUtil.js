/*
This file contains custom methods for the tcomb-form-native library.

See https://github.com/gcanti/tcomb-form-native for more information.
*/

import t from 'tcomb-form-native'

/* Refinements */

// Refinement for making sure a password is long enough
export const Password = t.refinement(t.String, str => str.length >= 6)

// Refinement for making sure a password is long enough
export const Email = t.refinement(t.String, str => /@/.test(str))

/* Checkers */

// Checks that the "password" and the "confirmation" fields are the same
export const passwordChecker = form => form.password === form.confirmation
