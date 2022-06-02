const mysql = require('mysql');


//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

exports.view = (req, res)=>{
//DB connection
pool.getConnection((err, Connection) =>{
 if (err) throw err; //not connected
 console.log('connected as ID', Connection.threadId);
 Connection.query('SELECT * FROM user_table WHERE status = "active"', (err, rows)=>{
     //when connection is done
     Connection.release();

     if(!err){
         let removedUser = req.query.removed;
         res.render('home', {rows, removedUser });
     }else{
         console.log(err);
     }
 });
});
}

//search user
exports.find = (req, res)=>{
//DB connection
pool.getConnection((err, Connection) =>{
    if (err) throw err; //not connected
    console.log('connected as ID', Connection.threadId);
    let searchTerm = req.body.search;
    Connection.query('SELECT * FROM user_table WHERE first_name LIKE ? OR last_name LIKE ?', ['%'+ searchTerm +'%', '%'+ searchTerm +'%'], (err, rows)=>{
        //when connection is done
        Connection.release();
   
        if(!err){
            res.render('home', {rows});
        }else{
            console.log(err);
        }
    });
   });
}

exports.form = (req, res)=>{
    res.render('add-user');
}

// add new user
exports.create = (req, res)=>{
    //DB connection
    const {first_name, last_name, email, phone_number, comment} = req.body;
    pool.getConnection((err, Connection) =>{

        if (err) throw err; //not connected
        console.log('connected as ID', Connection.threadId);
        Connection.query('INSERT INTO  user_table SET first_name = ?, last_name = ?, email = ?, phone_number = ?, comment = ?', [first_name,last_name, email, phone_number, comment], (err, rows)=>{
            //when connection is done
            Connection.release();
            if(!err){
                res.render('add-user', {alert: 'user edit successfuly.'});
            }else{
                console.log(err);
            }
        });
   });
}

// edit user
exports.edit = (req, res)=>{
//DB connection
    pool.getConnection((err, Connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID', Connection.threadId);
        Connection.query('SELECT * FROM user_table WHERE id = ?', [req.params.id], (err, rows)=>{
            //when connection is done
            Connection.release();
            if(!err){
                res.render('edit-user', {rows});
            }else{
                console.log(err);
            }
        });
    });
}

// update user
exports.update = (req, res)=>{
const {first_name, last_name, email, phone_number, comment} = req.body;
//DB connection
    pool.getConnection((err, Connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID', Connection.threadId);
        Connection.query('UPDATE user_table SET first_name = ?, last_name = ?, email = ?, phone_number = ?, comment = ?, WHERE id = ?', [first_name, last_name, email, phone_number, comment, req.params.id], (err, rows)=>{
            //when connection is done
            Connection.release();
    
            if(!err){
                pool.getConnection((err, Connection) =>{
                    if (err) throw err; //not connected
                    console.log('connected as ID', Connection.threadId);
                    Connection.query('SELECT * FROM user_table WHERE id = ?', [req.params.id], (err, rows)=>{
                        //when connection is done
                        Connection.release();
                
                        if(!err){
                            res.render('edit-user', {rows, alert: `${first_name} has been updated.`});
                        }else{
                            console.log(err);
                        }
                    });
                });

            }else{
                console.log(err);
            }
        });
    });
}

// delete user
exports.delete = (req, res)=>{
//DB connection
    pool.getConnection((err, Connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID', Connection.threadId);
        Connection.query('UPDATE user_table SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows)=>{
            //when connection is done
            Connection.release();

            if(!err){
                let removedUser = encodeURIComponent('User successefully removed');
                res.redirect('/?removed=' + removedUser);
            }else{
                console.log(err);
            }
        });
    });
}

// view all user
exports.viewall = (req, res)=>{
//DB connection
    pool.getConnection((err, Connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID', Connection.threadId);
        Connection.query('SELECT * FROM user_table WHERE id = ?', [req.params.id], (err, rows)=>{
            //when connection is done
            Connection.release();
            if(!err){
                res.render('view-user', {rows});
            }else{
                console.log(err);
            }
        });
    });
}