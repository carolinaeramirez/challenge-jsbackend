const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const util = require("util");
const unless = require("express-unless");

const app = express();

app.use(express.urlencoded({ extended: true }));
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
  database: "presupuesto_personal",
});
conexion.connect();

const query = util.promisify(conexion.query).bind(conexion);

//agregar datos//

app.post("/presupuesto", async (req, res) => {
  try {
    const fecha = req.body.fecha;
    const concepto = req.body.concepto;
    const monto = req.body.monto;
    const tipo = req.body.tipo;

    if (fecha == null || fecha.length == 0 || /^\s+$/.test(fecha)) {
      res.status(413).send("Ingrese la fecha");
    }

    if (concepto == null || concepto.length == 0 || /^\s+$/.test(concepto)) {
      res.status(413).send("Ingrese un concepto");
    }
    if (monto == null || monto.length == 0 || /^\s+$/.test(monto)) {
      res.status(413).send("Ingresar Monto");
    } else {
      const respuesta = await query(
        "insert into presupuesto (fecha, concepto, monto, tipo) values (?, ?, ?, ?)",
        [fecha, concepto, monto, tipo]
      );
      const registroInsertado = await query(
        "select * from presupuesto where id=?",
        [respuesta.insertId]
      );
      res.status(200).json(registroInsertado[0]); 
    }
  } catch (e) {
    res.status(413).send("Error inesperado " + e);
  }
});

//traer lista

app.get("/presupuesto", async (req, res) => {
  try {
    const respuesta = await query("select * from presupuesto");
    res.status(200).json(respuesta);
  } catch (e) {
    res.status(413).send("error" + e);
  }
});

//traer solo un resultado especifico
app.get("/presupuesto/:id", async (req, res) => {
  try {
    const respuesta = await query("select * from presupuesto where id=?", [
      req.params.id,
    ]);
    if (respuesta.length == 1) {
      res.status(200).json(respuesta[0]);
    } else {
      res.status(413).send("no se encuentra el registro solicitado");
    }
  } catch (e) {
    res.status(413).send("error" + e);
  }
});



// borro un registro
app.delete("/presupuesto/:id", async (req, res) => {
  try {
    const respuesta = await query("select * from presupuesto where id=?", [
      req.params.id,
    ]);
    if (respuesta.length == 1) {
      await query("delete from presupuesto where id=?", [req.params.id]);
      res.status(200).send("Borrado con exito");
    } else {
      res.status(413).send("REGISTRO NO ENCONTRADO");
    }
  } catch (e) {
    res.status(404).send("error inesperado" + e);
  }
});

//modifico los datos

app.put("/presupuesto/:id", async (req, res) => {
  try {
    const fecha = req.body.fecha;
    const concepto = req.body.concepto;
    const monto = req.body.monto;

    const respuesta = await query("select * from presupuesto where id=?", [
      req.params.id,
    ]);
    if (respuesta.length > 0) {
      const respuesta = await query(
        "update presupuesto set fecha=?, concepto=?, monto=? where id=?",
        [fecha, concepto, monto, req.params.id]
      );
      const registroModificado = await query(
        "select * from presupuesto where id=?",
        [req.params.id]
      );
      res.json(registroModificado[0]);
    } else {
      console.log("se rompio");
    }
  } catch (e) {
    res.status(413).send("esta roto el try " + e);
  }
});

app.get("/ingresos", async (req, res) =>{
  try{
    const ingresos= await query ("select sum(monto) as INGRESOS from presupuesto where tipo = 1"); 
    const resultingresos = Object.values(JSON.parse(JSON.stringify(ingresos[0])));
    res.status(200).send(resultingresos.toString());
  }catch (e) {
    res.status(413).send("NO SE REGISTRAN INGRESOS");
  }
}); 

app.get("/egresos", async (req, res) =>{
  try{
    const egresos= await query ("select sum (monto) as EGRESOS from presupuesto where tipo = 0 "); 
    const resultegresos = Object.values(JSON.parse(JSON.stringify(egresos[0])));
     res.status(200).send(resultegresos.toString());
    
  }catch (e) {
    res.status(413).send("NO SE REGISTRAN EGRESOS");
  }
}); 

app.get("/balance", async (req, res) => {
  try{
    const ingresos= await query ("select sum(monto) as INGRESOS from presupuesto where tipo = 1"); 
    const egresos= await query ("select sum(monto) as EGRESOS from presupuesto where tipo = 0 "); 
    const resultingresos = Object.values(JSON.parse(JSON.stringify(ingresos[0])));
    const resultegresos = Object.values(JSON.parse(JSON.stringify(egresos[0])));
    res.status(200).send((resultingresos - resultegresos).toString());

  }catch (e) {
    res.status(413).send("error" + e);
  }
  
  })

