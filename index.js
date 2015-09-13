var utils = require('loader-utils');

module.exports = function(mods) {
  this.cacheable();

  var query = utils.parseQuery(this.query),
      prefix = query.path || "./modules/",
      ext = query.ext || "/module.jsx";

  function make_string(x) { return 'require("' + prefix + x + ext + '");'}

  if (!mods) throw "Nothing to import found in configuration!";


  if (!Array.isArray(mods)){
    return 'exports["default"] = ' + make_string(mods);
  }

  return mods.map(function(x){
    return 'exports["' + x + '"] = ' + make_string(x);
  }).join("\n");
};
