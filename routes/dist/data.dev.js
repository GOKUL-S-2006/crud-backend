"use strict";

var express = require('express');

var router = express.Router();

var Data = require('../models/Data'); //Importing Model to acces database


router.get('/api/display', function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Data.find());

        case 3:
          data = _context.sent;
          res.json(data);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}).get('/api/display/:id', function _callee2(req, res) {
  var id, single_Data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Data.findById(id));

        case 4:
          single_Data = _context2.sent;

          if (single_Data) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "Data not found"
          }));

        case 7:
          res.json(single_Data);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}).post('/api/create', function _callee3(req, res) {
  var _req$body, id, title, content, newData;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            _req$body = req.body, id = _req$body.id, title = _req$body.title, content = _req$body.content;
            newData = Data.create({
              id: id,
              title: title,
              content: content
            });
            res.status(201).json({
              message: 'Created',
              data: newData
            });
          } catch (err) {
            res.status(500).json({
              error: err.message
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
})["delete"]('/api/delete/:id', function _callee4(req, res) {
  var id, deleted;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id; // This matches your custom 'id' field, not MongoDB's '_id'

          _context4.next = 4;
          return regeneratorRuntime.awrap(Data.findOneAndDelete({
            id: id
          }));

        case 4:
          deleted = _context4.sent;

          if (deleted) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Item not found"
          }));

        case 7:
          res.json({
            message: "Deleted successfully"
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}).patch('/api/modify/:id', function _callee5(req, res) {
  var updated;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Data.findOneAndUpdate({
            id: req.params.id
          }, // Find by custom 'id'
          req.body, // Update with data from request body
          {
            "new": true
          } // Return the updated document
          ));

        case 3:
          updated = _context5.sent;

          if (updated) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Data not found"
          }));

        case 6:
          res.json({
            message: 'Modified successfully',
            data: updated
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;