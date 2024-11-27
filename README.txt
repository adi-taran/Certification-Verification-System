
# Certificate Verification System

This project is a full-stack application to verify student certificates. 

## Backend Setup
1. Install dependencies: `npm install express mongoose multer xlsx pdfkit cors`
2. Run the server: `node backend_code.js`

## Frontend Setup
1. Install dependencies: `npm install react axios`
2. Run the React app: `npm start`

## API Endpoints
1. `/upload`: Upload Excel file (Admin)
2. `/verify/:uniqueId`: Verify student details
3. `/certificate/:uniqueId`: Download certificate as PDF
