'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Ensure security
var renderer = new _marked2.default.Renderer();
renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '" title="' + title + '">' + text + '</a>';
};

function renderMarkdown(markdown) {
  return (0, _marked2.default)(markdown, { renderer: renderer });
}

exports.default = { renderMarkdown: renderMarkdown };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL21hcmtkb3duLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLFFBQVEsR0FBRyxJQUFJLGlCQUFPLFFBQVEsRUFBRSxDQUFDO0FBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUk7dUNBQ0osSUFBSSxpQkFBWSxLQUFLLFVBQUssSUFBSTtDQUFNLENBQUM7O0FBRW5FLFNBQVMsY0FBYyxDQUFDLFFBQVEsRUFBRTtBQUNoQyxTQUFPLHNCQUFPLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZDOztrQkFFYyxFQUFFLGNBQWMsRUFBZCxjQUFjLEVBQUUiLCJmaWxlIjoidXRpbHMvbWFya2Rvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5cbi8vIFRPRE86IEVuc3VyZSBzZWN1cml0eVxuY29uc3QgcmVuZGVyZXIgPSBuZXcgbWFya2VkLlJlbmRlcmVyKCk7XG5yZW5kZXJlci5saW5rID0gKGhyZWYsIHRpdGxlLCB0ZXh0KSA9PlxuICBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7aHJlZn1cIiB0aXRsZT1cIiR7dGl0bGV9XCI+JHt0ZXh0fTwvYT5gO1xuXG5mdW5jdGlvbiByZW5kZXJNYXJrZG93bihtYXJrZG93bikge1xuICByZXR1cm4gbWFya2VkKG1hcmtkb3duLCB7IHJlbmRlcmVyIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IHJlbmRlck1hcmtkb3duIH07XG4iXX0=