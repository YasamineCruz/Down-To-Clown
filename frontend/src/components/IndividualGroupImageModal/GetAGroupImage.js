
const GetAGroupImage = ({url}) => {

    return (
        <div className='indGroupImage-container'>
            <div className='exit-button-wrapper'>
                <button className='exit-button' onClick={console.log('not working')}>X</button>
            </div>
            <div className='ingGroupImage-wrapper'>
              <img className='indGroupImage' src={url} alt=''/>  
            </div>
            
        </div>
    )
}

export default GetAGroupImage;