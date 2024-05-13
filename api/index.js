const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const parser = require('body-parser');
const jwt = require('jsonwebtoken');
const Customer = require('./schemas/customer');
const Officer = require('./schemas/officer');
const Merchant = require('./schemas/merchant');
const Product = require('./schemas/product');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(cors());
app.use(parser.json());

mongoose.connect('mongodb://127.0.0.1:27017/promotourism')
.then(() => console.log('DB Connected'))
.catch(() => console.log('DB Not Connected'));

app.get('/', (req, res) => {
    res.json({pesan: 'Hello Web Service'});
});


app.post('/customer', async (req, res) => {
    try {
        const data = new Customer({
            origin: req.body.origin,
            name: req.body.name,
            passport: req.body.passport,
            email: req.body.email,
            password: req.body.password
        });
    
        const response = await data.save();
    
        res.json({response});
    } catch (error) {
        console.log(error);
    }
});
app.post('/officer', async (req, res) => {
    try {
        const data = new Officer({
            username: req.body.username,
            password: req.body.password
        });
    
        const response = await data.save();
    
        res.json({response});
    } catch (error) {
        console.log(error);
    }
});
app.post('/merchant', async (req, res) => {
    try {
        const data = new Merchant({
            description: req.body.description,
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            password: ""
        });
    
        const response = await data.save();
    
        res.json({response});
    } catch (error) {
        console.log(error);
    }
});


app.post('/customer/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(404).json({ pesan: "Tidak ditemukan" });
        }

        if (customer.password === password) {
            const token = jwt.sign({ email }, 'secret');
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ pesan: "Password salah" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ pesan: "Internal Server Error" });
    }
});

app.post('/officer/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const officer = await Officer.findOne({ username });

        if (!officer) {
            return res.status(404).json({ pesan: "Tidak ditemukan" });
        }

        if (officer.password === password) {
            const token = jwt.sign({ username }, 'secret');
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ pesan: "Password salah" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ pesan: "Internal Server Error" });
    }
});
app.post('/merchant/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const merchant = await Merchant.findOne({ email });

        if (!merchant) {
            return res.status(404).json({ pesan: "Tidak ditemukan" });
        }

        if (merchant.password === password) {
            const token = jwt.sign({ email }, 'secret');
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ pesan: "Password salah" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ pesan: "Internal Server Error" });
    }
});

  
  app.post('/approve-merchant', async (req, res) => {
    const { email } = req.body;
    const merchant = await Merchant.findOneAndUpdate(
      { email },
      { password: '12345678' },
      { new: true }
    );
    res.json({ success: true });
  });
  
  app.post('/reject-merchant', async (req, res) => {
    const { email } = req.body;
    await Merchant.findOneAndRemove({ email });
    res.json({ success: true });
  });

  app.get('/allmerchant', async (req, res) => {
    try {
      const merchants = await Merchant.find();
      res.json(merchants);
    } catch (error) {
      console.error('Error fetching merchants:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  // POST endpoint to handle product creation with image upload
  app.post('/product', upload.single('image'), async (req, res) => {
    try {
      const { title, description, price, stock } = req.body;
  
      const newProduct = new Product({
        title,
        description,
        price,
        stock,
        image: req.file ? `/uploads/${req.file.filename}` : null
      });
  
      const response = await newProduct.save();
  
      res.json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ pesan: 'Internal Server Error' });
    }
  });

  export const addProduct = async (req, res, next) => {
    //Sets the upload directory to the productimg folder.
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const uploadDir = path.join(__dirname, '..', 'productimg');

    //Creates the upload directory if it does not exist yet/
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    //Creates a new form object using formidable.
    const form = formidable({
        multiples: true,
        uploadDir,
        keepExtensions: true
    });
    //Parses the request body.
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Form parse error:", err);
            return next(CreateError(500, "File upload failed", err));
        }
        //Retreives data from the fields object, without having to manually do them one-by-one.
        const getFieldValue = (fieldValue) => Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;

        //Creates a new product object using the data retreived from the fields object.
        const product = new Product({
            name: getFieldValue(fields.name),
            price: parseFloat(getFieldValue(fields.price)),
            quantity: parseInt(getFieldValue(fields.quantity), 10),
            description: getFieldValue(fields.description),
            category: getFieldValue(fields.category),
            imagesPath: [],
            coverImagePath: '',
            owner: getFieldValue(fields.owner),
        });

        //Process cover image if present (for files.coverImagePath and files.cover)
        if (files.coverImagePath) {
            //Sends the cover image to the moveAndRenameFile function to be processed.
            //The new file name will be saved into the db.
            product.coverImagePath = moveAndRenameFile(files.coverImagePath, uploadDir);
        } else if (files.cover) {
            //Same function as above, but for reduncancy.
            product.coverImagePath = moveAndRenameFile(files.cover, uploadDir);
        }

        //Process product images if present
        //Sends the images to the moveAndRenameFile function to be processed.
        //The new images names will be saved into the db as an array.
        product.imagesPath = Object.keys(files)
            .filter(key => key.startsWith('images[')) // Filter keys that start with 'images['
            .map(key => moveAndRenameFile(files[key], uploadDir)) // Process each image file
            .filter(Boolean); 
        try {
            //Saves the product into the database.
            const savedProduct = await product.save();
            res.status(200).json(savedProduct);
        } catch (error) {
            console.error("Error saving product:", error);
            next(CreateError(500, "Error saving product", error));
        }
    });
};

  
  // Other routes and middleware...

  app.get('/allproduct', async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      console.error('Error fetching merchants:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(3000, () => { console.log('Server Running'); });