const { getUsersNearby } = require("./database/db");
const datingUser = require('./Model/userModel');

module.exports = {
    getSuggestions: async (req, res, next) => {
      var user = await getUsersNearby("id", req.query.id);
      var city = user[0].city;
      var list;
  
      list = await getScoredList(list, user[0]);
      var idList = [];
      await list.forEach(element => {
        idList.push(element.id);
      });
  
      return res.status(200).json({ list });
    },

getScoredList: async (listData, user) => {
    var score = listData.copyWithin(0);

    for (var i = 0; i < listData.length; i++) {
      var count = 0;
      count +=
        listData[i].city == user.city ;

    };
    return score;
  }}