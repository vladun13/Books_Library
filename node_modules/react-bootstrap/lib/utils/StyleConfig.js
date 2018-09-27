"use strict";

exports.__esModule = true;
exports.Style = exports.State = exports.DEVICE_SIZES = exports.SIZE_MAP = exports.Size = void 0;
var Size = {
  LARGE: 'large',
  SMALL: 'small',
  XSMALL: 'xsmall'
};
exports.Size = Size;
var SIZE_MAP = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
};
exports.SIZE_MAP = SIZE_MAP;
var DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
exports.DEVICE_SIZES = DEVICE_SIZES;
var State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DARK: 'dark',
  LINK: 'light',
  // TODO: legacy, remove
  DEFAULT: 'default'
};
exports.State = State;
var Style = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
  LINK: 'link',
  INVERSE: 'inverse',
  // TODO: legacy, remove
  DEFAULT: 'default'
};
exports.Style = Style;