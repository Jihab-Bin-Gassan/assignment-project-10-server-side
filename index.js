const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// =====================================================================
// already created in old project name and password:
// personalfmUser
// RvYrAGqMqWo0cIGb;

// const uri =
//   'mongodb+srv://personalfmUser:RvYrAGqMqWo0cIGb@cluster0.1daujou.mongodb.net/?appName=Cluster0';
// =====================================================================

// new created project name and password
// financeMUser
// XvZrAGqMqWo0cIGb

const uri =
  'mongodb+srv://financeMUser:XvZrAGqMqWo0cIGb@cluster0.if3njeq.mongodb.net/?appName=Cluster0';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get('/', (req, res) => {
  res.send('personal finance management Server is running');
});

async function run() {
  try {
    await client.connect();

    const db = client.db('personal_fm');
    const balanceCollection = db.collection('balanceOverview');

    app.get('/balance', async (req, res) => {
      // const projectField = { _id: 0, title: 1, amount: 1 };
      // const cursor = balanceCollection
      //   .find()
      //   .sort({ amount: -1 })
      //   .skip(2)
      //   .limit(2)
      //   .project(projectField);

      const cursor = balanceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/balance/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await balanceCollection.findOne(query);
      res.send(result);
    });

    app.post('/balance', async (req, res) => {
      const newBalance = req.body;
      const result = await balanceCollection.insertOne(newBalance);
      res.send(result);
    });

    app.patch('/balance/:id', async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        // $set: updatedProduct,
        $set: {
          name: updatedProduct.name,
          price: updatedProduct.price,
        },
      };
      const result = await balanceCollection.updateOne(query, update);
      res.send(result);
    });

    app.delete('/balance/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await balanceCollection.deleteOne(query);
      res.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`personal finance management server is running on port: ${port}`);
});

// ====================================================
// client
//   .connect()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(
//         `personal finance management server is running now on port: ${port}`,
//       );
//     });
//   })
//   .catch(console.dir);
