// import express and mysql2 for use
const express = require(`express`);
const mysql = require(`mysql2/promise`);
const app = express();

// intoduction to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create connector for connrct database
const connector = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `uefa36132`, //<---- insert your password
  database: `Project_01`,
  port: 3306,
});

// Create endpoint get to get each product from ID
app.get(`/api/product/:id`, async (req, res) => {
  // Create connector but await version
  const awaitConnector = await connector;

  // try to catch error
  try {
    // query #1
    const q1 = await awaitConnector.query(
      `SELECT * FROM stock WHERE id = ${req.params.id}`
    );

    // if no information send 400
    if (q1[0].length == 0) {
      res.status(400).send(`information Not Found`);
    } else {
      res.status(200).json(q1[0]);
    }
  } catch (err) {
    res.status(400).json({
      error: err + "",
    });
  }
});

// Create endpoint delete to delete product from ID
app.delete(`/api/product/:id`, async (req, res) => {
  // Create connector but await version
  const awaitConnector = await connector;

  try {
    // query #1 check before
    const q1 = await awaitConnector.query(
      `SELECT * FROM stock WHERE id = ${req.params.id}`
    );

    // if no information send 400
    if (q1[0].length == 0) {
      res.status(400).send(`information Not Found`);
    } else {
      await awaitConnector.query(
        `DELETE FROM stock WHERE id = ${req.params.id}`
      );

      // query #2 check after
      const q2 = await awaitConnector.query(
        `SELECT * FROM stock WHERE id = ${req.params.id}`
      );
      if (q2[0].length == 0) {
        res.status(204).send(``);
      } else {
        res.status(200).send(`Can not delete`);
      }
    }
  } catch (err) {
    res.status(400).json({
      error: err + "",
    });
  }
});

// Create endpoint post to insert information
app.post(`/api/product`, async (req, res) => {
  // Create connector but await version
  const awaitConnector = await connector;

  //  Create const for get productname ,stockleft and category
  const name = req.body.product_name;
  const stock = req.body.stock_left;
  const category = req.body.category;
  try {
    // query #0 for put id on min unuse id
    await awaitConnector.query(`ALTER TABLE stock AUTO_INCREMENT = 1`)
    const q0 = await awaitConnector.query(`SELECT id FROM stock`);
    let minId = ++q0[0].length;
    let checkOut = true;

    q0[0].forEach((element, index) => {
      if (element.id != ++index && checkOut) {
        minId = index;
        checkOut = false;
      }
    });
    // query #1
    await awaitConnector.query(
      `INSERT INTO stock (id,product_name,stock_left,category) VALUES (${minId},"${name}",${stock},"${category}")`
    );

    // query #2 check insert status
    const q2 = await awaitConnector.query(
      `SELECT product_name AS name FROM stock WHERE id = ${minId}`
    );

    if (q2[0][0].name == name) {
      res.status(200).send(`Information inserted on id ${minId}`);
    } else {
      res.status(200).send(`Can not insert information`);
    }
  } catch (err) {
    res.status(400).json({
      error: err + "",
    });
  }
});

// Create endpoint put to update information from ID
app.put(`/api/product/:id`, async (req, res) => {
  // Create connector but await version
  const awaitConnector = await connector;

  //  Create const for get productname ,stockleft and category
  const name = req.body.product_name;
  const stock = req.body.stock_left;
  const category = req.body.category;
  try {
    // query #0 check before
    const q0 = await awaitConnector.query(
      `SELECT * FROM stock WHERE id = ${req.params.id}`
    );

    if (q0[0].length == 0) {
      res.status(400).send(`Information Not Found`);
    } else {
      // query #1 update
      await awaitConnector.query(
        `UPDATE stock SET product_name = "${name}", stock_left = ${stock} , category = "${category}" WHERE id = ${req.params.id}`
      );

      // query #2 check after
      const q2 = await awaitConnector.query(
        `SELECT * FROM stock WHERE id = ${req.params.id}`
      );

      if (q0[0][0].product_name == q2[0].product_name) {
        res.status(200).send(`Can not Update information`);
      } else {
        res.status(200).send(`Information updated`);
      }
    }
  } catch (err) {
    res.status(400).json({
      error: err + "",
    });
  }
});

// Create connection in port 3000
app.listen(3000, () => {
  console.log(`Already connected`);
});
