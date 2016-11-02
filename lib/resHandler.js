const resHandler = {};

resHandler.writeDir = (data, res) => {
  if (data.length === 0) {
    res.send('There are no notes, add some!');
  }else{
    data.forEach((file) => {
      res.write(file);
      res.write('/n');
    });
    res.end();
  }
};

module.exports = resHandler;