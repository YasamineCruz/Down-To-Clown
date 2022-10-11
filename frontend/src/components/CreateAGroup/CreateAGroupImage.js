import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups';
import { useHistory } from "react-router-dom";
import * as venueActions from '../../store/venues'


const CreateAGroupImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState(false)
    const [errors, setErrors] = useState([])
    const group = useSelector(state => state.group.group)
    let groupId
    if(group) groupId = group.id


    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
          dispatch(groupActions.createAGroupImg({ url, preview}, groupId))
          .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        })

        dispatch(venueActions.createAVenue(groupId, { address: 'Online', city: 'NA', state: 'NA', lat: 0, lng: 0}))
        .catch(async (res) => {
          const data = await res.json();
          if(data && data.errors) setErrors(data.errors)
        }
      )

        if(errors.length <= 0) {
            setUrl('')
            setPreview(false)
            history.push('/')
        }
    }

    return (
        <div>
            <h1>Now that you've create a group. It's time to choose a image to represent it!</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Input image url here:
                    <input type='text' onChange={(e)=> setUrl(e.target.value)} value={url}/>
                </label>
                <label>
                    Select if this is a preview image or not:
                    <input type='checkbox' onChange={() => setPreview(!preview)}/> 
                </label>
                <button type='submit'>Create Image</button>
            </form>
        </div>
    )
}

export default CreateAGroupImage;