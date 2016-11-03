const resHandler = {};

// resHandler.writeDir = (data, res) => {
//   if (data.length === 0) {
//     res.send('There are no notes, add some!');
//   }else{
//     data.forEach((file) => {
//       res.write(file);
//       res.write('/n');
//     });
//     res.end();
//   }
// };

resHandler.errHandler = (res) => {
  if (res.status === 400) {
    res.msg = 'that was not a valid path please check your map';
  }else if (res.status === 404)  {
    res.msg = 'file or directory not found';
  }else if (res.status === 410) {
    res.msg = 'That is not a valid note. Perhaps you meant to create a new note?';
  }else if (res.status === 500) {
    res.msg = 'our server is having difficulties, sorry';
  }
  res.send(res.msg);
};

module.exports = resHandler;