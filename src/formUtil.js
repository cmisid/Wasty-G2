/*
This file contains custom methods for the tcomb-form-native library.

See https://github.com/gcanti/tcomb-form-native for more information.
*/

import { cloneDeep } from 'lodash'
import t from 'tcomb-form-native'

import { colors, textStyle } from './style'

/* Refinements */

// Refinement for making sure a password is long enough
export const Password = t.refinement(t.String, str => str.length >= 6)

// Refinement for making sure a password is long enough
export const Email = t.refinement(t.String, str => /@/.test(str))

/* Checkers */

// Checks that the "password" and the "confirmation" fields are the same
export const passwordChecker = form => form.password === form.confirmation

/* Style sheets */

export const authStyleSheet = () => {
  const ss = cloneDeep(t.form.Form.stylesheet)
  ss.controlLabel.normal.color = colors.secondary
  ss.controlLabel.normal.width = 240
  ss.controlLabel.normal.fontFamily = textStyle.fontFamily
  ss.textbox.normal.borderWidth = 0
  ss.textbox.normal.color = 'white'
  ss.textbox.normal.fontFamily = textStyle.fontFamily
  return ss
}
