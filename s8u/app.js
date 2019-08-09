//引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
//配置第三方模块
//配置连接池
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: 3306,
  database: "xm",
  connectionLimit: 15
});
//跨域
var server = express();
server.use(cors({
  origin: ["http://127.0.0.1:8080",
    "http://localhost:8080"],
  credentials: true
}));
//session
server.use(session({
  secret: "128位字符串",
  resave: true,
  saveUninitialized: true
}));
//指定静态目录
server.use(express.static("public"));
server.listen(3000);


/**********************1.用户************************ */
//1.1用户登录
server.get("/login", (req, res) => {
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  var sql = "SELECT uid FROM xm_user WHERE uname = ? AND upwd = md5(?)";
  var obj = { code: 1, msg: "登录成功", data: [] }
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: "用户名或密码有误" });
    } else {
      
      obj.data = result;
      res.send(obj);
    }
  })
});
//1.2用户名验证
server.get("/loginCheck", (req, res) => {
  var uname = req.query.uname;
  var sql = "SELECT uid FROM xm_user WHERE uname = ? ";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: -1, msg: "用户名已存在" });
    } else {
      res.send({ code: 1, msg: "可以使用" });
    }
  })
})
//1.3用户注册
server.get("/reg", (req, res) => {
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  var sql = "SELECT * FROM xm_user WHERE uname=?"
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: -1, msg: "用户名已存在" });
    } else {
      var sql = "INSERT INTO xm_user VALUES (null,?,md5(?))";
      pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "注册成功" })
        } else {
          res.send({ code: -1, msg: "注册失败" })
        }
      })
    }
  });
});


/**********************2.首页************************ */
//2.1首页菜品查询
server.get("/sel", (req, res) => {
  var type = req.query.type;
  var obj = { code: 1, msg: "查询成功", data: [] }
  var sql = "SELECT * FROM xm_menus WHERE type=?"
  pool.query(sql, [type], (err, result) => {
    if (err) throw err;
    obj.data = result;
    res.send(obj)
  });
});
//2.2首页轮播图片地址查询
server.get("/carousel", (req, res) => {
  var obj = { code: 1, msg: "查询成功", data: [] }
  var sql = "SELECT c_img_url FROM xm_carousel"
  pool.query(sql, (err, result) => {
    if (err) throw err;
    obj.data = result;
    res.send(obj)
  });
});
//2.3首页添加购物车
//2.4搜索栏
server.get("/search", (req, res) => {
  var title = req.query.title;
  var sql = `SELECT mid FROM xm_menus WHERE title LIKE '%${title}%' `;
  var obj = { code: 1, msg: "查询成功", data: [] };
  pool.query(sql, [title], (err, result) => {
    if (err) throw err;
    obj.data = result;
    res.send(obj);
  });
});


/**********************3.菜品详情************************ */
//3.1根据菜品id查询菜品详情
server.get("/det_sel", (req, res) => {
  var mid = req.query.mid;
  var obj = { code: 1, msg: "查询成功", data: [] }
  var sql = "SELECT * FROM xm_menus WHERE mid=?"
  pool.query(sql, [mid], (err, result) => {
    if (err) throw err;
    obj.data = result;
    res.send(obj)
  });
});
//3.2加号
server.get("/index_addList", (req, res) => {
  var uid = req.query.uid;
  var mid = req.query.mid;
  var sql = "SELECT cid,count FROM xm_cart WHERE uid = ? AND menus_id	 = ?"
  pool.query(sql, [uid, mid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      var count = result[0].count;
      var cid = result[0].cid;
      count += 1;
      var sql = "UPDATE xm_cart SET count = ? WHERE xm_cart.cid = ?"
      pool.query(sql, [count, cid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "修改成功" })
        } else {
          res.send({ code: -1, msg: "修改失败" })
        }
      });
    } else {
      var sql = "INSERT INTO xm_cart (cid, count, uid, menus_id	) VALUES (NULL, 1, ?, ?)";
      pool.query(sql, [uid, mid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "添加成功" })
        } else {
          res.send({ code: -1, msg: "添加失败" })
        }
      });
    }
  });
});
//3.3减号
server.get("/index_moveList", (req, res) => {
  var uid = req.query.uid;
  var mid = req.query.mid;
  var sql = "SELECT cid,count FROM xm_cart WHERE uid = ? AND menus_id	 = ?"
  pool.query(sql, [uid, mid], (err, result) => {
    if (err) throw err;
    var count = result[0].count;
    var cid = result[0].cid;
    if (count == 1) {
      var sql = "DELETE FROM xm_cart WHERE xm_cart.cid = ?"
      pool.query(sql, [cid], (err, result) => {
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "删除成功" })
        } else {
          res.send({ code: -1, msg: "删除失败" })
        }
      });
    } else {
      count -= 1;
      var sql = "UPDATE xm_cart SET count = '?' WHERE xm_cart.cid = ?;";
      pool.query(sql, [count, cid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "修改成功" })
        } else {
          res.send({ code: -1, msg: "修改失败" })
        }
      });
    }
  });
});


