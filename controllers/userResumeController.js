const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// 유저 resume post
const postResume = async (req, res, next) => {
  try{
    const userID = req.header('User-ID');
    if (!userID) {
      if (!userID) {
        const error = new Error("User-ID header is required.");
        error.status = 401;
        return next(error);
      }
    }

    const jsonData = req.body;
    console.log(req.header('User-ID'));
    console.log(jsonData)

    // TODO 추후에 키워드 뽑아내는 로직이 여기 추가 되어야 한다

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
}

// resume search
const postResumeSearch = async (req, res, next) => {
  try{
    const userID = req.header('User-ID');
    if (!userID) {
      if (!userID) {
        const error = new Error("User-ID header is required.");
        error.status = 401;
        return next(error);
      }
    }

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
}

module.exports = {
  postResume,
  postResumeSearch,
}