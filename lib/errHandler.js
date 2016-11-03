module.exports = function errorHandler(err, req, res, next) { //eslint-disable-line
  console.log(res.status, err);
  sendErrMsg(res);
};

function sendErrMsg(res) {
  if (res.status === 400) {
    res.msg = 'that was not a valid path please check your map';
  }else if (res.status === 404) {
    res.msg = 'file or directory not found';
  }else if (res.status === 410) {
    res.msg = 'That is not a valid note. Perhaps you meant to create a new note?';
  }else if (res.status === 500) {
    res.msg = 'our server is having difficulties, sorry';
  }
  res.send(res.msg);
}