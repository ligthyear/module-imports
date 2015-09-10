var path = require("path");

module.exports = function(source) {
  this.cacheable();
  var mods = JSON.parse(source).MODULES;
  if (!mods) throw "No MODULES found in configuration";

  var prefix = this.query ? this.query.slice(1) : "./modules/"
  return mods.map(function(x){
    return 'require("' + prefix + x + '/module.jsx");';
  }).join("\n");
};
