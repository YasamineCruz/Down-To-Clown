import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups';
import { useHistory } from "react-router-dom";
import * as venueActions from '../../store/venues'


const CreateAGroupImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([])
    const group = useSelector(state => state.group.group)
    let groupId
    if(group) groupId = group.id


    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
          dispatch(groupActions.createAGroupImg({ url, preview: true}, groupId))
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
            history.push('/')
        }
    }

    return (
        <div className='create-group-div-container'>
            <div className='create-group-percent-thing'>
            <div className='blue-line-page-7'></div>
        </div>
        <div className='create-group-steps'> Step 7 of 7</div>
            <div className='create-group-text-wrapper'>
                <h1 className='create-group-h1-text-description'>Now that you've created a group it's time to choose a image to represent it!</h1>
                <form className='create-group-span-text' onSubmit={onSubmit}>
                    <div className="create-group-img-div">
                        <input className='create-group-img-input' type='text' onChange={(e)=> setUrl(e.target.value)} value={url} required placeholder='Enter a img url'/>
                    </div>
                    <button className='nextButton-selected'type='submit'>Add Group Image</button>
                </form>    
            </div>
        </div>
    )
}

export default CreateAGroupImage;