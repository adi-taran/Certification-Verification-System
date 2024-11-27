
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const PDFDocument = require('pdfkit');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/certVerification', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  uniqueId: String,
  startDate: String,
  endDate: String,
  domain: String,
});

const Student = mongoose.model('Student', studentSchema);

app.post('/upload', multer().single('file'), async (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  await Student.insertMany(data);
  res.send({ message: 'Data uploaded successfully!' });
});

app.get('/verify/:uniqueId', async (req, res) => {
  const student = await Student.findOne({ uniqueId: req.params.uniqueId });
  if (student) {
    res.json(student);
  } else {
    res.status(404).send({ message: 'Student not found!' });
  }
});

app.get('/certificate/:uniqueId', async (req, res) => {
  const student = await Student.findOne({ uniqueId: req.params.uniqueId });
  if (!student) return res.status(404).send('Student not found.');

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${student.uniqueId}_certificate.pdf`
  );

  doc.text('Certificate of Completion', { align: 'center' });
  doc.text(`Name: ${student.name}`, { align: 'center' });
  doc.text(`Domain: ${student.domain}`, { align: 'center' });
  doc.text(`Start Date: ${student.startDate}`, { align: 'center' });
  doc.text(`End Date: ${student.endDate}`, { align: 'center' });

  doc.end();
  doc.pipe(res);
});

app.listen(5000, () => console.log('Server running on port 5000'));
