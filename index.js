require('dotenv').config()
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express()
const port = 3000

app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Routing
app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

// 유저 resume post
app.post('/api/user/resume', async (req, res) => {
  try{
    const jsonData = req.body;
    console.log(req.header('User-ID'));
    console.log(jsonData)

    // TODO 추후에 키워드 뽑아내는 로직이 여기 추가 되어야 한다

    const userID = req.header('User-ID');
    if (!userID) {
      return res.status(401).send('User-ID header is required.');
    }

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id : userID,
        folder_id : jsonData.folderID,
        job_category : jsonData.jobCategory,
        question : jsonData.question,
        answer : jsonData.answer,
        user_wrote_keywords : jsonData.userWroteKeywords,
        extracted_keywords : jsonData.extractedKeywords
      })
      .select();

    if (error) {
      console.log(error)
      return res.status(500).send('Supabase Error');
    }

    console.log(data)
    return res.status(200).send('success');
  } catch (e) {
    return res.status(500).send('error');
  }
})

// resume search
app.post('/api/user/resumes/search', async (req, res) => {
  try{
    const jsonData = req.body;
    console.log(jsonData);
    // TODO 추후에 키워드 뽑아내는 로직이 여기 추가 되어야 한다, keywords 수정 필요
    const keywords = ["성격"]

    const { data, error } = await supabase
      .from('resumes')
      .select()
      .contains('user_wrote_keywords',keywords)

    if (error) {
      console.log(error)
      return res.status(500).send('Supabase Error');
    }
    console.log(data)
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).send('error');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})