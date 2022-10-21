// frontend/src/components/CreateGroupImageModal/CreateGroupImage.js
import React, { useState, useEffect } from "react";
import * as groupActions from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function CreateGroupImage() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const params = useParams()
  const history = useHistory()
  let {groupId} = params
  let group = useSelector(state => state.group.group)

  
  useEffect(() => {
    if(group.GroupImages) return 
  },[])

  useEffect(()=> {
    let validationErrors = [];
    if(url.length > 500) validationErrors.push('Image url must be less than 500')
  },[url])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

    if(errors.length <= 0){
      await dispatch(groupActions.createAGroupImg({ url, preview: false }, groupId)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      setUrl('')    
      document.getElementById('ImageModal').style.display = 'none'
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <div className='meetupIcon'>
        <img className='down-to-clown-icon' src='https://cdn-icons-png.flaticon.com/512/184/184390.png' alt=''/>
     </div>
      <div className='LogInWords'>Create a Group Image</div>
       {submitted && errors && (
        <ul className='create-group-errors'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))} 
     </ul>
      )}
      <div className='LoginContent'>
      <label className='loginlabel'>
        <h3 className='login-modal-text'>Image url</h3>
        <input
          type="text"
          className='loginInput'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          maxLength={500}
        />
      </label>
        <button type="submit" className='loginButton'>Submit</button>
    </div>
    </form>
  );
}

export default CreateGroupImage;