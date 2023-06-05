const router = require('express').Router()
const conexion = require('./config/conexion')


// ------------ Agregamos las rutas ---------------

// GET productos
router.get('/productos', (req, res)=>{
    conexion.query('SELECT * FROM tb_inventario2', (err, rows, fields)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.json(rows);
        }
    });
})

// GET un producto
router.get('/productos/:id', (req, res)=>{
    const {id} = req.params;
    conexion.query('SELECT * FROM tb_inventario2 WHERE id = ?', [id], (err, rows, fields)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.json(rows[0]);
        }
    });
})

// POST un producto
router.post('/productos', (req, res) => {
    const { nombre_producto, foto_producto, precio_producto } = req.body;
    let sql = 'INSERT INTO tb_inventario2 (nombre_producto, foto_producto, precio_producto) VALUES (?, ?, ?)';
    conexion.query(sql, [nombre_producto, foto_producto, precio_producto], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error al agregar el producto' });
      } else {
        res.json({ status: 'Producto agregado' });
      }
    });
  });
  


// DELETE un producto
// DELETE un producto
// DELETE un producto
router.delete('/productos/:id', (req, res)=>{
    const {id} = req.params;
    if (typeof id === 'undefined') {
        res.status(400).json({ error: 'ID no definido' });
    } else {
        conexion.query('DELETE FROM tb_inventario2 WHERE id_producto = ?', [id], (err, rows, fields)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.json({status: 'Producto eliminado'});
            }
        });
    }
})




// PUT un producto
// PUT un producto
router.put('/productos/:id', (req, res) => {
    const { nombre, precio } = req.body;
    const { id } = req.params;
    let sql = `UPDATE tb_inventario2 SET nombre_producto = ?, precio_producto = ? WHERE id_producto = ?`;
    conexion.query(sql, [nombre, precio, id], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.json({ status: 'Producto actualizado' });
      }
    });
  });
  
module.exports = router;
