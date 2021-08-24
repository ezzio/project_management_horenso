function checkAuthentica(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("auth thanh cong");
    return next();
  } else {
    console.log("auth that bai");
    res.send({ redirect: "/login" });
  }
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.send({ redirect: "/home" });
  }
}

module.exports = {
  checkAuthentica,
  checkNotAuthenticated,
};
