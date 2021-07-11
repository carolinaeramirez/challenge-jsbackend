const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const util = require("util");
const unless = require("express-unless");
const app = express();

app.use(express.json());
app.use(cors());

//conexion con la base de datos //

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
    console.log("Esperando solicitudes ", PORT);
});

var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "presupuesto_personal"
});
conexion.connect();
const query = util.promisify(conexion.query).bind(conexion);


//agregar datos//

app.post("/presupuesto", async (req, res) => {
    try {
        const fecha = req.body.fecha;
        const concepto = req.body.concepto;
        const monto = req.body.monto;
        const ingreso = req.body.ingreso;

       if (fecha == null || fecha.length == 0 || /^\s+$/.test(fecha)) {
           res.status(413).send("Ingrese la fecha");
       }

      if (concepto == null || concepto.length == 0 || /^\s+$/.test(concepto)) {
          res.status(413).send("Ingrese un concepto");
       }
       if (monto == null || monto.length == 0 || /^\s+$/.test(monto)) {
            res.status(413).send("Ingresar Monto");
       } else {  const respuesta = await query(
        "insert into presupuesto (fecha, concepto, monto, ingreso) values (?, ?, ?, ?)",
        [fecha,concepto, monto, ingreso]
      );
      const registroInsertado = await query(
        "select * from presupuesto where id=?",
        [respuesta.insertId]
      );
      res.status(200).json(registroInsertado[0]);

       }
    }catch (e) {
        res.status(413).send("Error inesperado " + e);
      }
    });
    //traer lista 

    app.get ("/presupuesto", async (req, res)=>{
        
    })