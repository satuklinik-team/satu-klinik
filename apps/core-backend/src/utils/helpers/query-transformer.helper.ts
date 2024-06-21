function isObject(val) {
  return val.constructor === Object;
}

function isNumber(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}

function isBoolean(val) {
  return val === 'false' || val === 'true';
}

function isArray(val) {
  return Array.isArray(val);
}

function parseValue(val) {
  if (typeof val == 'undefined' || val == '' || val === 'null') {
    return null;
  } else if (isBoolean(val)) {
    return parseBoolean(val);
  } else if (isArray(val)) {
    return parseArray(val);
  } else if (isObject(val)) {
    return parseObject(val);
  } else if (isNumber(val)) {
    return parseNumber(val);
  } else {
    return val;
  }
}

function parseObject(obj) {
  const result: Record<string, unknown> = {};
  let key, val;
  for (key in obj) {
    val = parseValue(obj[key]);
    result[key] = val;
  }
  return result;
}

function parseArray(arr) {
  const result: unknown[] = [];
  for (let i = 0; i < arr.length; i++) {
    result[i] = parseValue(arr[i]);
  }
  return result;
}

function parseNumber(val) {
  return Number(val);
}

function parseBoolean(val) {
  return val === 'true';
}

export const queryTransformer = (query: Record<string, unknown>) =>
  parseValue(query);

export const checkUndefined = (value: any) => (value ? value : null);
