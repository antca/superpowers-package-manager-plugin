'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAIN_PATH_REGEXP = /^(?:(\.|\.\.)\/)?(.*?)(:?\.js)?$/;

function cleanModulePath() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '/index.js' : arguments[0];

  var result = MAIN_PATH_REGEXP.exec(path);
  if (result === null) {
    throw new Error('\'' + path + '\' is not a valid module path');
  }
  var cleanPath = result[2];
  var isNotDirrectPath = result[1] === '..';
  return '' + (isNotDirrectPath ? '../' : '') + cleanPath;
}

exports.default = { cleanModulePath: cleanModulePath };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL25vZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNLGdCQUFnQixHQUFHLGtDQUFrQyxDQUFDOztBQUU1RCxTQUFTLGVBQWUsR0FBcUI7TUFBcEIsSUFBSSx5REFBRyxXQUFXOztBQUN6QyxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsTUFBRyxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQ2xCLFVBQU0sSUFBSSxLQUFLLFFBQUssSUFBSSxtQ0FBK0IsQ0FBQztHQUN6RDtBQUNELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDNUMsZUFBVSxnQkFBZ0IsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFBLEdBQUcsU0FBUyxDQUFHO0NBQ3ZEOztrQkFFYyxFQUFFLGVBQWUsRUFBZixlQUFlLEVBQUUiLCJmaWxlIjoidXRpbHMvbm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE1BSU5fUEFUSF9SRUdFWFAgPSAvXig/OihcXC58XFwuXFwuKVxcLyk/KC4qPykoOj9cXC5qcyk/JC87XG5cbmZ1bmN0aW9uIGNsZWFuTW9kdWxlUGF0aChwYXRoID0gJy9pbmRleC5qcycpIHtcbiAgY29uc3QgcmVzdWx0ID0gTUFJTl9QQVRIX1JFR0VYUC5leGVjKHBhdGgpO1xuICBpZihyZXN1bHQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCcke3BhdGh9JyBpcyBub3QgYSB2YWxpZCBtb2R1bGUgcGF0aGApO1xuICB9XG4gIGNvbnN0IGNsZWFuUGF0aCA9IHJlc3VsdFsyXTtcbiAgY29uc3QgaXNOb3REaXJyZWN0UGF0aCA9IHJlc3VsdFsxXSA9PT0gJy4uJztcbiAgcmV0dXJuIGAke2lzTm90RGlycmVjdFBhdGggPyAnLi4vJyA6ICcnfSR7Y2xlYW5QYXRofWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgY2xlYW5Nb2R1bGVQYXRoIH07XG4iXX0=