/**********************4.订单页************************ */

server.get("/list_sel", (req, res) => {
  var uid = req.query.uid;
  var sql = "SELECT count,uid,mid,title,img_url,price FROM xm_cart RIGHT OUTER JOIN xm_menus ON xm_cart.menus_id=xm_menus.mid WHERE uid=?";
  var obj = { code: 1, msg: "查询成功", data: [] };
  pool.query(sql, [uid] , (err, result) => {
    if (err) throw err;
    //将查询到的数据放在obj.data中
    obj.data = result;
    res.send(obj);
  }); 
});

/**********************5.后台管理************************ */
// 5.1管理员登录
server.get("/root", (req, res) => {
  var rname = req.query.rname;
  var rpwd = req.query.rpwd;
  var sql = "SELECT rid FROM xm_user WHERE rname = ? AND rpwd = md5(?)";
  pool.query(sql, [rname, rpwd], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: "账号或密码错误" });
    } else {
      req.session.rid = result[0].id;
      res.send({ code: 1, msg: "登录成功" });
    }
  });
});
// 5.2管理员界面查询
server.get("/admin", (req, res) => {
  //adminSel为前端传来的面板名称所对应的数据表
  var adminSel = req.query.adminSel;
  if (adminSel == "xm_cart") {
    var sql = "SELECT cid,count,uid,mid,title,img_url FROM xm_cart RIGHT OUTER JOIN xm_menus ON xm_cart.menus_id=xm_menus.mid";
    var obj = { code: 1, msg: "查询成功", data: [] };
    pool.query(sql, (err, result) => {
      if (err) throw err;
      //将查询到的数据放在obj.data中
      obj.data = result;
      res.send(obj);
    });
  } else {
    var sql = `SELECT * FROM ${adminSel}`;
    var obj = { code: 1, msg: "查询成功", data: [] };
    pool.query(sql, (err, result) => {
      if (err) throw err;
      //将查询到的数据放在obj.data中
      obj.data = result;
      res.send(obj);
    });
  }
});
//5.3管理员商品添加
server.get("/add_list", (req, res) => {
  var title = req.query.title;
  var price = req.query.price;
  var img_url = req.query.img_url;
  var type = req.query.type;
  var sql = "INSERT INTO `xm_menus` (`mid`, `title`, `price`, `img_url`, `type`) VALUES (NULL, ?, ?, ?, ?)";
  pool.query(sql, [title,price,img_url, type], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "添加成功" })
    } else {
      res.send({ code: -1, msg: "添加失败" })
    }
  });
});
//5.4管理员删除数据
server.get("/del_list", (req, res) => {
  var adminSel = req.query.adminSel;
  var id = req.query.id;
  if (adminSel == "xm_cart") {
    var sql = `DELETE FROM ${adminSel} WHERE cid= ?`
  } else if (adminSel == "xm_menus") {
    var sql = `DELETE FROM ${adminSel} WHERE mid= ?`
  } else {
    var sql = `DELETE FROM ${adminSel} WHERE uid= ?`
  }
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "删除成功" })
    } else {
      res.send({ code: -1, msg: "删除失败" })
    }
  });
});

