var path = require("path");
var utils = require('loader-utils');

module.exports = function(source) {
  this.cacheable();

  var query = utils.parseQuery(this.query),
      key = query.key || "MODULES",
      prefix = query.path || "./modules/",
      ext = query.ext || "/module.jsx",
      mods = JSON.parse(source)[key];

  function make_string(x) { return 'require("' + prefix + x + ext + '")'}

  if (!mods) throw "Nothing to import found in configuration!";


  if (!Array.isArray(mods)){
    return 'exports["default"] = ' + make_string(mods) + ';';
  }

  return mods.map(function(x){
    return make_string(x) + ';';
  }).join("\n");
};
