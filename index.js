const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express()
const port = 3000
const {Schema} =  mongoose;

app.use(express.json());
dotenv.config();

const mongoURI = 'mongodb://localhost:27017/job_extension'; // mydatabase는 원하는 데이터베이스 이름
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const resumeSchema = new Schema({
  jobCategory : String,
  question : String,
  answer : String,
})

const userSchema = new Schema({
  id : String,
  password: String,
})

const Resume = mongoose.model('user_resumes', resumeSchema);
const User = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/user/resume', (req, res) => {
  try{
    
  } catch (e) {
    
  }
})

app.post('/api/user/resume', async (req, res) => {
  try{
    const jsonData = req.body;
    console.log(jsonData);
    // 추후에 키워드 뽑아내는 로직이 여기 추가 되어야 한다
    await Resume.create(jsonData);
    res.send('success');
  } catch (e) {
    res.send('error');
  }
})

app.post('/api/user/resumes/search', async (req, res) => {
  try{
    const jsonData = req.body;
    console.log(jsonData);
    res.send('success')
  } catch (e) {
    res.send('error')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})